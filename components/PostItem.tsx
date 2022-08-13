import { Card, Text, Group, createStyles } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { CalendarTime, Message, UserCircle } from "tabler-icons-react";
import { onlyDate } from "../helpers/date";
import { IPostItemProps } from "../models/PostModel";
import ImageFallback from "./ImageFallback";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    cursor: "pointer",
    transition: "transform 0.3s ease-in",
    height: "100%",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  section: {
    height: "180px",
    width: "calc(100% + 32px)",
    position: "relative",
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
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing.md,
    gap: "12px",
  },
  row: {
    display: "flex",
    flexWrap: "nowrap",
    gap: "12px",
  },
}));

const PostItem: FC<IPostItemProps> = (props) => {
  const { id, created_at, image_url, title, description, user, comments } =
    props.post;
  const { classes } = useStyles();

  return (
    <Link href={`/posts/${id}`} passHref>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.section}>
          <ImageFallback
            src={image_url}
            layout="fill"
            objectFit="cover"
            alt="post preview"
          />
        </Card.Section>
        <Text className={classes.title} weight={500} component="a">
          {title || "Title not found"}
        </Text>
        <Text size="sm" color="dimmed" lineClamp={4}>
          {description || "Description not found"}
        </Text>
        <Group position="apart" className={classes.footer}>
          <UserCircle size={16} strokeWidth={2} />
          <Text size="sm" inline>
            {user || "Unknown"}
          </Text>
        </Group>
        <Group position="apart" className={classes.footer}>
          <div className={classes.row}>
            <CalendarTime size={16} strokeWidth={2} />
            <Text size="sm" inline>
              {onlyDate(created_at)}
            </Text>
          </div>
          {comments.length > 0 && (
            <div className={classes.row}>
              <Message size={16} strokeWidth={2} />
              <Text size="sm" inline>
                {comments.length} comments
              </Text>
            </div>
          )}
        </Group>
      </Card>
    </Link>
  );
};

export default PostItem;
