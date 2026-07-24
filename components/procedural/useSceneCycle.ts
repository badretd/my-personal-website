"use client";

import { useEffect, useRef, useState } from "react";
import { generateScene } from "@/lib/procedural/generateScene";
import { createSessionSeed, SeededRandom } from "@/lib/procedural/random";
import { ShuffledSceneBag } from "@/lib/procedural/shuffledBag";
import type { SceneConfig } from "@/lib/procedural/types";

const SCENE_DURATION = 16_000;
const INTERSTITIAL_DURATION = 1_000;
const INITIAL_SCENE = generateScene(416, "line-field");

export function useSceneCycle(heroRef: React.RefObject<HTMLElement | null>) {
  const [scene, setScene] = useState<SceneConfig>(INITIAL_SCENE);
  const [interstitial, setInterstitial] = useState(false);
  const [visible, setVisible] = useState(true);
  const [nearViewport, setNearViewport] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const nextScene = useRef<SceneConfig | null>(null);
  const generator = useRef<{ random: SeededRandom; bag: ShuffledSceneBag } | null>(null);
  const phase = useRef(false);
  const remaining = useRef(SCENE_DURATION);

  useEffect(() => {
    const random = new SeededRandom(createSessionSeed());
    const bag = new ShuffledSceneBag(random, INITIAL_SCENE.family);
    generator.current = { random, bag };

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: "25% 0px 25% 0px" },
    );
    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, [heroRef]);

  const paused = reducedMotion || !visible || !nearViewport;

  useEffect(() => {
    if (paused) return;
    if (phase.current !== interstitial) {
      phase.current = interstitial;
      remaining.current = interstitial ? INTERSTITIAL_DURATION : SCENE_DURATION;
    }
    const startedAt = performance.now();
    const timer = window.setTimeout(() => {
      if (interstitial) {
        if (nextScene.current) setScene(nextScene.current);
        nextScene.current = null;
        setInterstitial(false);
        return;
      }

      const state = generator.current;
      if (!state) return;
      const family = state.bag.next();
      const seed = state.random.integer(1, 0x7fffffff);
      nextScene.current = generateScene(seed, family);
      setInterstitial(true);
    }, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current = Math.max(0, remaining.current - (performance.now() - startedAt));
    };
  }, [interstitial, paused]);

  return { scene, interstitial, paused };
}
