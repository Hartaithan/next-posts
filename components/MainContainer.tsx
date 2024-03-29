import { Container, createStyles } from "@mantine/core";
import { FC } from "react";
import { IMainContainerProps } from "../models/MainLayoutModel";

const useStyles = createStyles(() => ({
  container: {
    flexGrow: 1,
    width: "100%",
    scrollbarGutter: "stable both-edges",
    "@media (max-width: 576px)": {
      marginBottom: 75,
    },
  },
}));

const MainContainer: FC<IMainContainerProps> = ({ children }) => {
  const { classes } = useStyles();
  return <Container className={classes.container}>{children}</Container>;
};

export default MainContainer;
