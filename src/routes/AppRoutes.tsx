import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { routeList, type IRouteItem } from "./routes"

const AppRoutes: React.FC = () => {
    const [firstRoute] = routeList.filter(item => item.visible)

    const genRoutes = (routeList: IRouteItem[]) => {
        return routeList.map(routeItem => (
            <Route
                key={routeItem.key}
                path={routeItem.path}
                element={routeItem.element}
            >
                {genRoutes(routeItem.children)}
            </Route>
        ))
    }
    return (

        <BrowserRouter>
            <Routes>
                {!!firstRoute && (
                    <Route
                        path="/"
                        element={<Navigate to={firstRoute.path} />}
                    />
                )}
                {genRoutes(routeList)}
            </Routes>
        </BrowserRouter>
    )

}

export { AppRoutes }