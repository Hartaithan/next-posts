import { Grid, SimpleGrid, useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import PostGridItem from "../components/PostIGridtem";
import MainLayout from "../layouts/MainLayout";

const posts = [
  {
    id: 12,
    created_at: "2022-05-11T05:26:38.569359+00:00",
    updated_at: null,
    title: "Title",
    description: "hello",
    content: "<p>q</p>",
    image_url:
      "https://res.cloudinary.com/dl9b8yqr4/image/upload/v1652246792/zgussnrdpgai8olqf1p5.jpg",
    user: "dulustan1996@gmail.com",
  },
  {
    id: 13,
    created_at: "2022-05-11T05:29:00.520622+00:00",
    updated_at: "2022-05-11T08:58:44.023999+00:00",
    title: "make love not war",
    description: "make love not war",
    content: "<p>make love not war</p>",
    image_url:
      "https://res.cloudinary.com/dl9b8yqr4/image/upload/v1652246926/zcp5x1j4kzhzhene6kzn.jpg",
    user: "fednik2011@gmail.com",
  },
  {
    id: 11,
    created_at: "2022-05-08T08:32:46.621313+00:00",
    updated_at: "2022-05-15T02:44:07.339311+00:00",
    title: "First post!",
    description: "yoooooooooooooo edited",
    content:
      '<p><strong>Test yoooooo</strong></p><p class="ql-align-center"><em>Test</em></p><p class="ql-align-right"><u>Test</u></p><h1><s>Test</s></h1><h2>Test</h2><h3>Test</h3><h4>Test</h4><ul><li>Test 1</li><li>Test 2</li><li>Test 3</li></ul><ol><li>Test 1</li><li>Test 2</li><li>Test 3</li><li>Test 4</li></ol><p><br></p><p><a href="https://hartaithan.github.io/" rel="noopener noreferrer" target="_blank">Link</a></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/K-TVPw5OnWk?showinfo=0"></iframe><p><br></p><blockquote>Quote</blockquote><pre class="ql-syntax" spellcheck="false">asdasdasdasdasdasdasd\n</pre><p><br></p><p>asdasdasdasdasd<sup>dasdasdasdas</sup></p><p>asdasdasdasdasd<sub>asdasdasdasd</sub></p>',
    image_url:
      "https://res.cloudinary.com/dl9b8yqr4/image/upload/v1651998758/ctqhuatapeowyndml1x9.png",
    user: "player1ykt@gmail.com",
  },
  {
    id: 12,
    created_at: "2022-05-11T05:26:38.569359+00:00",
    updated_at: null,
    title: "Title",
    description: "helloassssssssssssssssssssssssssssssssssssssssss",
    content: "<p>q</p>",
    image_url:
      "https://res.cloudinary.com/dl9b8yqr4/image/upload/v1652246792/zgussnrdpgai8olqf1p5.jpg",
    user: "dulustan1996@gmail.com",
  },
];

const PRIMARY_COL_HEIGHT = 400;

const Home: NextPage = () => {
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
          {posts.map((item) => (
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
            {posts.map((item, index) => {
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
            {posts.map((item, index) => {
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
