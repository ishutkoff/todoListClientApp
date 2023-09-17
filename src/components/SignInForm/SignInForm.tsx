import { classNames } from "@/utils/className";
import cls from "./SignInForm.module.scss";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "@/axiosInstance";
import { AxiosError } from "axios";

interface SignInFormProps {
  className?: string;
}
export const SignInForm = (props: SignInFormProps) => {
  const { className } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const navigate = useNavigate();

  const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/sign-in", {
        email: email,
        password: password,
      });
      localStorage.setItem("jwt", data.accessToken);
      if (data.accessToken) {
        navigate("/");
      }
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
      className={classNames(cls.signInForm, {}, [className ? className : ""])}
    >
      <Input onChange={setEmail} value={email} placeholder="Email" />
      <Input
        type="password"
        onChange={setPassword}
        value={password}
        placeholder="Пароль"
      />
      {error && <div className={cls.errorBock}>{error}</div>}
      <div className={cls.buttonsWrapper}>
        <Link className={cls.signUpLink} to="/sign-up/">
          Создать аккаунт
        </Link>
        <Button type="submit">Войти</Button>
      </div>
    </form>
  );
};
