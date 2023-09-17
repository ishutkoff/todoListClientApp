import { classNames } from "@/utils/className";
import cls from "./TodoListLayout.module.scss";
import { ReactNode } from "react";
import { Button } from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserCard } from "../UserCard";

interface TodoListLayoutProps {
  className?: string;
  children?: ReactNode;
}
export const TodoListLayout = (props: TodoListLayoutProps) => {
  const { className, children } = props;
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in/");
  };

  return (
    <div
      className={classNames(cls.todoListLayout, {}, [
        className ? className : "",
      ])}
    >
      <div className={cls.header}>
        <div>
          <UserCard />
        </div>
        <div className={cls.right}>
          <Link className={cls.createBtn} to="/create/">
            Добавить задачу
          </Link>
          <Button onClick={logoutHandler}>Выйти</Button>
        </div>
      </div>
      {children}
    </div>
  );
};
