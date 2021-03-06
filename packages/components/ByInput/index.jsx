import React, { forwardRef } from "react";
import { Input } from "antd";
import ByField from "../ByField";
import ByCheckbox from "./ByCheckbox";
// import ByInputGroup from "./ByInputGroup";

import ByIncreasing from "./ByIncreasing";

import BySelect from "./BySelect";

// export const ByFieldHoc = (Child) => {
//   return (props) => (
//     <ByField {...props}>
//       <Child />
//     </ByField>
//   );
// };

// const ByString = ByFieldHoc(Input);
const ByInput = forwardRef((props, ref) => {
  return <Input ref={ref} {...props}></Input>;
});
export const byInputList = {
  ByCheckbox,
  ByIncreasing,
  BySelect,
  ByString: ByInput,
};

export default (props) => {
  let { inputType, children: Children, ...restProps } = props;
  if (React.isValidElement(Children))
    return <Children {...restProps}></Children>;
  let Components = ByInputList[inputType];
  return <ByField {...restProps}>{Components && <Component />}</ByField>;
};
