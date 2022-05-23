import React from "react";

import { Form, Input, Button, Space, Select } from "antd";
import ByForm from "../../../ByForm";

const ByInputGroup = (props) => {
  // const [form] = Form.useForm();
  let {
    Template = [],
    TemplateParam = [],
    fieldChange,
    onChange,
    id,
    value,
    form,
  } = props;
  let rid = Array.isArray(id) ? id : [id];
  const submit = () => {
    console.log(form.getFieldsValue());
    form
      .validateFields()
      .then((value) => {
        console.log("value", value);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="by-input-inputGroup">
      <Form component={false} initialValues={value} form={form} name={id}>
        <ByForm
          form={form}
          config={{
            FieldListParams: TemplateParam,
            FieldList: Template.map((item) => {
              let cid = Array.isArray(item.id) ? item.id : [item.id];
              return {
                ...item,
                id: [...cid],
              };
            }),
            onFormChange: (val, childId, allValues) => {
              typeof onChange === "function" && onChange(allValues);
              typeof fieldChange === "function" &&
                fieldChange(val, [...rid, ...childId], allValues);
            },
          }}
        ></ByForm>
      </Form>
    </div>
  );
};

// class ByInputGroup extends React.Component {
//   handleNumberChange = (e) => {
//     const number = e.target.value;

//     this.triggerChange({ number });
//   };

//   handleCurrencyChange = (currency) => {
//     this.triggerChange({ currency });
//   };

//   triggerChange = (changedValue) => {
//     const { onChange, value = {} } = this.props;

//     if (onChange) {
//       onChange({
//         ...value,
//         ...changedValue,
//       });
//     }
//   };

//   render() {
//     const {value, defaultValue = {} } = this.props;
//     let param1 =
//       value === undefined
//         ? { defaultValue: defaultValue.number }
//         : { value: value.number };
//     let param2 =
//       value === undefined
//         ? { defaultValue: defaultValue.currency }
//         : { value: value.currency };

//     return (
//      <div>
//           <ByForm
//         form={form}
//         config={{
//             FieldListParams: TemplateParam,
//             FieldList: Template.map((item) => {
//             let cid = Array.isArray(item.id) ? item.id : [item.id];
//             return {
//                 ...item,
//                 pathkey: [...rid, field.name, ...cid],
//                 id: [field.name, ...cid],
//             };
//             }),
//             onFormChange: (val, childId, allValues) => {
//             typeof fieldChange === "function" &&
//                 fieldChange(val, [...rid, ...childId], allValues);
//             },
//         }}
//         ></ByForm>
//      </div>
//     );
//   }
// }

ByInputGroup.FormFieldDecorator = {
  rules: [
    {
      validator: (_, value) => {
        let result = Object.values(value || {});
        return result.some((itme) => !itme)
          ? Promise.reject(new Error("必填项不能为空"))
          : Promise.resolve();
      },
    },
  ],
};

export default ByInputGroup;
