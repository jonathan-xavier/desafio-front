import { httpClient } from "../http-client/http-client"

export type IPostArr = {
    id: number,
    username: string,
    created_datetime: string,
    title: string,
    content: string,
    author_ip: string,
}

export type IPostCase = {
    count: number,
    next: number | null,
    previous: number | null,
    results: IPostArr[]
}

export type IPostCreate = {
    username?: string,
    title?: string,
    content?: string,
}
const getPosts = async () => {
    return httpClient.get<IPostCase>('https://dev.codeleap.co.uk/careers/')
}

const createPost = async (postData: IPostCreate) => {
    return httpClient.post<IPostCreate>('https://dev.codeleap.co.uk/careers/', {
        ...postData,
    })
}

const deletePost = async (idPost: number) => {
    const { status } = await httpClient.delete<number>(`https://dev.codeleap.co.uk/careers/${idPost}/`)
    if (status === 204) {
        return true
    }
    return false
}


export { getPosts, createPost, deletePost }