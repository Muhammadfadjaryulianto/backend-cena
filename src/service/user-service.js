import {validate} from "../validation/validation.js";
import {getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countEmail = await prismaClient.user.count({
        where: {
            email: user.email,
        }
    });

    const countUsername = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if(countEmail === 1){
        throw new ResponseError(400, "Email alredy exists");
    }else if(countUsername === 1){
        throw new ResponseError(400, "Username alredy exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    user.id = uuid();

    return prismaClient.user.create({
        data: user,
        select: {
            id: true,
            email: true,
            username: true,
            name: true
        }
    });
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    let user = null;

    if(loginRequest.email){
        user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            },
            select: {
                id: true,
                email: true,
                password: true,
                token:true
            }
        });
    }else if(loginRequest.username){
        user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            },
            select: {
                id: true,
                username: true,
                password: true,
                token:true
            }
        });
    }

    if(!user){
        throw new ResponseError(401, "Username or Password Wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if(!isPasswordValid){
        throw new ResponseError(401, "Username or Password Wrong");
    }

    const token = uuid().toString()

    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            id: user.id
        },
        select: {
            token: true
        }
    });
}

const get = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username 
        },
        select: {
            id: true,
            username: true,
            email: true,
            name: true
        }
    });

    if(!user){
        throw new ResponseError(404, "user is not found");
    }

    return user;
}

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDatabase = await prismaClient.user.count({
        where: {
            id: user.id
        }
    });

    if(totalUserInDatabase !== 1){
        throw new ResponseError(404, "user is not found");
    }

    const data = {};
    if(user.username){
        data.username = user.username;
    }
    if(user.email){
        data.email = user.email;
    }

    if(user.name){
        data.name = user.name;
    }

    if(user.password){
        data.password = await bcrypt.hash(user.password, 10)
    }

    return prismaClient.user.update({
        where: {
            id: user.id 
        },
        data: data,
        select: {
            username: true,
            email: true,
            name: true
        }
    })
}

const logout = async (username) => {
    username = validate(getUserValidation, username);

    const user = await prismaClient.user.findUnique({
        where: {
            username: username 
        }
    });

    if(!user){
        throw new ResponseError(404, "user not found");
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true
        }
    })
}

export default {
    register,
    login,
    get,
    update,
    logout
}