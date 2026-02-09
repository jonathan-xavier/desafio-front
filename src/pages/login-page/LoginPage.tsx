import { Button, Card, Form, Input, Typography, type FormProps } from "antd"
import Title from "antd/es/typography/Title"
import { useNavigate } from "react-router-dom"

const styles: Record<string, React.CSSProperties> = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: 500,
        height: 205,
        borderRadius: 12,
    },
}

type ILogin = {
    username: string,
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const username = Form.useWatch("username", form)
    const allowUsername = ["jhon"]

    const onFinish: FormProps<ILogin>['onFinish'] = async (values) => {
        if(allowUsername.includes(values.username)){
            navigate('/posts')
        }
    }


    return (
        <div style={styles.container}>
            <Card style={styles.card} variant="outlined">
                <Title style={{ marginTop: 10 }} level={4} >Welcome to CodeLeap network!</Title>
                <Typography.Text>Please enter your username</Typography.Text>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ marginTop: 0 }}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Username is required" }]}
                    >
                        <Input placeholder="John doe" />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={!username}
                        >
                            ENTER
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export { LoginPage }