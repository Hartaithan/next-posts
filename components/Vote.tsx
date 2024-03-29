import { createStyles, Loader, LoadingOverlay, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { User } from "@supabase/supabase-js";
import { FC, useState } from "react";
import { CaretDown, CaretUp } from "tabler-icons-react";
import { checkResStatus } from "../helpers/response";
import { IVoteItem, Vote } from "../models/VoteModel";

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
      overflow: "hidden",
      "@media (max-width: 576px)": {
        position: "relative",
        bottom: "inherit",
        right: "inherit",
        height: 32,
        width: "100%",
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "center",
      },
    },
    count: {
      marginTop: 4,
      marginBottom: 4,
      fontSize: 18,
      "@media (max-width: 576px)": {
        margin: 0,
        marginLeft: 12,
        marginRight: 12,
      },
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
  const [isLoading, setLoading] = useState<boolean>(false);
  const mobile = useMediaQuery("(max-width: 576px)");

  const unAuthError = () => {
    if (!user) {
      showNotification({
        title: "Error",
        color: "red",
        message: "You must be logged in to place votes on the post.",
      });
    }
  };

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
      })
      .finally(() => {
        setLoading(false);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateVote = async (action: Vote) => {
    if (!user || !vote.item) {
      return;
    }
    const payload = {
      vote: action,
      post_id,
      user: user.email,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes/${vote.item.id}`, {
      method: "PUT",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return checkResStatus(res);
      })
      .then((res) => {
        const updatedCount = action === "up" ? vote.count + 2 : vote.count - 2;
        setVote({ ...vote, item: res.vote, count: updatedCount });
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteVote = async (action: Vote) => {
    if (!user || !vote.item) {
      return;
    }
    const payload = {
      post_id,
      user: user.email,
    };
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes/${vote.item.id}`, {
      method: "DELETE",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return checkResStatus(res);
      })
      .then((res) => {
        const updatedCount = action === "up" ? vote.count - 1 : vote.count + 1;
        setVote({ ...vote, item: null, count: updatedCount });
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVote = async (action: Vote) => {
    if (!user) {
      unAuthError();
      return;
    }
    setLoading(true);
    switch (true) {
      case !vote.item && action === "up":
        handleUpvote();
        break;
      case !vote.item && action === "down":
        handleDownvote();
        break;
      case vote.item && vote.item.value === "up" && action === "up":
        handleDeleteVote("up");
        break;
      case vote.item && vote.item.value === "down" && action === "down":
        handleDeleteVote("down");
        break;
      case vote.item && vote.item.value === "down" && action === "up":
        handleUpdateVote("up");
        break;
      case vote.item && vote.item.value === "up" && action === "down":
        handleUpdateVote("down");
        break;
      default:
        setLoading(false);
        break;
    }
  };

  return (
    <div className={classes.container}>
      <LoadingOverlay
        visible={isLoading}
        loader={<Loader size={mobile ? "xs" : "md"} />}
      />
      <CaretUp
        className={cx(
          classes.icon,
          classes.upvote,
          vote.item && vote.item.value === "up" && classes.upvoteActive
        )}
        onClick={() => handleVote("up")}
        size={26}
      />
      <Text weight={600} className={classes.count}>
        {vote.count}
      </Text>
      <CaretDown
        className={cx(
          classes.icon,
          classes.downvote,
          vote.item && vote.item.value === "down" && classes.downvoteActive
        )}
        onClick={() => handleVote("down")}
        size={26}
      />
      <style jsx global>{`
        .mantine-LoadingOverlay-root > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Vote;
