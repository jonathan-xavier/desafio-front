import { Layout, Card, Typography, Form, Input, Button, Flex, Space, type FormProps } from "antd"
import { PostItemPage } from "./post-item/PostItemPage"
import { useMount } from "../../utils/use-mount"
import { usePostStore } from "../../stores/usePostStore"
import { formatTimeAgo } from "../../utils/formatTime"
import { FileOutlined } from "@ant-design/icons"
import colors from "../../ui/colors"
import { useNavigate } from "react-router-dom"

const PostsPage: React.FC = () => {
    const { fetchPosts } = usePostStore.getState()
    const posts = usePostStore().getPosts()
    const username = usePostStore().getUsername()
    const { isProcessing } = usePostStore()
    const { createPost: createPosts } = usePostStore()
    const { Header } = Layout
    const { Title } = Typography
    const { TextArea } = Input
    const [form] = Form.useForm()
    const title = Form.useWatch("title", form)
    const content = Form.useWatch("content", form)
    const navigate = useNavigate()

    type IFields = {
        title?: string,
        content?: string,
    }

    const handleSubmit: FormProps<IFields>['onFinish'] = async (values) => {
        if (!values) {
            return null
        }
        await createPosts(values)
        form.setFieldValue("title", "")
        form.setFieldValue("content", "")
    }

    useMount(async () => {
        if (posts && username !== "") {
            await fetchPosts()
        } else {
            navigate('/')
        }
    }, (!!posts))

    return (
        <Flex vertical gap={10} style={{
            height: "100vh",
            background: `${colors["white.background"]}`,
            width: '800px',
            margin: "0 auto",
            overflow: "hidden",
        }}>
            <Header
                style={{
                    background: `${colors["blue.default"]}`,
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
                            <Input placeholder="Hello world" disabled={isProcessing} />
                        </Form.Item>

                        <Form.Item
                            label="Content"
                            name="content"
                            rules={[{ required: true, message: "Content is required" }]}
                        >
                            <TextArea
                                rows={3}
                                placeholder="Content here"
                                disabled={isProcessing}
                            />
                        </Form.Item>
                        <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={!title || !content || isProcessing}
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

            <Flex vertical gap={".5rem"} style={{
                padding: "0px 16px",
                overflowY: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                flex: 1,
            }}>
                {posts.length ? posts.map(post => (
                    <PostItemPage title={post.title} content={post.content}
                        createdAt={formatTimeAgo(post.created_datetime)} username={post.username} key={post.id}
                        id={post.id} />
                )) : (
                    <>
                        <Flex vertical justify="center" align="center" style={{ paddingTop: "5rem" }}>
                            <FileOutlined style={{
                                fontSize: 48,
                                color: `${colors["grey.soft.2"]}`,
                                marginBottom: 16
                            }} />
                            <Typography.Title
                                level={4}
                                style={{ marginBottom: 8, color: `${colors["grey.middle"]}` }}
                            >
                                No posts yet!
                            </Typography.Title>

                            <Typography.Text style={{ color: `${colors["grey.soft"]}` }}>
                                Create your first post and start sharing your thoughts.
                            </Typography.Text>

                        </Flex>
                    </>
                )}
            </Flex>

        </Flex>
    )
}

export { PostsPage }