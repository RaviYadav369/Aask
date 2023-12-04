import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface Props{
    title:string,
    description:string,
    link:string,
    linkTitle:string,
}

const NoResult = ({title,description,link,linkTitle}:Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <Image
        alt="No Result illustration"
        width={270}
        height={270}
        className="block object-contain dark:hidden"
        src="/assets/images/light-illustration.png"
      />
      <Image
        alt="No Result illustration"
        width={270}
        height={270}
        className="object-contain dark:flex hidden"
        src="/assets/images/dark-illustration.png"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-[3.5px] max-w-md text-center">
        {description}
      </p>
      <Link href={link}>
        <Button className="paragraph-medium mt-5 bg-primary-500 px-4 py-3 text-light-900 rounded-lg min-h-[46px] hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">{linkTitle}</Button>
      </Link>
    </div>
  );
};

export default NoResult;
