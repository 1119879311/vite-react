import { Checkbox, Input, Button } from "antd";

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
  {
    depIds: ["checkbox1"],
    shouldUpdate: (form, val) => {
      console.log("---", val);
      return val?.checkbox1 ? { disabled: true, loading: true } : {};
    },
    children: <Button>提交</Button>,
  },
];
