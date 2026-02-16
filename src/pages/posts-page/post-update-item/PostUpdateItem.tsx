import { Modal, Form, Input, Button, Flex } from "antd"
import { useMount } from "../../../utils/use-mount"

type EditPostModalProps = {
  open: boolean
  onClose: () => void
  onSave: (values: { title: string; content: string }) => void
  initialValues?: {
    title?: string
    content?: string
  }
}

const PostUpdateItem: React.FC<EditPostModalProps> = ({
    onClose,
    open,
    onSave,
    initialValues
}) => {
  const [form] = Form.useForm()

  useMount(async () => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, !!initialValues)

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
    >
      <h2 style={{ marginBottom: 24 }}>Edit item</h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onSave}
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
          <Input.TextArea
            placeholder="Content here"
            rows={4}
          />
        </Form.Item>

        <Flex justify="end" gap={12} style={{ marginTop: 24 }}>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#4CAF50" }}
          >
            Save
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}


export { PostUpdateItem }