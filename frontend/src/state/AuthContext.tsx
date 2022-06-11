import { createContext, useReducer, ReactNode} from "react";
import { AuthReducer, TState } from "./AuthReducer";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

//最初のユーザー状態を定義
const initialState = {
  // user: null,
  user:{
    _id :"62972757ee8afe17603116e4",
    username : "shincode",
    email : "shincode@gmail.com",
    password : "abcdef",
    profilePicture : PUBLIC_FOLDER  + "assets/person/1.jpeg",
    coverPicture : "",
    followers : [""],
    followings : [""],
    isAdmin: false,
  },
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
