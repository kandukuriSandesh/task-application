import  bcrypt  from 'bcryptjs';
import type {RegisterForm} from './types.server.ts'
import {prisma} from './prisma.server.js'

export const createUser = async (user:RegisterForm) => {
    const passwordHash = await bcrypt.hash(user.password,12)
    const newUser = await prisma.user.create({
        data:{
            email:user.email,
            password:passwordHash,
            name:user.name
        },
    })
    return {id:newUser.id,email:user.email,name:user.name}
}