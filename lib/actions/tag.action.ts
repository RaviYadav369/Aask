import Tag from "@/database/tag.model";
import { connectToDb } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

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
    const { searchQuery, filter } = params;
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
    const tags = await Tag.find(query).sort(sortOptions);
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
