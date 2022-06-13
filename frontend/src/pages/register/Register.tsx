import axios from "axios";
import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export const Register = () => {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //パスワードと確認用のパスワードが合っているかどうかを確認
    if (password.current!.value !== passwordConfirmation.current!.value) {
      passwordConfirmation.current?.setCustomValidity("パスワードが違います。");
    } else {
      try {
        const user = {
          username: username.current!.value,
          email: email.current!.value,
          password: password.current!.value
        };
        //registerAPIを叩く
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err: unknown) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Real SNS</h3>
          <span className="registerDesc">本格的なSNSを自分の手で</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="registerMsg">新規登録</p>
            <input
              type="text"
              className="registerInput"
              placeholder="ユーザー名"
              required
              ref={username}
            />
            <input
              type="email"
              className="registerInput"
              placeholder="Eメール"
              required
              ref={email}
            />
            <input
              type="password"
              className="registerInput"
              placeholder="パスワード"
              required
              minLength={6}
              ref={password}
            />
            <input
              type="password"
              className="registerInput"
              placeholder="確認用パスワード"
              required
              minLength={6}
              ref={passwordConfirmation}
            />
            <button className="loginButton" type="submit">
              サインアップ
            </button>
            <Link to ='/login' className="linkToLogin">
              ログインはこちら  
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
