"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";
import { CreateUserParams,DeleteUserParams,GetAllUsersParams,GetUserByIdParams,UpdateUserParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findOne({clerkId: userId});
    return user;
  } catch (error:any) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDb()
    const user = await User.create(userData);
    return user;
  } catch (error:any) {
    console.log(error);
    throw error;
    
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDb()
    const {clerkId,updateData, path} = params;
    const user = await User.findOneAndUpdate({clerkId},updateData,{new:true});  
    revalidatePath(path);
    return user;
  } catch (error:any) {
    console.log(error);
    throw error;
    
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDb()
    const {clerkId} = params;
    const user = await User.findOneAndDelete({clerkId});  
    if(!user){
      throw new Error("User not found")
    }
    console.log(user);
    
    // const userQuestionIds = await Question.find({author:user._id}).distinct('_id');
    // await Question.deleteMany({author:user._id});
    // const deletedUser = await User.findByIdAndDelete(user._id);

    return deleteUser;
  } catch (error:any) {
    console.log(error);
    throw error;
    
  }
}

export async function getAllUsers(params:GetAllUsersParams) {
  try {
    connectToDb()
    // const {page = 1,pageSize = 20,filter, searchQuery} = params;
    const users = await User.find();
  return {users};
  } catch (error:any) {
    console.log(error);
    throw error;
    
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDb();
    const { userId } = params;
    const user = await User.findOne({clerkId:userId});
    if(!user){
      throw new Error("User not found")
    }
    const totalQuestion = await  Question.countDocuments({author:user._id});
    const totalAnswer = await Answer.countDocuments({author:user._id});
    return {user,totalQuestion,totalAnswer};
  }
  catch (error: any) {
    console.log(error);
    throw error;
  }
}