import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { namespacePrefix } from "../../../config";
const compSelector = "field-text";
const modeTypeList = ["read", "edit"];

export function FieldRead({
  valuePropName,
  renderText: RenderText,
  ...baseProps
}) {
  console.log("baseProps", baseProps);
  if (React.isValidElement(RenderText)) {
    return <RenderText {...baseProps} />;
  }
  const value = valuePropName ? baseProps[valuePropName] : baseProps.value;

  return (
    <div className={`${namespacePrefix}${compSelector}`}>
      {RenderText ? RenderText?.(value) : typeof value !== "object" && value}
      {/* {RenderText?.(valuePropName ? baseProps[valuePropName] : baseProps.value)} */}
      &nbsp;&nbsp;
    </div>
  );
}

export function renderEditChildren(
  children,
  { modeType, renderText, valuePropName }
) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const childProp = children?.props || {};

  if (modeType === "edit" && !isOpenEdit) {
    return (
      <div className={`${namespacePrefix}${compSelector}-warp`}>
        <FieldRead
          {...childProp}
          renderText={renderText}
          valuePropName={valuePropName}
        ></FieldRead>
        <EditOutlined
          onClick={() => {
            setIsOpenEdit(true);
          }}
        />
      </div>
    );
  }

  return (
    <>
      {children}
      {modeType === "edit" && isOpenEdit && (
        <Button
          size="small"
          type="link"
          onClick={() => {
            setIsOpenEdit(false);
          }}
        >
          保存
        </Button>
      )}
    </>
  );
}
