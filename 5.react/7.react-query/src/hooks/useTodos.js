import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchTodos() {
  try {
    return axios.get("/todos");
  } catch (error) {
    throw new Error(error);
  }
}
function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: true,
    staleTime: 5000,
  });
}

export { useTodos };
