import React, { useEffect, useState } from "react";
import { Tag } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { MdCurrencyRupee } from "react-icons/md";



const Antdpropertycard = ({ image, logo, title, description, price, featured, data }) => {


    if (!data) {
        return <div>
            <p>Loading...</p>
        </div>
    }

    const banner = data.images.find(img => img.type === 'banner')?.src;

    const unitData = data.unitData

    console.log(unitData, 'data');

    const [unit, setUnit] = useState();

    const [location,setLocation] = useState();


    useEffect(() => {
        if (!Array.isArray(unitData)) return;

        const parsed = unitData.map((item) => {
            const obj = typeof item === "string" ? JSON.parse(item) : item;
            const specs = obj?.specs || {};

            return {
                bhk: specs.bhk,
                areaMin: specs.areaMin,
                areaMax: specs.areaMax,
                priceMin: Number(specs.priceMin) || 0,
                priceMax: Number(specs.priceMax) || 0
            };
        });

        console.log(parsed, '38parsed');
        setUnit(parsed);



        console.log(data);

        setLocation(JSON.parse(data.location));
        

        
        

    }, [])

    


    const formatPrice = (value) => {
        value = Number(value);
        if (value >= 10000000) {
            return (value / 10000000).toFixed(2) + " Cr";
        } else {
            return (value / 100000).toFixed(2) + " L";
        }
    };

    if (!Array.isArray(unit) || unit.length === 0) {
        return <p>Loading...</p>;
    }

    const smallest = Math.min(...unit.map(i => i.priceMin));
    const biggest = Math.max(...unit.map(i => i.priceMax));

    console.log(unit,'unit');
    

    const numbers = unit.map(item => item.bhk.split(" ")[0]).join(",");


    const createSlug = (item) => {
        if(!item?.npxid) return "";

        const location = JSON.parse(item.location)

        return `${item.label}-${location.City}-npxid-${item.npxid}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
    }


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
                    <img src={banner} alt={title} className="h-56 w-full object-cover rounded" />
                    {/* Wishlist Icon */}
                    <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                        <StarOutlined className="text-gray-700 text-lg" />
                    </div>
                    <div className="absolute top-40 left-10 right-10 w-10px p-6 bg-white border border-gray-200 rounded-lg shadow-sm  ">
                        <div className="absolute -top-6 left-4 bg-transparent p-2 rounded-full shadow-md">
                            <img src={logo} alt="logo" className="h-10 w-10 object-contain rounded-full" />
                        </div>
                        <div className="mt-2 h-20">
                            <span className="font-semibold text-lg">{data.title}</span>
                            <p className="text-gray-500 text-sm" style={{ lineHeight: "normal" }}>{numbers} BHK, {location.City}</p>
                            <p className="flex text-blue-900 font-semibold text-base">
                                <MdCurrencyRupee className="mt-[6px]" /> {formatPrice(smallest)} - {formatPrice(biggest)}
                            </p>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    );
};

export default Antdpropertycard