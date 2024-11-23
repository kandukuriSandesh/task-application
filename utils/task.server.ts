import {prisma} from './prisma.server';

import { data } from '@remix-run/react';


import { categories, TaskData } from '../app/types/jobs';

export const getMytasks = async(userID:string) => {
    if(!userID) return data({error:"The USer doesnt have any tasks"})
    if(userID){
        const taskByID = prisma.user.findUnique({
            where:{
                id:userID,
            },
            include:{
                task:{
                    orderBy:{
                        createdAt:"desc"
                    }
                }
            }
        })
        return taskByID
    }
} 

export const createTask = async ({category, message,postedBy}:TaskData) => {
    const taskById = await prisma.task.create({
        data:{category,message,postedBy}
    })

    if(!taskById){
        return data({error:"Could not create a task"})
    }

    return data({
        message:"Task created Succesfully",
        success:"true",
        payload:taskById,
    })
}

export const deleteTask = async (id:string) => {
    const taskById = await prisma.task.delete({
    where:{id}
    })

    if(!taskById){
        return data({error:"Could not delete the task"})
    }

    return data({
        message:"Task deleted successfully",
        success:"true",
        payload:id
    })
}