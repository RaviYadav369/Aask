'use server'
import Answer from "@/database/answer.model";
import { connectToDb } from "../mongoose";
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDb();
    const { content, author, question, path } = params;
    console.log(params);
    
    const newAnswer = await Answer.create({ content, author, question, path });
    
    await Question.findByIdAndUpdate(question,{ $push: { answers: newAnswer._id } });
    revalidatePath(path);
    return newAnswer;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswersById(params: GetAnswersParams) {
  try {
    connectToDb();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate("author",'_id clerkId name picture')
      .sort({ createdAt: -1 })
      return {answers};
  } catch (error: any) {
    console.log(error);
    throw error;
}
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDb();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else { 
      updateQuery = { $addToSet: { upvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    })

    if (!answer) {
      throw new Error("Question not found");
    }
    revalidatePath(path);
  } catch (error: any) {
    console.log(error)
    throw error
  }
}

export async function downvoteAnswer (params:AnswerVoteParams){
  try {
    connectToDb();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};
    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId }, 
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }
    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    })

    if (!answer) {
      throw new Error("Question not found");
    }
    revalidatePath(path);
  } catch (error: any) {
    console.log(error)
    throw error
  }
}

export async function deleteAnswer(params:DeleteAnswerParams ) {
  try {
    connectToDb();
    const { answerId, path } = params;
    const answer = await Answer.findById(answerId)
  if(!answer) throw new Error('Answer not found')

    await answer.deleteOne({_id: answerId})
    await Question.updateOne({ answers: answerId }, { $pull: { answers: answerId } })
    revalidatePath(path)

  }
  catch (error: any) {
    console.log(error)
    throw error
  }
}