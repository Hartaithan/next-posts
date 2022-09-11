import { createStyles, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";
import { FC, useState } from "react";
import { CaretDown, CaretUp } from "tabler-icons-react";
import { checkResStatus } from "../helpers/response";
import { IVoteItem } from "../models/VoteModel";

interface IVoteProps {
  post_id: number;
  count: number;
  vote: IVoteItem | null;
  user: User | null;
}

interface IVoteState {
  item: IVoteItem | null;
  count: number;
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
  const { post_id, count, vote: voteRes, user } = props;
  const { classes, cx } = useStyles();
  const [vote, setVote] = useState<IVoteState>({ item: voteRes, count });

  const handleUpvote = async () => {
    if (!user) {
      return;
    }
    const payload = {
      vote: "up",
      post_id,
      user: user.email,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return checkResStatus(res);
      })
      .then((res) => {
        setVote({ ...vote, item: res.vote, count: vote.count + 1 });
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

  const handleDownvote = async () => {
    if (!user) {
      return;
    }
    const payload = {
      vote: "down",
      post_id,
      user: user.email,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return checkResStatus(res);
      })
      .then((res) => {
        setVote({ ...vote, item: res.vote, count: vote.count - 1 });
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

  const handleUpdateVote = async () => {};

  return (
    <div className={classes.container}>
      <CaretUp
        className={cx(
          classes.icon,
          classes.upvote,
          vote.item && vote.item.vote === "up" && classes.upvoteActive
        )}
        onClick={() => handleUpvote()}
        size={26}
      />
      <Text weight={600} className={classes.count}>
        {vote.count}
      </Text>
      <CaretDown
        className={cx(
          classes.icon,
          classes.downvote,
          vote.item && vote.item.vote === "down" && classes.downvoteActive
        )}
        onClick={() => handleDownvote()}
        size={26}
      />
    </div>
  );
};

export default Vote;
