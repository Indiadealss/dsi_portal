import React from 'react';
import { HomeOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IoIosPricetag } from "react-icons/io";

const items = [
    {
        key: "1",
        label: "sq.ft",
    },
    {
        key: "2",
        label: "sq.yards",
    },
    {
        key: "3",
        label: "grounds",
    },
    {
        key: "4",
        label: "aankadam",
    },
    {
        key: "5",
        label: "rood",
    },
    {
        key: "6",
        label: "chataks",
    },
    {
        key: "7",
        label: "perch",
    },
    {
        key: "8",
        label: "guntha",
    },
    {
        key: "9",
        label: "ares",
    },
    {
        key: "10",
        label: "biswa",
    }, {
        key: "11",
        label: "acres",
    }, {
        key: "12",
        label: "bigha",
    }, {
        key: "13",
        label: "kottah",
    }, , {
        key: "14",
        label: "hectares",
    }, , {
        key: "15",
        label: "malrla",
    }, , {
        key: "16",
        label: "kanal",
    },
    {
        key: "17",
        label: "cents",
    },
];

const Propertydetailscarddata = () => {

    const details = [{
        areasize: 334.45,
        builtup: 292.64,
        carpetarea: 250.84,
        bedroom: 4,
        bathroom: 4,
        balconies: 3,
        otherroom: 'Pooja Room',
        price: '4 Crore'
    }]
    return (
        <div className='block max-w-2xl h-[35vw] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
            <table >
                <tbody>
                    <tr className=' border-b border-gray-100'>
                        <td style={{paddingBottom:'1rem'}}>
                            <div>
                                <p className='flex'><HomeOutlined className='myCustomIcon' /><span className='font-medium m-2 text-sm text-gray-500'>Area</span></p>
                                <p>Super Build up area {details[0].areasize} <Dropdown menu={{ items }} trigger={['click']}>

                                    <Space>
                                        Options
                                        <DownOutlined />
                                    </Space>

                                </Dropdown></p>
                                <p><span className='text-[10px] font-medium text-gray-500'>({details[0].areasize} sq.m.)</span></p>
                                <p><span>Build Up area: {details[0].builtup} Sq.m.</span> <span className='text-[10px] font-medium text-gray-500'>({details[0].builtup} sq.m.)</span></p>
                                <p><span>Carpetarea Up area: {details[0].carpetarea} Sq.m.</span> <span className='text-[10px] font-medium text-gray-500'>({details[0].carpetarea} sq.m.)</span></p>
                            </div>
                        </td>
                        <td style={{paddingBottom:'1rem'}}>
                            <div>
                                <p className='flex'><HomeOutlined className='myCustomIcon' /><span className='font-medium m-2 text-sm text-gray-500'>Configuration</span></p>
                                <p><span className='font-medium'>{details[0].bedroom} Bedroom {details[0].bathroom} Bathroom {details[0].balconies} Balconies with {details[0].otherroom}</span></p>

                            </div>
                        </td>
                    </tr>
                    <tr className=' border-b border-gray-100'>
                        <td style={{paddingBottom:'1rem'}}>
                            <div>
                                <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium  text-sm text-gray-500'>Price</span></p>
                                <p>{details[0].price}+Govt Charges & Tax</p>
                                <p>{details[0].areasize}per sq.yards(Negotitable) </p>
                            </div>

                        </td>
                        <td style={{paddingBottom:'1rem'}}>
                            <div>
                                <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium  text-sm text-gray-500'>Address</span></p>
                                <p>{details[0].price}+Govt Charges & Tax</p>
                                <p>{details[0].areasize}per sq.yards(Negotitable)</p>
                            </div>
                        </td>
                    </tr>
                    <tr className=' border-b border-gray-100'>
                        <td style={{paddingBottom:'1rem'}}>
                            <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium  text-sm text-gray-500'>Floor Number</span></p>
                                <p>1<sup>st</sup> 3 Floors</p>
                        </td>
                        <td style={{paddingBottom:'1rem'}}>
                            <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium  text-sm text-gray-500'>Facing</span></p>
                                <p>East</p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{paddingBottom:'1rem'}}>
                            <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium  text-sm text-gray-500'>Overlooking</span></p>
                                <p>1<sup>st</sup> 3 Floors</p>
                        </td>
                        <td style={{paddingBottom:'1rem'}}>
                            <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium  text-sm text-gray-500'>Property Age</span></p>
                                <p>East</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Propertydetailscarddata;