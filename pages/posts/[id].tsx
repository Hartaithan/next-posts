import { Badge, Card, createStyles, Group, Text, Title } from "@mantine/core";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import ImageFallback from "../../components/ImageFallback";
import { fullDate } from "../../helpers/date";
import MainLayout from "../../layouts/MainLayout";
import { IPostResponse } from "../../models/PostModel";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
  const { post }: IPostResponse = await res.json();
  return {
    props: { post },
  };
};

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    cursor: "pointer",
    transition: "transform 0.3s ease-in",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  section: {
    height: "300px",
    width: "calc(100% + 40px)",
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
  },
  title: {
    height: "100%",
    position: "relative",
    padding: "20px",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: "0",
    color: `${theme.white} !important`,
    "*": {
      textShadow: "0px 3px 6px #000000",
    },
  },
  post: {
    marginTop: "20px",
  },
  badges: {
    width: "100%",
  },
  content: {
    width: "100%",
    " > div": {
      padding: "0 !important",
    },
  },
}));

const Post: NextPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { classes, cx } = useStyles();
  const {
    created_at,
    updated_at,
    image_url,
    title,
    description,
    content,
    user,
  } = post;

  return (
    <MainLayout title={title}>
      <Card shadow="sm" p="lg" radius={20}>
        <Card.Section className={classes.section}>
          <ImageFallback
            src={image_url}
            layout="fill"
            objectFit="cover"
            alt="post image"
          />
          <Group className={classes.title}>
            <Title order={1}>{title ? title : "Title not found"}</Title>
            <Text size="xl">
              {description ? description : "Description not found"}
            </Text>
          </Group>
        </Card.Section>
        <Group className={classes.post}>
          <Group className={classes.badges}>
            <Text weight={500}>
              Author:&nbsp;&nbsp;
              <Badge color="gray" variant="outline">
                {user ? user : "Unknown"}
              </Badge>
            </Text>
            <Text weight={500}>
              Created:&nbsp;&nbsp;
              <Badge color="gray" variant="outline">
                {fullDate(created_at)}
              </Badge>
            </Text>
            {updated_at && (
              <Text weight={500}>
                Updated:&nbsp;&nbsp;
                <Badge color="gray" variant="outline">
                  {fullDate(updated_at)}
                </Badge>
              </Text>
            )}
          </Group>
          <div className={cx(classes.content, "editor-content")}>
            <div
              className="view ql-editor"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Group>
      </Card>
    </MainLayout>
  );
};

export default Post;
