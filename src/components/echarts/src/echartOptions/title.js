// title 参数详解

export const echartsTitleOption1 = {
  id: null, // 组件 ID。默认不指定。指定则可用于在 option 或者 API 中引用组件

  show: true, // 是否显示标题组件。

  //   text: " 这是标题------------------------", // 主标题文本，支持使用 \n 换行。
  text: ["{a|这是主标题1----------}", "{b|(这是主标题1---------)}"].join(""),

  link: " http://www.baidu.com",

  target: "blank", //指定窗口打开主标题超链接。可选 'self' 当前窗口打开 'blank' 新窗口打开

  /**
   * 主标题 样式
   */
  textStyle: {
    color: "red", //主标题文字的颜色

    /**
     * 主标题文字字体的风格。
     *
     * @parma {string}
     * 可选  'normal'|'italic'|'oblique'
     *
     */
    fontStyle: "normal",

    /**
     * 主标题文字字体的粗细
     * @parma {string | number}
     * 可选：    'normal'
                'bold'
                'bolder'
                'lighter'
                100 | 200 | 300 | 400...
     */
    fontWeight: "bolder",

    /**
     * 主标题文字的字体系列
     *
     * @parma {string}
     *
     * 可选：  'serif' , 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei', ...
     */
    fontFamily: "sans-serif",

    /**
     * 主标题文字的字体大小。
     * @parma {number}
     */
    fontSize: 40,

    lineHeight: 50, // 行高

    width: 200, //文本显示宽度。

    height: 20, //文本显示高度。

    textBorderColor: "#333", // 文字本身的描边颜色。

    textBorderWidth: 10, // 文字本身的描边宽度

    /**
     * 文字本身的描边类型。
     * @param {string | number| Array}
     * 可选 
     *  'solid'
        'dashed'
        'dotted'
         10         v5.0.0+
         [10,20]    v5.0.0+
     * 
     */
    textBorderType: [10, 20],

    textBorderDashOffset: 5, //用于设置虚线的偏移量，可搭配 textBorderType 指定 dash array 实现灵活的虚线效果。

    textShadowColor: "blue", //文字本身的阴影颜色。

    textShadowBlur: 10, // 文字本身的阴影长度。

    textShadowOffsetX: 10, //文字本身的阴影 X 偏移

    textShadowOffsetY: 10, //文字本身的阴影 y 偏移

    /**
     * 文字超出宽度是否截断或者换行。配置width时有效
     * 
     * @param {string}
     * 可选
     *  'truncate' 截断，并在末尾显示ellipsis配置的文本，默认为...
        'break' 换行
        'breakAll' 换行，跟'break'不同的是，在英语等拉丁文中，'breakAll'还会强制单词内换行
     */
    overflow: "truncate",

    ellipsis: "...", // 在overflow配置为'truncate'的时候，可以通过该属性配置末尾显示的文本。

    /**
     * 在 rich 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果
     */
    rich: {
      a: {
        // 这里的key 值为  对应  text 属性值: ["{a|动态数据}", "{b|(全区)}"].join("")
        color: "red",
        // padding: [20],
        //  其他属性
      },
      b: {
        color: "#fff",
        //  其他属性
      },
    },
  },

  /**
   *  --------------------- 副标题 配置 ，和主标题配置一致------------------
   */
  subtext: ["{a|副标题1}", "{b|(副标题2)}"].join(""), // 副标题文本，支持使用 \n 换行

  sublink: "", // 副标题文本超链接。

  subtarget: "blank", // 指定窗口打开副标题超链接

  /**
   * 副标题文本样式配置, 和主标题文本样式配置基本一致
   */
  subtextStyle: {
    /**
     * 文字水平对齐方式，默认自动。rich 中如果没有设置 align，则会取父层级的 align
     * 可选：  'left' | 'center' | 'right'
     */
    align: "right", //

    /**
     * 文字垂直对齐方式，默认自动。rich 中如果没有设置 align，则会取父层级的 align
     * 可选：  'top' | 'middle' | 'bottom'
     */
    verticalAlign: "",
    width: 40, //文本显示宽度
    rich: {
      a: {
        // 这里的key 值为  对应  text 属性值: ["{a|动态数据}", "{b|(全区)}"].join("")
        color: "red",
        //  其他属性
      },
      b: {
        color: "#fff",
        //  其他属性
      },
    },
  },

  /**
   * 整体（包括 text 和 subtext）的水平对齐
   *
   * 可选值：'auto'、'left'、'right'、'center'
   */
  textAlign: "left",

  /**
   *  整体（包括 text 和 subtext）的水平对齐。
   *
   * 可选值：'auto'、'left'、'right'、'center'。
   */
  textVerticalAlign: "auto",

  triggerEvent: true, // 是否触发事件。 默认false

  /**
   * 标题内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
   * @param {number|Array}  5,[5,5] [5,5,5,5]
   */
  padding: 5,

  itemGap: 40, //主副标题之间的间距。

  /**
   * title 组件离容器左侧的距离。
   * @param {number | string}
   * 可选： 如数字20， 百分比 ：20%, 固定值： 'left', 'center', 'right'
   * 如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
   */
  left: "left",

  /**
   * title 组件离容器上侧的距离。
   * @param {number | string}
   * 可选： 如数字20， 百分比 ：20%, 固定值：'top', 'middle', 'bottom'。
   * 如果 top 的值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐。
   */
  top: 0,

  /**
   * title 组件离容器右侧的距离。
   * @param {number | string}
   * 可选： 如数字20， 百分比 ：20%
   */
  right: 0,

  /**
   * title 组件离容器下侧的距离。
   * @param {number | string}
   * 可选： 如数字20， 百分比 ：20%
   */
  bottom: 0,

  backgroundColor: "#000", // 标题背景色，默认透明。

  borderColor: "green", // 标题的边框颜色。支持的颜色格式同 backgroundColor

  borderWidth: 10, // 标题的边框线宽。

  borderRadius: 20, //圆角半径，单位px，支持传入数组分别指定 4 个圆角半径。 如:10,[10,10,10,10]
};
