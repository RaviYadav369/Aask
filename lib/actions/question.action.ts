"use server";

import Question from "@/database/question.model";
import { connectToDb } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
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
export async function getAllQuestionsById(params: GetQuestionByIdParams) {
  try {
    connectToDb();
    const { questionId } = params;

    const questions = await Question.findById(questionId)
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return questions;
  } catch (error: any) {
    console.log(error);
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    connectToDb();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    })

    if (!question) {
      throw new Error("Question not found");
    }
    revalidatePath(path);
  } catch (error: any) {
    console.log(error)
    throw error
  }
}

export async function downvoteQuestion (params:QuestionVoteParams){
  try {
    connectToDb();
    const { questionId, userId, hasupVoted, hasdownVoted, path } = params;

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
    const question = await Question.findByIdAndUpdate(questionId, updateQuery, {
      new: true,
    })

    if (!question) {
      throw new Error("Question not found");
    }
    revalidatePath(path);
  } catch (error: any) {
    console.log(error)
    throw error
  }
}
