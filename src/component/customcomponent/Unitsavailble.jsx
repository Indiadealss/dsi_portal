import React from 'react'
import computerTable from '../../Images/computerTable.avif';
import shop from '../../Images/shop.jpeg'

const Unitsavailble = ({propertys}) => {

    const investmentOptions = [
            {
                name: 'Offices',
                size: 914,
                status:false,
                availbility:'Aug,2028',
                icon: computerTable,
                price: 13900000
            },
            {
                name: 'Shop',
                size: 615,
                status:true,
                availbility:'Aug,2028',
                icon: shop,
                price: 13900000
            }
        ]
  return (
    <div>
      <div className={propertys.unitsAv ? 'hidden' :'mt-20' }>
            <h3>Units Available for sale in {propertys.projectname}</h3>
      </div>


    </div>
  )
}

export default Unitsavailble;
