import { Checkbox } from "antd";
import { ByFieldHoc } from "../../ByField";

const ByCheckbox = Checkbox;

/**
 * 类型约束
 */
ByCheckbox.propTypes = {};

/**
 * 默认值
 */
ByCheckbox.defaultProps = {};

/**
 * 接入表单的参数 getFieldDecorator
 */
ByCheckbox.FormFieldDecorator = {
  valuePropName: "checked",
};

export default ByFieldHoc(ByCheckbox);
