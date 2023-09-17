import { classNames } from "@/utils/className";
import cls from "./TodoList.module.scss";
import { useEffect, useState } from "react";
import { TodoItem } from "@/components/TodoItem";
import { axiosInstance } from "@/axiosInstance";
import { Input } from "@/components/Input";

interface TodoListProps {
  className?: string;
}
export const TodoList = (props: TodoListProps) => {
  const { className } = props;
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [todos, setTodos] = useState<
    {
      todoId: string;
      title: string;
      description: string;
      isCompleted: boolean;
    }[]
  >([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/todos/list/");
        setLoading(false);
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, []);

  const searchInputHandle = (value: string) => {
    setSearchPerformed(true);
    setSearchText(value);
  };

  const onCheckStatusHandler = async (todoId: string) => {
    const currentTodo = todos.filter(todo => {
      return todo.todoId === todoId;
    });
    try {
      await axiosInstance.put(`/todos/change-status/${todoId}`, {
        completed: !currentTodo[0].isCompleted,
      });
    } catch (e) {
      console.log(e);
    }
    setTodos(prevTodos =>
      prevTodos.map(changedTodo => {
        if (changedTodo.todoId === todoId) {
          return { ...changedTodo, isCompleted: !currentTodo[0].isCompleted };
        }
        return changedTodo;
      })
    );
  };

  const onRemoveHandler = async (todoId: string) => {
    try {
      await axiosInstance.delete(`/todos/${todoId}`);
      setTodos(
        todos.filter(todo => {
          return todo.todoId !== todoId;
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchText]);

  useEffect(() => {
    if (searchPerformed) {
      const params: { searchText: string } = {
        searchText: debouncedSearchText,
      };

      const fetchTodos = async () => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.get("/todos/list/", {
            params,
          });
          setLoading(false);
          setTodos(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchTodos();
    }
  }, [debouncedSearchText, searchPerformed]);

  return (
    <div className={classNames(cls.todoList, {}, [className ? className : ""])}>
      <div className={cls.findWrapper}>
        <Input
          value={searchText}
          onChange={searchInputHandle}
          placeholder="Поиск"
        />
      </div>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <>
          {todos.length > 0 ? (
            todos.map(todo => (
              <TodoItem
                todo={todo}
                onCheckStatus={() => onCheckStatusHandler(todo.todoId)}
                onRemove={onRemoveHandler}
                key={todo.todoId}
              />
            ))
          ) : (
            <div className={cls.emptyList}>Список дел пуст...</div>
          )}
        </>
      )}
    </div>
  );
};
