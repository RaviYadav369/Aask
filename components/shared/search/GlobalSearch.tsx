"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeyFromQuery } from "@/lib/utils";
import GlobalResult from "./GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchContinerRef = useRef(null);
  const pathname = usePathname();
  const query = searchParams.get("q");
  const [search, setsearch] = useState(query || "");
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContinerRef.current &&
        // @ts-ignore
        !searchContinerRef.current.contains(event.target)
      ) {
        setisOpen(false);
        setsearch("");
      }
    };
    setisOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounseFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          Key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeyFromQuery({
            params: searchParams.toString(),
            Key: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounseFn);
  }, [search, query, pathname, searchParams, router]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContinerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="Seach"
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search Globaly"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
            if (!isOpen) setisOpen(true);
            if (e.target.value === "" && isOpen) setisOpen(false);
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none "
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
