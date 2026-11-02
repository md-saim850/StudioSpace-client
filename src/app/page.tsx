import AboutSection from "@/components/home/AboutSection ";
import BrowseCategories from "@/components/home/BrowseCategories";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedStudios />
      <BrowseCategories />
      <AboutSection />
      <HowItWorks />
    </>
  );
}
