import React from 'react'
import './component.css'
import { IoMdDownload } from "react-icons/io";
const PrintBtn = () => {
    const PrintFunc = () => {
        window.print();
    }
  return (
    <button class="Btn" onClick={PrintFunc}>
  
  <div class="sign"><IoMdDownload size={35} className='svg'/></div>
  
  <div class="text">Print</div>
</button>
  )
}

export default PrintBtn