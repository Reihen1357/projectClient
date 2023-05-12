import { authClient } from "./index";
import { IUser } from "../types/types";

export const getAll = async () => {
  const response = await authClient.get<IUser[]>("friend/getAll");
  return response.data;
};
export const deleteFriend = async (friendId: number) => {
  await authClient.delete<number>(`friend/delete?friendId=${friendId}`);
};

export const addFriend = async (friendId: number) => {
  await authClient.post<void>(`friend/add`, { friendId });
};
