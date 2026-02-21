import React from 'react'
import { UserOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Mobilenavcustombtn = ({setOpen,setShowLogin}) => {

    const user = useSelector(state => state.user);

    console.log(user);


    // logout api
    const handleLogout = async () => {
        try{
          await getLogout();
          dispatch(clearUser());
        }catch(err){
          console.error("Logout failed",err);
          
        }
      };
    
    

    const loginBtn = () => {
        setOpen(false)
        setShowLogin(true)
    }
  return (
    <div>
       <div className="h-full overflow-y-auto bg-gray-100">

    {/* Top Blue Section */}
    <div className="bg-blue-600 text-white p-4 relative">
      <button
        onClick={() => setOpen(false)}
        className="absolute right-4 top-4 text-white text-xl"
      >
        ✕
      </button>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center">
          <UserOutlined className="text-2xl" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Welcome {user.name}</h3>
          <p className="text-sm">Guest Profile • Manage Profile</p>
        </div>
      </div>

      <button className="mt-4 w-full bg-white text-blue-600 py-2 rounded font-medium" >
        {user.loggedIn ?  <span onClick={handleLogout}>Log out</span> : <span onClick={loginBtn}>'Login / Register Now'</span>}
      </button>
    </div>

    {/* Post Property Section */}
    <div className="p-4 space-y-3">

      <div className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
        <div>
          <Link to="/post-property"  onClick={() => setOpen(false)}><h4 className="font-semibold">Post Property</h4>
          <p className="text-sm text-gray-500">
            Sell / Rent faster
          </p></Link>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h4 className="font-semibold">Search Properties</h4>
        <p className="text-sm text-gray-500">
          Explore residential and commercial properties
        </p>
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h4 className="text-sm text-gray-500 mb-3">
          YOUR PROPERTY SEARCH ACTIVITY
        </h4>

        <div className="grid grid-cols-3 text-center gap-2">
          <div>
            <p className="font-semibold">Viewed</p>
          </div>
          <div>
            <p className="font-semibold">Shortlisted</p>
          </div>
          <div>
            <p className="font-semibold">Contacted</p>
          </div>
        </div>
      </div>

    </div>
  </div>
    </div>
  )
}

export default Mobilenavcustombtn
