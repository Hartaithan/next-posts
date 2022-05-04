import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayout";

const posts = [
  {
    id: 1,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    title: "Title 1",
    description: "Description 1",
    author: "Author 1",
    content:
      "<p>1 Your initial <b>html value</b> or an empty string to init editor without value</p>",
  },
  {
    id: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    title: "Title 2",
    description: "Description 2",
    author: "Author 2",
    content:
      "<p>2 Your initial <b>html value</b> or an empty string to init editor without value</p>",
  },
  {
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
    title: "Title 3",
    description: "Description 3",
    author: "Author 3",
    content:
      "<p>3 Your initial <b>html value</b> or an empty string to init editor without value</p>",
  },
];

const Post: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { image, title, description, author, content } = posts[Number(id) - 1];

  return (
    <MainLayout>
      <h1>Post + {id}</h1>
      {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
    </MainLayout>
  );
};

export default Post;
