import { Card, Typography, Space, Flex } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import colors from "../../../ui/colors"
import { usePostStore } from "../../../stores/usePostStore"
import { Modal } from "antd"
const { Text, Title } = Typography

interface PostCardProps {
    id?: number,
    title: string
    username: string
    content: string
    createdAt: string
}

export const PostItemPage = ({
    id,
    title,
    username,
    content,
    createdAt,
}: PostCardProps) => {
    const { deletePost } = usePostStore()
    const showDeleteConfirm = () => {
        Modal.confirm({
            title: "Are you sure you want to delete this item?",
            okText: "Delete",
            cancelText: "Cancel",
            okType: "danger",
            centered: true,
            onOk() {
                deleteItemPost()
            }
        })
    }

    const deleteItemPost = async () => {
        console.log("chegou aqui")
        if (id) {
            await deletePost(id)
        }
    }

    const editPost = () => {
        console.log("edit post")
    }
    return (
        <Card
            style={{
                // width: 800,
                borderRadius: 12,
                width: "100%",
                padding: 0
            }}
            styles={{
                body: { padding: 0 }
            }}
        >
            <Flex justify="space-between" align="center"
                style={{
                    borderRadius: "12px 12px 0 0",
                    background: `${colors["blue.default"]}`,
                    color: "white",
                    padding: "16px 20px",
                }}
            >
                <Title level={4} style={{ color: "white", margin: 0 }}>
                    {title}
                </Title>

                <Space size={16}>
                    <DeleteOutlined style={{ fontSize: 18, cursor: "pointer" }} onClick={showDeleteConfirm} />
                    <EditOutlined style={{ fontSize: 18, cursor: "pointer" }} onClick={editPost} />
                </Space>
            </Flex>
            <Flex vertical style={{ padding: 20 }}>
                <Flex justify="space-between"
                    style={{
                        marginBottom: 12,
                    }}
                >
                    <Text strong>@{username}</Text>
                    <Text type="secondary">{createdAt}</Text>
                </Flex>
                <Text style={{ whiteSpace: "pre-line" }}>
                    {content}
                </Text>
            </Flex>
        </Card>
    )
}
