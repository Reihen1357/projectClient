import AuthPage from "../Pages/AuthPage";
import RegistrationPage from "../Pages/RegistrationPage";
import FeedPage from "../Pages/FeedPage";
import FriendsList from "../Pages/FriendsList";
import UserPage from "../Pages/UserPage";
import {
    FEED_ROUTE,
    FRIENDS_ROUTE,
    LOGIN_ROUTE,
    USER_ROUTE,
    REGISTRATION_ROUTE,
} from "../utils/consts";


export const authRoutes = [
    {
        path: FEED_ROUTE,
        Component: FeedPage,
    },
    {
        path: FRIENDS_ROUTE,
        Component: FriendsList,
    },
    {
        path: USER_ROUTE,
        Component: UserPage
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: AuthPage,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage,
    }
]