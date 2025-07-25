"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { SignedOut,SignedIn, useAuth } from "@clerk/nextjs";

const LeftSidebar = () => {
  const { userId} = useAuth();
  const pathname = usePathname();
  return (
    <section className="background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] custom-scrollbar ">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
            if(link.route === '/profile'){
              if(userId){

                link.route = `${link.route}/${userId}`
              }
              else{
                return null
              }
            } 
          return (
            <Link
              href={link.route}
              key={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900 "
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4 `}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden`}>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image src='/assets/icons/account.svg' alt="login"width={20} height={20} className="invert-colors lg:hidden" />
              <span className="primary-text-gradient max-lg:hidden">Log In </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
            <Image src='/assets/icons/suitcase.svg' alt="sign-out"width={20} height={20} className="invert-colors lg:hidden" />
              <span className="max-lg:hidden">Sign Up </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
      <Link href="/sign-out">
            <Button className="small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none text-dark400_light900">
            <Image src='/assets/icons/sign-up.svg' alt="sign-up"width={20} height={20} className="invert-colors lg:hidden" />
              <span className="max-lg:hidden">Logout </span>
            </Button>
          </Link>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
