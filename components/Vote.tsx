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
  },
}));

const Vote: FC<IVoteProps> = (props) => {
  const { post_id, count } = props;
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <CaretUp fill="white" />
      <Text weight={600} className={classes.count}>
        {count}
      </Text>
      <CaretDown fill="white" />
    </div>
  );
};

export default Vote;
