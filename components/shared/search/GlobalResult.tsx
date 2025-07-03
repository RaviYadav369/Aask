"use client";
import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import GlobalFilters from "./GlobalFilters";
import { globalSearch } from "@/lib/actions/general.action";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setisLoading] = useState(false);
  const [result, setresult] = useState([
    { type: "question", id: 1, title: "Nextjs" },
    { type: "answer", id: 1, title: "Nextjs" },
    { type: "profile", id: 1, title: "Nextjs" },
  ]);
  const global = searchParams.get("global") || undefined;
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setresult([]);
      setisLoading(true);
      try {
        const res = await globalSearch({ query: global, type });
        console.log(res)
        setresult(JSON.parse(res));
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setisLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case 'question':
        return  `/question/${id}`
      case 'answer':
        return  `/question/${id}`
      case 'tag':
        return  `/tags/${id}`
      case 'user':
        return  `/profile/${id}`
    
      default:
        return '/'
    }
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full bg-light-800 pt-5 shadow-sm rounded-xl dark:bg-dark-400">
      <GlobalFilters />

      <div className="mt-5 py-5 bg-light-700/50 dark:bg-dark-500/50">
        <div className="space-y-5">
          <p className="text-dark400_light900 paragraph-semibold px-5">
            Top Match
          </p>
          {isLoading ? (
            <div className="flex-center flex-col px-5">
              <ReloadIcon className="my-2 h-10 w-10 text-primary-500 animate-spin" />
              <p className="text-dark200_light800 body-regular">
                Browsing the entire database
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {result.length > 0 ? (
                result.map((item: any, index: number) => (
                  <Link
                    href={renderLink(item.type,item.id)}
                    key={item.type + item.id + index}
                    className="flex w-full cursor-pointer items-start gap-2 px-5 py-2.5 hover:bg-light-700/50 dark:bg-dark-500/50"
                  >
                    <Image
                      src="/assets/icons/tag.svg"
                      alt="tag"
                      width={18}
                      height={18}
                      className="invert-colors mt-1 object-contain"
                    />
                    <div>
                      <p className="text-dark200_light800 body-medium line-clamp-1 ">
                        {item.title}
                      </p>
                      <p className="text-dark200_light800 small-medium mt-1 line-clamp-1 font-bold capitalize">
                        {item.type}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex-center flex-col px-5">
                  <p className="text-dark200_light800 body-regular px-5 py-2.5">
                    Opps no result found
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalResult;
