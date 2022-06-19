import { Button, Group, TextInput, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import DropzoneChildren from "../../../components/DropzoneChildren";
import Editor from "../../../components/Editor";
import MainLayout from "../../../layouts/MainLayout";
import {
  IDropzoneFile,
  IDropzoneRejectedFile,
  IPreviewState,
} from "../../../models/DropzoneModel";
import {
  IPostItem,
  IPostPayload,
  IPostResponse,
} from "../../../models/PostModel";
import { supabase } from "../../../utils/supabaseClient";

interface IEditPostPageProps {
  id: string | string[] | undefined;
  post: IPostItem;
  user: User | null;
}

export const getServerSideProps: GetServerSideProps<
  IEditPostPageProps
> = async (context) => {
  const id = context.params?.id;
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
  const { post }: IPostResponse = await res.json();
  if (!user) {
    return {
      props: {} as IEditPostPageProps,
      redirect: { destination: "/login?auth=false" },
    };
  }
  return {
    props: { id, post, user },
  };
};

const EditPost: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { id, post } = props;
  const router = useRouter();
  const theme = useMantineTheme();
  const [preview, setPreview] = useState<IPreviewState>({
    isLoading: false,
    url: post.image_url,
  });
  const form = useForm<IPostPayload>({
    initialValues: {
      title: post.title,
      description: post.description,
      content: post.content,
      image_url: post.image_url,
      user: post.user,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        showNotification({
          title: "Success",
          color: "green",
          message: res.message,
        });
        router.push("/posts");
      })
      .catch((error) => {
        showNotification({
          title: "Adding post failed",
          color: "red",
          message: error.response.message || "Error during upload image",
        });
      });
  };

  const isValid =
    form.values.content === "<p><br></p>" ||
    form.values.title.length === 0 ||
    form.values.description.length === 0 ||
    form.values.image_url === null ||
    preview.isLoading;

  const handleDropzone = async (files: IDropzoneFile[]) => {
    const file = files[0];
    setPreview({ isLoading: true, url: URL.createObjectURL(file) });
    const fd = new FormData();
    fd.append("file", file);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: "POST",
      body: fd,
    })
      .then((res) => res.json())
      .then((res) => {
        form.setFieldValue("image_url", res.image_url);
        setPreview({ isLoading: false, url: res.image_url });
        showNotification({
          title: "Success",
          color: "green",
          message: res.message,
        });
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
    <MainLayout title={"Edit post"}>
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

export default EditPost;
