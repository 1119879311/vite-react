import React from "react";

import { Form, Button, Input } from "antd";
import ByForm from "../index";
import testParam, { GroupFormOptions, flatFormOtions } from "./param";
function TestForm(props) {
  const [form] = Form.useForm();
  const submit = () => {
    console.log("getFieldsValue:", form.getFieldsValue());
    form
      .validateFields()
      .then((value) => {
        console.log("value", value);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Button onClick={submit}>获取</Button>
      <hr />
      <Form form={form} name="form-ref">
        <Form.Item
          name="nameSs"
          initialValue={123456}
          label="User Name"
          rules={[{ required: true }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => {
            return (
              prevValues["test-1-name-0"] !== currentValues["test-1-name-0"]
            );
          }}
        >
          {({ getFieldValue }) => {
            return getFieldValue("test-1-name-0") ? (
              <Form.Item
                name="customizeGender"
                label="Customize Gender"
                initialValue={"默认值"}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <br />

        <ByForm form={form} config={testParam}></ByForm>
        <br />
        <br />
        <hr></hr>
        <ByForm form={form} config={GroupFormOptions}></ByForm>

        <hr></hr>
        <ByForm form={form} config={flatFormOtions}></ByForm>
      </Form>
    </div>
  );
}
export default TestForm;
