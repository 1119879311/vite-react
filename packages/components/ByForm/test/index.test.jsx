import React from "react";

import { Form, Button, Input, Checkbox } from "antd";
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
      <Button onClick={submit}>获取1212</Button>
      <hr />
      <Form
        form={form}
        name="form-ref"
        // layout="vertical"
        initialValues={{
          nameSs: "1111",
          "row-1": 121212,
          checkbox1: true,
          upload: [
            {
              uid: "12",
              status: "done",
              url: "http://localhost:3000/theme/upload/images/2022/imgmodule2022-06-30bmuuGCu4-5ec78cfc32a6e.jpg",
            },
          ],
        }}
      >
        <Form.Item name="nameSs" label="User Name" rules={[{ required: true }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Form disabled"
          name="disabled"
          valuePropName="checked"
        >
          <Checkbox>disabled</Checkbox>
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
