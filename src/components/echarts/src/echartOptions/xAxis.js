/**
 * 直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，
 * 多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠
 */
export const echartxAxis = {
  show: true, // 是否显示 x 轴。

  gridIndex: 0, //x 轴所在的 grid 的索引，默认位于第一个 grid。

  alignTicks: true, // 在多个 x 轴为数值轴的时候，可以开启该配置项自动对齐刻度。只对'value'和'log'类型的轴有效。

  /**
   *  x 轴的位置。
   * 可选： 'top'，'bottom'
   * 默认 grid 中的第一个 x 轴在 grid 的下方（'bottom'），第二个 x 轴视第一个 x 轴的位置放在另一侧。
   * 注：若未将 xAxis.axisLine.onZero 设为 false , 则该项无法生效
   */
  position: "bottom",
  offset: 1,
  axisLine: {
    onZero: false,
  },

  /**
   * 坐标轴类型。
   * 可选：
   * 'value' 数值轴，适用于连续数据。
   * 'category' 类目轴，适用于离散的类目数据。
   *    为该类型时类目数据可自动从 series.data 或 dataset.source 中取，或者可通过 xAxis.data 设置类目数据。
   *
   * 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化
   * 'log' 对数轴。适用于对数数据。
   */
  type: "category",
  name: `{a|坐标轴名称。}{b|lll}`, //"坐标轴名称。", //坐标轴名称。

  /**
   * 坐标轴名称显示位置
   * 可选:'start' , 'middle' 或者 'center', 'end'
   *
   *
   */
  nameLocation: "center",

  //   formatter: (name) => `{a|这段文本采用样式${name}}`,
  /**
   * 坐标轴名称的文字样式。
   */
  nameTextStyle: {
    color: "red",
    fontSize: 18,
    padding: 0,

    rich: {
      a: {
        color: "#000",
      },
      b: {
        color: "red",
      },
    },
  },
  nameGap: 20, //坐标轴名称与轴线之间的距离。

  nameRotate: 180, // 坐标轴名字旋转，角度值

  inverse: false, //是否是反向坐标轴。

  boundaryGap: true, // 坐标轴两边留白策略,默认为 true，类目轴和非类目轴的设置和表现不一样。

  min: 2, //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。

  max: "dataMax", //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度
  //   max: function (value) {
  //     return value.max - 20;
  //   },

  scale: true, // 只在数值轴中（type: 'value'）有效。

  /**
   * 坐标轴的分割段数，需要注意的是这个分割段数只是个预估值
   * 在类目轴中无效。
   */
  splitNumber: 5,

  /**
   * 自动计算的坐标轴最小间隔大小。
   * 只在数值轴或时间轴中（type: 'value' 或 'time'）有效。
   */
  minInterval: 1,

  /**
   * 自动计算的坐标轴最大间隔大小
   * 只在数值轴或时间轴中（type: 'value' 或 'time'）有效。
   */
  maxInterval: 1,

  /**
   * 强制设置坐标轴分割间隔
   * 无法在类目轴中使用
   * 在时间轴（type: 'time'）中需要传时间戳，在对数轴（type: 'log'）中需要传指数值。
   */
  interval: 0,
  triggerEvent: null, //坐标轴的标签是否响应和触发鼠标事件，默认不响应。

  /**
   * 坐标轴轴线相关设置。
   */
  axisLine: {
    show: true, //是否显示坐标轴轴线。
    onZero: true, // X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
    onZeroAxisIndex: 0, //当有双轴时，可以用这个属性手动指定，在哪个轴的 0 刻度上。
    symbol: ["none", "arrow"], // 轴线两边的箭头。可以是字符串，表示两端使用同样的箭头 默认为none

    symbolSize: [10, 15], //轴线两边的箭头的大小，第一个数字表示宽度（垂直坐标轴方向），第二个数字表示高度（平行坐标轴方向

    symbolOffset: 30, //轴线两边的箭头的偏移，如果是数组，第一个数字表示起始箭头的偏移，第二个数字表示末端箭头的偏移

    /**
     * 坐标轴线线 的样式
     */
    lineStyle: {
      color: "red",
      width: 4,
      cap: "square",
    },
  },

  /**
   * 坐标轴刻度相关设置。
   */
  axisTick: {
    show: true, // 是否显示坐标轴刻度
    alignWithLabel: true, //证刻度线和标签对齐

    interval: 20, // 坐标轴刻度的显示间隔，在类目轴中有效。默认同 axisLabel.interval 一样。
    inside: true, //坐标轴刻度是否朝内，默认朝外。

    length: 10,
    width: 8,
    /**
     * 刻度样式设置
     */
    lineStyle: {
      color: "red",
    },
  },

  /**
   * 坐标轴刻度标签的相关设置。
   */
  axisLabel: {
    color: "#000", //刻度标签 颜色
    inside: false, // 刻度标签是否朝内，默认朝外。
    margin: 12, // 刻度标签与轴线之间的距离。
    formatter: "{value} kg",
    /**
     * // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
     */
    // formatter: function (value, index) {
    //     return value + 'kg';
    // }
  },

  /**
   * 坐标轴在 grid 区域中的分隔线。
   */
  splitLine: {
    show: true,
    /**
     * 坐标轴分隔线的显示间隔，在类目轴中有效。默认同 axisLabel.interval 一样。
     * 
     * 可以设置成 0 强制显示所有标签。
        如果设置为 1，表示『隔一个标签显示一个标签』，
        如果值为 2，表示隔两个标签显示一个标签，以此类推。
     */
    interval: "auto", //
    lineStyle: {
      color: "red",
      width: 4,
    },
  },
};
