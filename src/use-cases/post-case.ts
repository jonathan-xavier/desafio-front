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
const getPosts = async () => {
    return httpClient.get<IPostCase>('https://dev.codeleap.co.uk/careers/')
}


export { getPosts }