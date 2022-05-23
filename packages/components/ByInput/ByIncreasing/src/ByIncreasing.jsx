import React from "react";
import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ByForm from "../../../ByForm";

const ByIncreasing = (props) => {
  let { form, Template = [], TemplateParam = [], fieldChange, id } = props;
  let rid = Array.isArray(id) ? id : [id];
  return (
    <div>
      <Form.List name={rid}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  align="baseline"
                  style={{ display: "flex" }}
                >
                  <ByForm
                    form={form}
                    config={{
                      FieldListParams: TemplateParam,
                      FieldList: Template.map((item) => {
                        let cid = Array.isArray(item.id) ? item.id : [item.id];
                        return {
                          ...item,
                          pathkey: [...rid, field.name, ...cid],
                          id: [field.name, ...cid],
                        };
                      }),
                      onFormChange: (val, childId, allValues) => {
                        typeof fieldChange === "function" &&
                          fieldChange(val, [...rid, ...childId], allValues);
                      },
                    }}
                  ></ByForm>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

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
    </div>
  );
};

export default ByIncreasing;
