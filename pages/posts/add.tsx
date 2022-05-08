import { useState } from "react";
import { Button, Group, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { NextPage } from "next";
import { useAuth } from "../../context/auth";
import MainLayout from "../../layouts/MainLayout";
import Editor from "../../components/Editor";
import { IPostPayload } from "../../models/PostModel";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import DropzoneChildren from "../../components/DropzoneChildren";
import {
  IDropzoneFile,
  IDropzoneRejectedFile,
} from "../../models/DropzoneModel";
import { showNotification } from "@mantine/notifications";

const PostAdd: NextPage = () => {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<IPostPayload>({
    initialValues: {
      title: "",
      description: "",
      content: "",
      image_url: null,
      user: user ? user.email : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log("values", values);
  };

  const isValid =
    form.values.content === "<p><br></p>" ||
    form.values.title.length === 0 ||
    form.values.description.length === 0 ||
    form.values.image_url === null;

  const handleDropzone = async (files: IDropzoneFile[]) => {
    const file = files[0];
    setPreview(URL.createObjectURL(file));
    const fd = new FormData();
    fd.append("file", file);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((res) => {
        form.setFieldValue("image_url", res.image_url);
        setPreview(res.image_url);
      })
      .catch((error) => {
        showNotification({
          title: "Upload failed",
          color: "red",
          message: error.response.message || "Error during upload image",
        });
      });
  };

  const handleReejctedFiles = (files: IDropzoneRejectedFile[]) => {
    showNotification({
      title: "File rejected",
      color: "red",
      message: "Only image files allowed!",
    });
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
        <Dropzone
          mt={16}
          onDrop={handleDropzone}
          onReject={handleReejctedFiles}
          maxSize={5 * 1024 ** 2}
          multiple={false}
          accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif]}
          styles={{
            root: { height: "200px" },
          }}
        >
          {(status) => DropzoneChildren(status, theme, preview)}
        </Dropzone>
        <Group position="right" mt="md">
          <Button type="submit" disabled={isValid}>
            Submit
          </Button>
        </Group>
        <style jsx global>{`
          .mantine-Dropzone-root > .mantine-Group-root {
            height: 100% !important;
            min-height: unset !important;
          }
        `}</style>
      </form>
    </MainLayout>
  );
};

export default PostAdd;
