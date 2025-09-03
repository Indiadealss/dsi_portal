import React from "react";
import { Tag } from "antd";
import { StarOutlined } from "@ant-design/icons";



const Antdpropertycard = ({ image, logo, title, description, price, featured }) => {
    return (
        <div className="relative w-[40vw] ms-5">
            {/* Featured Tag */}
            {featured && (
                <Tag color="purple" className="absolute top-2 left-2 z-10">
                    Featured
                </Tag>
            )}

            <div>

                <div className="relative">
                    <img src={image} alt={title} className="h-56 w-full object-cover rounded" />
                    {/* Wishlist Icon */}
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                        <StarOutlined className="text-gray-700 text-lg" />
                    </div>
                    <div className="absolute top-40 left-10 right-10 w-10px p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="absolute -top-6 left-4 bg-transparent p-2 rounded-full shadow-md">
                            <img src={logo} alt="logo" className="h-10 w-10 object-contain rounded-full" />
                        </div>
                        <div className="mt-2 h-20">
                            <span className="font-semibold text-lg">{title}</span>
                            <p className="text-gray-500 text-sm" style={{lineHeight:"normal"}}>{description}</p>
                            <p className="text-blue-900 font-semibold text-base">
                                {price}
                            </p>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    );
};

export default Antdpropertycard