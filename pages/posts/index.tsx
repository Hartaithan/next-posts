import { Center, Grid, Text } from "@mantine/core";
import { InferGetServerSidePropsType, NextPage } from "next";
import PostItem from "../../components/PostItem";
import MainLayout from "../../layouts/MainLayout";
import { GetServerSideProps } from "next";
import { IPostItem, IPostsResponse } from "../../models/PostModel";

interface IPostsPageProps {
  posts: IPostItem[];
}

export const getServerSideProps: GetServerSideProps<
  IPostsPageProps
> = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
  const { posts }: IPostsResponse = await res.json();
  return {
    props: { posts },
  };
};

const Posts: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { posts } = props;
  return (
    <MainLayout title={"All posts"}>
      <Grid>
        {posts.length === 0 && (
          <Center mt={16} style={{ width: "100%" }}>
            <Text>No posts have been added yet.</Text>
          </Center>
        )}
        {posts.map((item: IPostItem) => (
          <Grid.Col key={item.id} xs={12} lg={4}>
            <PostItem post={item} />
          </Grid.Col>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Posts;
