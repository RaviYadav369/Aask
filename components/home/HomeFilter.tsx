"use client";
import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [Active, setActive] = useState("");
  const handleClick = (item: string) => {
    if (Active === item.toLowerCase()) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        Key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item.toLowerCase())
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        Key: "filter",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => handleClick(item.name)}
          className={`${
            Active === item.value
              ? " bg-primary-100 text-primary-500"
              : "bg-light-800 dark:text-light-500 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-500"
          } body-medium rounded-lg px-6 py-3 capitalize shadow-none`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
