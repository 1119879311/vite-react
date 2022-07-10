import { Button, Space } from "antd";

/**
 * 按钮
 */

/**
 *  btnType: submit,reset,
 */

export const SubmitBtn = ({
  children = "确定",
  callback,
  onClick,
  form,
  ...ohterProps
}) => {
  const onHandle = (...args) => {
    if (onClick) return onClick(args);
    form?.validateFields().then((value) => {
      callback?.(value);
    });
  };
  return (
    <Button {...ohterProps} onClick={onHandle}>
      {children}
    </Button>
  );
};

export const ResetBtn = ({
  children = "重置",
  callback,
  onClick,
  form,
  ...ohterProps
}) => {
  const onHandle = (...args) => {
    if (onClick) return onClick(args);
    form?.resetFields();
    callback?.();
  };
  return (
    <Button {...ohterProps} onClick={onHandle}>
      {children}
    </Button>
  );
};

const BtnList = {
  submit: SubmitBtn,
  reset: ResetBtn,
};

const FormBtns = ({
  btns = [],
  inline = false,
  style = {},
  size = 8,
  form,
}) => {
  if (!Array.isArray(btns) || !btns.length) return null;
  return (
    <Space
      size={size}
      wrap
      style={{ display: inline ? "flex" : "inline-flex", ...style }}
    >
      {btns.map((item, key) => {
        let { htmlType, ...other } = item;
        const RenderCom = BtnList[htmlType] || Button;
        return <RenderCom key={key} {...other} form={form} />;
      })}
    </Space>
  );
};

export default FormBtns;
