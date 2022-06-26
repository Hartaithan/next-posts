import { Card, createStyles, LoadingOverlay, Text, Title } from "@mantine/core";
import { User } from "@supabase/supabase-js";
import { FC } from "react";
import { ICommentItem } from "../models/CommentModel";
import CommentItem from "./CommentItem";

interface ICommentsSectionProps {
  comments: ICommentItem[];
  isLoading: boolean;
  post_id: string | string[] | undefined;
  user: User | null;
  loadComments: () => void;
}

const useStyles = createStyles((theme) => ({
  title: {
    display: "flex",
  },
}));

const CommentsSection: FC<ICommentsSectionProps> = (props) => {
  const { comments, isLoading, post_id, user, loadComments } = props;
  const { classes } = useStyles();
  return (
    <Card shadow="sm" p="lg" mt={20} radius={20}>
      <LoadingOverlay visible={isLoading} />
      <Title className={classes.title} order={4} mb={12}>
        Comments&nbsp;<Text color="dimmed">({comments.length})</Text>
      </Title>
      {comments.length === 0 && (
        <Text color="dimmed">Comments have not yet been added</Text>
      )}
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            post_id={post_id}
            user={user}
            loadComments={loadComments}
          />
        ))}
    </Card>
  );
};

export default CommentsSection;
