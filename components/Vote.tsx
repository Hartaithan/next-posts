import { createStyles, Text } from "@mantine/core";
import { FC } from "react";
import { CaretDown, CaretUp } from "tabler-icons-react";
import { IVoteItem } from "../models/VoteModel";

interface IVoteProps {
  post_id: number;
  count: number;
  vote: IVoteItem | null;
}

const useStyles = createStyles((theme) => {
  const active = {
    upvote: {
      fill: theme.colors.lime[9],
      stroke: theme.colors.lime[9],
    },
    downvote: {
      fill: theme.colors.orange[7],
      stroke: theme.colors.orange[7],
    },
  };
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 16,
      right: 16,
      width: 100,
      height: 100,
      borderRadius: "24px",
      backgroundColor: "#ffffff25",
      backdropFilter: "blur(5px)",
    },
    count: {
      marginTop: 4,
      marginBottom: 4,
      fontSize: 18,
    },
    icon: {
      cursor: "pointer",
      fill: "white",
      stroke: "white",
      transition: "all 0.2s ease-in-out",
    },
    upvoteActive: active.upvote,
    upvote: {
      "&:hover": {
        ...active.upvote,
        scale: "1.2",
      },
    },
    downvoteActive: active.downvote,
    downvote: {
      "&:hover": {
        ...active.downvote,
        scale: "1.2",
      },
    },
  };
});

const Vote: FC<IVoteProps> = (props) => {
  const { post_id, count, vote } = props;
  const { classes, cx } = useStyles();
  return (
    <div className={classes.container}>
      <CaretUp
        className={cx(
          classes.icon,
          classes.upvote,
          vote?.vote === "up" && classes.upvoteActive
        )}
        size={26}
      />
      <Text weight={600} className={classes.count}>
        {count}
      </Text>
      <CaretDown
        className={cx(
          classes.icon,
          classes.downvote,
          vote?.vote === "down" && classes.downvoteActive
        )}
        size={26}
      />
    </div>
  );
};

export default Vote;
