"use client";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");
  const [active, setactive] = useState(typeParams || "");

  const handleTypeClick = (type: string) => {
    if (active === type.toLowerCase()) {
      setactive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        Key: "type",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setactive(type.toLowerCase());
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        Key: "type",
        value: type.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500 ${
              active === item.value
                ? "bg-primary-500 text-light-900"
                : "hover:text-primary-500 text-dark-400 bg-light-700 dark:bg-dark-500"
            }`}
            onClick={() => handleTypeClick(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilters;
