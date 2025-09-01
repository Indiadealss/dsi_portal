import React, { useState } from 'react'
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Custominputserchbox from '../customantdesign/Custominputserchbox';

const Searchbox = () => {

  const menuItems = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Settings",
    },
    {
      key: "3",
      label: "Logout",
    },
  ];
  const button = [
    { key: "buy", label: "Buy" },
    { key: "Rent", label: "Rent" },
    { key: "Newlaunch", label: "New Launch" },
    { key: "Commercial", label: "Commercial" },
    { key: "Plots/Land", label: "Plots/Land" },
    { key: "Projects", label: "Projects" },
    { key: "PostProperty", label: "Post Property" }
  ]

  const [active,setActive] = useState('buy')

  const menu = (
    <Menu
      items={menuItems.map((item) => ({
        key: item.key,
        label: item.label,
        onClick: () => {
          console.log(`${item.label} clicked`);
        },
      }))}
    />
  );
  const buy = [

  ]
  return (
    <>
      <div class="shadow-xl ... bg-white rounded-xl w-auto lg:w-[max-content] mx-auto z-11">
        <div className='hidden lg:block lg:flex '>
          {button.map((item) => {
            return (
              <button type='text' className={`${active === item.key ? 'px-10 py-5 text-black-500 font-bold border-b-1 border-gray-300 underline underline-offset-22 decoration-3 decoration-[#022c6f] cursor-pointer':'px-10 py-5 text-gray-500 font-medium border-b-1 border-gray-300 cursor-pointer'}`} key={item.key} name={item.key} onClick={(e) => setActive(e.currentTarget.name)}>{item.label}</button>
            )
          })}
        </div>
        <div className='flex z-0'>
          <div className='py-5 border-e border-gray-300 w-[min-content] hidden lg:block'>
            <Dropdown overlay={menu} trigger={["click"]} getPopupContainer={(triggerNode) => triggerNode.parentNode} overlayStyle={{ width: "40vw",zIndex: 2 }} className='serchboxDropDown border-e-1 border-gray-100'>
              <Button>
                All Residential <DownOutlined />
              </Button>
            </Dropdown>
          </div>
            <Custominputserchbox />
        </div>
      </div>
    </>
  )
}

export default Searchbox;