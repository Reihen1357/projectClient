import React from "react";

export interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    surname: string;
    age: number;
    image: string;
    city: string;
    university: string;
}

export type IRegistrationRequest = Omit<IUser, 'id'>

export interface IUserInfo extends IUser{
    isPersonalPage: boolean;
}

export interface ITokenResponse {
    token: string;
}

export interface IPost {
    id: number;
    title: string;
    content: string;
    image?: string;
    likes: number;
    creationDate: string;
    userId: number;
}