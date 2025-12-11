import React from "react";
import { Card,Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Customcard = () => {
  return (
   <Card
      
      style={{
        marginRight:"2px",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16,padding:"10px" }}>
        
      <Avatar size={35} icon={<UserOutlined />} />
        <div className="mx-2">
          <Title level={5} style={{ margin: 0 }}>
           
          </Title>
          <Text type="secondary">Dealer</Text>
        </div>
        </div>
        <div style={{ alignItems: "center", gap: 16,padding:"10px" }}>
          <p className="text-xs font-medium text-gray-500">Your Recent Activity</p>
        </div>
      <Card
      
      style={{
        width: 150,
        background:"antiquewhite",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        margin:"10px"
      }}
    >
      <div className="px-5">
        <h1>16</h1>
        <p className="text-xs font-medium text-gray-500 ms-2 py-3">Viewed</p>
      </div>
    </Card>
    <div className="w-[100%] flex justify-center py-4">
    <button type="button" className=" w-[80%] py-2 cursor-pointer text-bold bg-[#022c6f] text-white rounded-lg">View all activity</button>
    </div>
    </Card>
  );
};

export default Customcard;
