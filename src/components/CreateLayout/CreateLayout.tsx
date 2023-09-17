import { classNames } from "@/utils/className";
import cls from "./CreateLayout.module.scss";
import { ReactNode } from "react";
import { UserCard } from "../UserCard";

interface CreateLayoutProps {
  className?: string;
  children?: ReactNode;
}
export const CreateLayout = (props: CreateLayoutProps) => {
  const { className, children } = props;

  return (
    <div
      className={classNames(cls.createLayout, {}, [className ? className : ""])}
    >
      <div className={cls.header}>
        <div>
          <UserCard />
        </div>
        <div className={cls.right}></div>
      </div>
      {children}
    </div>
  );
};
