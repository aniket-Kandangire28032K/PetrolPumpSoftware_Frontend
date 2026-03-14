import React, { useState } from "react";
import AddCustomer from "../components/AddCustomer";
import CustomerList from "../components/CustomerList";

const Customer = () => {
    const [tabs,setTabs] = useState('tab1')
  return (
    <div>
        
        <div className="customer-nav">
            <button onClick={()=> setTabs('tab1')}>Add Customer</button>
            <button onClick={()=> setTabs('tab2')}>Manage Customers</button>
            
        </div>
      {tabs == 'tab1' && <AddCustomer/>}
      {tabs == 'tab2' && <CustomerList/>}
    </div>
  );
};

export default Customer;
