/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Form, Button, Input } from "antd";
import ByField from "../index";
import { paramList1 } from "./test.param";
const TestInput = (props) => {
  const [form] = Form.useForm();
  let formRef = useRef(null);
  const submit = () => {
    console.log("formRef", formRef.current);
    console.log(form.getFieldsValue());
    form
      .validateFields()
      .then((value) => {
        console.log("value", value);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const setVaule = () => {};

  return (
    <div>
      <Button onClick={submit}>获取</Button>
      <Button onClick={setVaule}>设置值</Button>

      <Form form={form} name="control-ref" ref={formRef}>
        {paramList1.map((param, i) => (
          <ByField key={i} form={form} {...param}></ByField>
        ))}
      </Form>
    </div>
  );
};

export default TestInput;
