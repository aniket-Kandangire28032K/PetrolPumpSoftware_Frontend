import { Routes,Route } from "react-router-dom"
import { lazy } from "react"
import { useSelector } from "react-redux"

import LoginPage from '../pages/LoginPage.jsx'
const Error = lazy(()=> import("./Error.jsx"))
const Customer = lazy(()=> import("../pages/Customer.jsx"))
const AccessPage = lazy(()=> import("../pages/AccessPage.jsx") )
const Supplier = lazy(()=> import("../pages/Supplier.jsx"))
const  ManagaeSuppliers = lazy(()=> import("../pages/ManagaeSuppliers.jsx"))
const Sales = lazy(()=> import("../pages/Sales.jsx"))
const AddFuel = lazy(()=> import('../pages/FuelAdd.jsx'));
const ManageFuel = lazy(()=> import('../pages/ManageFuel.jsx'))
const TankerEntry = lazy(()=> import("../pages/TankerEntry.jsx"))
const ManageInvoices = lazy(()=> import('../pages/ManageInvoices.jsx'))
const Staff = lazy(()=> import("../pages/StaffPage.jsx"))
const ShiftCard = lazy(()=> import("../pages/ShiftCard.jsx"))
const Shift = lazy(()=> import("../pages/Shifts.jsx"))
const TankStock = lazy(()=> import("../pages/TankStock.jsx"))
const Expense = lazy(()=> import("../pages/ExpencessManagement.jsx"))
const CAreport = lazy(()=> import('../pages/CAReportPage.jsx'))
const Dashboard = lazy(()=> import("../pages/Dashboard.jsx"))
const DipTest = lazy(()=> import('../pages/DipTest.jsx'))
const Lube = lazy(()=> import('../pages/Lube.jsx'))
const Resquest = lazy(()=> import('../pages/ExpensesRequest.jsx'))
 
const Main = () => {
  const role = useSelector(state => state.user.role)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/access' element={<AccessPage/>}/>
        <Route path="/ca-report" element={<CAreport/>}/>
        <Route path='/customer' element={<Customer/>}/>
        <Route path="/expense" element={<Expense/>}/>
        <Route path='diptest' element={<DipTest/>}/>
        <Route path="/fuel" element={<AddFuel/>}/>
        <Route path="/fuel-manage" element={<ManageFuel/>}/>
        <Route path='/invoice' element={ <TankerEntry/> }/>
        <Route path="/manage-invoice" element={<ManageInvoices/>}/>
        <Route path="/lube" element={<Lube/>}/>
        <Route path="/request-expense" element={<Resquest/>}/>
        <Route path="/staff" element={<Staff/>}/>
        <Route path="/shift" element={<Shift/>}/>
        <Route path="/shift-card" element={<ShiftCard/>}/>
        <Route path='/sales' element={<Sales/>}/>
        <Route path="/supplier" element={<Supplier/>}/>
        <Route path="/supplier-manage" element={<ManagaeSuppliers/>}/>
        <Route path="/tank-stock" element={<TankStock/>}/>
        {/* <Route path='/' element={<LoginPage/>}/> */}
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default Main