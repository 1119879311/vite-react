// import { useRequest } from 'ahooks';

import React from "react";
import { useRequestPro, configRequest, getAjax } from "../../packages/hooks";
import Axios from "../utils/axios";
import { Button } from "antd";
import { useRequest } from "ahooks";

class apiServe {
  static getImage() {
    return {
      url: "/images",
      // url: (param) => {
      //   return "/images?id=" + param.id;
      // },
      dataPath: "data.data",
      afterResponse: (res) => {
        return { ...res, urls: res[0]?.urls?.split(",") };
      },
    };
  }

  static getImageV1(param) {
    console.log("getImageV1", param);
    return getAjax({
      dataPath: "data.data",
      url: "/images",
    });
  }
}

configRequest.set({
  instance: Axios,
});

export default () => {
  const { data, loading, run, cancel } = useRequest(apiServe.getImageV1, {
    pollingInterval: 5000,
    pollingWhenHidden: false,
    manual: true,
    onSuccess: (result, params) => {
      console.log("成功请求", result, params);
      setTimeout(() => {
        cancel();
      }, 6000);
    },
    onError: (err, params) => {
      cancel();
      console.log("失败请求", err, params);
    },
  });

  return (
    <>
      <p>Username: {loading ? "Loading" : JSON.stringify(data)}</p>
      <Button type="button" loading={loading} onClick={() => run({ id: 1 })}>
        start
      </Button>
      <Button type="button" onClick={cancel} style={{ marginLeft: 16 }}>
        stop
      </Button>
    </>
  );
};
