//ユーザーの入力に応じたアクションの設定
import { TUser } from "../types/api/users";

export const LoginStart = (user:TUser) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user:TUser) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginError = (error:string) => ({
  type: "LOGIN_ERROR",
  payload: error,
});