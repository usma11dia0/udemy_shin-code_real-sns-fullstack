import { createContext, useReducer, ReactNode, useEffect} from "react";
import { AuthReducer, TState } from "./AuthReducer";

const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

//最初のユーザー状態を定義
const initialState = {
  user: JSON.parse(localStorage.getItem("user")!)  || null,
  isFetching: false,
  error: false,
};

//状態をグローバルに管理する
export const AuthContext = createContext<TState>(initialState);

export const AuthContextProvider= (props: { children: ReactNode }) => {
  const { children } = props;
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(()=> {
    localStorage.setItem("user",JSON.stringify(state.user))
  }, [state.user])

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
