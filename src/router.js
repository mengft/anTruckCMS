import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'dva/router';

import Index from './routes/Index';
import Login from './routes/Account/Login';
import Register from './routes/Account/Register';
import Retrieve from './routes/Account/Retrieve';


import AtUsers from './routes/Users/AtUsers';
import TransportCompanies from './routes/Users/TransportCompanies';
import Owners from './routes/Users/Owners';

import Brands from './routes/BuyCars/Brands';
import Dealers from './routes/BuyCars/Dealers';
import Inquiry from './routes/BuyCars/Inquiry';

import Message from './routes/Function/Message';
import Statistics from './routes/Function/Statistics';

import Version from './routes/System/Version';

import CarSource from './routes/Resources/CarSource';
import BindVehicle from './routes/Resources/BindVehicle';

import InsuranceProduct from './routes/InsuranceServiceProviders/InsuranceProduct';
import InsuranceCustomer from './routes/InsuranceServiceProviders/InsuranceCustomer';

import TrafficProduct from './routes/TrafficServiceProviders/TrafficProduct';
import TrafficCustomer from './routes/TrafficServiceProviders/TrafficCustomer';
import TrafficOrder from './routes/TrafficServiceProviders/TrafficOrder';
import AffiliatedCompanies from './routes/AffiliatedManagement/AffiliatedCompaniesList'
import BetonList from './routes/TransportManagement/BetonList'
import CarSourceList from './routes/TransportManagement/CarSourceList'
import DedicatedLineList from './routes/TransportManagement/DedicatedLineList'
import OrderList from './routes/TransportManagement/OrderList'

import DriverFinancialProducts from './routes/FinanceServiceProviders/DriverFinProduct';
import DriverFinLoan from './routes/FinanceServiceProviders/DriverFinOrder';
import DriverFinCustomer from './routes/FinanceServiceProviders/DriverFinCustomer';

import ShipperFinancialProducts from './routes/FinanceServiceProviders/ShipperFinProduct';
import ShipperFinLoan from './routes/FinanceServiceProviders/ShipperFinOrder';
import ShipperFinCustomer from './routes/FinanceServiceProviders/ShipperFinCustomer';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/login" />
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/retrieve" component={ Retrieve } />
      <Route path="/index" component={ Index } >
        <Route path="/users">
          <Route path="/anTruckUsers" component={ AtUsers } />
          <Route path="/transportCompanies" component={ TransportCompanies } />
          <Route path="/owners" component={ Owners } />
        </Route>
        <Route path="/buyCars">
          <Route path="/brands" component={ Brands } />
          <Route path="/dealers" component={ Dealers } />
          <Route path="/inquiry" component={ Inquiry } />
        </Route>
        <Route path="/function">
          <Route path="/message" component={ Message } />
		  <Route path="/statistics" component={ Statistics } />
        </Route>
        <Route path="/resources">
          <Route path="/carSource" component={ CarSource } />
          <Route path="/bindVehicle" component={ BindVehicle } />
        </Route>
        <Route path="/system">
          <Route path="/version" component={ Version } />
          <Route path="/dealers" component={ Dealers } />
        </Route>
        <Route path="/insurance">
          <Route path="/insuranceProducts" component={ InsuranceProduct } />
          <Route path="/insuranceCustomers" component={ InsuranceCustomer } />
        </Route>
        <Route path="/traffic">
          <Route path="/trafficProducts" component={ TrafficProduct } />
          <Route path="/trafficOrders" component={ TrafficOrder } />
          <Route path="/trafficCustomers" component={ TrafficCustomer } />
          <Route path="/affiliatedCompanies" component={ AffiliatedCompanies } />
        </Route>
        <Route path="/transportation">
          <Route path="/betonList" component={ BetonList } />
          <Route path="/carSourceList" component={ CarSourceList } />
          <Route path="/dedicatedLineList" component={ DedicatedLineList } />
          <Route path="/orderList" component={ OrderList } />
        </Route>
        <Route path="/driverFinancial">
          <Route path="/driverFinancialProducts" component={ DriverFinancialProducts } />
          <Route path="/driverFinLoan" component={ DriverFinLoan } />
          <Route path="/driverFinCustomer" component={ DriverFinCustomer } />
        </Route>
        <Route path="/ownerFinancial">
          <Route path="/shipperFinancialProducts" component={ ShipperFinancialProducts } />
          <Route path="/shipperFinLoan" component={ ShipperFinLoan } />
          <Route path="/shipperFinCustomer" component={ ShipperFinCustomer } />
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
