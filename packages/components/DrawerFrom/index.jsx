import DrawerForm from "./src";

/**
 * 类型约束
 */
DrawerForm.propTypes = {};

/**
 * 默认值
 */
DrawerForm.defaultProps = {
  form: undefined, //表单实例
  formConfig: {}, // 表单配置 // 参考 ByFrom 组件
  btnsParam: {}, //按钮配置   // 参考 ByFormBtn 组件
  btnPostion: true, // 按钮位置 true: extra ;  false:footer
  //其他 Drawer 参数，参考 antd
};

export default DrawerForm;
