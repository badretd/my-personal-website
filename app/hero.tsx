"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./hero.module.css";

const SHOT_MS = 4_000;
const SHOTS_PER_SCENE = 4;
const SCENE_COUNT = 12;
type Locale = "en" | "ru";

const copy = {
  en: {
    nav: ["Home", "Projects", "Music", "Blog", "About me"],
    menu: "Menu",
    close: "Close",
    language: "Switch to Russian",
    scene: "Scene",
  },
  ru: {
    nav: ["Главная", "Проекты", "Музыка", "Блог", "Обо мне"],
    menu: "Меню",
    close: "Закрыть",
    language: "Switch to English",
    scene: "Сцена",
  },
};

const hrefs = ["#home", "#projects", "#music", "#blog", "#about"];

function shuffle(previousLast?: number) {
  const next = Array.from({ length: SCENE_COUNT }, (_, index) => index);
  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }
  if (previousLast === next[0]) {
    [next[0], next[1]] = [next[1], next[0]];
  }
  return next;
}

function GridScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#020202" />
      <g className={styles.grid} data-shot={shot}>
        {Array.from({ length: 23 }, (_, i) => (
          <path key={`v${i}`} d={`M ${i * 80 - 80} 1000 L 800 500`} />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <path key={`h${i}`} d={`M 0 ${1000 - i * i * 4.2} H 1600`} />
        ))}
      </g>
      <circle className={styles.gridOrb} data-shot={shot} cx="800" cy="410" r="122" />
    </svg>
  );
}

function TunnelScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#030303" />
      <g className={styles.tunnel} data-shot={shot}>
        {Array.from({ length: 12 }, (_, i) => {
          const inset = i * 54;
          return (
            <rect key={i} x={inset} y={inset * 0.625} width={1600 - inset * 2} height={1000 - inset * 1.25} />
          );
        })}
      </g>
      <rect className={styles.tunnelCore} x="735" y="435" width="130" height="130" />
    </svg>
  );
}

function EclipseScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#000" />
      <g className={styles.eclipse} data-shot={shot}>
        <circle cx="800" cy="430" r="260" />
        <circle className={styles.eclipseMask} cx="770" cy="400" r="250" />
      </g>
      <path className={styles.horizon} d="M0 710 Q400 670 800 710 T1600 710" />
      {Array.from({ length: 9 }, (_, i) => (
        <path
          className={styles.wave}
          key={i}
          d={`M0 ${748 + i * 29} Q260 ${720 + i * 31} 520 ${752 + i * 28} T1040 ${748 + i * 30} T1600 ${750 + i * 29}`}
        />
      ))}
    </svg>
  );
}

function MonolithScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#010101" />
      <g className={styles.monolith} data-shot={shot}>
        <path d="M650 112 L930 80 L955 790 L625 790 Z" />
        <path className={styles.monolithEdge} d="M930 80 L998 148 L990 760 L955 790 Z" />
        <path className={styles.monolithLine} d="M650 112 L930 80 L998 148" />
      </g>
      <path className={styles.ground} d="M0 790 H1600 V1000 H0Z" />
      <path className={styles.shadow} d="M625 790 L990 760 L1350 1000 H160 Z" />
    </svg>
  );
}

function OrbitScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#020202" />
      <g className={styles.orbits} data-shot={shot}>
        {Array.from({ length: 9 }, (_, i) => (
          <ellipse key={i} cx="800" cy="500" rx={170 + i * 58} ry={58 + i * 23} />
        ))}
      </g>
      <circle className={styles.orbitCore} cx="800" cy="500" r="68" />
      <circle className={styles.satellite} data-shot={shot} cx="1180" cy="500" r="12" />
    </svg>
  );
}

function WaveScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#020202" />
      <g className={styles.frequency} data-shot={shot}>
        {Array.from({ length: 34 }, (_, i) => (
          <path
            key={i}
            d={`M0 ${210 + i * 18} C300 ${80 + i * 31}, 500 ${820 - i * 9}, 800 ${500 + (i % 3) * 26} S1300 ${170 + i * 21}, 1600 ${240 + i * 17}`}
          />
        ))}
      </g>
    </svg>
  );
}

function BlocksScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#010101" />
      <g className={styles.blocks} data-shot={shot}>
        {Array.from({ length: 21 }, (_, i) => {
          const x = 90 + (i % 7) * 220;
          const y = 180 + Math.floor(i / 7) * 250;
          const size = 82 + (i % 4) * 25;
          return <rect key={i} x={x} y={y} width={size} height={size} />;
        })}
      </g>
    </svg>
  );
}

function IrisScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#000" />
      <g className={styles.iris} data-shot={shot}>
        {Array.from({ length: 28 }, (_, i) => (
          <path key={i} d="M800 500 L760 20 L840 20 Z" transform={`rotate(${i * (360 / 28)} 800 500)`} />
        ))}
        <circle cx="800" cy="500" r="116" />
      </g>
    </svg>
  );
}

function StairsScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#020202" />
      <g className={styles.stairs} data-shot={shot}>
        {Array.from({ length: 14 }, (_, i) => (
          <path key={i} d={`M${330 + i * 45} ${830 - i * 43} H${980 + i * 14} V${872 - i * 43} H${330 + i * 45}Z`} />
        ))}
      </g>
      <circle className={styles.stairMoon} data-shot={shot} cx="1030" cy="260" r="88" />
    </svg>
  );
}

function PillarsScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#010101" />
      <g className={styles.pillars} data-shot={shot}>
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${60 + i * 148} 80 H${130 + i * 148} L${170 + i * 148} 920 H${20 + i * 148}Z`} />
        ))}
      </g>
      <path className={styles.pillarFloor} d="M0 920 L800 570 L1600 920 V1000 H0Z" />
    </svg>
  );
}

function CrystalScene({ shot }: { shot: number }) {
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#020202" />
      <g className={styles.crystal} data-shot={shot}>
        <path d="M800 92 L1080 430 L930 830 L670 830 L520 430Z" />
        <path d="M800 92 L800 830 M520 430 L1080 430 M520 430 L930 830 M1080 430 L670 830" />
      </g>
    </svg>
  );
}

function ConstellationScene({ shot }: { shot: number }) {
  const points = [
    [180, 210], [390, 330], [610, 180], [800, 500], [990, 250], [1230, 350],
    [1430, 180], [1320, 720], [1050, 650], [810, 840], [540, 690], [250, 770],
  ];
  return (
    <svg className={styles.vector} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      <rect width="1600" height="1000" fill="#000" />
      <g className={styles.constellation} data-shot={shot}>
        <path d={`M${points.map(([x, y]) => `${x} ${y}`).join(" L")} Z`} />
        {points.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 3 ? 20 : 7} />)}
      </g>
    </svg>
  );
}

const scenes = [
  GridScene,
  TunnelScene,
  EclipseScene,
  MonolithScene,
  OrbitScene,
  WaveScene,
  BlocksScene,
  IrisScene,
  StairsScene,
  PillarsScene,
  CrystalScene,
  ConstellationScene,
];

export default function Hero() {
  const [locale, setLocale] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [order, setOrder] = useState(() => Array.from({ length: SCENE_COUNT }, (_, i) => i));
  const [position, setPosition] = useState(0);
  const [shot, setShot] = useState(0);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("badretd-locale");
      const detected: Locale =
        saved === "ru" || saved === "en"
          ? saved
          : window.navigator.language.toLowerCase().startsWith("ru")
            ? "ru"
            : "en";
      setLocale(detected);
      setOrder(shuffle());
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("badretd-locale", locale);
  }, [locale]);

  const advance = useCallback(() => {
    setShot((currentShot) => {
      if (currentShot < SHOTS_PER_SCENE - 1) return currentShot + 1;
      setPosition((currentPosition) => {
        if (currentPosition < SCENE_COUNT - 1) return currentPosition + 1;
        setOrder((currentOrder) => shuffle(currentOrder.at(-1)));
        return 0;
      });
      return 0;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(advance, SHOT_MS);
    return () => window.clearInterval(timer);
  }, [advance]);

  const content = copy[locale];
  const Scene = scenes[order[position]];
  const sceneLabel = useMemo(
    () => `${content.scene} ${position + 1} / ${SCENE_COUNT}`,
    [content.scene, position],
  );

  function toggleLocale() {
    setLocale((current) => (current === "en" ? "ru" : "en"));
    setMenuOpen(false);
  }

  return (
    <main className={styles.hero} id="home">
      <div className={styles.scene} aria-hidden="true">
        <Scene key={`${order[position]}-${shot}`} shot={shot} />
        <div className={styles.vignette} />
        <div className={styles.noise} />
      </div>

      <header className={styles.header}>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span>{menuOpen ? content.close : content.menu}</span>
          <i aria-hidden="true" />
        </button>

        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          id="site-navigation"
          aria-label="Primary navigation"
        >
          <ol>
            {content.nav.map((label, index) => (
              <li key={hrefs[index]}>
                <span>0{index + 1}</span>
                <a href={hrefs[index]} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ol>
          <button className={styles.language} type="button" onClick={toggleLocale}>
            <span>{locale === "en" ? "RU" : "EN"}</span>
            <small>{content.language}</small>
          </button>
        </nav>

        <button className={styles.languageDesktop} type="button" onClick={toggleLocale}>
          <span>{locale === "en" ? "RU" : "EN"}</span>
          <small>{content.language}</small>
        </button>
      </header>

      <h1 className={styles.wordmark}>[ badretd ]</h1>
      <div className={styles.status}>
        <span>{sceneLabel}</span>
        <span>0{shot + 1} / 04</span>
      </div>
    </main>
  );
}
