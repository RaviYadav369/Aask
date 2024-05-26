import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileLinkProp {
  imgUrl: string;
  href?: string;
  title: string;
}

export const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProp) => {
  return (
    <div className="flex-center  gap-1">
      <Image src={imgUrl} alt="icon" width={20} height={20} />
      {href ? (
        <Link href={href} className="text-blue-500 paragraph-medium">{title}</Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{title}</p>
      )}
    </div>
  );
};
