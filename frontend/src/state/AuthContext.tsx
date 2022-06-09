import { createContext, useReducer, ReactNode, FC } from "react";
import { AuthReducer, TState } from "./AuthReducer";

//最初のユーザー状態を定義
const initialState = {
  user: null,
  isFetching: false,
  error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext<TState>(initialState);

export const AuthContextProvider= (props: { children: ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
