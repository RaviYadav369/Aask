import { GetTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import Tags from "../shared/Tags";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await GetTopInteractedTags({ userId: user._id });
  return (
    <Link
      href={`profile/${user.clerkId}`}
      className=" shadow-light100_darknone max-xs:min-w-full xs:w-[260px] w-full"
    >
      <article className="background-light900_dark200 light-border flex flex-col items-center justify-center  rounded-2xl border p-8 ">
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center text-dark500_light500">
          {user.name}
          <p className="h3-bold text-dark500_light500 mt-2">@{user.username}</p>
        </div>
        <div className="mt-5 ">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <Tags key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No Tags Yet</Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
