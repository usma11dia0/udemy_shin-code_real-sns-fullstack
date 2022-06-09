import axios from "axios";
import { Dispatch } from "react";
import { TAction } from "./state/AuthReducer";
// import { TUser } from "./types/api/users";

export const loginCall = async (
  user: { email: string | undefined; password: string | undefined },
  dispatch: Dispatch<TAction>
) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post("auth/login", user);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (err: unknown) {
    if (typeof err == "string") {
      dispatch({ type: "LOGIN_ERROR", payload: err });
    }
  }
};
