import { authClient, client } from "./index";
import {
  IRegistrationRequest,
  ITokenResponse,
  IUser,
  IUserInfo,
  IUserModal,
} from "../types/types";
import jwtDecode from "jwt-decode";

export const login = async (email: string, password: string) => {
  const response = await client.post<ITokenResponse>("user/login", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return jwtDecode(response.data.token) as IUser;
};

export const register = async (request: IRegistrationRequest) => {
  const response = await client.post<ITokenResponse>(
    "user/registration",
    request
  );
  localStorage.setItem("token", response.data.token);
  return jwtDecode(response.data.token) as IUser;
};

export const check = async () => {
  const response = await authClient.get<ITokenResponse>("user/auth");
  localStorage.setItem("token", response.data.token);
  return jwtDecode(response.data.token) as IUser;
};

export const info = async (userId: number) => {
  const response = await authClient.get<IUserInfo>(
    `user/info?userId=${userId}`
  );
  return response.data;
};

export const searchUsers = async (name: string, surname: string) => {
  const response = await authClient.get<IUserModal[]>(
    `user/find?name=${name}&surname=${surname}`
  );
  return response.data;
};

export const getUserAvatar = async (userId: number) => {
  const response = await authClient.get<string>(
    `user/getUserAvatar?id=${userId}`
  );
  return response.data;
};
