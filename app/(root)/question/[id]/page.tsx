import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParsedHtml from "@/components/shared/ParsedHtml";
import Tags from "@/components/shared/Tags";
import { getAllQuestionsById } from "@/lib/actions/question.action";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AnswerCard from "@/components/card/AnswerCard";
import Filter from "@/components/shared/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAllAnswersById } from "@/lib/actions/answer.action";

const page = async ({ params }: any) => {
  const result = await getAllQuestionsById({ questionId: params.id });
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const userResult = await getUserById({ userId });
  const ansResult = await getAllAnswersById({ questionId: params.id })
  // console.log(ansResult);

  return (
    <>
      <div className="flex w-full flex-col justify-start">
        <div className="flex w-full flex-row justify-between gap-5 sm:items-center sm:gap-2">
          <Link
            href={`profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="profile picture"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">Vote</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="../../assets/icons/clock.svg"
          alt="clock icon"
          title={`- asked ${getTimeStamp(result.createdAt)}`}
          textStyle="body-medium text-dark400_light800"
        />
        <Metric
          imgUrl="../../assets/icons/message.svg"
          alt="message"
          value={formatNumber(result.answers.length)}
          title=" Answers"
          textStyle="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="../../assets/icons/eye.svg"
          alt="views"
          value={formatNumber(result.views)}
          title=" Views"
          textStyle="small-medium text-dark400_light800"
        />
      </div>
      <ParsedHtml data={result.content} />
      <div className="mt-8 flex flex-wrap gap-5">
        {result.tags.map((tag: any) => (
          <Tags key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>
      <div className="mt-5">
        <div className="flex-between items-center my-5">
          <h3 className="h3-semibold primary-text-gradient  ">
            {result.answers.length} Answers
          </h3>
          <Filter filters={AnswerFilters} otherClasses="mr-2"  />
        </div>
        {ansResult.map((answer: any) => (
          <AnswerCard
            _id={answer._id}
            key={answer._id}
            content={answer.content}
            upvotes={answer.upvotes.length}
            downvotes={answer.downvotes.length}
            author={answer.author}
            createdAt={answer.createdAt}
          />
        ))}
      </div>
      <Answer questionId={params.id} userId={userResult._id} />
    </>
  );
};

export default page;
