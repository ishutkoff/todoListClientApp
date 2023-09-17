import ReactDOM from "react-dom/client";

import "./styles/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInForm } from "@/components/SignInForm";
import { SignUpForm } from "@/components/SignUpForm";
import { TodoList } from "@/components/TodoList";
import { RequireAuth } from "@/components/RequireAuth";
import { TodoListLayout } from "@/components/TodoListLayout";
import { AuthLayout } from "./components/AuthLayout";
import { CreateTodoForm } from "./components/CreateTodoForm";
import { CreateLayout } from "./components/CreateLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <TodoListLayout>
              <TodoList />
            </TodoListLayout>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/create/"
        element={
          <CreateLayout>
            <CreateTodoForm />
          </CreateLayout>
        }
      ></Route>
      <Route
        path="/edit/:todoId"
        element={
          <CreateLayout>
            <CreateTodoForm />
          </CreateLayout>
        }
      ></Route>
      <Route
        path="/sign-in"
        element={
          <AuthLayout>
            <SignInForm />
          </AuthLayout>
        }
      ></Route>
      <Route
        path="/sign-up"
        element={
          <AuthLayout>
            <SignUpForm />
          </AuthLayout>
        }
      ></Route>
    </Routes>
  </BrowserRouter>
);
