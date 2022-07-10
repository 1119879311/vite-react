import { inputListInstance } from "./src";
import Dome1 from "./test/index.test";
import { byInputList } from "../ByInput/index";
inputListInstance.set(byInputList);
export default () => {
  return (
    <>
      <Dome1></Dome1>
    </>
  );
};
