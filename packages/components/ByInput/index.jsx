import { Input } from "antd";
import ByField, { ByFieldHoc } from "../ByField";
import ByCheckbox from "./ByCheckbox";

import ByInputGroup from "./ByInputGroup";

import ByIncreasing from "./ByIncreasing";

import BySelect from "./BySelect";

const ByString = ByFieldHoc(Input);

// export { ByCheckbox, ByInputGroup, ByIncreasing, BySelect, ByString };

const ByInputList = {
  ByCheckbox,
  ByInputGroup,
  ByIncreasing,
  BySelect,
  ByString,
};

export default (props) => {
  let { inputType, ...restProps } = props;
  let Components = ByInputList[inputType];
  return Components ? (
    <Components {...restProps} inputType={inputType}></Components>
  ) : (
    <ByField {...restProps}></ByField>
  );
};
