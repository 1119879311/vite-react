import ByUpload from "./upload";
import { message } from "antd";
/**
 * 类型约束
 */
ByUpload.propTypes = {};

/**
 * 默认值
 */
ByUpload.defaultProps = {};
// BySelect.defaultProps = {
//   fieldMapValue: "value",
//   fieldMapLabel: "label",
// };

/**
 * 接入表单的参数 getFieldDecorator
 */
ByUpload.FormFieldDecorator = {
  valuePropName: "fileList",
  getValueFromEvent: (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e?.file?.status === "error") {
      message.error("上传失败...");
    }
    return e?.fileList.filter((item) => item.status !== "error");
  },
};

export default ByUpload;
