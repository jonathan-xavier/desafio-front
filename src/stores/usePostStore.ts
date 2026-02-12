import { create } from "zustand"
import { cloneObject } from "../utils/clone_object"
import { getPosts } from "../use-cases/post-case"

type IPostStore = {
    id: number,
    username: string,
    created_datetime: string,
    title: string,
    content: string,
    author_ip: string,
}

type usePostProps = {
    _posts: IPostStore[],
    getPosts: () => IPostStore[],
    fetchPosts: () => Promise<void>,
    isProcessing: boolean,
}

const usePostStore = create<usePostProps>((set, get) => ({
    _posts: [],
    isProcessing: false,

    getPosts() {
        const { _posts } = get()
        return cloneObject(_posts)
    },

    fetchPosts: async () => {
        set({
            isProcessing: true,
        })

        const { data } = await getPosts()
        set({
            _posts: data.results,
            isProcessing: false,
        })
    },

}))

export { usePostStore }