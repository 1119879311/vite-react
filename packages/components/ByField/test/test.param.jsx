import { Checkbox, Input, Button, DatePicker } from "antd";
// import ByIncreasing from "../../ByInput/ByIncreasing";

const { RangePicker } = DatePicker;

export const paramList1 = [
  {
    id: "date",
    label: "日期",
    inputParam: {
      status: "warning",
      dateRender: (currentDate) => <div>1212</div>,
      panelRender: (dateNode) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input placeholder="请输入,怎么输入不了啊" />
            {dateNode}
          </div>
        );
      },
      onChange: (e) => {
        console.log("---onchange---", e);
      },
    },
    fieldChange: (value) => {
      console.log("---fieldChange---", value);
    },

    children: <RangePicker renderExtraFooter={() => 1212} />,
  },
  {
    id: "str1",
    label: "字符串",
    fieldChange: (value) => {
      console.log("---fieldChange---", value);
    },
    onChange: (e) => {
      console.log("---onchange---", e);
    },
    children: (
      <Input
      // onPressEnter={() => {
      //   console.log("onPressEnter");
      // }}
      ></Input>
    ),
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
  // {
  //   id: "add",
  //   label: "自增",
  //   children: <ByIncreasing></ByIncreasing>,
  //   TemplateParam: [{ id: "add-str", children: <Input></Input> }],
  // },
];
