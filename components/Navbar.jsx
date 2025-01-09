"use client";
import { ScanSearch } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  return (
    <div className="px-20 justify-between items-center flex gap-3 py-8">
      <div className="flex gap-3 items-center">
        <ScanSearch size={40} className="text-orange-500" />
        <h1 className="text-2xl text-white font-medium ">
          <span className="text-orange-500">Spy</span>&Grow.
        </h1>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5">
            <div className="flex gap-3">

            <Link href={"/analytics"} className={cn(buttonVariants({variant:"ghost"}),"p-5 hover:bg-orange-800 hover:text-white text-base")}>Analytics</Link>
            <Link href={"/chat"} className={cn(buttonVariants({variant:"ghost"}),"p-5 hover:bg-orange-800 hover:text-white text-base")}>Chat</Link>
            <Link href={"/"} className={cn(buttonVariants({variant:"ghost"}),"p-5 hover:bg-orange-800 hover:text-white text-base")}>Add Compititor</Link>
            </div>
            <div>
              {user ? (
                <Image
                  className="rounded-full"
                  alt="userimage"
                  width={45}
                  height={45}
                  src={user.picture}
                />
              ) : (
                <Image
                  className="rounded-full"
                  alt="userimage"
                  width={45}
                  height={45}
                  src={"https://avatar.vercel.sh/oo?size=30"}
                />
              )}
            </div>
            <LogoutLink>
              <Button
                variant={"outline"}
                className="text-base bg-transparent p-6 rounded-xl"
              >
                Log Out
              </Button>
            </LogoutLink>
          </div>
        ) : (
          <div className="flex gap-5">
          <LoginLink>

            <Button variant={"outline"} className="text-base bg-transparent hover:bg-orange-600 p-6 rounded-xl">
              Login
            </Button>
          </LoginLink>
          <RegisterLink>
            <Button className="text-base hover:bg-orange-600 p-6 rounded-xl">
              Get Started
            </Button>
          </RegisterLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
