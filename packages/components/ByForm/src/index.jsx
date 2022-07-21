import React, { Component, Fragment, useMemo } from "react";
import { Row, Col, Input, Form } from "antd";
import ByField from "../../ByField";
import { TramfromGroupFormFieldList } from "./uilt";
import { deepMerge, pick, get, isString } from "../../../utils";
import "./index.less";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { namespacePrefix } from "../../../config";

const compSelector = "form-";

// 将控件列表提供给外部设置
class InputList {
  constructor() {
    // 控件列表
    this.control = {};
    // 控件默认全局参数 Form.item
    this.controlFormItemParam = {};
  }

  set(data = {}) {
    this.control = { ...this.control, ...data };
  }
  setParam(data = {}) {
    this.controlFormItemParam = { ...this.controlFormItemParam, ...data };
  }
}

export const inputListInstance = new InputList();

//完全自定义内容，不输入表单控件
function NoFormItemChildren({ children: Child }) {
  return Child;
}

// 渲染控件
function RenderColChild({ children, inputType, formItemParam, ...reseProps }) {
  let resustChild = children;
  let ConstomComponent = inputListInstance.control?.[inputType];
  if (!children && ConstomComponent) {
    resustChild = isString(ConstomComponent) ? (
      ConstomComponent
    ) : (
      <ConstomComponent />
    );
  }

  if (formItemParam) {
    formItemParam = {
      ...formItemParam,
      ...(inputListInstance.controlFormItemParam?.[inputType] || {}),
    };
  }
  return (
    <ByField {...reseProps} formItemParam={formItemParam} inputType={inputType}>
      {resustChild}
    </ByField>
  );
}
/**
 *  渲染一列
 */
const RenderSingleCol = (props) => {
  let { colParam, fieldParam, onFormChange, form } = props;
  let { noFormItem = false, ...fieldProps } = fieldParam;

  let className = [
    `${namespacePrefix}${compSelector}col-item`,
    colParam.className || "",
    fieldProps.hidden && `${namespacePrefix}${compSelector}-col-hidden`,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Col {...colParam} className={className}>
      {noFormItem ? (
        <NoFormItemChildren {...fieldProps} />
      ) : (
        <RenderColChild
          form={form}
          {...fieldProps}
          onFormChange={onFormChange}
        />
      )}
    </Col>
  );
};

/**
 *  渲染一行(多列的布局)
 * @param {*} props
 * @returns
 */
function RenderFormCol(props) {
  let { FieldList, column, onFormChange } = props;
  let colParamCommon = props.colParam || {};
  let rowParamCommon = props.rowParam || {};
  let colSpan =
    typeof column === "number" && !isNaN(column)
      ? Math.ceil(24 / column)
      : null;
  let result = [];
  FieldList.forEach((inputField, index) => {
    let { colParam = {}, inline, belong, ...fieldParam } = inputField;
    let renderColParam = {
      colParam: deepMerge({ ...colParamCommon }, colParam),
      fieldParam,
      form: props.form,
      onFormChange,
      key: fieldParam.key !== undefined ? fieldParam.key : index,
    };
    // 计算列
    if (colSpan !== null) {
      let { colParam } = renderColParam;
      renderColParam.colParam = { span: colSpan, ...colParam };
    }
    // 判断是否独占一行
    if (inline) {
      let style = renderColParam.colParam.style || {};
      renderColParam.colParam.style = { ...style, width: "100%" };
    }
    let isWidth = get(renderColParam.colParam, ["style", "width"]);
    if (isWidth) {
      renderColParam.colParam.span = undefined;
    }

    result.push(<RenderSingleCol {...renderColParam}></RenderSingleCol>);
  });
  let { className, ...otherRowParam } = rowParamCommon;
  // className = [`${namespacePrefix}${compSelector}row-itme`, className || ""].join(" ");
  return result.length ? (
    <Row
      {...otherRowParam}
      className={[
        `${namespacePrefix}${compSelector}row-itme`,
        className || "",
      ].join(" ")}
      type="flex"
    >
      {result}
    </Row>
  ) : null;
}

// 渲染多行的布局
function RenderFormRow(props) {
  // rowParam: { gutter: [40] },
  // colParam: { style: { width: "240px" } },
  // column: 3, // 这里配置列的
  let { formList, onFormChange, form } = props;
  let mergeKeys = ["rowParam", "colParam", "column"];
  let comParam = pick(props, mergeKeys);
  if (Array.isArray(formList)) {
    return formList.map((itme, index) => (
      <RenderFormCol
        key={index}
        {...itme}
        {...deepMerge({ ...comParam }, pick(itme, mergeKeys))}
        onFormChange={onFormChange}
        form={form}
      ></RenderFormCol>
    ));
  }
  return null;
}
/**
 * 渲染组的布局
 * @param {*} props
 * @returns
 */
function RenderFormGroup(props) {
  let { formGroup, onFormChange, form } = props;
  if (Array.isArray(formGroup) && formGroup.length) {
    let mergeKeys = ["rowParam", "colParam", "column"];
    return formGroup.map((itme, index) => (
      <Fragment key={index}>
        {/* <div>{itme.title}</div> ** 渲染分组模板  */}

        <RenderFormRow
          {...itme}
          {...deepMerge(pick(itme, mergeKeys), pick(props, mergeKeys))}
          onFormChange={onFormChange}
          form={form}
        ></RenderFormRow>
      </Fragment>
    ));
  }
  return null;
}

function ByFieldListLayout(props) {
  let { FieldList = [], FieldListParams = [], form, ...otherConfig } = props;
  let formGroup = useMemo(
    () => TramfromGroupFormFieldList(FieldList, FieldListParams),
    [FieldList, FieldListParams]
  );
  return (
    <RenderFormGroup
      {...otherConfig}
      formGroup={formGroup}
      form={form}
    ></RenderFormGroup>
  );
}

// 一个完整的表单布局，不涉及数据处理,单纯布局

export class ByFormLayout extends Component {
  renderForm = () => {
    let { config, form } = this.props;
    if (!config) return null;

    // 行
    if (config.formList) {
      return <RenderFormRow {...config} form={form}></RenderFormRow>;
    }
    // 组

    if (config.formGroup) {
      return <RenderFormGroup {...config} form={form}></RenderFormGroup>;
    }
    //列,要手动构建
    if (config.FieldList) {
      return <ByFieldListLayout {...config} form={form}></ByFieldListLayout>;
    }
    return null;
  };
  render() {
    return <div className={`${namespacePrefix}form`}>{this.renderForm()}</div>;
  }
}

const ByForm = forwardRef(({ config, form, ...formParam }, ref) => {
  const [forms] = Form.useForm(form);
  //将form 实例 暴露给外面, 提供给类组件中获取
  useImperativeHandle(ref, () => forms);
  return (
    <Form form={forms} {...formParam}>
      <ByFormLayout config={config} form={form} />
    </Form>
  );
});
export default ByForm;
