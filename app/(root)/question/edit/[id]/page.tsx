import Question from "@/components/forms/Question";
import { getAllQuestionsById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
const page = async ({params}:ParamsProps) => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");
  const mongoUser = await getUserById({ userId });
  const questionData = await getAllQuestionsById({questionId:params.id})

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} type='edit' qusetionDetails={JSON.stringify(questionData)} />
      </div>
    </div>
  );
};

export default page;

