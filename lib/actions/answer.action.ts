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
    
    const newAnswer = new Answer({ content, author, question, path });
    await Question.findByIdAndUpdate({ $push: { answers: newAnswer._id } });
    revalidatePath(path);
    return newAnswer;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
