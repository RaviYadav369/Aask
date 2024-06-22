import Tag from "@/database/tag.model";
import { connectToDb } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";

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
    const tags = await Tag.find({});
    return { tags };
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
