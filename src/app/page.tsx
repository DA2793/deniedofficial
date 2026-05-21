import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Categories from "@/components/Categories";
import Collection from "@/components/Collection";
import BrandStory from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Collection />
      <BrandStory />
      <Newsletter />
    </>
  );
}
