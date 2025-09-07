import apiBase from "./baseUrl";
import type Book from "../interface/Book";
export const postUser = async (
  email: string,
  password: string
): Promise<Book> => {
  try {
    const res = await apiBase.post(
      "/api/user/login",
      { email, password },
      { withCredentials: true }
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const getRefreshToken = async (): Promise<Book> => {
  try {
    const res = await apiBase.get("/api/user/refresh-token", {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const res = await apiBase.post(
      "/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    console.log("you have been logged out :) ", res.data);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
