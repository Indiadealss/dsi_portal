import React from "react";
import { Input, Space } from "antd";
import { Button } from 'antd';
import { SearchOutlined, AudioOutlined, AimOutlined } from "@ant-design/icons";

const Custominputserchbox = () => {
  return (
    <Input
      placeholder="Search location..."
      bordered={false} // removes border
      prefix={<SearchOutlined style={{ color: "gray", fontSize: 18 }} />}
      suffix={
        <Space size={16}>
          <AimOutlined style={{ color: "gray", fontSize: 18, cursor: "pointer" }} />
          <AudioOutlined style={{ color: "gray", fontSize: 18, cursor: "pointer" }} />
          <Button type="primary" icon={<SearchOutlined />}>
            Search
          </Button>
        </Space>
      }
      style={{
        background: "transparent",
        boxShadow: "none",
        borderRadius: "50px", // pill style (optional)
        padding: "8px 12px",
      }}
    />
  );
};

export default Custominputserchbox;
