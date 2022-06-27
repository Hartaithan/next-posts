import { useState } from "react";
import { Button, Group, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
  Redirect,
} from "next";
import MainLayout from "../../layouts/MainLayout";
import Editor from "../../components/Editor";
import { IPostPayload } from "../../models/PostModel";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import DropzoneChildren from "../../components/DropzoneChildren";
import {
  IDropzoneFile,
  IDropzoneRejectedFile,
  IPreviewState,
} from "../../models/DropzoneModel";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { checkResStatus } from "../../helpers/response";

interface IPostAddPageProps {
  user: User | null;
}

export const getServerSideProps: GetServerSideProps<IPostAddPageProps> = async (
  context
) => {
  const { req } = context;
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {} as IPostAddPageProps,
      redirect: { destination: "/login?auth=false" },
    };
  }
  return {
    props: { user },
  };
};

const PostAdd: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { user } = props;
  const router = useRouter();
  const theme = useMantineTheme();
  const [preview, setPreview] = useState<IPreviewState>({
    isLoading: false,
    url: null,
  });
  const form = useForm<IPostPayload>({
    initialValues: {
      title: "",
      description: "",
      content: "",
      image_url: null,
      user: user ? user.email : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(values),
    })
      .then((res) => {
        return checkResStatus(res);
      })
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
          title: "Error",
          color: "red",
          message: error?.message || "Something went wrong!",
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
      .then((res) => {
        return checkResStatus(res);
      })
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
          title: "Error",
          color: "red",
          message: error?.message || "Something went wrong!",
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
