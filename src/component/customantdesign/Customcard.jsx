import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const Customcard = () => {
  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://picsum.photos/400/250?random=1"
        />
      }
    >
      <Meta
        title="Card Title"
        description="This is the description of the card."
      />
    </Card>
  );
};

export default Customcard;
