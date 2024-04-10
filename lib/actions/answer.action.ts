'use server'
import Answer from "@/database/answer.model";
import { connectToDb } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
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

export async function getAllAnswersById(params: any) {
  try {
    connectToDb();
    const { questionId } = params;
    const answers = await Answer.find({ question: questionId })
      .populate("author")
      .sort({ createdAt: -1 })
      return answers;
  } catch (error: any) {
    console.log(error);
    throw error;
}
}