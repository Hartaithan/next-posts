import { Container, createStyles } from "@mantine/core";
import React from "react";
import { IMainContainerProps } from "../models/MainLayoutModel";

const useStyles = createStyles(() => ({
  container: {
    flexGrow: 1,
    width: "100%",
  },
}));

const MainContainer: React.FC<IMainContainerProps> = ({ children }) => {
  const { classes } = useStyles();
  return <Container className={classes.container}>{children}</Container>;
};

export default MainContainer;
