import React from "react";
import ByField from "../../../ByField";
import ByInputGroup from "./ByInputGroup";
import { Form } from "antd";

export default (props) => {
  let { children, form, ...restProps } = props;
  const [rForm] = Form.useForm();
  return (
    <ByField {...restProps} parentForm={form} form={rForm}>
      <ByInputGroup></ByInputGroup>
    </ByField>
  );
};
