import { Routes,Route } from "react-router-dom"
import { lazy } from "react"
import { useSelector } from "react-redux"
import Dashboard from "../pages/Dashboard"
import Sales from "../pages/Sales"
import Error from "./Error"
import LoginPage from '../pages/LoginPage.jsx'
import Customer from "../pages/Customer.jsx"
import AccessPage from "../pages/AccessPage.jsx"
import Supplier from "../pages/Supplier.jsx"
import ManagaeSuppliers from "../pages/ManagaeSuppliers.jsx"
const AddFuel = lazy(()=> import('../pages/FuelAdd.jsx'));
const ManageFuel = lazy(()=> import('../pages/ManageFuel.jsx'))
const TankerEntry = lazy(()=> import("../pages/TankerEntry.jsx"))
const ManageInvoices = lazy(()=> import('../pages/ManageInvoices.jsx'))
const Staff = lazy(()=> import("../pages/StaffPage.jsx"))
const TankReFill = lazy(()=> import("../pages/TankReFill.jsx"))
const ShiftCard = lazy(()=> import("../pages/ShiftCard.jsx"))
const Shift = lazy(()=> import("../pages/Shifts.jsx"))
const TankStock = lazy(()=> import("../pages/TankStock.jsx"))
const Expense = lazy(()=> import("../pages/ExpencessManagement.jsx"))
const CustomerCredits = lazy(()=> import('../pages/CustomerCredit.jsx'))
const CAreport = lazy(()=> import('../pages/CAReportPage.jsx'))

 
const Main = () => {
  const role = useSelector(state => state.user.role)
  console.log(role)
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Dashboard/>}/>
        <Route path='/sales' element={<Sales/>}/>
        <Route path='/customer' element={<Customer/>}/>
        <Route path='/credits' element={<CustomerCredits/>}/>
        <Route path='/access' element={<AccessPage/>}/>
        <Route path='/tank-refill' element={<TankReFill/>}/>
        <Route path="/supplier" element={<Supplier/>}/>
        <Route path="/supplier-manage" element={<ManagaeSuppliers/>}/>
        <Route path="/fuel" element={<AddFuel/>}/>
        <Route path="/fuel-manage" element={<ManageFuel/>}/>
        <Route path="/tank-stock" element={<TankStock/>}/>
        <Route path="/manage-invoice" element={<ManageInvoices/>}/>
        <Route path="/staff" element={<Staff/>}/>
        <Route path="/shift" element={<Shift/>}/>
        <Route path='/invoice' element={ <TankerEntry/> }/>
        <Route path="/shift-card" element={<ShiftCard/>}/>
        <Route path="/expense" element={<Expense/>}/>
        <Route path="/ca-report" element={<CAreport/>}/>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default Main