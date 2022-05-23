import { Checkbox, Input } from "antd";

export const paramList1 = [
  {
    id: "str1",
    label: "字符串",
    children: <Input></Input>,
    rules: [
      { required: true, message: "Please String your favourite colors!" },
    ],
  },
  {
    id: "checkbox1",
    label: "复选框",
    children: <Checkbox></Checkbox>,
    rules: [
      { required: true, message: "Please Checkbox your favourite colors!" },
    ],
    formItemParam: {
      valuePropName: "checked",
    },
  },
];
