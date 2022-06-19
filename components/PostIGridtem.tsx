import { Text, Group, createStyles, Paper, Title } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { CalendarTime, UserCircle } from "tabler-icons-react";
import { onlyDate } from "../helpers/date";
import { IPostItemProps } from "../models/PostModel";
import ImageFallback from "./ImageFallback";

const useStyles = createStyles((theme, { height }: IPostItemProps) => {
  return {
    card: {
      height: `${height}px`,
      position: "relative",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      cursor: "pointer",
      transition: "transform 0.3s ease-in",
    },
    mainCard: {
      position: "relative",
      overflow: "hidden",
      zIndex: 1,
      height: `${height}px`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: "pointer",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      height: `${height}px`,
      width: "100%",
      zIndex: 1,
      backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 95%, rgba(0,0,0,1) 100%)`,
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
      color: theme.colors.gray[0],
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      width: "100%",
    },
    description: {
      display: "block",
      color: theme.colors.gray[5],
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
      width: "100%",
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
      color: theme.colors.gray[0],
    },
    wrapper: {
      width: "100%",
      position: "relative",
      zIndex: 2,
    },
  };
});

const PostGridItem: FC<IPostItemProps> = (props) => {
  const { id, created_at, title, description, user, image_url } = props.post;
  const { classes } = useStyles(props);

  if (props.main) {
    return (
      <Link href={`/posts/${id}`} passHref>
        <Paper shadow="md" p="xl" radius="md" className={classes.mainCard}>
          <div className={classes.overlay} />
          <div className={classes.wrapper}>
            <Title order={3} className={classes.title}>
              {title ? title : "Title not found"}
            </Title>
            <Text size="sm" className={classes.description} lineClamp={4}>
              {description ? description : "Description not found"}
            </Text>
          </div>
          <div className={classes.wrapper}>
            <Group position="apart" className={classes.footer}>
              <UserCircle size={16} strokeWidth={2} />
              <Text size="sm" inline>
                {user ? user : "Unknown"}
              </Text>
            </Group>
            <Group position="apart" className={classes.footer}>
              <CalendarTime size={16} strokeWidth={2} />
              <Text size="sm" inline>
                {onlyDate(created_at)}
              </Text>
            </Group>
          </div>
          <ImageFallback
            background
            src={image_url}
            layout="fill"
            objectFit="cover"
            alt="post preview"
          />
        </Paper>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${id}`} passHref>
      <Paper shadow="md" p="xl" radius="md" className={classes.mainCard}>
        <div className={classes.overlay} />
        <div className={classes.wrapper}>
          <Title order={3} className={classes.title}>
            {title ? title : "Title not found"}
          </Title>
          <Text size="sm" className={classes.description} lineClamp={4}>
            {description ? description : "Description not found"}
          </Text>
        </div>
        <ImageFallback
          background
          src={image_url}
          layout="fill"
          objectFit="cover"
          alt="post preview"
        />
      </Paper>
    </Link>
  );
};

export default PostGridItem;
