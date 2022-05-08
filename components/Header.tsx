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
  Button,
  Skeleton,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/auth";
import { showNotification } from "@mantine/notifications";

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
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
  },
  links: {
    marginRight: "auto",
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  auth: {
    marginRight: "12px",
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
  const { isAuth, isLoading, logout } = useAuth();
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

  const handleLogout = () => {
    logout()
      .then(() => {
        showNotification({
          title: "Success",
          color: "green",
          message: "Logout successful",
        });
      })
      .catch(({ error }) => {
        showNotification({
          title: "Error",
          color: "red",
          message: error.error_description || error.message || "Log out error",
        });
      });
  };

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        {isAuth ? (
          <Button
            className={classes.auth}
            onClick={() => handleLogout()}
            disabled={isLoading}
          >
            {isLoading ? (
              <Skeleton height={8} radius="xl" width="50px" />
            ) : (
              "Log out"
            )}
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button className={classes.auth} disabled={isLoading}>
              {isLoading ? (
                <Skeleton height={8} radius="xl" width="50px" />
              ) : (
                "Log in"
              )}
            </Button>
          </Link>
        )}
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
