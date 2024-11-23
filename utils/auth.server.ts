import {Authenticator,AuthorizationError} from "remix-auth";
import { sessionStorage } from "./session.server";
import {FormStrategy} from "remix-auth-form";
import {prisma} from './prisma.server';
import bcrypt from 'bcryptjs';

const sessionSecret = process.env.SESSION_SECRET;

if(!sessionSecret){
    throw new Error("Session secret must be set");
}

const authenticator = new Authenticator<any>(sessionStorage);

const formStrategy = new FormStrategy(async ({form}) => {
    const email = form.get("email") as string
    const password = form.get("password") as string

    const user = await prisma.user.findUnique({
        where:{email}
    })

    if(!user){
        console.log("you entered a wrong email")
        throw new AuthorizationError()
    }

    const passwordMatch = bcrypt.compare(password,user.password as string)

    if(!passwordMatch){
        throw new AuthorizationError()
    }

    return user

})

const loginStrategy = new FormStrategy(async({form}) => {
    const email = form.get("email") as string
    if(!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" )){
        console.log("Email is Invalid")
        throw new AuthorizationError()
    }

    const user = await prisma.user.findUnique({
        where:{email}
    })

    if(!user){
        console.log("user Doesnt Exist")
        throw new AuthorizationError()
    }

    console.log(user)

    const password = form.get("password") as string
    const passwordMatch = bcrypt.compare(password,user.password as string)

    if(!passwordMatch){
        console.log("Incorrect password")
        throw new AuthorizationError()
    }

    return user
})

authenticator.use(formStrategy,"form")
authenticator.use(loginStrategy,"loginStrategy")

export {authenticator}