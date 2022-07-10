import { Button } from "antd";
import { useState } from "react";

import BYDom from "../packages/components/index.TestDome";
import TestHooksRequest from "./test/hooks-request";
import TableEdit from "./test/table-edit-test";
import Dome from "./test/dome";
import DatePickerTest from "./test/datePicker";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TestHooksRequest></TestHooksRequest>
        <BYDom></BYDom>
        <DatePickerTest></DatePickerTest>
        {/* <InputTest></InputTest> */}
        {/* <Dome></Dome> */}
        {/* <TableEdit></TableEdit> */}
        {/* <InputTest></InputTest>
        <TestForm></TestForm> */}
      </header>
    </div>
  );
}

export default App;
