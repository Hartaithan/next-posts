import { NextPage } from "next";
import React from "react";
import Grid from "../../components/Grid";
import GridItem from "../../components/GridItem";
import MainLayout from "../../layouts/MainLayout";
import { IPost } from "../../models/PostModel";

const posts: IPost[] = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    src: "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
  },
];

const Posts: NextPage = () => {
  return (
    <MainLayout>
      <Grid>
        {posts.map((post) => (
          <GridItem key={post.id} post={post} />
        ))}
      </Grid>
    </MainLayout>
  );
};

export default Posts;
