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

const BASEURL_API = 'https://dev.codeleap.co.uk/careers/'
const getPosts = async () => {
    return httpClient.get<IPostCase>(BASEURL_API)
}

const createPost = async (postData: IPostCreate) => {
    return httpClient.post<IPostCreate>(BASEURL_API, {
        ...postData,
    })
}

const deletePost = async (idPost: number) => {
    const { status } = await httpClient.delete<number>(`${BASEURL_API}${idPost}/`)
    if (status === 204) {
        return true
    }
    return false
}

const updatePost = async (idPost: number, postPamas: Pick<IPostCreate, "title" | "content">) => {
    return httpClient.patch<Pick<IPostCreate, "title" | "content">>(`${BASEURL_API}${idPost}/`, {
        ...postPamas
    })
}


export { getPosts, createPost, deletePost, updatePost }