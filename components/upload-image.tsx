"use client";
import { useState, useTransition } from "react";
import { Download, Rocket, Sparkle, Upload } from "lucide-react";
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

type FileWithPreview = FileWithPath & {
  preview: string;
};

const options = {
  accept: {
    "image/*": [],
  },
  maxFiles: 1,
  maxSize: 1024 * 1024 * 2,
};

const { useUploadThing } = generateReactHelpers<OurFileRouter>();
function UploadImage() {
  const { data: session } = useSession();
  const [file, setFile] = useState<FileWithPreview[] | null>(null);
  const { isUploading, startUpload } = useUploadThing("imageUploader");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  async function uploadHandler() {
    if (!session) {
      toast.error("You must sign in to upload your image");
      return;
    }
    setIsLoading(true);
    try {
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
      toast.success("Image Enhanced Successfully!");
      if (images && images?.length > 0) {
        setResult(images[0].url);
      }
    } catch (error) {
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
          <p className="">8047 images restored and counting</p>
          <Sparkle className="w-4 h-4" />
        </div>
        <h1 className="text-4xl md:text-6xl text-center">Upload Image</h1>
        <p className="text-muted-foreground text-sm md:text-[16px] text-center mt-6">
          You have 5 images everyday to enhance
        </p>
        <div
          className={cn(
            "max-w-sm  mt-10  mx-auto transition-height duration-700 relative",
            isLoading || result || (file && file?.length > 0) ? "h-80" : "h-0"
          )}
        >
          {result ? (
            <Image src={result} alt="result" fill className="object-contain" />
          ) : file && file.length > 0 ? (
            <Image
              src={file[0].preview}
              alt="result"
              fill
              className="object-contain"
            />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </div>

        {file && file?.length > 0 && !result ? (
          <div className="flex items-center justify-center mt-10">
            <Button
              onClick={uploadHandler}
              disabled={isUploading || isLoading || result.length > 0}
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
        {!file && !result ? (
          <FileUploader
            files={file}
            setFiles={setFile}
            isUploading={isUploading}
          />
        ) : null}

        <div className="flex items-center justify-center mt-10">
          {result ? (
            <Button
              onClick={() => saveAs(result, "repix.jpg")}
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
