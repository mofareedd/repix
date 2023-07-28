"use client";
import React from "react";
import { Icons } from "./icons";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { OAuthSignIn } from "./oauth-sign-in";
import { useSession } from "next-auth/react";
import UserAvatar from "./user-avatar";
import { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}
function Navbar({ session }: NavbarProps) {
  return (
    <nav className="py-3 absolute w-full z-30">
      <div className="max-w-7xl px-6 xl:px-0 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icons.logo className="w-8 h-8 fill-foreground" />
          <h5 className="text-lg">rePix</h5>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <UserAvatar user={{ ...session.user }} />
          ) : (
            <OAuthSignIn />
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
