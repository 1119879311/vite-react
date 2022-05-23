import React from "react";
import ByFormItem from "./ByFormItem";
import "./index.css";

export const ByFieldHoc = (Child) => {
  return (props) => (
    <ByFormItem {...props}>
      <Child />
    </ByFormItem>
  );
};

export default ByFormItem;
