import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { namespacePrefix } from "../../../config";
const compSelector = "field-text";
const modeTypeList = ["read", "edit"];
function FieldText({ valuePropName, renderText, ...baseProps }) {
  return (
    <div className={`${namespacePrefix}${compSelector}`}>
      {renderText?.(valuePropName ? baseProps[valuePropName] : baseProps.value)}
      &nbsp;&nbsp;
    </div>
  );
}

export function renderEditChildren(
  children,
  { modeType, renderText: RenderText, valuePropName }
) {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const childProp = children?.props || {};
  let resultChild = null;

  if (modeTypeList.includes(modeType) && !isOpenEdit) {
    let detailChild = React.isValidElement(RenderText) ? (
      <RenderText {...childProp}></RenderText>
    ) : (
      <FieldText
        modeType={modeType}
        valuePropName={valuePropName}
        renderText={RenderText}
        {...childProp}
      />
    );
    if (modeType === "read") {
      resultChild = detailChild;
    } else if (modeType === "edit" && !isOpenEdit) {
      resultChild = (
        <div className={`${namespacePrefix}${compSelector}-warp`}>
          {detailChild}
          <EditOutlined
            onClick={() => {
              setIsOpenEdit(true);
            }}
          />
        </div>
      );
    }
  } else {
    resultChild = (
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
  return resultChild;
}
