import { forwardRef } from "react";
export default forwardRef(
  ({ style = {}, width = "400px", height = "300px", ...baseProps }, ref) => {
    return (
      <div {...baseProps} style={{ width, height, ...style }} ref={ref}></div>
    );
  }
);
