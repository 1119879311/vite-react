export function get(souce, Arrkey = [], defaultValue) {
  if (!Arrkey || !souce || typeof souce != "object") {
    return defaultValue ? defaultValue : souce;
  }
  if (typeof Arrkey === "string") {
    Arrkey = Arrkey.split(".");
  }
  let resKey = Arrkey.slice();
  let _get = (_souce) => {
    try {
      if (_souce === undefined || typeof _souce !== "object" || !resKey.length)
        return _souce !== undefined ? _souce : defaultValue;
      let _key = resKey.splice(0, 1);
      let result = _souce[_key[0]];
      return _get(result);
    } catch (error) {
      return defaultValue ? defaultValue : undefined;
    }
  };

  return _get(souce);
}

/**
 * 从一个对象中取指定key 的数据
 * @param {*} source
 * @param {*} keys
 * @returns
 */
export function pick(source = {}, keys = []) {
  return keys.reduce((preve, crrent) => {
    let value = source[crrent];
    if (value !== undefined) {
      preve[crrent] = value;
    }
    return preve;
  }, {});
}

// console.log("pick-test:", pick({ a: 1, b: 2, c: 2 }, ["a", "c", "d"]));

/**
 * 从一个对象中 排除指定key剩下的数据
 * @param {*} source
 * @param {*} keys
 */
export function omit(source = {}, keys = []) {
  let sourceKeys = Object.keys(source);
  return sourceKeys.reduce((preve, crrent) => {
    if (!keys.includes(crrent)) {
      preve[crrent] = source[crrent];
    }
    return preve;
  }, {});
}

// console.log("omit-test:", omit({ a: 1, b: 2 }, ["a"]));

// 非即时执行,在触发事件后，n秒后执行，如果不停触发事件，则重新计算
export function debounce(fn, awit = 1000) {
  let timeer;
  return function () {
    let context = this;
    let args = arguments;
    if (timeer) clearInterval(timeer);
    timeer = setTimeout(function () {
      fn.apply(context, args);
    }, awit);
  };
}

//浅合拼
function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) return true;
  Ctor =
    Object.prototype.hasOwnProperty.call(proto, "constructor") &&
    proto.constructor;
  return (
    typeof Ctor === "function" &&
    Function.prototype.toString.call(Ctor) ===
      Function.prototype.toString.call(Object)
  );
}

// 浅合拼
/**
 * 会改变obj1 的数据
 * @param {*} obj1
 * @param {*} obj2
 * @returns
 */
export function shallowMerge(obj1, obj2) {
  var isPlain1 = isPlainObject(obj1);
  var isPlain2 = isPlainObject(obj2); //只要obj1不是对象，那么不管obj2是不是对象，都用obj2直接替换obj1
  if (!isPlain1) return obj2; //说明obj1肯定是对象，那如果obj2不是对象，则还是以obj1为主
  if (!isPlain2) return obj1; //如果上面两个条件都不成立，那说明obj1和obj2肯定都是对象， 则遍历obj2 进行合并
  let keys = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)];
  keys.forEach(function (key) {
    obj1[key] = obj2[key];
  });
  return obj1;
}

// 深合拼,会改变obj 的数据
/**
 * 会改变obj1 的数据
 * @param {*} obj1
 * @param {*} obj2
 * @param {*} cache
 * @returns
 */
export function deepMerge(obj1, obj2, cache) {
  // cache = !Array.isArray(cache) ? [] : cache;
  // if (cache.indexOf(obj2)) return obj2;
  // cache.push(obj2);
  var isPlain1 = isPlainObject(obj1);
  var isPlain2 = isPlainObject(obj2); //obj1或obj2中只要其中一个不是对象，则按照浅合并的规则进行合并
  if (!isPlain1 || !isPlain2) return shallowMerge(obj1, obj2); //如果都是对象，则进行每一层级的递归合并
  let keys = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)];
  keys.forEach(function (key) {
    obj1[key] = deepMerge(obj1[key], obj2[key], cache); //这里递归调用
  });
  return obj1;
}
// console.log("--test--deepMerge--", { a: 1 }, { a: 3, c: 12 });
// 多个对象深合拼,不影响原来数据
export function deepMergeList(...args) {
  let resArr = args.slice();
  return resArr.reduce(
    (oldObj, currentObj) => deepMerge(oldObj, currentObj),
    {}
  );
}
