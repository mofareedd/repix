import HeroSection from "@/components/hero-section";
import UploadImage from "@/components/upload-image";
import { repixAnalysis } from "./_actions";

export default async function Home() {
  const { users, enhanceed } = await repixAnalysis();
  return (
    <main
      className="bg-gradient-to-t
    from-background
    from-70%
    to-pink-500/10"
    >
      <HeroSection trustedUsers={users} />
      <UploadImage totalEnhancements={enhanceed} />
      <footer className="py-16 flex flex-col items-center text-muted-foreground">
        <p className="text-sm">
          Brought to you by{" "}
          <a
            href="https://twitter.com/mofr_dev"
            target="_blank"
            className="font-bold"
          >
            @mofr_dev
          </a>
        </p>
      </footer>
    </main>
  );
}
