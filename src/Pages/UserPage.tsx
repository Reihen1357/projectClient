import React, { useEffect, useState} from 'react';
import {info} from '../Api/UserApi'
import {IUserInfo} from "../types/types";
import MyPageView from "../components/MyPageView";
import UserPageView from "../components/UserPageView";
import {useParams} from "react-router-dom";

const UserPage = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>()
    const {id} = useParams()
    if (typeof id === "undefined") {
        throw new Error('Incorrect user ID')
    }
    useEffect(() => {
        info(parseInt(id)).then(setUserInfo)
    }, [])
    if (typeof userInfo === "undefined") {
        return <div>Загрузка</div>
    }
    return (
        <main className='UserPage__main'>
            {userInfo?.isPersonalPage ? <MyPageView userInfo={userInfo}/> : <UserPageView userInfo={userInfo}/>}
        </main>
    );
};

export default UserPage;