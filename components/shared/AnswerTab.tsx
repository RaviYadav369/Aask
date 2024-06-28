import { getUserAnswersById } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../card/AnswerCard";
import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswersById({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.map((answer) => (
        <AnswerCard
          _id={answer._id}
          key={answer._id}
          clerkId={clerkId}
          content={answer.content}
          upvotes={answer.upvotes.length}
          downvotes={answer.downvotes.length}
          author={answer.author}
          createdAt={answer.createdAt}
        />
      ))}
      <div className="mt-10 ">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result!.isNext}
        />
      </div>
    </>
  );
};

export default AnswerTab;
