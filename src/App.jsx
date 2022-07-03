import { Button } from "antd";
import { useState } from "react";

import BYDom from "../packages/components/index.TestDome";
import TestHooksRequest from "./test/hooks-request";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TestHooksRequest></TestHooksRequest>
        <BYDom></BYDom>

        {/* <InputTest></InputTest>
        <TestForm></TestForm> */}
      </header>
    </div>
  );
}

export default App;
