'use server'

import { connectToDb } from "../mongoose";
import { SearchParams } from "./shared.types";

const searchingTypes =['question','answer','user','tag']
export async function globalSearch(params:SearchParams){
    try {
        await connectToDb()
        const {query,type} = params
        const regexQuery = {$regex:query,$options:'i'}
        let results =[]
        const modelsAndTypes=[
            {model:'Question',type:'question', searchField:'title'},
            {model:'Answer',type:'answer',searchField:'name'},
            {model:'Tag',type:'tag',searchField:'tag'},
            {model:'User',type:'name',searchField:'user'}
        ]
        const typeLower = type?.toLocaleLowerCase()
        if(!typeLower || searchingTypes.includes(typeLower)){

        }
        else{
             
        }

    } catch (error) {
        console.log(error)
        throw error
        
    }
}