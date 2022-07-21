import { Col, Row } from "antd";
import BaeTest from "../src/baseEcharts";
import Test1 from "../src/EchartTest1";
import Test2 from "../src/EachrtsTest2";
import Test3 from "../src/EachrtsTest3";

const TestList = [Test1, Test2, Test3];

function EchartsTest() {
  return (
    <div>
      <Row wrap gutter={[40, 40]}>
        {TestList.map((Item, key) => (
          <Col key={key} span={24}>
            <Item></Item>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default EchartsTest;
