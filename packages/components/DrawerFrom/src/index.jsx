import { Drawer, Form } from "antd";
import ByForm from "../../ByForm";
import FormAction from "../../ByForm/src/FormAction";

/**
 * 抽屉并表单
 * @param {*} param
 * @returns
 */

function DrawerForm({ form, formConfig, btnsParam, btnPostion, ...restProps }) {
  const [formPro] = Form.useForm(form);
  const otherProps = {
    [btnPostion ? "extra" : "footer"]: (
      <FormAction {...btnsParam} form={formPro} />
    ),
  };
  return (
    <Drawer {...otherProps} {...restProps}>
      <ByForm form={formPro} config={formConfig} layout="vertical" />
    </Drawer>
  );
}

export default DrawerForm;
