import { Button, Form, Tooltip } from "antd";
import React, { Fragment } from "react";
import { ExclamationCircleOutlined, EditOutlined } from "@ant-design/icons";
import composeProps from "rc-util/es/composeProps";
import { get, isArray, isBool, isObj } from "../../../utils";
import { namespacePrefix } from "../../../config";
import { renderEditChildren, FieldRead } from "./FieldText";

const compSelector = "field-";

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
  return (
    text && (
      <span className={`${namespacePrefix}${compSelector}${type}Node`}>
        {text}
      </span>
    )
  );
}

function ContaionerNodeDes({ type, textNode, textDes }) {
  return (
    (textNode || textDes) && (
      <span className={`${namespacePrefix}${compSelector}${type}Contaioner`}>
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

function renderChildren({
  children,
  fieldDecorator,
  onFormChange,
  fieldChange,
  modeType,
  renderText,
  id,
  inputParam = {},
  ...baseProps
}) {
  if (!children || typeof children === "string") {
    return children;
  }
  const { trigger, valuePropName } = fieldDecorator || {};
  let childrenProp = {
    "data-formid": id,
    ...baseProps,
    ...inputParam,
  };
  if (modeType === "read") {
    return (
      <FieldRead valuePropName={valuePropName} {...childrenProp}></FieldRead>
    );
  }
  const eventTrigger = childrenProp[trigger];
  const _children = React.cloneElement(children, {
    ...childrenProp,
    ...children.props,
    [trigger]: (e) => {
      eventTrigger?.(e);
      const result = e?.target ? e.target[valuePropName] : e;
      onFormChange?.(result, id);
      fieldChange?.(result, id);
    },
  });
  return renderEditChildren(_children, { modeType, renderText, valuePropName });
}

function RenderChildrenWrap({
  beforeNode,
  afterNode,
  beforeDes,
  afterDes,
  children,
}) {
  let resultDom = (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <ContaionerNodeDes
        type="before"
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
function ByFormItemChildren({
  beforeNode,
  afterNode,
  beforeDes,
  afterDes,
  render,
  ...baseProps
}) {
  const resultProps = {
    beforeNode,
    afterNode,
    beforeDes,
    afterDes,
    render,
    children: renderChildren(baseProps),
  };
  return <RenderChildrenWrap {...resultProps}></RenderChildrenWrap>;
}

function ByFormItemRender(props) {
  let {
    label,
    labelAfterDes,
    labelBeforeDes,
    rules = [],
    formItemParam,
    layout,
    children,
    defaultValue,
    noInsertForm,
    ...restProps
  } = props;
  let className = [
    `${namespacePrefix}${compSelector}formitem`,
    layout && `${namespacePrefix}${compSelector}formitem-` + layout,
  ];

  let _children = typeof children === "function" ? children(props) : children;
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
    hidden: restProps.hidden,
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
    depIds = isBool(depIds) || isArray(depIds) ? depIds : [];
    return (
      <Form.Item
        noStyle
        shouldUpdate={
          isBool(depIds)
            ? depIds
            : (prevValues, currentValues) => {
                return depIds.some(
                  (item) => get(prevValues, item) !== get(currentValues, item)
                );
              }
        }
      >
        {(form) => {
          let result = shouldUpdate(form, form.getFieldsValue(depIds));
          // 结果是：布尔值，是否隐藏逻辑处理，
          // 对象的，修改某些参数 {}
          if (isBool(result)) {
            return result ? (
              <ByFormItemRender {...restProps}></ByFormItemRender>
            ) : null;
          }
          result = isObj(result) ? result : {};
          return (
            <ByFormItemRender
              {...restProps}
              {...(result || {})}
            ></ByFormItemRender>
          );
        }}
      </Form.Item>
    );
  } else {
    return <ByFormItemRender {...restProps}></ByFormItemRender>;
  }
}

export default ByFormItem;
