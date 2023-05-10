import React, {ChangeEvent, FC, useContext, useState} from 'react';
import '../styles/RegisterPage.css'
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {register} from "../Api/UserApi";
import {LOGIN_ROUTE, USER_ROUTE} from "../utils/consts";


const RegistrationPage:FC = () => {
    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState<number>(0)
    const [image, setImage] = useState<File | null>(null)
    const [city, setCity] = useState('')
    const [university, setUniversity] = useState('')
    const navigate = useNavigate()

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleSurname = (e: ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value)
    }
    const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
        setAge(Number(e.target.value))
    }
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null) {
            setImage(e.target.files[0])
        }
    }
    const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }
    const handleUniversity = (e : ChangeEvent<HTMLInputElement>) => {
        setUniversity(e.target.value)
    }
    const handleRegistration = async () => {
        const response = await register({email, password, name, surname, age, image: '', city, university})
        user.setUser(response)
        user.setIsAuth(true)
        navigate(USER_ROUTE)
    }
    return (
        <main className='regPage__main'>
            <div className='regPage__container'>
                <h1 className='regPage__header'>Страница регистрации</h1>
                <div className="regPage__content">
                    <input
                        value={email}
                        type="text"
                        className="regPage__input"
                        placeholder='Введите почту'
                        onChange={handleEmail}
                    />
                    <input
                        value={password}
                        type="password"
                        className="regPage__input"
                        placeholder='Придумайте пароль'
                        onChange={handlePassword}
                    /><input
                        value={name}
                        type="text"
                        className="regPage__input"
                        placeholder='Введите имя'
                        onChange={handleName}
                    />
                    <input
                        value={surname}
                        type="text"
                        className="regPage__input"
                        placeholder='Введите фамилию'
                        onChange={handleSurname}
                    />
                    <input
                        value={age}
                        type="text"
                        className="regPage__input"
                        placeholder='Введите возраст'
                        onChange={handleAge}
                    />
                    <input
                        type="file"
                        className="regPage__input"
                        placeholder='Введите возраст'
                        onChange={handleFile}
                    />
                    <input
                        value={city}
                        type="text"
                        className="regPage__input"
                        placeholder='Введите город'
                        onChange={handleCity}
                    />
                    <input
                        value={university}
                        type="text"
                        className="regPage__input"
                        placeholder='Введите название университета'
                        onChange={handleUniversity}
                    />
                    <button
                        className="regPage__button"
                        onClick={handleRegistration}
                    >
                        Зарегистрироваться
                    </button>
                    <button
                        onClick={() => navigate(LOGIN_ROUTE)}
                        className="regPage__auth"
                    >
                        Есть аккаунт? Войти
                    </button>
                </div>
            </div>
        </main>
    );
};

export default RegistrationPage;