import { Form, Tooltip } from "antd";
import React, { Fragment } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import composeProps from "rc-util/es/composeProps";
import { get, isArray, isBool, isObj } from "../../../utils";
import { namespacePrefix } from "../../../config";
import FieldText from "./FieldText";
import { useState } from "react";

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
const modeTypeList = ["read", "edit"];
function renderChildren(children, render, props = {}) {
  const {
    beforeNode,
    afterNode,
    beforeDes,
    afterDes,
    modeType = "input",
    isOpenEdit,
    setIsOpenEdit,
  } = props;
  // const [isOpenEdit, setIsOpenEdit] = useState(false);

  const childProp = children?.props || {};

  let resultChild = null;
  if (modeTypeList.includes(modeType) && !isOpenEdit) {
    resultChild = (
      <FieldText
        modeType={modeType}
        {...childProp}
        setIsOpenEdit={setIsOpenEdit}
      />
    );
  } else {
    resultChild = children;
  }
  // const resultChild = modeTypeList.includes(modeType) ? (
  //   <FieldText modeType={modeType} {...childProp} setOpen={setOpen}/>
  // ) : (
  //   children
  // );
  let resultDom = (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <ContaionerNodeDes
        type="Before"
        textNode={beforeNode}
        textDes={beforeDes}
      ></ContaionerNodeDes>
      {resultChild}
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
    modeType = "input", // read,edit,editRead
    onFormChange,
    ...rest
  } = props;
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  if (!React.isValidElement(children)) {
    return renderChildren(children, render, {
      beforeNode,
      afterNode,
      beforeDes,
      afterDes,
      modeType,
      isOpenEdit,
      setIsOpenEdit,
    });
  }
  const { trigger, valuePropName } = fieldDecorator;

  // composeProps 合并执行 Form.Item 传的 onChange 以及组件本身的方法
  let childProp = {
    "data-id": id,
    id,
    ...rest,
    ...inputParam,
  };
  const eventTrigger = childProp[trigger];

  const _children = React.cloneElement(children, {
    ...childProp,
    ...children.props,
    onBlur: (...args) => {
      childProp?.onBlur?.(...args);
      modeTypeList.includes(modeType) && setIsOpenEdit(false);
    },
    // ...composeProps(children.props, childProp),
    [trigger]: (e) => {
      onFormChange?.(e.target ? e.target[valuePropName] : e, id);
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
    modeType,
    isOpenEdit,
    setIsOpenEdit,
  });
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
