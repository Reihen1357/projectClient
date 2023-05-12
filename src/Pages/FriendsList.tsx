import React, { ChangeEvent, FC, useEffect, useState } from "react";
import "../styles/FriendsList.css";
import FriendCard from "../components/FriendCard";
import { IUser, IUserModal } from "../types/types";
import { getAll } from "../Api/FriendApi";
import { searchUsers } from "../Api/UserApi";

const FriendsList: FC = () => {
  const [friends, setFriends] = useState<IUserModal[]>([]);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    if (name === "" && surname === "") {
      getAll().then(setFriends);
      return;
    }
    searchUsers(name, surname).then(setFriends);
  }, [name, surname]);

  const handleSetName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSetSurname = (event: ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const onFriendDelete = (friendId: number) => {
    setFriends(friends.filter((friend) => friend.id !== friendId));
  };
  const onFriendAdd = (friendId: number) => {
    setFriends(
      friends.map((friend) => {
        if (friend.id === friendId) {
          return { ...friend, isFriend: true };
        }
        return friend;
      })
    );
  };
  return (
    <main className="friendsList__main">
      <div className="friendsList__container">
        <div className="friendsList__header">
          <div className="friendsList__header-myFriends">Мои друзья</div>
        </div>
        <div className="friendList__searchYourFriendContainer">
          <input
            value={name}
            onChange={handleSetName}
            placeholder="Введите имя"
            type="text"
            className="friendsList__searchYourFriend"
          />
          <input
            value={surname}
            onChange={handleSetSurname}
            placeholder="Введите фамилию"
            type="text"
            className="friendsList__searchYourFriend"
          />
        </div>
      </div>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <FriendCard
            key={friend.id}
            friend={friend}
            onFriendDelete={onFriendDelete}
            onFriendAdd={onFriendAdd}
          />
        ))
      ) : (
        <div style={{ color: "white" }}>Друзей нет</div>
      )}
    </main>
  );
};

export default FriendsList;
