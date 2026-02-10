import { Card, Typography, Space, Flex } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import colors from "../../../ui/colors"

const { Text, Title } = Typography

interface PostCardProps {
  title: string
  username: string
  content: string
  createdAt: string
}

export const PostItemPage = ({
  title,
  username,
  content,
  createdAt,
}: PostCardProps) => {
  return (
    <Card
      style={{
        width: 800,
        borderRadius: 12,
        overflow: "auto",
        padding: 0
      }}
      styles={{
        body: {padding: 0}
      }}
    >

      <Flex justify="space-between" align="center"
        style={{
          background: `${colors["blue.default"]}`,
          color: "white",
          padding: "16px 20px",
        }}
      >
        <Title level={4} style={{ color: "white", margin: 0 }}>
          {title}
        </Title>

        <Space size={16}>
          <DeleteOutlined style={{ fontSize: 18, cursor: "pointer" }} />
          <EditOutlined style={{ fontSize: 18, cursor: "pointer" }} />
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
