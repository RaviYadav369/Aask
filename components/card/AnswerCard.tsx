import React from "react";
import Metric from "../shared/Metric";
import { getTimeStamp } from "@/lib/utils";

import ParsedHtml from "../shared/ParsedHtml";

interface Props {
  _id: string;
  content: string;
  upvotes: number;
  downvotes: number;
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  content,
  upvotes,
  downvotes,
  author,
  createdAt,
}: Props) => {
  return (
    <>
      <div className="pb-5 mb-5 border-b-2 dark:border-dark-300" >
        <div className="flex w-full flex-row justify-between gap-5 sm:items-center sm:gap-2">
          <div className="flex items-center justify-start gap-1">
              <Metric
                imgUrl={author.picture}
                alt="user"
                value={author.name}
                title={`- replied ${getTimeStamp(createdAt)}`}
                href={`/profile/${author._id}`}
                isAuthor
                textStyle="body-medium text-dark400_light700"
              />
             
          </div>
        </div>
        <ParsedHtml data={content} />
      </div>
      <div className="">

      </div>

    </>
  );
};

export default AnswerCard;
