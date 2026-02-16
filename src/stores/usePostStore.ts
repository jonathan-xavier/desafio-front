import { create } from "zustand"
import { cloneObject } from "../utils/clone_object"
import { createPost, deletePost, getPosts, type IPostCreate } from "../use-cases/post-case"

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
    createPost: (postParams: IPostCreate) => Promise<void | null>,
    deletePost: (idPost: number) => Promise<void | null>,
    isProcessing: boolean,
}

const usePostStore = create<usePostProps>((set, get) => ({
    _posts: [],
    isProcessing: false,

    getPosts() {
        const { _posts } = get()
        return cloneObject(_posts)
    },

    createPost: async (postParams: IPostCreate) => {
        if (!postParams) {
            return null
        }
        set({
            isProcessing: true,
        })
        await createPost({
            ...postParams,
            username: "jhon",
        })
        await get().fetchPosts()
        set({
            isProcessing: false,
        })
    },

    deletePost: async (idPost: number) => {
        if (!idPost) {
            return null
        }
        set({
            isProcessing: true,
        })
        try {
            const isDeleted = await deletePost(idPost)
            if (isDeleted) {
                get().fetchPosts()
            }
            set({
                isProcessing: false,
            })
        } catch (error) {
            set({
                isProcessing: false,
            })
            console.error(error)
        }

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