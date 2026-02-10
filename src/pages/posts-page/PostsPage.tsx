import { Layout, Card, Typography, Form, Input, Button, Flex, Space } from "antd"
import { PostItemPage } from "./post-item/PostItemPage"

const PostsPage: React.FC = () => {
    const { Header } = Layout
    const { Title } = Typography
    const { TextArea } = Input
    const [form] = Form.useForm()
    const title = Form.useWatch("title", form)
    const content = Form.useWatch("content", form)

    const handleSubmit = (values: string) => {
        console.log(values)
    }


    return (
        <Flex vertical gap={10} style={{
            minHeight: "100vh", background: "#f0f2f5",
            width: '800px'
        }}>
            <Header
                style={{
                    background: "#7695EC",
                    height: "80px"
                }}
            >
                <Flex justify="start" align="center">

                    <Typography.Title level={3} style={{
                        color: "white",
                        paddingLeft: "16px"
                    }}>CodeLeap Network</Typography.Title>
                </Flex>
            </Header>

            <Space.Compact
                style={{
                    padding: "30px 16px 0px 16px",
                }}
            >
                <Card
                    style={{
                        width: 800,
                        borderRadius: 12,
                        height: '334px'
                    }}

                >
                    <Title level={3} style={{ margin: "5px" }} >
                        What’s on your mind?
                    </Title>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: "Title is required" }]}
                        >
                            <Input placeholder="Hello world" />
                        </Form.Item>

                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[{ required: true, message: "Content is required" }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="Content here"
                            />
                        </Form.Item>

                        <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={!title || !content}
                                style={{
                                    borderRadius: 6,
                                    minWidth: 100,
                                }}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space.Compact>
            <Space.Compact style={{
                padding: "0px 16px",
            }}>
                <PostItemPage title="um post qualquer" content="dasofasdfasdasdfasdfasd"
                    createdAt="01/12/2025" username="Jonathan" key={93039} />
            </Space.Compact>
        </Flex>
    )
}

export { PostsPage }