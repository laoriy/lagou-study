import FetchTodoById from "./FetchTodoById";
import Todo from "./Todo";

function App() {
  return (
    <div className="App">
      <header className="App-header">to do list</header>
      <hr />
      <Todo></Todo>
      <hr />
      <FetchTodoById></FetchTodoById>
    </div>
  );
}

export default App;
