import {
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Menu,
  Text,
  Title,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { NextLink } from "@mantine/next";
import { showNotification } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Dots, Edit, Trash } from "tabler-icons-react";
import CommentInput from "../../components/CommentInput";
import CommentsSection from "../../components/CommentsSection";
import ImageFallback from "../../components/ImageFallback";
import Vote from "../../components/Vote";
import { fullDate } from "../../helpers/date";
import { checkResStatus } from "../../helpers/response";
import MainLayout from "../../layouts/MainLayout";
import { ICommentItem } from "../../models/CommentModel";
import { IPostItem, IPostResponse } from "../../models/PostModel";
import { IVoteItem } from "../../models/VoteModel";
import { supabase } from "../../utils/supabaseClient";

interface IPostPageProps {
  id: string | string[] | undefined;
  post: IPostItem;
  user: User | null;
  vote: IVoteItem | null;
}

export const getServerSideProps: GetServerSideProps<IPostPageProps> = async (
  context
) => {
  const id = context.params?.id;
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
    headers: context.req.headers as HeadersInit,
  });
  const { post, vote }: IPostResponse = await res.json();
  return {
    props: { id, post, user: user ? user : null, vote },
  };
};

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    cursor: "pointer",
    transition: "transform 0.3s ease-in",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  section: {
    height: "300px",
    width: "calc(100% + 40px)",
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
  },
  title: {
    height: "100%",
    position: "relative",
    padding: "20px",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: "0",
    color: `${theme.white} !important`,
    "*": {
      textShadow: "0px 3px 6px #000000",
    },
  },
  post: {
    marginTop: "20px",
  },
  badges: {
    width: "100%",
  },
  content: {
    width: "100%",
    " > div": {
      padding: "0 !important",
      position: "relative",
    },
  },
  menu: {
    position: "absolute",
    top: "20px",
    right: "20px",
  },
  button: {
    padding: "5px",
    background: "transparent !important",
  },
}));

const Post: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { id, post, user, vote } = props;
  const router = useRouter();
  const modals = useModals();
  const { classes, cx } = useStyles();
  const {
    id: post_id,
    created_at,
    updated_at,
    image_url,
    title,
    description,
    content,
    comments: resComments,
    votes,
  } = post;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<ICommentItem[]>(resComments);

  const confirmDeleteModal = () =>
    modals.openConfirmModal({
      title: "Confirm deletion",
      children: (
        <Text size="sm">Are you sure you want to delete this post?</Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      centered: true,
      onConfirm: () => deletePost(),
    });

  const deletePost = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "DELETE",
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

  const loadComments = async () => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setComments(res.comments);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MainLayout title={title}>
      <Card shadow="sm" p="lg" radius={20}>
        <Card.Section className={classes.section}>
          <ImageFallback
            src={image_url}
            layout="fill"
            objectFit="cover"
            alt="post image"
          />
          <Group className={classes.title}>
            <Title order={1}>{title ? title : "Title not found"}</Title>
            <Text size="xl">
              {description ? description : "Description not found"}
            </Text>
            {post.user === user?.email && (
              <Menu
                className={classes.menu}
                control={
                  <Button className={classes.button}>
                    <Dots size={28} />
                  </Button>
                }
              >
                <Menu.Item
                  icon={<Edit size={14} />}
                  component={NextLink}
                  href={`/posts/edit/${id}`}
                >
                  Edit post
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<Trash size={14} />}
                  onClick={confirmDeleteModal}
                >
                  Delete post
                </Menu.Item>
              </Menu>
            )}
            <Vote post_id={post_id} count={votes} vote={vote} />
          </Group>
        </Card.Section>
        <Group className={classes.post}>
          <Group className={classes.badges}>
            <Text weight={500}>
              Author:&nbsp;&nbsp;
              <Badge color="gray" variant="outline">
                {post.user ? post.user : "Unknown"}
              </Badge>
            </Text>
            <Text weight={500}>
              Created:&nbsp;&nbsp;
              <Badge color="gray" variant="outline">
                {fullDate(created_at)}
              </Badge>
            </Text>
            {updated_at && (
              <Text weight={500}>
                Updated:&nbsp;&nbsp;
                <Badge color="gray" variant="outline">
                  {fullDate(updated_at)}
                </Badge>
              </Text>
            )}
          </Group>
          <div className={cx(classes.content, "editor-content")}>
            <div
              className="view ql-editor"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Group>
      </Card>
      {user && (
        <CommentInput post_id={id} user={user} loadComments={loadComments} />
      )}
      <CommentsSection
        comments={comments}
        isLoading={isLoading}
        post_id={id}
        user={user}
        loadComments={loadComments}
      />
    </MainLayout>
  );
};

export default Post;
