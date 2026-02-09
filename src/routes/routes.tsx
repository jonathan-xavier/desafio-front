import {v4 as uuidv4} from 'uuid'
import loadable from "@loadable/component"


const LoginPage = loadable(() => import('../pages/login-page/LoginPage'), {
    resolveComponent: (components) => components.LoginPage,
})

const PostPage = loadable(() => import('../pages/posts-page/PostsPage'), {
    resolveComponent: (components) => components.PostsPage,
})



export type IRouteItem = {
    key: string,
    path: string,
    fullPath: string,
    label: string,
    element: React.JSX.Element,
    children: IRouteItem[],
    visible?: boolean,
}

const loginPath = '/login'
const postPath = '/posts'

const routeList: IRouteItem[] = [
    {
        key: uuidv4(),
        path: loginPath,
        fullPath: loginPath,
        label: 'home',
        element: <LoginPage/>,
        visible: true,
        children: [],

    },
     {
        key: uuidv4(),
        path: postPath,
        fullPath: postPath,
        label: 'posts',
        element: <PostPage/>,
        visible: true,
        children: [],

    }

]

export {routeList}