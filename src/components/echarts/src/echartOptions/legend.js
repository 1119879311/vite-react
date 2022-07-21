/**
 * 图例组件
 */
export const echartlegend = {
  /**
     * 图例的类型。可选值：
        'plain'：普通图例。缺省就是普通图例。
        'scroll'：可滚动翻页的图例。当图例数量较多时可以使用
     */
  type: "scroll",

  id: "id11", // 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件。

  show: true, // 显示组件

  zlevel: 10, // 所有图形的 zlevel 值

  z: 2, // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。

  /**
   * 图例组件离容器左侧的距离
   * 可选值： 数字 如 20 | 百分比如 20%| 'left' | 'center ' | 'right'
   */
  left: "center",

  /**
   * 图例组件离容器上侧的距离。
   * 可选值：数字 20 | 百分比 20% |'top' | 'middle' |  'bottom'
   */
  top: "auto",

  /**
   *  图例组件离容器右侧的距离。
   * 可选值：数字 20 | 百分比 20%
   */
  right: "auto",

  /**
   *  图例组件离容器下侧的距离。
   * 可选值：数字 20 | 百分比 20%
   */
  bottom: 0,

  width: "auto", // 图例组件的宽度。默认自适应。

  height: "auto", // 图例组件的高度。默认自适应。

  /**
   * 图例标记和文本的对齐。默认自动
   * 当组件的 left 值为 'right' 以及纵向布局（orient 为 'vertical'）的时候为右对齐，即为 'right'
   * 可选：'auto'|'left'|'right'
   */
  align: "left", //

  padding: 5, // 图例内边距，单位px，默认各方向内边距为5 ,[5,5,5,5]

  itemGap: 40, // 图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。

  //   itemWidth: 30, // 图例标记的图形宽度。

  //   itemHeight: 30, // 图例标记的图形高度。

  /**
   * 图例的图形样式。其属性的取值为 'inherit' 时，表示继承系列中的属性值。
   */
  itemStyle: {
    color: "red", //图形的颜色。

    borderColor: "#000", //  图形的描边颜色。支持的颜色格式同 color，不支持回调函数

    borderWidth: 4, // 描边宽度

    borderType: "solid", // 描边类型。, 'solid' 'dashed'   'dotted'

    /**
     * // 用于指定线段末端的绘制方式，可以是：
     * 'butt': 线段末端以方形结束
     * 'round': 线段末端以圆形结束。
     * 'square': 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。
     * 默认： butt
     */
    borderCap: "round",

    /**
     * 于设置2个长度不为0的相连部分 ,可以取值为：  'bevel'，round，miter  默认bevel
     */
    borderJoin: "bevel",

    /**
     * 图形阴影的模糊大小。
     * 该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果
     */
    shadowBlur: 10,
    shadowColor: "yellow", // 阴影颜色
    shadowOffsetX: 10, // 阴影水平方向上的偏移距离。
    shadowOffsetY: 10, // 阴影垂直方向上的偏移距离。

    opacity: 1, // 图形透明度
  },

  /**
   * 图例图形中线的样式，用于诸如折线图图例横线的样式设置。
   * 其属性的取值为 'inherit' 时，表示继承系列中的属性值
   */
  lineStyle: {
    color: "#000", //线的颜色。
    width: "auto", // 线宽。 为0 ，线不存在
    type: [0, 0], // 线的类型。可选： solid | dashed | dotted

    dashOffset: 0, // 用于设置虚线的偏移量，可搭配 type 指定 dash array 实现灵活的虚线效果

    /**
     * 于指定线段末端的绘制方式
     *  'butt': 线段末端以方形结束。
        'round': 线段末端以圆形结束。
        'square': 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域
     */
    cap: "round",

    /**
     * 用于设置2个长度不为0的相连部分
     *  'bevel': 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
        'round': 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
        'miter': 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域
     */
    join: "round",

    opacity: 1, // 图形透明度
  },

  symbolRotate: 90, //图形旋转角度，类型为 number | 'inherit'。如果为 'inherit'，表示取系列的 symbolRotate。

  /**
   * 用来格式化图例文本，支持字符串模板和回调函数两种形式。
   */
  //   formatter: "Legend {name}",
  formatter: function (name) {
    return `{a| Legend  +  ${name}}`;
  },

  /**
   * 图例选择的模式
   * 控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭
   * 以设成 'single' 或者 'multiple' 使用单选或者多选模式
   */
  selectedMode: true,

  inactiveColor: "red", //图例关闭时的颜色。

  inactiveBorderColor: "red", // 图例关闭时的描边颜色

  /**
   * 图例关闭时的描边粗细。
   * 如果为 'auto' 表示：如果系列存在描边，则取 2，
   * 如果系列不存在描边，则取 0。
   * 如果为 'inherit' 则表示：始终取系列的描边粗细。
   */
  inactiveBorderWidth: "auto",

  selected: {
    销量1: true,
    销量2: true,
  },

  /**
   * 图例的公用文本样式
   */
  textStyle: {
    color: "#000",
    // ...其他的基本样式

    rich: {
      a: {
        color: "green",
      },
    },
  },
  /**
   * 图例的 tooltip 配置，配置项同 tooltip。默认不显示，
   * 可以在 legend 文字很多的时候对文字做裁剪并且开启 tooltip，
   */
  tooltip: {
    show: true,
  },
  icon: "circle",
  /**
   * 图例的数据数组。数组项通常为一个字符串，每一项代表一个系列的 name（如果是饼图，也可以是饼图单个数据的 name）
   * 图例组件会自动根据对应系列的图形标记（symbol）来绘制自己的颜色和标记，
   * 特殊字符串 ''（空字符串）或者 '\n'（换行字符串）用于图例的换行
   *
   * 如果 data 没有被指定，会自动从当前系列中获取。
   * 多数系列会取自 series.name 或者 series.encode 的 seriesName 所指定的维度。
   * 如 饼图 and 漏斗图 等会取自 series.data 中的 name。
   */
  data: [
    {
      name: "销量1",
      icon: "circle",
      // itemStyle

      // lineStyle
      // textStyle
    },
  ],

  backgroundColor: "red", //图例背景色，默认透明。

  borderColor: "#000", //图例的边框颜色。支持的颜色格式同 backgroundColor。

  borderWidth: 2, //图例的边框线宽。

  borderRadius: 10, //圆角半径，单位px，支持传入数组分别指定 4 个圆角半径

  shadowBlur: 2, //图形阴影的模糊大小 ,属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。

  /**
   * 图例当前最左上显示项的 dataIndex。
   * legend.type 为 'scroll' 时有效。
   */
  scrollDataIndex: 2,

  /**
   * 图例控制块中，按钮和页信息之间的间隔。
   * legend.type 为 'scroll' 时有效。
   */
  pageButtonItemGap: 10,

  /**
   * 图例控制块和图例项之间的间隔。
   * legend.type 为 'scroll' 时有效。
   */
  pageButtonGap: 10,

  /**
   * 图例控制块的位置。legend.type 为 'scroll' 时有效
   * 可选值为
   * 'start'：控制块在左或上。
     'end'：控制块在右或下。
   * 
   */
  pageButtonPosition: "end",

  pageFormatter: "分页{current}/{total}",

  pageIconColor: "red", //翻页按钮的颜色

  pageIconInactiveColor: "#333", //翻页按钮不激活时（即翻页到头时）的颜色。

  pageIconSize: 18, // 翻页按钮的大小。可以是数字，也可以是数组，如 [10, 3]，表示 [宽，高]
  /**
   * 翻页按钮图标。
   * [previous page button, next page button]
   * 默认值：  ['M0,0L20,0L10,-20z', 'M0,0L20,0L10,20z']
   */
  pageIcons: {
    horizontal: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"],
    vertical: ["M0,0L20,0L10,-20z", "M0,0L20,0L10,20z"],
  },

  /**
   * 图例 分页信息的文字样式
   */
  pageTextStyle: {
    fontSize: 18,
    color: "red",
  },

  selector: [
    {
      type: "all or inverse",
      // 可以是任意你喜欢的 title
      title: "全选",
    },
    {
      type: "inverse",
      title: "反选",
    },
  ],
  /**
   * 全选反选文字样式配置
   */
  selectorLabel: {
    fontSize: 20,
    borderColor: "red",
    color: "red",
  },

  /**
   * 选择器的位置，可以放在图例的尾部或者头部，对应的值分别为 'end' 和 'start'
   */
  selectorPosition: "end",

  /**
   * 选择器按钮之间的间隔。
   */
  selectorItemGap: 50,

  selectorButtonGap: 50, //选择器按钮与图例组件之间的间隔。
};
