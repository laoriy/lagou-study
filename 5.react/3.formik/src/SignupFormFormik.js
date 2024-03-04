import React from "react";
import { Field, Form, Formik, useField } from "formik";
import * as Yup from "yup";

const Checkbox = ({ label, ...props }) => {
  const [field, meta, helper] = useField({ ...props, type: "checkbox" });
  const { value } = meta;
  const { setValue } = helper;

  const handleChange = () => {
    const set = new Set(value);
    if (set.has(props.value)) {
      set.delete(props.value);
    } else {
      set.add(props.value);
    }
    setValue(Array.from(set));
  };
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={value.includes(props.value)}
          onChange={handleChange}
          {...field}
          {...props}
        />
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyInputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
const SignupFormFormik = () => {
  const initialValues = {
    username: "",
    password: "",
    subject: "",
    hobbies: ["篮球"],
  };
  const handleSubmit = (values) => {
    console.log(values);
  };

  const schema = Yup.object({
    username: Yup.string()
      .max(15, "用户名不能超过15位")
      .required("请输入用户名"),
    password: Yup.string().min(6, "密码不能少于6位").required("请输入密码"),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <MyInputField
          as="textarea"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
        ></MyInputField>

        <MyInputField
          name="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
        ></MyInputField>
        <Checkbox name="hobbies" label="篮球" value="篮球"></Checkbox>
        <Checkbox name="hobbies" label="足球" value="足球"></Checkbox>
        <Checkbox name="hobbies" label="羽毛球" value="羽毛球"></Checkbox>
        <Field name="subject" as="select">
          <option value="react">react</option>
          <option value="vue">vue</option>
          <option value="angular">angular</option>
        </Field>
        <button type="submit">提交</button>
      </Form>
    </Formik>
  );
};
export default SignupFormFormik;
