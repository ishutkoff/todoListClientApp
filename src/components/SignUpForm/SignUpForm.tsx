import { classNames } from "@/utils/className";
import cls from "./SignUpForm.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Input } from "../Input";
import { useState } from "react";
import { axiosInstance } from "@/axiosInstance";
import { AxiosError } from "axios";

interface SignUpFormProps {
  className?: string;
}
export const SignUpForm = (props: SignUpFormProps) => {
  const { className } = props;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const navigate = useNavigate();

  const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      const { data } = await axiosInstance.post("/auth/sign-up", {
        userName: userName,
        email: email,
        password: password,
      });
      localStorage.setItem("jwt", data.accessToken);
      navigate("/");
    } catch (e) {
      const error = e as AxiosError<{
        message: string;
        error: string;
        statusCode: number;
      }>;
      setError(error.response?.data.message);
    }
  };

  return (
    <form
      onSubmit={e => onSubmitFormHandler(e)}
      className={classNames(cls.signUpForm, {}, [className ? className : ""])}
    >
      <Input onChange={setUserName} value={userName} placeholder="Имя" />
      <Input
        onChange={setEmail}
        autoComplete="new-password"
        value={email}
        placeholder="Email"
      />
      <Input
        type="password"
        autoComplete="off"
        onChange={setPassword}
        value={password}
        placeholder="Пароль"
      />
      <Input
        autoComplete="off"
        type="password"
        onChange={setConfirmedPassword}
        value={confirmedPassword}
        placeholder="Подтвердить пароль"
      />
      {error && <div className={cls.errorBock}>{error}</div>}
      <div className={cls.buttonsWrapper}>
        <Link className={cls.signInLink} to="/sign-in/">
          Войти
        </Link>
        <Button
          disabled={!email || !userName || !password || !confirmedPassword}
          type="submit"
        >
          Создать
        </Button>
      </div>
    </form>
  );
};
