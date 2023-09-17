import { classNames } from "@/utils/className";
import cls from "./TodoItem.module.scss";
import EditIcon from "@/assets/edit.svg";
import RemoveIcon from "@/assets/remove.svg";
import { Link } from "react-router-dom";

interface TodoItemProps {
  className?: string;
  onRemove: (todoId: string) => void;
  todo: {
    todoId: string;
    title: string;
    description: string;
    isCompleted: boolean;
  };
  onCheckStatus: () => void;
}
export const TodoItem = (props: TodoItemProps) => {
  const { className, todo, onRemove, onCheckStatus } = props;

  const removeClickHandler = async (todoId: string) => {
    onRemove(todoId);
  };

  return (
    <div
      className={classNames(
        cls.todoItem,
        { [cls["isCompleted"]]: todo.isCompleted },
        [className ? className : ""]
      )}
    >
      <label>
        <div className={cls.title}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={onCheckStatus}
          />
          {todo.title}
        </div>
        <div className={cls.description}>{todo.description}</div>
      </label>
      <div className={cls.actionsWrapper}>
        <div className={cls.editBtn}>
          <Link to={`/edit/${todo.todoId}`}>
            <img src={EditIcon} alt="" />
          </Link>
        </div>
        <div
          onClick={() => removeClickHandler(todo.todoId)}
          className={cls.removeBtn}
        >
          <img src={RemoveIcon} alt="" />
        </div>
      </div>
    </div>
  );
};
