/**
 * valuePropName:value
 * trigger:onChage
 */

import { useState } from "react";
// import { EditOutlined } from " @ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
const compSelector = "field_text-";
export default (props) => {
  return (
    <div>
      {props.value} &nbsp;&nbsp;
      <EditOutlined
        onClick={() => {
          props.setIsOpenEdit?.(true);
        }}
      />
    </div>
  );
};
