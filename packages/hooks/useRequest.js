import { useRequest, useMemoizedFn } from "ahooks";
import axios from "axios";
import { get, isFun } from "../utils";
class ConfigRequest {
  constructor(config = {}) {
    this.config = {
      responseError: {
        404: {
          ErrorCode: 404,
          message: "request url is not emty",
          success: false,
        },
      },
      ...config,
    };
  }
  get() {
    return this.config;
  }

  set(config = {}) {
    this.config = { ...this.config, ...config };
  }
}

export const configRequest = new ConfigRequest();

export const getAjax = async (options = {}, args) => {
  try {
    let { url, beforeRequest, afterResponse, dataPath, ...rqParam } =
      options || {};
    // 考虑 url: /user/{id}
    if (isFun(url)) url = url(args, rqParam);

    let { instance = axios, responseError = {} } = configRequest.config;

    if (!url) return Promise.reject(responseError[404]);
    const newParam = { ...rqParam, url: url };

    // 请求前对数据进行处理
    let result = await instance(
      isFun(beforeRequest) ? await beforeRequest(newParam) : newParam
    );
    // 取指定路径的数据
    result = dataPath ? get(result, dataPath) : result;
    // 请求后进行一次数据处理
    return isFun(afterResponse) ? afterResponse(result) : result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const useRequestPro = (options = {}, config) => {
  const getHandle = useMemoizedFn((args) => getAjax(options, args));
  const result = useRequest(getHandle, config);
  return { ...result };
};

export default useRequestPro;
