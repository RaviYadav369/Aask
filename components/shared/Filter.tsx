"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  const [Active, setActive] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const paramFilter = searchParams.get('filter')
  const handleClick = (item: string) => {

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        Key: "filter",
        value: item,
      });
      router.push(newUrl, { scroll: false });

  }
  return (
    <div className={`relative ${containerClasses} `}>
      <Select onValueChange={(value)=>handleClick(value)} defaultValue={paramFilter || undefined} >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-[2.5] border-none`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="border-none">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem className={`background-light800_dark400 text-dark500_light700 ${Active === item.value
                ? " bg-primary-100 text-primary-500"
                : "bg-light-800 dark:text-light-500 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:hover:bg-dark-500"}`} value={item.value} key={item.value} >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
