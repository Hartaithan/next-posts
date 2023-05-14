import { FC, useMemo } from "react";
import { Container, createStyles } from "@mantine/core";
import { mobileNavigation } from "../models/HeaderModel";
import { useRouter } from "next/router";
import { Home, Plus, Article } from "tabler-icons-react";
import Link from "next/link";

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
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    borderTop:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.dark[7]}`
        : `1px solid ${theme.colors.gray[4]}`,
    paddingLeft: 40,
    paddingRight: 40,
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: "50% !important",
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },
  linkActive: {
    "&, &:hover": {
      color: theme.colors[theme.primaryColor][7],
    },
  },
  add: {
    backgroundColor: theme.colors[theme.primaryColor][7],
    position: "relative",
    bottom: 10,
  },
}));

const MobileNavigation: FC = () => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const items = mobileNavigation.map((link) => {
    const active = router.pathname === link.path;
    let Icon;
    switch (link.name) {
      case "Home":
        Icon = Home;
        break;
      case "Add post":
        Icon = Plus;
        break;
      case "Posts":
        Icon = Article;
        break;
      default:
        Icon = Home;
        break;
    }
    return (
      <Link key={link.name} href={link.path}>
        <a
          className={cx(
            classes.link,
            active && classes.linkActive,
            link.name === "Add post" && classes.add
          )}
        >
          <Icon size={24} strokeWidth={2} />
        </a>
      </Link>
    );
  });

  return <Container className={classes.navigation}>{items}</Container>;
};

export default MobileNavigation;
