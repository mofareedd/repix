import React from "react";
import GlobeVisitors from "./globe-visitors";
import Image from "next/image";
import { Balancer } from "react-wrap-balancer";
import { Button } from "./ui/button";

function AboutSection() {
  return (
    // <section className="border overflow-hidden h-screen mx-4 rounded-2xl relative bg-background">
    <section className="h-screen relative ">
      <div className="max-w-7xl px-6 2xl:px-0 mx-auto h-full flex flex-col justify-center">
        <div className="flex pt-32 sm:pt-24 flex-col px-6 items-center text-center lg:text-left lg:px-0 lg:flex-row lg:items-start gap-10 ">
          <div className="">
            <h1 className="animate-fade-up bg-gradient-to-br from-foreground to-stone-500 bg-clip-text text-4xl font-bold tracking-[-0.02em] text-transparent  drop-shadow-sm sm:text-5xl xl:text-7xl md:leading-[5rem]">
              <Balancer>Upscale Your Images with Our Enhancement</Balancer>
            </h1>
            <p className="lg:max-w-xl text-muted-foreground my-10">
              Are your photos not looking as stunning as you want them to be?
              {"Don't"} worry; {"we've"} got you covered! Our Image Quality
              Improvement website is here to transform your ordinary images into
              extraordinary masterpieces
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-5">
              <Button>Enhance Now</Button>
              <Button variant={"outline"}>Contact Me</Button>
            </div>
          </div>
          <div className="flex justify-center gap-6 lg:gap-0 mt-6 lg:mt-0 lg:flex-row-reverse  items-center">
            <div className="w-44 md:w-52 lg:w-96 rounded-lg h-44 md:h-52 lg:h-96 overflow-hidden bg-gradient-to-t  from-background to-muted border border-gray-800 shadow-xl relative -translate-x-0  lg:-translate-x-20  ">
              <Image
                src={"/men-before.jpg"}
                alt="Photo by https://unsplash.com/@elishavision"
                fill
                sizes="25vw"
                priority
                className="object-cover blur-[1px]"
              />
            </div>
            <div className="w-44 md:w-52 lg:w-96 rounded-lg overflow-hidden h-44 md:h-52 lg:h-96 bg-gradient-to-t z-10 from-background to-muted border border-gray-800 shadow-xl -translate-x-0 lg:translate-y-60 lg:translate-x-40">
              <Image
                src={"/men-before.jpg"}
                alt="before"
                fill
                sizes="25vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* <GlobeVisitors /> */}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

{
  /* <div
aria-hidden="true"
className="z-10 bg-[linear-gradient(90deg,_#000_0%,_#ffffff00_0%,_#8f8f8f_50%,_#000_100%)] left-1/2 bottom-0 w-[300px] max-w-[300px] user-select-none center pointer-events-none absolute h-px  -translate-x-1/2 -translate-y-1/2"
/>
<div
aria-hidden="true"
className="-bottom-1 left-1/2 h-[200px] w-full max-w-[200px] md:max-w-[400px] user-select-none center pointer-events-none absolute  -translate-x-1/2 -translate-y-1/2"
style={{
  background:
    "conic-gradient(from 90deg at 50% 50%, #00000000 50%, #000 50%),radial-gradient(rgba(200, 200, 200, 0.1) 0%, transparent 80%)",
}}
/> */
}
