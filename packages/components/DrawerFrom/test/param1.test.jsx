import { Input } from "antd";
export const param1 = (onclose) => {
  return {
    width: 720,
    formConfig: {
      onFormChange: (...args) => {
        console.log("onFormChage-FieldList", ...args);
      },
      // colParam: { span: 24 },
      rowParam: { gutter: 24 },
      column: 2, // 这里配置列的
      FieldList: [
        {
          id: "row-0",
          label: "row-0",
          inputType: "ByString",
          onChange: (val) => {
            console.log("--", val);
          },
          rules: [{ required: true, message: "Please enter user name" }],
        },
        {
          id: "g1-row-0",
          label: "g1-row-0",
          inputType: "ByString",
        },
        {
          id: "g1-row-1",
          label: "g1-row-1",
          inputType: "ByString",
          //   noFormItem: true,
          //   children: <div>这是一段文字</div>,
        },
        {
          id: "g2-row-0",
          label: "g2-row-0",
          inputType: "ByString",
        },
        {
          id: "g2-row-1",
          label: "g2-row-1",
          inputType: "ByString",
        },
        {
          id: "row-1",
          label: "row-1",
          inputType: "ByString",
        },
        {
          id: "row-2",
          label: "row-1",
          inputType: "ByString",
        },
        {
          id: "add",
          label: "自增",
          inputType: "ByIncreasing",

          templateParam: [
            {
              rowParam: { gutter: [20] },
            },
          ],
          template: [
            { id: "add-str", inputType: "ByString", colParam: { span: 24 } },
            // { id: "add-str2", children: <Input></Input> },
          ],
        },
        // {
        //   id: "add",
        //   label: "自增",
        //   inputType: "ByIncreasing",
        //   Template: [
        //     {
        //       id: "add-str",
        //       inputType: "ByString",
        //       rules: [{ required: true, message: "Please enter user name" }],
        //     },
        //   ],
        // },
      ],
    },
    btnsParam: {
      //   size: 8,
      //   inline: true,
      //   style: { justifyContent: "flex-end" },
      btns: [
        {
          children: "取消",
          onClick: onclose,
        },
        {
          htmlType: "submit",
          type: "primary",
          callback: (val) => {
            console.log("----", val);
          },
        },
      ],
    },
  };
};
