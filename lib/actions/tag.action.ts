import Tag, { ITag } from "@/database/tag.model";
import { connectToDb } from "../mongoose";
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function GetTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return [
      { _id: "1", name: "tag1" },
      { _id: "2", name: "tag2" },
      { _id: "3", name: "tag3" },
    ];
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function GetAllTags(params: GetAllTagsParams) {
  try {
    connectToDb();
    const { searchQuery, filter,page=1,pageSize=10} = params;
    const skipAmount = (page-1)*pageSize
    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const tags = await Tag.find(query)
    .skip(skipAmount)
    .limit(pageSize)
    .sort(sortOptions);
    const totalTags = await Tag.countDocuments(query)
    const isNext = totalTags > skipAmount + tags.length
    return { tags,isNext };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
export async function GetPopularTags() {
  try {
    connectToDb();
    const tags = await Tag.aggregate([
      { $project: { name: 1, totalQuestions: { $size: "$questions" } } },
      { $sort: { totalQuestions: -1 } },
      { $limit: 5 },
    ]);
    return tags;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params:GetQuestionsByTagIdParams){
  try {
    connectToDb();
    const { tagId,searchQuery, page=1,pageSize=10 } = params;
    const skipAmount = (page-1)*pageSize
    const query: FilterQuery<typeof Tag> = {};
    const tagFilter : FilterQuery<ITag>={_id:tagId}
        if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model:Question,
      match:searchQuery ? {title:{$regex:new RegExp(searchQuery,"i")}} : {},
      options:{
        skip:skipAmount,
        limit:pageSize +1,
        sort:{createdAt:-1}
      },
      populate:[
        {path:'tags',model:Tag, select:"_id name"},
        {path:'author',model:User,select:"_id clerkId name picture"}
      ]
    })
    if(!tag){
      throw new Error("Tag Not Found")
    }
    const isNext = tag.questions.length > pageSize
    const questions = tag.questions

    return {tagTitle:tag.name,questions,isNext}
  }
  catch (error: any) {
    console.log(error);
    throw error;
  }
}
