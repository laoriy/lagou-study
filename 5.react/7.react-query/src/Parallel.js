import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

async function fetchTodos() {
  return axios.get("/todos");
}
async function fetchPosts() {
  return axios.get("/posts");
}

function Parralle() {
  const result = useQueries({
    queries: [
      { queryKey: ["anotherTodos"], queryFn: fetchTodos },
      {
        queryKey: ["anotherPosts"],
        queryFn: fetchPosts,
      },
    ],
  });

  return (
    <div>
      <pre>
        {JSON.stringify(
          result.map((v) => v.data),
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default Parralle;
