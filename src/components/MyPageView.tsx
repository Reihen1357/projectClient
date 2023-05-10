import React, {FC, useEffect, useState} from 'react';
import '../styles/MyPage.css'
import testImage from '../assets/testImageAvatar.jpg'
import {IPost, IUserInfo} from "../types/types";
import PostForm from "./PostForm";
import {getAll, getByUserId} from "../Api/PostApi";
import Card from "./Card";

interface MyPageViewProps {
    userInfo: IUserInfo
}

const MyPageView:FC<MyPageViewProps> = ({userInfo}) => {
    const [visible, setVisible] = useState(false)
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        getByUserId(userInfo.id).then(setPosts)
    })

    const closePostForm = () => {
        setVisible(false)
    }

    const showPostForm = () => {
        setVisible(true)
    }
    const likePost = (postId: number) => {
        setPosts(posts.map(post => {
            if (post.id == postId) {
                return {...post, likes: post.likes + 1}
            }
            return post
        }))
    }
    return (
        <main className='MyPage__main'>
            <div className="MyPage__container">
                <div className="MyPage__header">
                    <img src={testImage} alt="AvatarImage" className="MyPage__image"/>
                    <div className="MyPage__name">Имя: {userInfo.name}</div>
                    <div className="MyPage__surname">Фамилия: {userInfo.surname}</div>
                    <div className="MyPage__age">Возраст: {userInfo.age}</div>
                    <div className="MyPage__city">Город: {userInfo.city}</div>
                    <div className="MyPage__university">Университет: {userInfo.university}</div>
                </div>
                <div className="MyPage__content">
                    {visible ? <PostForm createdPost={closePostForm}></PostForm> : <button
                        className="FriendPage__addPost"
                        onClick={showPostForm}
                    >
                        Добавить пост
                    </button>}
                    <div className="MyPage__content-posts">
                        {posts.map(post => <Card key={post.id} post={post} onLike={likePost}/>)}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MyPageView;