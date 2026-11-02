import AboutHero from "@/app/about/AboutHero";
import AboutStory from "@/app/about/AboutStory";
import AboutStats from "@/app/about/AboutStats";
import AboutValues from "@/app/about/AboutValues";
import AboutCTA from "@/app/about/AboutCTA";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutValues />
      <AboutCTA />
    </main>
  );
}
