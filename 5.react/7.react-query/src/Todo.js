import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
async function fetchTodos() {
  try {
    return axios.get("/todos");
  } catch (error) {
    throw new Error(error);
  }
}
function addTodo(todo) {
  console.log(todo);

  try {
    axios.post("/todos", todo);
  } catch (error) {
    console.log(error);
  }
}

function Todo() {
  const [isLoad, setLoad] = useState(false);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient()
  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: true,
    enabled: isLoad,
    staleTime: 5000,
  });
  const { mutate } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <section className="main">
      <button onClick={() => setLoad(true)}>请求状态</button>
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
          <li key={todo.id}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>{todo.title}</label>
              <button className="destroy"></button>
            </div>
            <input className="edit" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Todo;
