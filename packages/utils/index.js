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
  var isPlain2 = isPlainObject(obj2);
  if (!isPlain1) return obj2;
  if (!isPlain2) return obj1;
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
  var isPlain1 = isPlainObject(obj1);
  var isPlain2 = isPlainObject(obj2); //
  if (!isPlain1 || !isPlain2) return shallowMerge(obj1, obj2); //
  let keys = [...Object.keys(obj2), ...Object.getOwnPropertySymbols(obj2)];
  keys.forEach(function (key) {
    obj1[key] = deepMerge(obj1[key], obj2[key], cache); //这里递归调用
  });
  return obj1;
}

// 多个对象深合拼,不影响原来数据
export function deepMergeList(...args) {
  let resArr = args.slice();
  return resArr.reduce(
    (oldObj, currentObj) => deepMerge(oldObj, currentObj),
    {}
  );
}

export const isType = (val, type) => {
  return typeof val === type;
};

export const isFun = (val) => isType(val, "function");
export const isString = (val) => isType(val, "string");
export const isNumber = (val) => isType(val, "number");
export const isBool = (val) => isType(val, "boolean");
export const isNull = (val) => isType(val, "object") && val === null;
export const isArray = (val) => Array.isArray(val);
export const isObj = (val) =>
  isType(val, "object") && !isArray(val) && val !== null;
