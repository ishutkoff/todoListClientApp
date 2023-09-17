"use client";
import { classNames } from "@/utils/className";
import cls from "./Textarea.module.scss";
import { TextareaHTMLAttributes, useRef, useState } from "react";
type HTMLTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange" | "value"
>;
interface TextareaProps extends HTMLTextAreaProps {
  className?: string;
  type?: string;
  label?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export const Textarea = function Textarea(props: TextareaProps) {
  const { className, onChange, value, label, ...otherProps } = props;

  const [isSelect, setSelect] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
    setSelect(true);
  };

  const onFocusHandler = () => {
    setSelect(true);
  };

  return (
    <div
      className={classNames(cls.textarea, { [cls.selected]: isSelect }, [
        className ? className : "",
      ])}
    >
      {label && <label>{label}</label>}
      <textarea
        ref={inputRef}
        value={value}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        {...otherProps}
      />
    </div>
  );
};
