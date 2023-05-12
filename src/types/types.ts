export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  surname: string;
  age: number;
  image: string;
  city: string;
  university: string;
}

export type IRegistrationRequest = Omit<IUser, "id">;

export interface IUserModal extends Omit<IUser, "password" | "email"> {
  isFriend?: boolean;
}

export interface IUserInfo extends Omit<IUser, "password"> {
  isPersonalPage: boolean;
}

export interface ITokenResponse {
  token: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  image?: string;
  likes: number;
  creationDate: string;
  userId: number;
  user: Omit<IUser, "password" | "email">;
}
