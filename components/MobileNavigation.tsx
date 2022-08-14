import { FC } from "react";
import { Container, createStyles } from "@mantine/core";
import Link from "next/link";
import { navigation } from "../models/HeaderModel";
import { useRouter } from "next/router";

const NAVIGATION_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  navigation: {
    position: "fixed",
    bottom: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: NAVIGATION_HEIGHT,
    width: "100%",
    background: theme.colors.dark[7],
    borderTop: `1px solid ${theme.colors.dark[5]}`,
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

const MobileNavigation: FC = () => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const items = navigation.map((link) => (
    <Link key={link.name} href={link.path}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: router.pathname === link.path,
        })}
      >
        {link.name}
      </a>
    </Link>
  ));

  return <Container className={classes.navigation}>{items}</Container>;
};

export default MobileNavigation;
