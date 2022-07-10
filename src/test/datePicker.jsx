import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
// import "./index.css";
import { DatePicker, Space, Input } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const onChange = (dates, dateStrings) => {
  // if (dates) {
  //   console.log("From: ", dates[0], ", to: ", dates[1]);
  //   console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  // } else {
  //   console.log("Clear");
  // }
};

const App = () => {
  const [open, setOpen] = useState(false);
  const domRef = useRef(null);
  useEffect(() => {
    if (!domRef.current && open) {
      domRef.current = document.querySelector(".rangePicker-body");
    }
  }, [open]);
  return (
    <Space direction="vertical" size={12}>
      <div>日期组件RangePicker，自定义弹出面板里面的加了输入框无法输入</div>
      <RangePicker
        dropdownClassName="rangePicker-body"
        onFocus={() => {
          setOpen(true);
        }}
        onBlur={(e) => {
          e.persist();
          console.log(
            "----",
            domRef.current,
            domRef.current.contains(e.target)
          );
          if (domRef.current && !domRef.current.contains(e.relatedTarget)) {
            setOpen(false);
          }
          console.log("-onBlur--", domRef.current);
          console.log("-onBlur--", e);
        }}
        onOk={() => {
          console.log("--ok--");
        }}
        onPanelChange={(date, dateStr) => {
          console.log("--onPanelChange-", dateStr);
        }}
        open={open}
        panelRender={(dateNode) => {
          return (
            <div
              onMouseDown={(e) => {
                // e.persist();
                e.stopPropagation();
              }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Input placeholder="请输入,怎么输入不了啊" />
              {dateNode}
            </div>
          );
        }}
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
        onChange={onChange}
      />
    </Space>
  );
};

export default App;
