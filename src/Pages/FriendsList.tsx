import React, { FC, useEffect, useState } from "react";
import "../styles/FriendsList.css";
import FriendCard from "../components/FriendCard";
import { IUser } from "../types/types";
import { getAll } from "../Api/FriendApi";

const FriendsList: FC = () => {
  const [friends, setFriends] = useState<IUser[]>([]);
  useEffect(() => {
    getAll().then(setFriends);
  }, []);
  if (friends.length === 0) {
    return <div>Друзей нет</div>;
  }

  const onFriendDelete = (friendId: number) => {
    setFriends(friends.filter((friend) => friend.id !== friendId));
  };
  return (
    <main className="friendsList__main">
      <div className="friendsList__container">
        <div className="friendsList__header">
          <div className="friendsList__header-myFriends">Мои друзья</div>
          <button className="friendsList__header-searchFriends">
            Найти друзей
          </button>
        </div>
        <div className="friendList__searchYourFriendContainer">
          <input
            placeholder="Введите имя"
            type="text"
            className="friendsList__searchYourFriend"
          />
          <input
            placeholder="Введите фамилию"
            type="text"
            className="friendsList__searchYourFriend"
          />
        </div>
      </div>
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          friend={friend}
          onFriendDelete={onFriendDelete}
        />
      ))}
    </main>
  );
};

export default FriendsList;
