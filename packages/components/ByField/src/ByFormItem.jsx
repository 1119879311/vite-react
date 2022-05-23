import { Form, Tooltip } from "antd";
import React, { Fragment } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import composeProps from "rc-util/es/composeProps";
import { get } from "../../../utils";

function ContaionerTipDes({ text }) {
  return (
    text && (
      <Tooltip placement="topRight" title={text}>
        <ExclamationCircleOutlined />
      </Tooltip>
    )
  );
}

/**
 *
 */
function ContaionerNode({ type = "info", text }) {
  return text && <span className={`by-input-${type}Node`}>{text}</span>;
}

function ContaionerNodeDes({ type, textNode, textDes }) {
  return (
    (textNode || textDes) && (
      <span className={`by-input-${type}Contaioner`}>
        <ContaionerNode type={type} text={textNode}></ContaionerNode>
        <ContaionerTipDes text={textDes}></ContaionerTipDes>
      </span>
    )
  );
}

function LabelNode(props) {
  let { label, labelAfterDes, labelBeforeDes } = props;
  if (label || labelAfterDes || labelBeforeDes) {
    return (
      <Fragment>
        {labelBeforeDes}
        {label}
        {labelAfterDes}
      </Fragment>
    );
  }
  return null;
}

function renderChildren(children, render, props = {}) {
  let { beforeNode, afterNode, beforeDes, afterDes } = props;
  let resultDom = (
    <div style={{ display: "flex" }}>
      <ContaionerNodeDes
        type="Before"
        textNode={beforeNode}
        textDes={beforeDes}
      ></ContaionerNodeDes>
      {children}
      <ContaionerNodeDes
        type="after"
        textNode={afterNode}
        textDes={afterDes}
      ></ContaionerNodeDes>
    </div>
  );
  if (typeof render === "function") {
    return render(resultDom);
  }
  return resultDom;
}

function ByFormItemChildren(props) {
  const {
    id,
    render,
    children,
    beforeNode,
    afterNode,
    beforeDes,
    afterDes,
    fieldChange,
    inputType,
    inputParam,
    fieldDecorator,
    ...rest
  } = props;

  if (!React.isValidElement(children)) {
    return renderChildren(children, render, {
      beforeNode,
      afterNode,
      beforeDes,
      afterDes,
    });
  }
  const { trigger, valuePropName } = fieldDecorator;

  // composeProps 合并执行 Form.Item 传的 onChange 以及组件本身的方法
  let childProp = composeProps(
    children.props,
    {
      ...inputParam,
      "data-id": id,
      id,
      ...rest,
    },
    true
  );

  const pickTypeList = ["ByIncreasing", "ByInputGroup"];
  if (pickTypeList.includes(inputType)) {
    childProp.fieldChange = fieldChange;
  }

  const eventTrigger = childProp[trigger];
  const _children = React.cloneElement(children, {
    ...childProp,
    [trigger]: (e) => {
      typeof eventTrigger === "function" && eventTrigger(e);
      typeof fieldChange === "function" &&
        fieldChange(e.target ? e.target[valuePropName] : e, id);
    },
  });
  return renderChildren(_children, render, {
    beforeNode,
    afterNode,
    beforeDes,
    afterDes,
  });
}

function ByFormItemRender(props) {
  let {
    label,
    labelAfterDes,
    labelBeforeDes,
    labelWidth,
    rules = [],
    formItemParam,
    layout,
    children,
    defaultValue,
    noInsertForm,
    ...restProps
  } = props;
  let className = [
    "by-input-formitem",
    layout && "by-input-formitem-" + layout,
  ];

  let _children = typeof children === "function" ? children() : children;
  let formFieldDecorator = {};
  let formItemName = restProps.id;
  if (React.isValidElement(_children)) {
    formFieldDecorator = _children.type.FormFieldDecorator || {};
  }
  if (noInsertForm) {
    formItemName = undefined;
  }

  let param = {
    ...formItemParam,
    ...formFieldDecorator,
    name: formItemName,
    initialValue: defaultValue,
    rules: [...(formFieldDecorator.rules || []), ...rules],
    label: LabelNode({ label, labelAfterDes, labelBeforeDes }),
    className: className.filter(Boolean).join(" "),
  };
  let fieldDecorator = {
    valuePropName: param.valuePropName || "value",
    trigger: param.trigger || "onChange",
  };
  return (
    <Form.Item {...param}>
      <ByFormItemChildren {...restProps} fieldDecorator={fieldDecorator}>
        {_children}
      </ByFormItemChildren>
    </Form.Item>
  );
}

function ByFormItem(props) {
  let { shouldUpdate, depIds = [], ...restProps } = props;
  if (shouldUpdate) {
    return (
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => {
          return depIds.some(
            (item) => get(prevValues, item) !== get(currentValues, item)
          );
        }}
      >
        {(form) => {
          return shouldUpdate(form, form.getFieldsValue(depIds)) ? (
            <ByFormItemRender {...restProps}></ByFormItemRender>
          ) : null;
        }}
      </Form.Item>
    );
  } else {
    return <ByFormItemRender {...restProps}></ByFormItemRender>;
  }
}

export default ByFormItem;
