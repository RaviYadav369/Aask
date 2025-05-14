"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeyFromQuery } from "@/lib/utils";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams.get("q");
  const [search, setsearch] = useState(query || "");
  useEffect(() => {
    const delayDebounseFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          Key: "q",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeyFromQuery({
            params: searchParams.toString(),
            Key: ["q"],
          }
        );
        router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounseFn);
  }, [search, query, route, pathname, searchParams, router]);

  return (
    <section className="flex md:flex-col max-sm:flex-col flex-1 gap-4">
      <div
        className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            width={24}
            height={24}
            alt="Search"
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient   border-none "
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            width={24}
            height={24}
            alt="Search"
            className="cursor-pointer"
          />
        )}
      </div>
    </section>
  );
};

export default LocalSearch;
