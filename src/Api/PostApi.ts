import {authClient} from "./index";
import {IPost} from "../types/types";

export const getAll = async () => {
    const response = await authClient.get<IPost[]>('posts/getAll')
    return response.data
}

export const create = async (request: Partial<IPost>) => {
    const response = await authClient.post<IPost[]>('posts/create', request)
    return response.data
}

export const getByUserId = async (userId: number) => {
    const response = await authClient.get<IPost[]>(`posts/getByUserId?userId=${userId}`)
    return response.data
}

export const like = async (postId: number) => {
    const response = await authClient.patch(`posts/like?postId=${postId}`)
    return true
}