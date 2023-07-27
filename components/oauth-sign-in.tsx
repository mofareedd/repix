import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Icons } from "./icons";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";

export function OAuthSignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setTimeout(() => setIsLoading(false), 2500);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <Button variant={"ghost"} className="text-muted-foreground">
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign-in</DialogTitle>
          <DialogDescription>
            Sign-in to use repix Enhancement tool.
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={loginWithGoogle}
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <Icons.spinner className="w-5 h-5 text-gray-500 animate-spin" />
          ) : (
            <Icons.google className="w-5 h-5" />
          )}{" "}
          Countinue With Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
