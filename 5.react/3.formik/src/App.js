import React from "react";
import SignupForm from "./SignupForm";
import SignupFormFormik from "./SignupFormFormik";

function App() {
  return (
    <div>
      <SignupForm />
      <h2>Formik组件</h2>
      <SignupFormFormik />
    </div>
  );
}

export default App;
