import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "./Tags";
import { gethotQuestions } from "@/lib/actions/question.action";
import { GetPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const hotQuestions = await gethotQuestions();
  const tags = await GetPopularTags()

  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 h-screen flex flex-col  overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none border max-xl:hidden lg:w-[350px] custom-scrollbar ">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="flex mt-7 w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/question/${question._id}`}
              className="flex cursor-pointer justify-between gap-7 items-center "
            >
              <p className="body-medium text-dark500_light700 ">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {tags.map((tag) => (
            <Tags
              key={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
              _id={tag._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
