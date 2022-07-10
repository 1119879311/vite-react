import React from "react";
import { Switch, Form, DatePicker, Select, Input, Tooltip } from "antd";
import composeProps from "rc-util/es/composeProps";
const { RangePicker } = DatePicker;
function MyFormItemChildren(props) {
  const { render, children, ...rest } = props;
  // composeProps 合并执行 Form.Item 传的 onChange 以及组件本身的方法
  console.log("--------", rest, composeProps(children.props, rest, true));
  const _children = React.cloneElement(children, {
    ...children.props,
    ...rest,
  });
  console.log("-------_children", _children);
  if (render) {
    return render(_children);
  }
  return _children;
}

function MyFormItem(props) {
  const { render, children, inputParam, ...rest } = props;

  return (
    <Form.Item {...rest}>
      {React.isValidElement(children) ? (
        <MyFormItemChildren render={render} {...inputParam}>
          {children}
        </MyFormItemChildren>
      ) : (
        children
      )}
    </Form.Item>
  );
}

const Demo = () => {
  return (
    <Form labelCol={{ span: 4 }}>
      <MyFormItem
        label="date"
        name="date"
        rules={[{ required: true }]}
        inputParam={{ dateRender: (currentDate) => <div>1212</div> }}
        // render={(children) => (
        //   <div style={{ display: "flex", alignItems: "center" }}>
        //     <span style={{ marginRight: 5 }}>before</span>
        //     {children}
        //   </div>
        // )}
      >
        <RangePicker />
      </MyFormItem>
      <MyFormItem
        label="switch"
        name="switch"
        rules={[{ required: true }]}
        valuePropName="checked"
        render={(children) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 5 }}>before</span>
            {children}
          </div>
        )}
      >
        <Switch />
      </MyFormItem>
      <MyFormItem
        label="select"
        name="select"
        rules={[{ required: true }]}
        render={(children) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 5 }}>before</span>
            {children}
          </div>
        )}
      >
        <Select />
      </MyFormItem>
      <MyFormItem
        label="tooltip"
        name="tooltip"
        rules={[{ required: true }]}
        render={(children) => <Tooltip title="tooltip">{children}</Tooltip>}
      >
        <Input />
      </MyFormItem>
    </Form>
  );
};
export default Demo;
