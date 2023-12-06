'use server'

import { connectToDb } from "../mongoose"

export async function createQuestion(params: any) {
    try {
        connectToDb()
        console.log(params);
         
        
    } catch (error) {
        
    }
    
}