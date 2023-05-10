import React, {FC, useEffect, useState} from 'react';
import '../styles/FriendPage.css'
import testImage from "../assets/testImageAvatar.jpg";
import {IPost, IUserInfo} from "../types/types";
import {getByUserId} from "../Api/PostApi";
import Card from "./Card";

interface UserPageViewProps {
    userInfo: IUserInfo
}

const UserPageView: FC<UserPageViewProps> = ({userInfo}) => {
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        getByUserId(userInfo.id).then(setPosts)
    })
    const likePost = (postId: number) => {
        setPosts(posts.map(post => {
            if (post.id == postId) {
                return {...post, likes: post.likes + 1}
            }
            return post
        }))
    }

    return (
        <main className='FriendPage__main'>
            <div className="FriendPage__container">
                <div className="FriendPage__header">
                    <img src={testImage} alt="AvatarImage" className="FriendPage__image"/>
                    <div className="FriendPage__name">Имя: {userInfo.name}</div>
                    <div className="FriendPage__surname">Фамилия: {userInfo.surname}</div>
                    <div className="FriendPage__age">Возраст: {userInfo.age}</div>
                    <div className="FriendPage__city">Город: {userInfo.city}</div>
                    <div className="FriendPage__university">Университет: {userInfo.university}</div>
                </div>
                <div className="FriendPage__content">
                    <div className="MyPage__content-posts">
                        {posts.map(post => <Card key={post.id} post={post} onLike={likePost}/>)}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default UserPageView;