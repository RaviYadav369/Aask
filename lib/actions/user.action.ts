"use server";

import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import { connectToDb } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

export async function getUserById(params: any) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb();
    const user = await User.create(userData);
    return user;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDb();
    const { clerkId, updateData, path } = params;
    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return user;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDb();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("User not found");
    }
    console.log(user);

    // const userQuestionIds = await Question.find({author:user._id}).distinct('_id');
    // await Question.deleteMany({author:user._id});
    // const deletedUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDb();
    const { page = 1, pageSize = 20, filter, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof User> = {};
    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }
    let sortOptions = {};
    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;

      default:
        break;
    }
    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("User not found");
    }
    const totalQuestion = await Question.countDocuments({ author: user._id });
    const totalAnswer = await Answer.countDocuments({ author: user._id });
    return { user, totalQuestion, totalAnswer };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestionsById(params: GetUserStatsParams) {
  try {
    connectToDb();
    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
    .populate([{
      path: "tags",
      model: Tag, 
      select: "_id name"
    }])
    .populate({ path: "author", model: User, select: "_id clerkId name picture" })
    .skip(skipAmount)
    .limit(pageSize)
    .sort({  createdAt :-1, views: -1, upvotes: -1 })
      
    const isNext = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNext };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function getUserAnswersById(params: GetUserStatsParams) {
  try {
    connectToDb();
    const { userId, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
    .populate({ path: "author", model: User, select: "_id clerkId name picture" })
    .skip(skipAmount)
    .limit(pageSize)
    .sort({upvotes: -1 })

    const isNext = totalAnswers > skipAmount + userAnswers.length;
    
    return { totalAnswers, answers: userAnswers,isNext };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function toggleSavedQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDb();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDb();
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    let sortOptions = {};
    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answers":
        sortOptions = { answers: -1 };
        break;

      default:
        break;
    }
    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
      },

      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
console.log('get saved question',user)
    if (!user) {
      throw new Error("User is not Found");
    }
    const isNext = user.saved.length > pageSize;
    const savedQuetions = user?.saved;

    return { questions: savedQuetions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
