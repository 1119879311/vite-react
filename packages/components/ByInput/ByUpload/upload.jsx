/**
 * 文件类型限制  一、分三大类 图片，文件，音频/视频 ，  二、具体文件后缀类型限制
 * 文件个数限制  、 有最大个数 maxCount ,limtCount
 * 文件大小限制  limtSize MB
 * 文件预览
 * 文件下载
 */

import { Upload } from "antd";
import { useEffect } from "react";
import { useState, forwardRef } from "react";
import { isFun } from "../../../utils";
import { message } from "antd";
import { useRef } from "react";

// 单独使用  onChange 事件是 upload 本身的 , 为了兼容, onChange 改为 uploadChange
// 接入表单from  onChange 事件是表单接管的

const ByUpload = forwardRef(
  (
    {
      fileList = [],
      onChange,
      uploadChange,
      beforeUpload,
      limtSize = 0,
      ...baseProps
    },
    ref
  ) => {
    const [getFileList, setFileList] = useState(fileList);
    const fileNumRef = useRef(fileList.length || 0);
    useEffect(() => {
      if (fileList.length !== getFileList.length) {
        fileNumRef.current = fileList.length;
        // setFileList(fileList);
      }
    }, [fileList]);
    const uploadConfig = {
      ...baseProps,
      onChange: (info) => {
        let newFileList = [...info.fileList];
        fileNumRef.current = newFileList.length;
        setFileList(newFileList || []);
        isFun(onChange) && onChange(newFileList);
        isFun(uploadChange) && uploadChange(info);
      },
      beforeUpload: (file) => {
        let { accept, maxCount = 0 } = baseProps;
        const acceptList = accept?.split(",") || [];
        const isFileType = !acceptList.length || acceptList.includes(file.type);
        if (!isFileType) {
          message.error("请上传正确文件类型!");
        }
        //限制大小
        const isLtMB = limtSize <= 0 || file.size / 1024 / 1024 < limtSize;
        if (!isLtMB) {
          message.error("文件大小不能超过" + limtSize + "MB");
        }
        let result = isFun(beforeUpload) ? beforeUpload(file) : true;
        let isBool = isFileType && isLtMB && result;
        // 确定上传了，要计算是否超过限制个数
        // 限制个数的
        if (isBool && maxCount > 0) {
          fileNumRef.current++;
          fileNumRef.current > maxCount && (isBool = false);
        }
        return isBool || Upload.LIST_IGNORE;
      },
      fileList: getFileList,
    };
    return <Upload ref={ref} {...uploadConfig}></Upload>;
  }
);

export default ByUpload;
