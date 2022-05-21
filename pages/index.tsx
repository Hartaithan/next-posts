import { Grid, SimpleGrid, Skeleton, useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import MainLayout from "../layouts/MainLayout";

const posts = [
  { id: 1, name: "first" },
  { id: 2, name: "second" },
  { id: 3, name: "third" },
  { id: 4, name: "fourth" },
];

const PRIMARY_COL_HEIGHT = 300;

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;
  return (
    <MainLayout title={"Home"}>
      {posts.length === 1 && (
        <Grid>
          {posts.map((item) => (
            <Grid.Col key={item.id} xs={12}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
          ))}
        </Grid>
      )}
      {posts.length === 2 && (
        <Grid gutter="md">
          {posts.map((item) => (
            <Grid.Col key={item.id} xs={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
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
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
          <Grid gutter="md">
            <Grid.Col>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      )}
      {posts.length === 4 && (
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
          <Grid gutter="md">
            <Grid.Col>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      )}
    </MainLayout>
  );
};

export default Home;
