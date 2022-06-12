import { Dispatch } from "react";
import { TUser } from "../types/api/users";

export type TState = {
  user: TUser | null;
  isFetching: boolean;
  error: boolean | string;
  dispatch?: Dispatch<TAction>;
};

export type TAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: TUser }
  | { type: "LOGIN_ERROR"; payload: string };

export const AuthReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_ERROR":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown user action");
  }
};
