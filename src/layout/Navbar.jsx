import { useState } from 'react'
import {NavLink } from 'react-router-dom'
import { FaChevronRight,FaChevronDown,FaTruck } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { BiSolidTime } from "react-icons/bi";
import { RiHome2Fill } from "react-icons/ri";
import { GiFuelTank } from "react-icons/gi";
import { FaFileInvoice } from "react-icons/fa6";
import { BsFilePersonFill } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { FaChartPie } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
const Navbar = () => {
  const [open,setopen] = useState();

  const handleoption = (name)=>{
    setopen( open === name ? null : name)
  }
  return (
    <>
    <div>
      <NavLink to="/home" onClick={()=>handleoption(null)}><RiHome2Fill className='option-icon'/>Dashboard</NavLink>
      <div className='dropdown'>
        <span onClick={()=>handleoption('supplier')}><FaTruck className='option-icon'/>Supplier{ open === 'supplier' ? <FaChevronDown className='icon'/> : <FaChevronRight className='icon'/>}</span>
        { open == 'supplier' && <div className='dropdown-option'>
          <NavLink to='/supplier'>Add Supplier</NavLink>
          <NavLink to='/supplier-manage'>Manage Suppliers</NavLink>
        </div>
        }
      </div>
      <div className='dropdown'>
        <span onClick={()=>handleoption('fuel')}><BsFillFuelPumpFill className='option-icon'/>Fuels{ open === 'fuel' ? <FaChevronDown className='icon'/> : <FaChevronRight className='icon'/>}</span>
        { open == 'fuel' && <div className='dropdown-option'>
          <NavLink to='/fuel'>Add Fuel</NavLink>
          <NavLink to='/fuel-manage'>Manage Fuel</NavLink>
        </div>
        }
      </div>
      <div className='dropdown'>
        <span onClick={()=>handleoption('invoice')}><FaFileInvoice className='option-icon'/>Invoice{ open === 'invoice' ? <FaChevronDown className='icon'/> : <FaChevronRight className='icon'/>}</span>
        { open == 'invoice' && <div className='dropdown-option'>
          <NavLink to='/invoice'>Add Invoice</NavLink>
          <NavLink to='/manage-invoice'>Manage Invoice</NavLink>
        </div>
        }
      </div>
      <div className='dropdown'>
        <span onClick={()=>handleoption('shift')}><BiSolidTime className='option-icon'/>Shift{ open === 'Shift' ? <FaChevronDown className='icon'/> : <FaChevronRight className='icon'/>}</span>
        { open == 'shift' && <div className='dropdown-option'>
          <NavLink to="/shift-card">Shift Entry</NavLink>
          <NavLink to="/shift">Shift Details</NavLink>
          
        </div>
        }
      </div>
      {/* <div className='dropdown'>
        <span onClick={()=>handleoption('tank')}><GiFuelTank className='option-icon'/>Tank{ open === 'tank' ? <FaChevronDown className='icon'/> : <FaChevronRight className='icon'/>}</span>
        { open == 'tank' && <div className='dropdown-option'>
          <NavLink to="/tank-stock">Tank Status</NavLink>
          <NavLink to='/tank-refill'>Tank Refill</NavLink>
          
        </div>
        }
      </div> */}
      
      <NavLink to="/sales" onClick={()=>handleoption(null)}><FaChartPie className='option-icon'/>Sales Report</NavLink>
      <NavLink to="/expense" onClick={()=>handleoption(null)}><GiExpense className='option-icon'/>Expense</NavLink>
      <NavLink to="/ca-report" onClick={()=>handleoption(null)}><GiExpense className='option-icon'/>CA Report</NavLink>
      <NavLink to="/customer" onClick={()=>handleoption(null)}><IoMdPerson className='option-icon'/>Customer</NavLink>
      {/* <NavLink to="/credits" onClick={()=>handleoption(null)}><IoMdPerson className='option-icon'/>Customer Credits</NavLink> */}
      <NavLink to="/staff" onClick={()=>handleoption(null)}><BsFilePersonFill className='option-icon'/>Manage Staff</NavLink>
      <NavLink to="/access" onClick={()=>handleoption(null)}><RiAccountCircleFill className='option-icon'/>Access</NavLink>
      <button className='logout-btn'><MdLogout className='icon' />Logout</button>
    </div>
    </>
  )
}

export default Navbar