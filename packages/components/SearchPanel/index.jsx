/**
 *
 */
import { useForm } from "antd/lib/form/Form";

import ByForm from "../ByForm";
import FormAction from "../ByForm/src/formAction";
import { DatePicker } from "antd";
import { useRef } from "react";
const SearchPanel = () => {
  const [form] = useForm();
  const refs = useRef();
  const config = {
    onFormChange: (...args) => {
      console.log("onFormChage-FieldList", ...args);
    },
    rowParam: { gutter: [12, 0] },
    FieldList: [
      {
        id: "name",
        inputType: "ByString",
        modeType: "edit",
        renderText: (val) => val,
      },
      {
        id: "desc",
        afterNode: "12",
        beforeNode: "454",
        inputType: "ByString",
        modeType: "read",
        defaultValue: 121,
        renderText: (val) => val,
        // rules: [{ required: true }],
      },
      {
        id: "datetime",
        modeType: "edit",
        // inputType: "datetime",
        children: <DatePicker ref={refs}></DatePicker>,
        rules: [{ required: true }],
        renderText: (val) => val?.format?.("YYYY-MM-DD HH:mm:ss"),
      },
      {
        children: (
          <FormAction
            form={form}
            btns={[
              {
                htmlType: "submit",
                callback: (val) => {
                  console.log(val, refs);
                },
              },
              { htmlType: "reset" },
            ]}
          ></FormAction>
        ),
      },
    ],
  };
  return <ByForm form={form} config={config}></ByForm>;
};

export default SearchPanel;
