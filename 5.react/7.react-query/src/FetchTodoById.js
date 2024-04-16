import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function getTodoById({ queryKey }) {
  return axios.get("/todos/" + queryKey[1]);
}

export default function FetchTodoById() {
  const { data } = useQuery({
    queryKey: ["todosId", 2],
    queryFn: getTodoById,
  });
  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
