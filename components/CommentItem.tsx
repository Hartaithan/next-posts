import {
  Button,
  Card,
  createStyles,
  Group,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { FC, useState } from "react";
import { CalendarTime, Edit } from "tabler-icons-react";
import { ICommentItem } from "../models/CommentModel";
import { fullDate, onlyDate } from "../helpers/date";
import { useForm } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";

interface ICommentItemProps {
  comment: ICommentItem;
  post_id: string | string[] | undefined;
  user: User | null;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    ":not(:last-child)": {
      marginBottom: 16,
    },
  },
  row: {
    flexDirection: "row",
  },
  tooltip: {
    display: "flex",
    alignItems: "center",
  },
  comment: {
    minHeight: "25px",
    display: "flex",
    alignItems: "center",
  },
  form: {
    minHeight: "25px",
  },
  textarea: {
    flex: 1,
    "*": {
      fontSize: "16px !important",
      lineHeight: 1.55,
      textDecoration: "none",
    },
  },
  edit: {
    flexDirection: "row",
    cursor: "pointer",
  },
}));

const CommentItem: FC<ICommentItemProps> = (props) => {
  const { comment, post_id, user } = props;
  const { classes } = useStyles();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      post_id,
      content: comment.content,
      user: comment.user || "Not found",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${comment.id}`, {
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
        setEdit(false);
      })
      .catch((error) => {
        showNotification({
          title: "Error",
          color: "red",
          message: error.response?.message || "Error updating comment",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.wrapper}>
      <Stack className={classes.row} align="center" spacing="md">
        <Text weight={500}>{comment.user}</Text>
        <Tooltip
          className={classes.tooltip}
          transition="pop"
          transitionDuration={300}
          transitionTimingFunction="ease"
          label={fullDate(comment.created_at)}
        >
          <CalendarTime size={16} strokeWidth={2} />
          <Text color="dimmed" size="sm" ml={4}>
            {onlyDate(comment.created_at)}
          </Text>
        </Tooltip>
        {user?.email === comment.user && (
          <Stack
            className={classes.edit}
            align="center"
            spacing={2}
            onClick={() => setEdit(!isEdit)}
          >
            <Edit size={16} strokeWidth={2} />
            <Text color="dimmed" size="sm" ml={4}>
              Edit
            </Text>
          </Stack>
        )}
      </Stack>
      {isEdit ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Textarea
            mt="md"
            className={classes.textarea}
            placeholder="Your comment"
            value={form.values.content}
            onChange={(event) =>
              form.setFieldValue("content", event.currentTarget.value)
            }
            required
            disabled={isLoading}
          />
          <Group position="right">
            <Button type="submit" mt="md" disabled={isLoading}>
              Submit
            </Button>
          </Group>
        </form>
      ) : (
        <Card className={classes.comment} p={0}>
          <Text>{form.values.content}</Text>
        </Card>
      )}
    </div>
  );
};

export default CommentItem;
