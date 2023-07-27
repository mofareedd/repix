import AboutSection from "@/components/about-section";
import GlobeVisitors from "@/components/globe-visitors";
import HeroSection from "@/components/hero-section";
import UploadImage from "@/components/upload-image";
import { getSession } from "next-auth/react";

export default async function Home() {
  return (
    <main
      className="bg-gradient-to-t
    from-background
    from-70%
    to-pink-500/10"
    >
      {/* <HeroSection /> */}
      <AboutSection />
      <UploadImage />
      <footer className="py-16 flex flex-col items-center text-muted-foreground">
        <p className="">Made With Love</p>
      </footer>
    </main>
  );
}
