import dva from 'dva';
import createLoading from 'dva-loading';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import './index.css';

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
});
// 2. Plugins
app.use( createLoading() );

// 3. Model
app.model(require('./models/modelIndex'));
app.model(require('./models/modelAccount'));

app.model(require('./models/Users/modelUsers'));
app.model(require('./models/Users/TransportCompanies'));
app.model(require('./models/Users/modelOwners'));

app.model(require('./models/BuyCar/modelBrands'));
app.model(require('./models/BuyCar/modelDealers'));
app.model(require('./models/BuyCar/modelInquiry'));

app.model(require('./models/Function/modelMessage'));
app.model(require('./models/Function/modelStatistic'));

app.model(require('./models/System/modelVersion'));

app.model(require('./models/Resources/modelCars'));
app.model(require('./models/Resources/modelBindVehicle'));

app.model(require('./models/InsuranceServiceProviders/InsuranceProduct'));
app.model(require('./models/InsuranceServiceProviders/InsuranceCustomer'));

app.model(require('./models/TrafficServiceProviders/TrafficProduct'));
app.model(require('./models/TrafficServiceProviders/TrafficCustomer'));

app.model(require('./models/TrafficServiceProviders/TrafficOrder'));
app.model(require('./models/AffiliatedManagement/modelAffiliatedCompaniesList'));
app.model(require('./models/TransportManagement/modelBetonList'));
app.model(require('./models/TransportManagement/modelCarSourceList'));
app.model(require('./models/TransportManagement/modelDedicatedLineList'));
app.model(require('./models/TransportManagement/modelOrderList'));

app.model(require('./models/FinanceServiceProviders/DriverFinProduct'));
app.model(require('./models/FinanceServiceProviders/DriverFinOrder'));
app.model(require('./models/FinanceServiceProviders/DriverFinCustomer'));

app.model(require('./models/FinanceServiceProviders/ShipperFinProduct'));
app.model(require('./models/FinanceServiceProviders/ShipperFinOrder'));
app.model(require('./models/FinanceServiceProviders/ShipperFinCustomer'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
