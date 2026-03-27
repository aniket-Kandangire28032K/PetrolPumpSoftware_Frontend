import React from 'react'
import './component.css'
import { IoMdDownload } from "react-icons/io";
const PrintBtn = () => {
    const PrintFunc = () => {
        window.print();
    }
  return (
    <button className="Btn" onClick={PrintFunc}>
  
  <div className="sign"><IoMdDownload size={35} className='svg'/></div>
  
  <div className="text">Print</div>
</button>
  )
}

export default PrintBtn