import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "./Tags";

const RightSidebar = () => {
  const hotQuestions = [
    { _id: "1", title: "how do I use express as a custom server in nextjs" },
    { _id: "2", title: "how do I use express as a custom server in nextjs" },
    { _id: "3", title: "how do I use express as a custom server in nextjs" },
    { _id: "4", title: "how do I use express as a custom server in nextjs" },
    { _id: "5", title: "how do I use express as a custom server in nextjs" },
  ];

  const tags = [
    { _id: '1', name: "javascript", totalQuestions: 5 },
    { _id: '2', name: "HTML", totalQuestions: 5 },
    { _id: '3', name: "CSS", totalQuestions: 5 },
    { _id: '4', name: "Nodejs", totalQuestions: 5 },
    { _id: '5', name: "Nextjs", totalQuestions: 5 },
    { _id: '6', name: "React", totalQuestions: 5 },
  ];

  return (
    <section className="background-light900_dark200 light-border sticky right-0 top-0 h-screen flex flex-col  overflow-y-auto p-6 pt-36 shadow-light-300 dark:shadow-none border-1 max-xl:hidden lg:w-[350px] custom-scrollbar ">
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
