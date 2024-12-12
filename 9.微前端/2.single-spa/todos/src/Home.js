import React, { useState, useEffect } from "react";
import Main from "./Main";

function useToolsModule() {
  const [toolsModule, setToolsModule] = useState();
  useEffect(() => {
    System.import("@study/tools").then(setToolsModule);
  }, []);
  return toolsModule;
}

const Home = () => {
  const toolsModule = useToolsModule();
  useEffect(() => {
    let subjection = null;
    if (toolsModule) {
      toolsModule.sayHello("@study/todos");
      subjection = toolsModule.sharedSubject.subscribe(console.log);
    }
    return () => subjection.unsubscribe();
  }, []);

  return (
    <Main>
      Home works{" "}
      <button
        onClick={() => toolsModule.sharedSubject.next("Hello Hello Hello")}
      >
        button
      </button>
    </Main>
  );
};

export default Home;
