import { classNames } from "@/utils/className";
import cls from "./CreateTodoForm.module.scss";
import { Input } from "@/components/Input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/Textarea";
import { axiosInstance } from "@/axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../Button";

interface CreateTodoFormProps {
  className?: string;
}
export const CreateTodoForm = (props: CreateTodoFormProps) => {
  const { className } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { todoId } = useParams();

  const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todoId)
      try {
        await axiosInstance.post("/todos/new", {
          title: title,
          description: description,
        });
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    if (todoId)
      try {
        await axiosInstance.put("/todos/edit", {
          todoId: todoId,
          title: title,
          description: description,
        });
        navigate("/");
      } catch (e) {
        console.log(e);
      }
  };

  useEffect(() => {
    const getTodoById = async (todoId: string) => {
      const { data } = await axiosInstance.get(`/todos/todo/${todoId}`);
      setTitle(data.title);
      setDescription(data.description);
    };

    if (todoId) {
      getTodoById(todoId);
    }
  }, [todoId]);

  return (
    <form
      onSubmit={onSubmitFormHandler}
      className={classNames(cls.createTodoForm, {}, [
        className ? className : "",
      ])}
    >
      <Input onChange={setTitle} value={title} placeholder="Заголовок" />
      <Textarea
        className={cls.description}
        onChange={setDescription}
        value={description}
        placeholder="Описание"
      />
      <div className={cls.buttons}>
        <Link className={cls.closeBtn} to="/">
          Отмена
        </Link>
        <Button type="submit" disabled={!title || !description}>
          Сохранить
        </Button>
      </div>
    </form>
  );
};
