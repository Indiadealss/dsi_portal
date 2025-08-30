import React from "react";
import { Typography, Button, Card, Tabs, List, Avatar } from "antd";

const { Title, Paragraph, Text } = Typography;

const Handpickherosection = () => {
  const articles = {
    News: [
      {
        title: "UP women homebuyers get 1% stamp duty rebate",
        date: "Jul 28, 2025",
        img: "https://via.placeholder.com/80",
      },
      {
        title: "Oberoi Realty to enter Gurgaon market",
        date: "May 20, 2025",
        img: "https://via.placeholder.com/80",
      },
    ],
    "Tax & Legal": [
      {
        title: "New stamp duty in Greater Noida",
        date: "Apr 25, 2025",
        img: "https://via.placeholder.com/80",
      },
    ],
    "Help Guides": [],
    Investment: [
      {
        title: "Prestige Group's new launch in Ghaziabad",
        date: "May 08, 2025",
        img: "https://via.placeholder.com/80",
      },
    ],
  };

  return (
    <div >
      {/* Hero Section */}
      <div
        style={{
            width:"100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          alignItems: "center",
        }}
      >
        {/* Left Image */}
        <div>
          <img
            src="https://picsum.photos/700/450?random=1"
            alt="Home Banner"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </div>

        {/* Right Content */}
        <div className="w-[80%]">
          <Text type="secondary" strong>
            BUY A HOME
          </Text>
          <Title level={2} style={{ paddingRight:"10%",paddingLeft:"10px" }}>
            Find, Buy & Own Your Dream Home
          </Title>
          <Paragraph>
            Explore from Apartments, land, builder floors, villas and more
          </Paragraph>
          <Button type="primary" size="large">
            Explore Buying
          </Button>
        </div>
      </div>

      {/* Articles Section */}
      <Card
  style={{
    marginTop: "-40px", // 👈 overlap upwards
    width:"90%",
    marginLeft:"5%",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  }}
>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "30% 65%",
            gap: "32px",
          }}
        >
          {/* Left Side */}
          <div className="p-5">
            <h2  className="text-3xl font-bold">Top articles on home buying</h2>
            <Paragraph type="secondary">
              Read from Beginners check-list to Pro Tips
            </Paragraph>
          </div>

          {/* Right Side Tabs */}
          <div>
            <Tabs defaultActiveKey="News">
              {Object.keys(articles).map((tab) => (
                <Tabs.TabPane tab={tab} key={tab}>
                  <List
                    itemLayout="horizontal"
                    dataSource={articles[tab]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar shape="square" size={64} src={item.img} />}
                          title={<a href="#">{item.title}</a>}
                          description={item.date}
                        />
                      </List.Item>
                    )}
                  />
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Handpickherosection;
