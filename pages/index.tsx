import { Grid, SimpleGrid, useMantineTheme } from "@mantine/core";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import PostGridItem from "../components/PostIGridtem";
import MainLayout from "../layouts/MainLayout";
import { IPostItem, IPostsResponse } from "../models/PostModel";

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?limit=4`);
  const { posts }: IPostsResponse = await res.json();
  return {
    props: { posts },
  };
};

const PRIMARY_COL_HEIGHT = 400;

const Home: NextPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  return (
    <MainLayout title={"Home"}>
      {posts.length === 1 && (
        <Grid gutter="md">
          <Grid.Col xs={12}>
            <PostGridItem height={PRIMARY_COL_HEIGHT} post={posts[0]} />
          </Grid.Col>
        </Grid>
      )}
      {posts.length === 2 && (
        <Grid gutter="md">
          {posts.map((item: IPostItem) => (
            <Grid.Col key={item.id} xs={6}>
              <PostGridItem height={PRIMARY_COL_HEIGHT} post={item} />
            </Grid.Col>
          ))}
        </Grid>
      )}
      {posts.length === 3 && (
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <PostGridItem main height={PRIMARY_COL_HEIGHT} post={posts[0]} />
          <Grid gutter="md">
            {posts.map((item: IPostItem, index: number) => {
              if (index === 0) {
                return null;
              }
              return (
                <Grid.Col key={item.id}>
                  <PostGridItem height={SECONDARY_COL_HEIGHT} post={item} />
                </Grid.Col>
              );
            })}
          </Grid>
        </SimpleGrid>
      )}
      {posts.length === 4 && (
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <PostGridItem main height={PRIMARY_COL_HEIGHT} post={posts[0]} />
          <Grid gutter="md">
            {posts.map((item: IPostItem, index: number) => {
              if (index === 0) {
                return null;
              }
              return (
                <Grid.Col key={item.id} span={index === 1 ? 12 : 6}>
                  <PostGridItem height={SECONDARY_COL_HEIGHT} post={item} />
                </Grid.Col>
              );
            })}
          </Grid>
        </SimpleGrid>
      )}
    </MainLayout>
  );
};

export default Home;
