import { Card, Typography, Space, Flex } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import colors from "../../../ui/colors"
import { usePostStore } from "../../../stores/usePostStore"
import { Modal, message } from "antd"
import { PostUpdateItem } from "../post-update-item/PostUpdateItem"
import { useState } from "react"
import type { IPostCreate } from "../../../use-cases/post-case"
const { Text, Title } = Typography

interface PostCardProps {
    id?: number,
    title: string
    username: string
    content: string
    createdAt: string
}

const PostItemPage: React.FC<PostCardProps> = ({
    id,
    title,
    username,
    content,
    createdAt,
}) => {
    const { deletePost } = usePostStore()
    const [isOpen, setIsOpen] = useState(false)
    const { updateItemPost } = usePostStore()
    const initialValues: Pick<IPostCreate, "title" | "content"> = {
        title,
        content,
    }
    const showDeleteConfirm = () => {
        Modal.confirm({
            title: "Are you sure you want to delete this item?",
            okText: "Delete",
            cancelText: "Cancel",
            okType: "danger",
            centered: true,
            async onOk() {
                await deleteItemPost()
                message.success({
                    content: "Post deleted successfully!",
                    duration: 2,
                })
            }
        })
    }

    const updateItem = async (paramsUpdate: Pick<IPostCreate, "title" | "content">) => {
        if (id) {
            await updateItemPost(id, {
                ...paramsUpdate,
            })
            message.success({
                content: "Post updated successfully!",
                duration: 2,
            })
            setIsOpen(false)
        }
    }

    const deleteItemPost = async () => {
        if (id) {
            await deletePost(id)
        }
    }

    return (
        <Card
            style={{
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
                    <EditOutlined style={{ fontSize: 18, cursor: "pointer" }} onClick={() => setIsOpen(true)} />
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

            {!!isOpen && (
                <PostUpdateItem
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    onSave={async (values) => {
                        await updateItem(values)
                    }}
                    initialValues={initialValues}
                />
            )}
        </Card>
    )
}

export { PostItemPage }
