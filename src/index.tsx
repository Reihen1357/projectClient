import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createContext} from "react";
import UserStore from "./Store/UserStore";

const contextData = {user: new UserStore()}

export const Context = createContext<{ user: InstanceType<typeof UserStore> }>(contextData)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider
        value={contextData}
    >
        <App/>
    </Context.Provider>
);
