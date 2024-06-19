import { getUserAnswersById } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import AnswerCard from "../card/AnswerCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null ;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswersById({ userId, page: 1 });

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
    </>
  );
};

export default AnswerTab;
