import React, { Children, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Scrooltop = () => {
const location = useLocation()
    useEffect(() => {
        window.scrollTo({top:0,behavior:"smooth"})
    },[location.pathname])
  return Children;
};

export default Scrooltop;