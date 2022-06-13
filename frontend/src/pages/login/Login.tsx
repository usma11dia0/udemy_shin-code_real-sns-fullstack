import React, { FormEvent, useContext, useRef } from "react";
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";
import "./Login.css";

export const Login = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(AuthContext);
  // console.log(email);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ログインボタンを押した際のページ移動及びリロードを防ぐ。
    // console.log((email.current)? email.current.value : undefined);
    // console.log((password.current)? password.current.value : undefined);
    loginCall(
      {
        email: email.current ? email.current.value : undefined,
        password: password.current ? password.current.value : undefined,
      },
      dispatch!
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Real SNS</h3>
          <span className="loginDesc">本格的なSNSを自分の手で</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMsg">ログインはこちら</p>
            <input
              type="email"
              className="loginInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength={6}
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="registerButton">アカウント作成</button>
          </form>
        </div>
      </div>
    </div>
  );
};
