import { useQuery } from "@tanstack/react-query";
import axios from "axios";
async function fetchTodos() {
  try {
    return axios.get("/todos");
  } catch (error) {
    throw new Error(error);
  }
}
function Todo() {
  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <section className="main">
      <ul className="todo-list">
        {data.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Todo;
