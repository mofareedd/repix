"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight, Sparkle } from "lucide-react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Icons } from "./icons";
import { stagger, useAnimate, usePresence } from "framer-motion";
function HeroSection() {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(
          "span",
          { opacity: 1, y: [50, 700] },
          {
            duration: 5,
            ease: "linear",
            delay: stagger(2),
            repeat: Infinity,
            repeatDelay: 0,
          }
        );
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate("span", { opacity: 0, y: 0 });
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  return (
    <section className="flex  min-h-screen flex-col justify-center items-center relative">
      <div className="pointer-events-none ">
        <div
          ref={scope}
          // className="mask-grid absolute inset-0 rounded-2xl  opacity-100"
          className="absolute inset-0 rounded-2xl  opacity-100"
          style={{
            maskImage: "radial-gradient(700px 400px, white, transparent)",
            WebkitMaskImage: "radial-gradient(700px 400px, white, transparent)",
          }}
        >
          <span className="absolute z-30 h-[1rem] w-[1rem] rounded-[9999px] blur-sm bg-orange-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg] top-0 left-1/4 before:content-[''] before:h-20 before:w-[1px] before:-top-20 before:left-[7px] before:bg-gradient-to-t before:from-orange-400 before:to-sky-400 before:absolute"></span>
          <span className="absolute z-30 h-[1rem] w-[1rem] rounded-[9999px] blur-sm bg-orange-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg] top-0 left-1/2 before:content-[''] before:h-20 before:w-[1px] before:-top-20 before:left-[7px] before:bg-gradient-to-t before:from-orange-400 before:to-sky-400  before:absolute"></span>
          <span className="absolute z-30 h-[1rem] w-[1rem] rounded-[9999px] blur-sm bg-orange-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg] top-0 right-1/4 before:content-[''] before:h-20 before:w-[1px] before:-top-20 before:left-[7px] before:bg-gradient-to-t before:from-orange-400 before:to-sky-400 before:absolute"></span>
          <Icons.grid />
        </div>
      </div>
      <div className="bg-foreground/10 backdrop-blur-lg opacity-90 text-xs py-2 px-4 rounded-full flex items-center gap-1 hover:-translate-y-1 duration-700 cursor-pointer">
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet eaque
        </p>
        <Sparkle className="w-4 h-4" />
      </div>
      <div className="text-center z-10">
        <h1 className="text-7xl my-14">
          <Balancer>
            Pixel Perfection Made
            <br />
            Easy With rePix
          </Balancer>
        </h1>
        <p className="text-muted-foreground">
          Enhance, Refine, and Shine Your Visuals on
          <br />
          Our Image Enhancing Platform!
        </p>
        <div className="flex max-w-lg mx-auto bg-foreground/10 backdrop-blur-lg opacity-90 rounded-full overflow-hidden z-10 items-center my-10">
          <Input
            className="bg-transparent py-6 px-5 border-none outline-none"
            placeholder="Your email.."
          />
          <Button
            variant={"ghost"}
            className="whitespace-nowrap border border-white/10 mr-5 py-5 rounded-full"
          >
            Book a demo
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4 py-10">
          <Button className="w-32">{"Let's"} Try</Button>
          <Button className="w-32" variant={"outline"}>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
