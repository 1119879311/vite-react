import React, { useEffect } from "react";
import { useRef } from "react";
import BaseEcharts from "./baseEcharts";
import * as echarts from "echarts";
import { echartsTitleOption1 } from "./echartOptions/title";
class Test1 extends React.Component {
  divRef = React.createRef();
  echartsRef = null;
  init() {
    this.echartsInstance =
      this.echartsInstance || echarts.init(this.divRef.current);
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: "ECharts 入门示例",
        ...echartsTitleOption1,
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    this.echartsInstance.setOption(option);
  }
  handleResize = () => {
    this.echartsInstance?.resize();
    console.log("res", this.echartsInstance);
  };
  componentDidMount() {
    this.init();
    window.addEventListener("resize", this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    this.echartsInstance = null;
  }

  render() {
    return <BaseEcharts width="100%" ref={this.divRef}></BaseEcharts>;
  }
}

// export default Test;
// function Test1() {
//   const divRef = useRef(null);
//   useEffect(() => {
//     console.log("-----", divRef);
//   });
//   return <BaseEcharts ref={divRef}></BaseEcharts>;
// }

export default Test1;
