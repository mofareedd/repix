"use client";
import { useCallback } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { formatBytes } from "@/lib/utils";
import { useSession } from "next-auth/react";

type FileWithPreview = FileWithPath & {
  preview: string;
};

interface FileUploadProps {
  files: FileWithPreview[] | null;
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>;
  isUploading?: boolean;
  disabled?: boolean;
}

const options = {
  accept: {
    "image/*": [],
  },
  maxFiles: 1,
  maxSize: 1024 * 1024 * 4,
};
function FileUploader({
  files,
  setFiles,
  isUploading = false,
  disabled = false,
  ...props
}: FileUploadProps) {
  //   const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const { data: session } = useSession();
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      if (!session) {
        toast.error("You must sign in to upload your image");
        return;
      }
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          setFiles(null);
          if (errors[0]?.code === "file-too-large") {
            toast.error(
              `File is too large. Max size is ${formatBytes(options.maxSize)}`
            );
            return;
          }
          errors[0]?.message && toast.error(errors[0].message);
        });
      }
    },

    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...options,
    onDrop,
  });

  return (
    <div {...getRootProps()} className="rounded-md w-fit mx-auto mt-10">
      <Button disabled={isUploading} className="w-60 flex items-center gap-1">
        Upload Your Image <Upload className="w-4 h-4 mt-[2px]" />
      </Button>
    </div>
  );
}

export default FileUploader;
