import { classNames } from "@/utils/className";
import cls from "./Button.module.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}
export const Button = (props: ButtonProps) => {
  const { className, children, ...other } = props;
  return (
    <button
      className={classNames(cls.button, {}, [className ? className : ""])}
      {...other}
    >
      {children}
    </button>
  );
};
