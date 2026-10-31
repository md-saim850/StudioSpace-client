import BrowseCategories from "@/components/home/BrowseCategories";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedStudios />
      <BrowseCategories />
    </>
  );
}
