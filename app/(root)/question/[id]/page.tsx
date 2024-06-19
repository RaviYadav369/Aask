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
import { getAllAnswersById } from "@/lib/actions/answer.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const page = async ({ params }: any) => {
  const result = await getAllQuestionsById({ questionId: params.id });
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  const ansResult = await getAllAnswersById({ questionId: params.id });
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
          <div className="flex justify-end">
            <Votes 
            type="question"
            itemId={JSON.stringify(result._id)}
            userId={JSON.stringify(mongoUser._id)}
            upvotes={result.upvotes.length}
            hasupVoted={result.upvotes.includes(mongoUser._id)}
            downvotes={result.downvotes.length}
            hasdownVoted={result.downvotes.includes(mongoUser._id)}
            hasSaved={mongoUser?.saved.includes(result._id)}

            />
          </div>
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
      
        <AllAnswers
          questionId={result._id}
          userId={mongoUser._id}
          totalAnswers={result.answers.length}
        />
      <Answer questionId={params.id} userId={mongoUser._id} />
    </>
  );
};

export default page;
