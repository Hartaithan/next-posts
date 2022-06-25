import { Card, createStyles, LoadingOverlay, Text, Title } from "@mantine/core";
import { FC } from "react";
import { ICommentItem } from "../models/CommentModel";
import CommentItem from "./CommentItem";

interface ICommentsSectionProps {
  comments: ICommentItem[];
  isLoading: boolean;
}

const useStyles = createStyles((theme) => ({
  title: {
    display: "flex",
  },
}));

const CommentsSection: FC<ICommentsSectionProps> = (props) => {
  const { comments, isLoading } = props;
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
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </Card>
  );
};

export default CommentsSection;
