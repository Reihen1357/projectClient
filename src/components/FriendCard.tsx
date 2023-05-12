import React, { FC, MouseEvent } from "react";
import "../styles/FriendCard.css";
import { IUserModal } from "../types/types";
import { addFriend, deleteFriend } from "../Api/FriendApi";
import { useNavigate } from "react-router-dom";

interface FriendCardProps {
  friend: IUserModal;
  onFriendDelete: (friendId: number) => void;
  onFriendAdd: (friendId: number) => void;
}

const FriendCard: FC<FriendCardProps> = ({
  friend,
  onFriendDelete,
  onFriendAdd,
}) => {
  const navigate = useNavigate();
  const openUserPage = () => {
    navigate(`/${friend.id}`);
  };

  const handleAddFriend = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    addFriend(friend.id).then(() => onFriendAdd(friend.id));
  };

  const handleDeleteFriend = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteFriend(friend.id).then(() => onFriendDelete(friend.id));
  };
  return (
    <div
      className="friendCard__main"
      onClick={openUserPage}
    >
      <img
        src={friend.image}
        alt="friendImage"
        className="friendCard__image"
      />
      <div className="friendCard__friendName">{`${friend.name} ${friend.surname}`}</div>
      {friend.isFriend === false ? (
        <button
          onClick={handleAddFriend}
          className="friendCard__addFriend"
        >
          Добавить в друзья
        </button>
      ) : (
        <button
          onClick={handleDeleteFriend}
          className="friendCard__deleteFriend"
        >
          Удалить из друзей
        </button>
      )}
    </div>
  );
};

export default FriendCard;
