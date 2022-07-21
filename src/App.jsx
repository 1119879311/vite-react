import { Button } from "antd";
import { useState } from "react";

import BYDom from "../packages/components/index.TestDome";
import TestHooksRequest from "./test/hooks-request";
import TableEdit from "./test/table-edit-test";
import Dome from "./test/dome";
import DatePickerTest from "./test/datePicker";
import EchartsTest from "./components/echarts/test/index.test";
import Prewpdf from "./components/prewpdf";
import SearchPanel from "../packages/components/searchPanel";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Prewpdf></Prewpdf> */}
        <TestHooksRequest></TestHooksRequest>
        {/* <BYDom></BYDom> */}
        <SearchPanel></SearchPanel>
        {/* <DatePickerTest></DatePickerTest> */}
        {/* <EchartsTest></EchartsTest> */}
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
