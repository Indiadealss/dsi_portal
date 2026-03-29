import React, { useEffect, useState } from 'react';
import { HomeOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { IoIosPricetag } from "react-icons/io";

const units = [
    "sq.ft", "sq.yards", "grounds", "aankadam", "rood", "chataks", "perch",
    "guntha", "ares", "biswa", "acres", "bigha", "kottah", "hectares", "malrla",
    "kanal", "cents"
].map((unit, index) => ({ key: index + 1, label: unit }));

const Propertydetailscarddata = ({ property }) => {

      const parseLocation = (location) => {
        console.log(location,'location check');
        
  if (typeof location === "string") {
    try {
      return JSON.parse(location);
    } catch {
      return null;
    }
  }
  return location;
};

    const [detail, setDetail] = useState(null);

    useEffect(() => {
        if (property) {
            setDetail(property);
            console.log(property.overlo ,'hfajsd');
            
        }
    }, [property]);

    if (!detail) return null; // optional: loading state

    return (
        <div className='block max-w-full h-[max-content]  lg:w-[43vw] lg:h-[max-content] p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100'>
            <table>
                <tbody>
                    <tr className='border-b border-gray-100'>
                        <td style={{ paddingBottom: '1rem' }}>
                            <div>
                                <p className='flex'><HomeOutlined className='myCustomIcon' /><span className='font-medium m-2 text-sm text-gray-500'>Area</span></p>
                                <p>
                                    Super Build up area: {detail.superbuilduparea || detail.buildarea}
                                    {/* <Dropdown menu={{ items: units }} trigger={['click']}>
                                        <Space>Options <DownOutlined /></Space>
                                    </Dropdown> */}
                                </p>
                                {/* <p>Build Up area: {detail.buildarea || 'N/A'}</p> */}
                                <p>Carpet area: {detail.carpetarea || 'N/A'}</p>
                            </div>
                        </td>
                        <td style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                            <div>
                                <p className='flex'><HomeOutlined className='myCustomIcon' /><span className='font-medium m-2 text-sm text-gray-500'>Configuration</span></p>
                                <p>
                                    {detail.bedroom || 0} Bedroom {detail.bathroom || 0} Bathroom {detail.balconies || 0} Balconies {detail.otherrooms?.length > 0 && `with ${detail.otherrooms.map(item => item.name).join(", ")}`}
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr className='border-b border-gray-100'>
                        <td style={{ paddingBottom: '1rem' }}>
                            <div>
                                <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium text-sm text-gray-500'>Price</span></p>
                                <p>{detail.price || 'N/A'} + Govt Charges & Tax</p>
                            </div>
                        </td>
                        <td style={{ paddingBottom: '1rem' , paddingLeft:'1rem' }}>
                            <div>
                                <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium text-sm text-gray-500'>Address</span></p>
                                <p>{parseLocation(detail.location)[0]?.apartment_name || 'N/A'}, {parseLocation(detail.location)[0]?.Address || 'N/A'}</p>
                            </div>
                        </td>
                    </tr>

                    <tr className='border-b border-gray-100'>
                        <td style={{ paddingBottom: '1rem' }}>
                            <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium text-sm text-gray-500'>Floor Number</span></p>
                            <p>{detail.floor || 'N/A'} / {detail.totalfloor || 'N/A'} Floors</p>
                        </td>
                        <td style={{ paddingBottom: '1rem', paddingLeft: '1rem' }}>
                            <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium text-sm text-gray-500'>Facing</span></p>
                            <p>{detail.propertyfacing || 'N/A'}</p>
                        </td>
                    </tr>

                    <tr>
                        {detail.overlo && (
                            <td style={{ paddingBottom: '1rem' }}>
                                <p className='flex'>
                                    <IoIosPricetag className='myCustomIcon' />
                                    <span className='font-medium text-sm text-gray-500'>Overlooking</span>
                                </p>
                                <p className='w-50'>
                                    {Array.isArray(detail.overlo)
    ? detail.overlo.map(item => item.name).join(', ')
    : ""}
                                </p>
                            </td>
                        )}
                        <td style={{ paddingBottom: '1rem',paddingLeft:'1rem' }}>
                            <p className='flex'><IoIosPricetag className='myCustomIcon' /><span className='font-medium text-sm text-gray-500'>Property Age</span></p>
                            <p>{detail.propertyage || 'N/A'}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Propertydetailscarddata;
