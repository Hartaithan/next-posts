import { Card, Image, Text, Group, createStyles } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IPostItemProps } from "../models/PostModel";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    cursor: "pointer",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },
  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs / 2,
  },
  action: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },
  footer: {
    marginTop: theme.spacing.md,
  },
}));

const PostItem: React.FC<IPostItemProps> = (props) => {
  const { id, image, title, description, author } = props.post;
  const { classes } = useStyles();

  return (
    <Link href={`/posts/${id}`} passHref>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section>
          <a>
            <Image src={image} height={180} alt="post preview" />
          </a>
        </Card.Section>
        <Text className={classes.title} weight={500} component="a">
          {title}
        </Text>
        <Text size="sm" color="dimmed" lineClamp={4}>
          {description}
        </Text>
        <Group position="apart" className={classes.footer}>
          <Text size="sm" inline>
            {author}
          </Text>
        </Group>
      </Card>
    </Link>
  );
};

export default PostItem;
