import { Card, createStyles, Stack, Text, Tooltip } from "@mantine/core";
import React, { FC } from "react";
import { CalendarTime } from "tabler-icons-react";
import { ICommentItem } from "../models/CommentModel";
import { fullDate, onlyDate } from "../helpers/date";

interface ICommentItemProps {
  comment: ICommentItem;
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
  comment: {},
}));

const CommentItem: FC<ICommentItemProps> = (props) => {
  const { comment } = props;
  const { classes } = useStyles();
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
      </Stack>
      <Card className={classes.comment} p={6}>
        <Text>{comment.content}</Text>
      </Card>
    </div>
  );
};

export default CommentItem;
