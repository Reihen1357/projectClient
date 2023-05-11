import React, { FC, useEffect, useState } from "react";
import "../styles/MyPageView.css";
import { IPost, IUserInfo } from "../types/types";
import PostForm from "./PostForm";
import { getByUserId } from "../Api/PostApi";
import Card from "./Card";

interface MyPageViewProps {
  userInfo: IUserInfo;
}

const MyPageView: FC<MyPageViewProps> = ({ userInfo }) => {
  const imagePath = new URL(
    userInfo.image,
    new URL(process.env.REACT_APP_API_URL ?? "").origin
  ).href;
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getByUserId(userInfo.id).then(setPosts);
  }, [userInfo.id]);

  const closePostForm = () => {
    setVisible(false);
  };

  const showPostForm = () => {
    setVisible(true);
  };
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
    <main className="MyPageView__main">
      <div className="MyPageView__container">
        <div className="MyPageView__header">
          <img
            src={imagePath}
            alt="AvatarImage"
            className="MyPageView__image"
          />
          <div className="MyPageView__name">Имя: {userInfo.name}</div>
          <div className="MyPageView__surname">Фамилия: {userInfo.surname}</div>
          <div className="MyPageView__age">Возраст: {userInfo.age}</div>
          <div className="MyPageView__city">Город: {userInfo.city}</div>
          <div className="MyPageView__university">
            Университет: {userInfo.university}
          </div>
        </div>
        <div className="MyPageView__content">
          {visible ? (
            <PostForm createdPost={closePostForm}></PostForm>
          ) : (
            <button
              className="MyPageViewView__addPost"
              onClick={showPostForm}
            >
              Добавить пост
            </button>
          )}
          <div className="MyPageView__content-posts">
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

export default MyPageView;
