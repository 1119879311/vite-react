import ByForm, { ByFormLayout } from "./src";
export { ByFormLayout };

const defaultProps = () => ({
  form: undefined,
  config: {
    rowParam: { gutter: [12] },
    onFormChange: undefined,
    colParam: undefined,
    column: 0, // 这里配置列的

    // 控件 方式一
    FieldListParams: undefined,
    FieldList: undefined,

    // 控件 方式二： 行
    formList: undefined,

    // 控件 方式三：组
    formOptions: undefined,
  },
  //其他为Form 参数
});

ByFormLayout.defaultProps = defaultProps();

/**
 * 类型约束
 */
ByForm.propTypes = {};

/**
 * 默认值
 */
// 其他为form 参数 ,参考antd form
ByForm.defaultProps = defaultProps();

// rowParam: { gutter: [40] }
export default ByForm;
