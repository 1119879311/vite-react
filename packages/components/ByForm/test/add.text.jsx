import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";
import ByField from "../../ByField";
export default (props) => {
  console.log("--add-props----", props);
  return (
    <Form.List
      name={props.id}
      rules={[
        {
          validator: async (_, names) => {
            if (!names || names.length < 2) {
              return Promise.reject(new Error("At least 2 passengers"));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              label={index === 0 ? "Passengers" : ""}
              required={false}
              key={field.key}
            >
              <ByField
                id={[field.name, "last"]}
                afterNode="1212"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message:
                      "Please input passenger's name or delete this field.",
                  },
                ]}
              >
                <Input />
              </ByField>
              {/* <Form.Item
                {...field}
                name={[field.name, "last"]}
                validateTrigger={["onChange", "onBlur"]}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message:
                      "Please input passenger's name or delete this field.",
                  },
                ]}
                noStyle
              >
                <Input placeholder="passenger name" style={{ width: "60%" }} />
              </Form.Item> */}
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              style={{ width: "60%" }}
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
            <Button
              type="dashed"
              onClick={() => {
                add("The head item", 0);
              }}
              style={{ width: "60%", marginTop: "20px" }}
              icon={<PlusOutlined />}
            >
              Add field at head
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
