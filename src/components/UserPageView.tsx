import React, { FC, useEffect, useState } from "react";
import "../styles/UserPageView.css";
import testImage from "../assets/testImageAvatar.jpg";
import { IPost, IUserInfo } from "../types/types";
import { getByUserId } from "../Api/PostApi";
import Card from "./Card";

interface UserPageViewProps {
  userInfo: IUserInfo;
}

const UserPageView: FC<UserPageViewProps> = ({ userInfo }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getByUserId(userInfo.id).then(setPosts);
  }, [userInfo.id]);
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
    <main className="UserPageView__main">
      <div className="UserPageView__container">
        <div className="UserPageView__header">
          <img
            src={testImage}
            alt="AvatarImage"
            className="UserPageView__image"
          />
          <div className="UserPageView__name">Имя: {userInfo.name}</div>
          <div className="UserPageView__surname">
            Фамилия: {userInfo.surname}
          </div>
          <div className="UserPageView__age">Возраст: {userInfo.age}</div>
          <div className="UserPageView__city">Город: {userInfo.city}</div>
          <div className="UserPageView__university">
            Университет: {userInfo.university}
          </div>
        </div>
        <div className="UserPageView__content">
          <div className="UserPageView__content-posts">
            {posts.map((post) => (
              <Card
                key={post.id}
                post={post}
                onLike={likePost}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserPageView;
