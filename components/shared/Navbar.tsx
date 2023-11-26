import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between background-light800_dark200 fixed z-50 w-full gap-5 shadow-light-300 dark:shadow-none sm:px-12 p-6">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="Aask"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">A-<span className="text-primary-500">ask</span></p>

      </Link>
      Global Search 
      <div className="flex-between gap-5">
        Theme
        <SignedIn>
            <UserButton afterSignOutUrl="/" 
            appearance={{
                elements:{
                    avatarBox:"h-10 w-10"
                },
                variables:{
                    colorPrimary:"#ff7000"
                }
            }}
            />
        </SignedIn>
        {/* Mobile Navigation  */}
      </div>
    </nav>
  );
};

export default Navbar;
