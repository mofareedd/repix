import HeroSection from "@/components/hero-section";
import UploadImage from "@/components/upload-image";

export default async function Home() {
  return (
    <main
      className="bg-gradient-to-t
    from-background
    from-70%
    to-pink-500/10"
    >
      <HeroSection />
      <UploadImage />
      <footer className="py-16 flex flex-col items-center text-muted-foreground">
        <p className="">Made With Love</p>
      </footer>
    </main>
  );
}
