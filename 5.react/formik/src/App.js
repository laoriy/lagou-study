import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    // validate: (values) => {
    //   const errors = {};
    //   if (!values.username) {
    //     errors.username = "请输入用户名";
    //   }
    //   if (values.username.length > 15) {
    //     errors.username = "用户名不能超过15位";
    //   }
    //   if (!values.password) {
    //     errors.password = "请输入密码";
    //   }
    //   if (values.password.length < 6) {
    //     errors.password = "密码不能少于6位";
    //   }
    //   return errors;
    // },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "用户名不能超过15位")
        .required("请输入用户名"),
      password: Yup.string().min(6, "密码不能少于6位").required("请输入密码"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Email Address</label>
      <input
        id="username"
        name="username"
        type="text"
        {...formik.getFieldProps("username")}
      />
      <p>
        {formik.touched.username && formik.errors.username
          ? formik.errors.username
          : null}
      </p>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        {...formik.getFieldProps("password")}
      />

      <p>
        {formik.touched.password && formik.errors.password
          ? formik.errors.password
          : null}
      </p>

      <button type="submit">Submit</button>
    </form>
  );
};
function App() {
  return (
    <div>
      <SignupForm />
    </div>
  );
}

export default App;
