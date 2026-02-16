import { create } from "zustand"
import { cloneObject } from "../utils/clone_object"
import { createPost, deletePost, getPosts, updatePost, type IPostCreate } from "../use-cases/post-case"
import { AxiosError } from "axios"

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
    _username: string | "",
    getUsername: () => string,
    setUsername: (username: string) => void,
    getPosts: () => IPostStore[],
    fetchPosts: () => Promise<void>,
    createPost: (postParams: IPostCreate) => Promise<void | null>,
    updateItemPost: (idPost: number, postPamas: Pick<IPostCreate, "title" | "content">) => Promise<void>,
    deletePost: (idPost: number) => Promise<void | null>,
    isProcessing: boolean,
}

const usePostStore = create<usePostProps>((set, get) => ({
    _posts: [],
    isProcessing: false,
    _username: "",

    getPosts() {
        const { _posts } = get()
        return cloneObject(_posts)
    },
    getUsername() {
        const { _username } = get()
        return cloneObject(_username)
    },
    setUsername(username: string) {
        set({
            _username: username,
        })
    },

    createPost: async (postParams: IPostCreate) => {
        const {_username} = get()
        if (!postParams) {
            return null
        }
        set({
            isProcessing: true,
        })
        await createPost({
            ...postParams,
            username: _username,
        })
        await get().fetchPosts()
        set({
            isProcessing: false,
        })
    },

    deletePost: async (idPost: number,) => {
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
            const { message } = error as AxiosError
            console.error(message)
        }

    },

    updateItemPost: async (idPost: number, postParams: Pick<IPostCreate, "title" | "content">) => {
        set({
            isProcessing: true,
        })
        try {
            await updatePost(idPost, postParams)
            await get().fetchPosts()

            set({
                isProcessing: false,
            })

        } catch (error) {
            set({
                isProcessing: false,
            })
            const { message } = error as AxiosError
            console.error(message)
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