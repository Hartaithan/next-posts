import React from "react";
import { useRouter } from "next/router";
import { IHeaderLink } from "../models/HeaderModel";
import {
  createStyles,
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const navigation: IHeaderLink[] = [
  { name: "Home", path: "/" },
  { name: "Posts", path: "/posts" },
  { name: "Add post", path: "/posts/add" },
];

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
    marginBottom: 30,
  },
  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
    },
  },
}));

const Header: React.FC = () => {
  const router = useRouter();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes, cx } = useStyles();

  const items = navigation.map((link) => (
    <Link key={link.name} href={link.path}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: router.pathname === link.path,
        })}
        onClick={() => {
          toggleOpened(false);
        }}
      >
        {link.name}
      </a>
    </Link>
  ));

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <ThemeToggle />
        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  );
};

export default Header;
