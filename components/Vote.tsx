import { createStyles, Text } from "@mantine/core";
import { FC } from "react";
import { CaretDown, CaretUp } from "tabler-icons-react";
import { IVoteItem } from "../models/VoteModel";

interface IVoteProps {
  post_id: number;
  count: number;
  vote: IVoteItem | null;
}

const useStyles = createStyles((theme) => ({
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
  upvote: {
    "&:hover": {
      fill: theme.colors.lime[9],
      stroke: theme.colors.lime[9],
      scale: "1.2",
    },
  },
  upvoteActive: {
    fill: theme.colors.lime[9],
    stroke: theme.colors.lime[9],
  },
  downvote: {
    "&:hover": {
      fill: theme.colors.orange[7],
      stroke: theme.colors.orange[7],
      scale: "1.2",
    },
  },
  downvoteActive: {
    fill: theme.colors.orange[7],
    stroke: theme.colors.orange[7],
  },
}));

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
          vote?.vote === "down" && classes.upvoteActive
        )}
        size={26}
      />
    </div>
  );
};

export default Vote;
