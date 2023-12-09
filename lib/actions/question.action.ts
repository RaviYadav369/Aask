"use server";

import Question from "@/database/question.model";
import { connectToDb } from "../mongoose";
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDb();

    const { title, content, author, tags, path } = params;
    //  console.log(title, content,author, tags)

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocument = [];
    for (const tag of tags) {
      const exitstingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocument.push(exitstingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllQuestions(params: GetQuestionsParams) {
  try {
    connectToDb();

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return { questions };
  } catch (error: any) {
    console.log(error);
  }
}
