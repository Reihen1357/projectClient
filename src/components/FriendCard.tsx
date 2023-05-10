import React, {FC, MouseEventHandler, MouseEvent} from 'react';
import '../styles/FriendCard.css'
import {IUser} from "../types/types";
import {deleteFriend} from "../Api/FriendApi";
import {useNavigate} from "react-router-dom";

interface FriendCardProps {
    friend: IUser
    onFriendDelete: (friendId: number) => void
}

const FriendCard:FC<FriendCardProps> = ({friend, onFriendDelete}) => {
    const navigate = useNavigate()
    const openUserPage = () => {
        navigate(`/${friend.id}`)
    }
    const handleDeleteFriend = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        deleteFriend(friend.id).then(() => onFriendDelete(friend.id))
    }
    return (
        <div className='friendCard__main' onClick={openUserPage}>
            <img src={friend.image} alt="friendImage" className="friendCard__image"/>
            <div className="friendCard__friendName">{`${friend.name} ${friend.surname}`}</div>
            <button
                onClick={handleDeleteFriend}
                className="friendCard__deleteFriend"
            >
                Удалить из друзей
            </button>
        </div>
    );
};

export default FriendCard;