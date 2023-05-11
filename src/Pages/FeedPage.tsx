import React, { FC, useEffect, useState } from "react";
import Card from "../components/Card";
import { getAll } from "../Api/PostApi";
import { IPost } from "../types/types";

const FeedPage: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getAll().then(setPosts);
  }, []);
  if (posts.length === 0) {
    return <div>Постов нет</div>;
  }
  const likePost = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
  };
  return (
    <div>
      {posts.map((post) => (
        <Card
          key={post.id}
          post={post}
          onLike={likePost}
        />
      ))}
    </div>
  );
};

export default FeedPage;
