import { ConfigProvider } from "antd"
import type { ReactProps } from "../interfaces/react-props"
import colors from "../ui/colors"

const Theme: React.FC<ReactProps> = ({children}) => {
    return (
        <ConfigProvider
            theme={{
                "token": {
                    "colorPrimary": colors["blue.default"],
                    "borderRadius": 4
                }
            }}
        >
            {children}
        </ConfigProvider>
    )
}

export {Theme}