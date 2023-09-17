import { classNames } from "@/utils/className";
import cls from "./Input.module.scss";
import { InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  onChange: (value: string) => void;
  value: string;
}
export const Input = (props: InputProps) => {
  const { className, value, onChange, ...other } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <input
      value={value}
      onChange={e => onChangeHandler(e)}
      {...other}
      className={classNames(cls.input, {}, [className ? className : ""])}
    />
  );
};
