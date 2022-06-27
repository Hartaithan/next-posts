import { FC, useState } from "react";
import {
  Button,
  Card,
  Group,
  LoadingOverlay,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { User } from "@supabase/supabase-js";
import { showNotification } from "@mantine/notifications";
import { checkResStatus } from "../helpers/response";

interface ICommentInputProps {
  post_id: string | string[] | undefined;
  user: User | null;
  loadComments: () => void;
}

const CommentInput: FC<ICommentInputProps> = (props) => {
  const { post_id, user, loadComments } = props;
  const [isLoading, setLoading] = useState<boolean>(false);
  const form = useForm({
    initialValues: {
      post_id,
      content: "",
      user: user?.email || "Not found",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
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
        form.setFieldValue("content", "");
        loadComments();
      })
      .catch((error) => {
        showNotification({
          title: "Error",
          color: "red",
          message: error?.message || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card shadow="sm" p="lg" mt={20} radius={20}>
      <LoadingOverlay visible={isLoading} />
      {user?.email && (
        <Group spacing="xs">
          <Text>Comment as</Text>
          <Text weight="bold">{user.email}</Text>
        </Group>
      )}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          mt="sm"
          placeholder="Your comment"
          value={form.values.content}
          onChange={(event) =>
            form.setFieldValue("content", event.currentTarget.value)
          }
          minRows={4}
          required
          disabled={isLoading}
        />
        <Group position="right">
          <Button type="submit" mt="md" disabled={isLoading}>
            Submit
          </Button>
        </Group>
      </form>
    </Card>
  );
};

export default CommentInput;
