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
      },
      {
        id: "desc",
        inputType: "ByString",
        rules: [{ required: true }],
      },
      {
        id: "datetime",
        // inputType: "datetime",
        children: <DatePicker></DatePicker>,
        rules: [{ required: true }],
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
