"use server";

import User from "@/database/user.model";
import { connectToDb } from "../mongoose";

export async function getUserById(params: any) {
  try {
    connectToDb();
    // const { userId } = params;
    const userId = '12345'
    const user = await User.findOne({clerkId: userId});
    return user;
  } catch (error:any) {
    console.log(error);
    throw error;
  }
}
