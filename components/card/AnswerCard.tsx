import React from "react";
import Metric from "../shared/Metric";
import { getTimeStamp } from "@/lib/utils";

import ParsedHtml from "../shared/ParsedHtml";
import EditDeleteIcons from "../shared/EditDeleteIcons";
import { SignedIn } from "@clerk/nextjs";

interface Props {
  _id: string;
  clerkId?: string | null;
  content: string;
  upvotes: string[];
  downvotes: number;
  author: {
    _id: string;
    name: string;
    clerkId:string;
    picture: string;
  };
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  content,
  clerkId,
  upvotes,
  downvotes,
  author,
  createdAt,
}: Props) => {
  const showEditDelete = clerkId && clerkId === author.clerkId
  return (
    <>
      <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
        <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
          <div>
            <Metric
              imgUrl={author.picture}
              alt="user"
              value={author.name}
              title={`- replied ${getTimeStamp(createdAt)}`}
              href={`/profile/${clerkId}`}
              isAuthor
              textStyle="body-medium text-dark400_light700"
            />
            <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
              {getTimeStamp(createdAt)}
            </span>
          </div>
          <SignedIn>
          {showEditDelete && (

            <EditDeleteIcons
            type="answer"
            itemId = {JSON.stringify(_id)}            
            />
          )}
        </SignedIn>
        </div>

        <div className=" mt-6 w-full flex-wrap ">
          <ParsedHtml data={content} />
        </div>
      </div>
    </>
  );
};

export default AnswerCard;
