import StoreEntrance from "@/components/StoreEntrance";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import ProductCarousel from "@/components/ProductCarousel";
import BrandStory from "@/components/BrandStory";
import InstagramCTA from "@/components/InstagramCTA";

export default function Home() {
  return (
    <>
      <StoreEntrance />
      <Hero />
      <Marquee />
      <Categories />
      <ProductCarousel />
      <BrandStory />
      <InstagramCTA />
    </>
  );
}
