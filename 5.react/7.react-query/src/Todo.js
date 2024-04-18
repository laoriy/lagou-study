import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import "./todo.css";
import Footer from "./Footer";
import { useTodos } from "./hooks/useTodos";

function addTodo(todo) {
  console.log(todo);

  try {
    axios.post("/todos", todo);
  } catch (error) {
    console.log(error);
  }
}

function modifyTodoCompleted({ id, completed }) {
  try {
    return axios.patch("/todos/" + id, { completed });
  } catch (error) {
    console.log(error);
  }
}

function Todo() {
  const [title, setTitle] = useState("");
  const { isError, isLoading, error, data } = useTodos();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: mutateCompleted } = useMutation({
    mutationFn: modifyTodoCompleted,
    onSuccess: (response) => {
      queryClient.setQueryData(["todos"], (old) => {
        return old.map((todo) => (todo.id === response.id ? response : todo));
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <section className="main">
      <input
        placeholder="请输入"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={(e) => {
          if (e.code === "Enter") {
            mutate({ title, completed: false, editing: false });
          }
        }}
      ></input>
      <ul className="todo-list">
        {data?.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                checked={todo.completed}
                type="checkbox"
                onChange={(e) => {
                  mutateCompleted({ id: todo.id, completed: !todo.completed });
                }}
              />
              <label>{todo.title}</label>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </section>
  );
}

export default Todo;
