import React from "react";
import Link from "next/link";
import Tags from "../shared/Tags";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import EditDeleteIcons from "../shared/EditDeleteIcons";

interface Props {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  clerkId?: string | null;
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  clerkId,
  title,
  tags,
  author,
  views,
  answers,
  upvotes,
  createdAt,
}: Props) => {
  const { userId } = auth()
  if (!userId) return redirect("/sign-in");
  const showEditDelete = clerkId && clerkId === author.clerkId
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div className="w-full flex justify-between">
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {showEditDelete && (

            <EditDeleteIcons
            type="question"
            itemId = {JSON.stringify(_id)}            
            />
          )}
        </SignedIn>
      
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap ">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={author.name}
          title={`- asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyle="body-medium text-dark400_light700"
        />
        <div className="flex-between gap-3">
          <Metric
            imgUrl="assets/icons/like.svg"
            alt="upvotes"
            value={formatNumber(upvotes.length)}
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
            value={formatNumber(views)}
            title=" Views"
            textStyle="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
