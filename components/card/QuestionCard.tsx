import React from "react";
import Link from "next/link";
import Tags from "../shared/Tags";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";

interface Props {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
  };
  upvotes: number;
  viewed: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  viewed,
  answers,
  upvotes,
  createdAt,
}: Props) => {
  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-[10px]">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>
      <div className="flex mt-3.5 flex-wrap gap-2">
        {tags.map((tag) => (
          <Tags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl="assets/icons/avator.svg"
          alt="user"
          value={author.name}
          title={`- asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="assets/icons/like.svg"
          alt="upvotes"
          value={formatNumber(upvotes)}
          title=" Votes"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="assets/icons/message.svg"
          alt="message"
          value={formatNumber(answers.length)}
          title=" Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="assets/icons/eye.svg"
          alt="views"
          value={formatNumber(viewed)}
          title=" Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
    </div>
  );
};

export default QuestionCard;