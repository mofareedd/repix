"use client";
import { useId, useState, useTransition } from "react";
import {
  Download,
  Ghost,
  Rocket,
  Sparkle,
  Upload,
  XCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { FileWithPath } from "react-dropzone";
import { toast } from "sonner";
import FileUploader from "./file-uploader";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Icons } from "./icons";
import { cn, isArrayOfFile } from "@/lib/utils";
import { saveAs } from "file-saver";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CompareSlider from "./compare-slider";
import { checkRemaining } from "@/app/_actions";

type FileWithPreview = FileWithPath & {
  preview: string;
};

interface StoredImage {
  id: string;
  name: string;
  url: string;
}
const options = {
  accept: {
    "image/*": [],
  },
  maxFiles: 1,
  maxSize: 1024 * 1024 * 2,
};

const { useUploadThing } = generateReactHelpers<OurFileRouter>();
function UploadImage({
  totalEnhancements,
}: {
  totalEnhancements: number | null;
}) {
  const { data: session } = useSession();
  const [file, setFile] = useState<FileWithPreview[] | null>(null);
  const { isUploading, startUpload } = useUploadThing("imageUploader");
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState("");
  const downloadImageName = useId();

  async function uploadHandler() {
    if (!session) {
      toast.error("You must sign in to upload your image");
      return;
    }
    setIsLoading(true);
    try {
      await checkRemaining(session.user.id);
      const images = isArrayOfFile(file)
        ? await startUpload(file).then((res) => {
            const formattedImages = res?.map((image) => ({
              id: image.fileKey,
              name: image.fileKey.split("_")[1] ?? image.fileKey,
              url: image.fileUrl,
            }));
            return formattedImages ?? null;
          })
        : null;
      if (images && images?.length > 0) {
        const response = await fetch("/api/enhance", {
          method: "POST",
          body: JSON.stringify({
            id: images[0].id,
            name: images[0].name,
            url: images[0].url,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          toast.error("Failed to enhance image");
          return;
        }

        toast.success("Image Enhanced Successfully!");
        setEnhancedImage(data.result);
      }
    } catch (error) {
      console.log(error);
      error instanceof Error
        ? toast.error(error.message)
        : toast.error("Something went wrong.");
    }
    setIsLoading(false);
  }

  return (
    <section className="py-20 border overflow-hidden rounded-2xl mx-6 relative">
      <div
        aria-hidden="true"
        className=" bg-[linear-gradient(90deg,_#000_0%,_#ffffff00_0%,_#8f8f8f_50%,_#000_100%)] left-1/2 top-0 w-[300px] max-w-[300px] user-select-none center pointer-events-none absolute h-px  -translate-x-1/2 -translate-y-1/2"
      />
      <div
        aria-hidden="true"
        className="-top-1 left-1/2 h-[200px] w-full max-w-[200px] md:max-w-[400px] user-select-none center pointer-events-none absolute  -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, #00000000 50%, #000 50%),radial-gradient(rgba(200, 200, 200, 0.1) 0%, transparent 80%)",
        }}
      />
      <div className="max-w-7xl mx-auto">
        <div className="bg-foreground/10 backdrop-blur-lg opacity-90 text-xs py-2 px-4 rounded-full flex items-center gap-1 hover:-translate-y-1 duration-700 cursor-pointer w-fit mx-auto mb-6">
          <p className="">
            {totalEnhancements || ""} images restored and counting
          </p>
          <Sparkle className="w-4 h-4" />
        </div>
        <h1 className="text-4xl md:text-6xl text-center">Upload Image</h1>
        <p className="text-muted-foreground text-sm md:text-[16px] text-center mt-6">
          You have 5 images everyday to enhance
        </p>
        <div id="upload" className="my-10">
          {enhancedImage && file ? (
            <div className="flex items-center justify-center h-[475px] w-full">
              <CompareSlider before={file[0].preview} after={enhancedImage} />
            </div>
          ) : null}
          {!enhancedImage && file && file.length > 0 ? (
            <div className="flex items-center justify-center ">
              <div
                className={cn(
                  "transition-height w-[475px] duration-700 relative"
                )}
              >
                {/* <Skeleton className="w-full h-full" /> */}

                <Button
                  variant={"link"}
                  className="absolute z-10 -right-2 -top-8"
                  onClick={() => setFile(null)}
                >
                  <XCircle />
                </Button>
                <Image
                  src={file[0].preview}
                  width={475}
                  height={475}
                  alt=""
                  className="relative rounded-md"
                />
              </div>
            </div>
          ) : null}
        </div>
        {file && file?.length > 0 && !enhancedImage ? (
          <div className="flex items-center justify-center mt-10">
            <Button
              onClick={uploadHandler}
              disabled={isUploading || isLoading}
              //   className="w-60 flex gap-1 bg-blue-500 text-white"
              className="w-60 flex gap-1 text-blue-100 transition-colors duration-300 ease-in-out bg-blue-500 shadow-xl hover:bg-blue-600 shadow-blue-400/30"
            >
              {isLoading ? (
                <Icons.spinner className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Enhance Now <Rocket className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        ) : null}
        {!file ? (
          <FileUploader
            files={file}
            setFiles={setFile}
            isUploading={isUploading}
          />
        ) : null}

        <div className="flex items-center justify-center mt-10">
          {enhancedImage ? (
            <Button
              onClick={() =>
                saveAs(enhancedImage, `repix-${downloadImageName}.jpg`)
              }
              className="w-60 flex gap-1 text-green-100 transition-colors duration-300 ease-in-out bg-green-500 shadow-xl hover:bg-green-600 shadow-green-400/30"
            >
              Download Image <Download className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default UploadImage;
