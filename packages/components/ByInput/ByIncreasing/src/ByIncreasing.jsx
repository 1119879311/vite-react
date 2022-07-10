import React from "react";
import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ByFormLayout } from "../../../ByForm";

const ByIncreasing = (props) => {
  let { form, template = [], templateParam = [], fieldChange, id } = props;
  let rid = Array.isArray(id) ? id : [id];
  return (
    <Form.List name={rid}>
      {(fields, { add, remove }) => {
        return (
          <>
            <Space wrap size={12} style={{ display: "flex" }}>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  align="baseline"
                  size={12}
                  style={{ display: "flex" }}
                >
                  <ByFormLayout
                    form={form}
                    config={{
                      FieldListParams: templateParam,
                      FieldList: template.map((item) => {
                        let cid = Array.isArray(item.id) ? item.id : [item.id];
                        return {
                          ...item,
                          pathkey: [...rid, field.name, ...cid],
                          id: [field.name, ...cid],
                        };
                      }),
                      // onFormChange: (val, childId, allValues) => {
                      //   typeof fieldChange === "function" &&
                      //     fieldChange(val, [...rid, ...childId], allValues);
                      // },
                    }}
                  />

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
            </Space>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add sights
            </Button>
          </>
        );
      }}
    </Form.List>
  );
};

export default ByIncreasing;
