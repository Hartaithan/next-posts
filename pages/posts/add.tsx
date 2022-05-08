import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { NextPage } from "next";
import { useAuth } from "../../context/auth";
import MainLayout from "../../layouts/MainLayout";
import Editor from "../../components/Editor";

const PostAdd: NextPage = () => {
  const { user } = useAuth();
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      content: "",
      image_url: "",
      user,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <MainLayout title={"Add post"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Title"
          placeholder="Enter title"
          {...form.getInputProps("title")}
        />
        <TextInput
          mt={12}
          required
          label="Description"
          placeholder="Enter description"
          {...form.getInputProps("description")}
        />
        <Editor
          value={form.values.content}
          onChange={(value) => form.setFieldValue("content", value)}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </MainLayout>
  );
};

export default PostAdd;
