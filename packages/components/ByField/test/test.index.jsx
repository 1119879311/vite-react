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
  const setVaule = () => {
    form.setFieldsValue({ str1: Math.random(), checkbox1: true, vals: 111 });
  };
  const clearvalue = () => {
    form.resetFields();
  };
  return (
    <div>
      <Button onClick={submit}>获取</Button>
      <Button onClick={setVaule}>设置值</Button>
      <Button onClick={clearvalue}>清空值</Button>

      <Form form={form} name="control-ref" ref={formRef} initialValues={{}}>
        {paramList1.map((param, i) => (
          <ByField key={i} form={form} {...param}></ByField>
        ))}
      </Form>
    </div>
  );
};

export default TestInput;
