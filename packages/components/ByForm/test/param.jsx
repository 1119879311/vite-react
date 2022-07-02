/* eslint-disable import/no-anonymous-default-export */
import { Checkbox, Button, Upload, message } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
function getFieldList(count = 10, prex = "", layout = false) {
  let result = [];
  for (let index = 0; index < count; index++) {
    if (layout) {
      layout = false;
    } else {
      layout = index === 6 ? "vertical" : false;
    }
    result.push({
      id: `${prex}-name-${index}`,
      label: prex + "-name------1" + index,
      inputType: "ByString",
      // inline: true,
      // inline: index % 6 === 1 ? true : false, // 独立占一行， rowParam,colParam
      defaultValue: index === 0 ? "123456" : undefined,
      // layout: layout,
      // layout: "vertical",
      rules: [{ required: true }],
      labelAfterDes: "?",
      labelBeforeDes: "!",
      labelWidth: "",

      // colParam: { style: { width: "240px" } },
    });
  }
  return result;
}

// 还有一个全局的默认配置
const ByFormLayoutConfig = {
  rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // column: 2, // 这里配置列的
};

// 一组的参数
const formOptions = (groupId = "") => ({
  onFormChange: (...arg) => {
    console.log("onFormChage-formList", ...arg);
  },
  deserialization: {},
  panelParam: {},
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // colParam: { style: { width: "20%" } },
  // column: 2, // 这里配置列的
  formList: [
    // 一行的
    {
      rowParam: { gutter: [40] },
      // colParam: { style: { width: "240px" } },
      column: 3, // 这里配置列的
      FieldList: getFieldList(5, groupId + "test-1"),
    },
    // 两行的
    {
      rowParam: { gutter: [40] },
      // colParam: {},
      // column: 4,
      FieldList: getFieldList(3, groupId + "test-2", true),
    },
  ],
});
export default formOptions();
export const GroupFormOptions = {
  onFormChange: (...args) => {
    console.log("onFormChage-formGroup", ...args);
  },
  deserialization: {},
  panelParam: { title: "" }, //
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // column: 2, // 这里配置列的
  formGroup: Array.from({ length: 2 }, (v, k) => formOptions(`group-${k}-`)),
};

export const flatFormOtions = {
  onFormChange: (...args) => {
    console.log("onFormChage-FieldList", ...args);
  },
  deserialization: {},
  panelParam: { title: "" }, //
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  colParam: { span: 24 },
  column: 0, // 这里配置列的
  FieldListParams: [
    // 这是每一组的参数u
    {
      // rowParam: { gutter: [40] },
      // colParam: { style: { width: "240px" } },
      // column: 2, // 这里配置列的
      belongRowParam: [
        //这是一行的配置参数
        {
          rowParam: {},
          // column: 2, // 这里配置列的
          colParam: {},
        },
      ],
    },
    {
      // belongGroud:null
      title: "分组二",
      belongRowParam: [
        {
          rowParam: {},
          // column: 3, // 这里配置列的
          colParam: {},
        },
      ],
    },
    {
      // belongGroud:null
      title: "分组三",
      belongRowParam: [
        {
          rowParam: {},
          column: 3, // 这里配置列的
          colParam: {},
        },
      ],
    },
  ],
  FieldList: [
    {
      id: "row-0",
      label: "row-0",
      inputType: "ByString",
      // belong: { group: 1, row: 1 }, //[null,0]
    },
    {
      id: "g1-row-0",
      label: "g1-row-0",
      inputType: "ByString",
      belong: { group: 0, row: 0 }, //[null,0]
    },
    {
      id: "g1-row-1",
      label: "g1-row-1",
      belong: { group: 0, row: 1 }, //[null,0]
    },
    {
      id: "g2-row-0",
      label: "g2-row-0",
      inputType: "ByString",
      belong: { group: 1, row: 0 }, //[null,0]
    },
    {
      id: "g2-row-1",
      label: "g2-row-1",
      inputType: "ByString",
      belong: { group: 1, row: 0 }, //[null,0]
    },
    {
      id: "row-1",
      label: "row-1",
      inputType: "ByString",
      // belong: { group: 1, row: 1 }, //[null,0]
    },
    {
      id: "row-2",
      label: "row-1",
      inputType: "ByString",
      // belong: { group: 1, row: 1 }, //[null,0]
    },
    {
      id: "checkbox1",
      label: "复选框",
      children: <Checkbox></Checkbox>,
      // rules: [
      //   { required: true, message: "Please Checkbox your favourite colors!" },
      // ],
      formItemParam: {
        valuePropName: "checked",
      },
      colParam: { span: 4 },
      // hidden: true,

      // hidden: true,
    },
    {
      id: "upload",
      formItemParam: {
        valuePropName: "fileList",
        getValueFromEvent: (e) => {
          console.log("Upload event:", e);
          if (Array.isArray(e)) {
            return e;
          }
          if (e?.file?.status === "error") {
            message.error("上传失败...");
          }
          return e?.fileList.filter((item) => item.status !== "error");
        },
      },
      children: (
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      ),
      belong: { group: 1, row: 1 },
    },
    {
      inline: true,
      noFormItem: true,
      // style: { color: "red" },
      children: <div>标题</div>,
      belong: { group: 1, row: 0 },
    },
    {
      // colParam: { style: { width: "240px" } },
      depIds: ["checkbox1"],
      shouldUpdate: (form, val) => {
        console.log("---", val, val?.checkbox1);
        return val?.checkbox1 ? { disabled: true, loading: true } : {};
      },
      label: "提交",
      children: <Button>提交</Button>,
      belong: { group: 1, row: 1 },
      layout: "vertical",
    },
  ],
};
