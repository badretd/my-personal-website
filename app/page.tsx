import { AboutPreview } from "@/components/home/AboutPreview";
import { ProceduralHero } from "@/components/procedural/ProceduralHero";

export default function Home() {
  return (
    <main>
      <ProceduralHero />
      <AboutPreview />
      <footer aria-label="[ badretd ]" />
    </main>
  );
}
