import { Button, Form } from "antd";
import { useState } from "react";
import DrawerForm from "../src";
import { param1 } from "./param1.test";
function DrawerFromTest() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const onClose = () => {
    console.log("-------", visible);
    setVisible(false);
  };
  return (
    <>
      <Button
        onClick={() => {
          //   form.setFieldsValue({ "row-0": Math.random() });
          form.resetFields();
          setVisible(true);
        }}
      >
        新增
      </Button>
      <DrawerForm
        title="编辑"
        form={form}
        {...param1(onClose)}
        onClose={onClose}
        visible={visible}
      ></DrawerForm>
    </>
  );
}

export default DrawerFromTest;
