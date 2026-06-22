import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import ProductCarousel from "@/components/ProductCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandStory from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";
import InstagramCTA from "@/components/InstagramCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <ProductCarousel />
      <FeaturedProducts />
      <BrandStory />
      <Newsletter />
      <InstagramCTA />
    </>
  );
}
