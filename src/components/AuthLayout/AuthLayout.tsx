import { classNames } from "@/utils/className";
import cls from "./AuthLayout.module.scss";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  className?: string;
  children?: ReactNode;
}
export const AuthLayout = (props: AuthLayoutProps) => {
  const { className, children } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      className={classNames(cls.authLayout, {}, [className ? className : ""])}
    >
      {children}
    </div>
  );
};
