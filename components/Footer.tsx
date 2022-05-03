import Link from "next/link";
import React from "react";
import { createStyles, Container, Group, Anchor } from "@mantine/core";
import { IFooterLink } from "../models/FooterModel";

const links: IFooterLink[] = [
  {
    name: "Hartaithan.",
    path: "https://hartaithan.github.io/",
    isExternal: true,
  },
];

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  inner: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },
  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer: React.FC = () => {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link key={link.name} href={link.path} passHref>
      <Anchor<"a">
        color="dimmed"
        size="sm"
        target={link.isExternal ? "_blank" : "_self"}
      >
        {link.name}
      </Anchor>
    </Link>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </footer>
  );
};

export default Footer;
