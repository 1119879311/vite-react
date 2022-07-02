import { useRequest, useMemoizedFn } from "ahooks";
import axios from "axios";
import { get, isFun } from "../utils";
const useRequestPro = (optoins = {}, config) => {
  const getHandle = useMemoizedFn(async (...args) => {
    try {
      if (!param.url) return Promise.reject("request url is not emty");
      let { url, beforeRequest, afterResponse, dataPath, ...rqParam } =
        optoins || {};
      // 考虑 url: /user/{id}
      if (isFun(url)) url = url(args, rqParam);
      const newParam = { ...rqParam, url: url };

      // 请求前对数据进行处理
      let result = await axios(
        isFun(beforeRequest) ? await beforeRequest(newParam) : newParam
      );
      // 取指定路径的数据
      result = dataPath ? get(result, dataPath) : result;
      // 请求后进行一次数据处理
      return isFun(afterResponse) ? afterResponse(result) : result;
    } catch (error) {
      return Promise.reject(error);
    }
  });
  const result = useRequest(getHandle, config);
  return { ...result };
};

export default useRequestPro;
