import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'

const { SubMenu, ItemGroup  }= Menu;
const height = (document.body.clientHeight - 130) + 'px' ;

class Sider extends React.Component {
  state = {
    current: 'users',
    openKeys: [],
  };
  handleClick = (e) => {
    this.setState({ current: e.key });
  };
  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  };
  getAncestorKeys = (key) => {
    const map = {
      platformUsers: ['users'],
      transportation: ['businessManagement'],
      buyCars: ['businessManagement'],
      traffic: ['businessManagement'],
      commercial: ['businessManagement'],
      insurance:['businessManagement'],
      affiliatedCompany:['businessManagement'],
      driverFinancial: ['businessManagement'],
      ownerFinancial: ['businessManagement']
    };
    return map[key] || [];
  };
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        style={{
          width: 200,
          maxHeight: height,
          overflowY: 'auto',
        }}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
        theme="dark"
      >
        <SubMenu key="index" title={<span><Icon type="mail" /><span>首页</span></span>}>
          <Menu.Item key="index">
            <Link to="/index">
              首页()
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="users" title={<span><Icon type="mail" /><span>用户管理</span></span>}>
          <Menu.Item key="anTruckUsers">
            <Link to="/anTruckUsers">
              壹卡车用户管理
            </Link>
          </Menu.Item>
          <SubMenu  key="platformUsers"  title="服务商用户管理">
            <Menu.Item key="transportCompanies">
              <Link to="/transportCompanies">
                运输公司信息
              </Link>
            </Menu.Item>
            <Menu.Item key="owners">
              <Link to="/owners">
                货主信息
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="permissions">
            <Link to="/permissions">
              权限管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="forgotPassword">
            <Link to="/forgotPassword">
              忘记密码()
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="businessManagement" title={<span><Icon type="appstore" /><span>业务管理</span></span>}>
          <SubMenu  key="affiliatedCompany"  title="挂靠管理">
            <Menu.Item key="affiliatedCompanies">
              <Link to="/affiliatedCompanies">
                挂靠公司管理
              </Link>
            </Menu.Item>
            <Menu.Item key="bindVehicle">
              <Link to="/bindVehicle">
                车辆管理
              </Link>
          </Menu.Item>
          </SubMenu>
          <SubMenu  key="transportation"  title="运输管理">
            <Menu.Item key="betonList">
              <Link to="/betonList">
                混凝土发货
              </Link>
            </Menu.Item>
            <Menu.Item key="dedicatedLineList">
              <Link to="/dedicatedLineList">
                专线发货
              </Link>
            </Menu.Item>
            <Menu.Item key="carSourceList">
              <Link to="/carSourceList">
                车源管理
              </Link>
            </Menu.Item>
            <Menu.Item key="orderList">
              <Link to="/orderList">
                订单管理
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu  key="buyCars"  title="卖车管理">
            <Menu.Item key="dealers">
              <Link to="/dealers">
                经销商管理
              </Link>
            </Menu.Item>
            <Menu.Item key="inquiry">
              <Link to="/inquiry">
                询价管理
              </Link>
            </Menu.Item>
            <Menu.Item key="baojia">
              <Link to="/index">
                报价管理()
              </Link>
            </Menu.Item>
            <Menu.Item key="onSaleCars">
              <Link to="/index">
                在售车源()
              </Link>
            </Menu.Item>

          </SubMenu>
          <SubMenu  key="driverFinancial"  title="司机金融管理">
              <Menu.Item key="driverFinancialProducts">
                <Link to="/driverFinancialProducts">
                  产品管理
                </Link>
              </Menu.Item>
              <Menu.Item key="driverProductRate">
                <Link to="/driverFinLoan">
                  订单管理
                </Link>
              </Menu.Item>
              <Menu.Item key="driverLoan">
                <Link to="/driverFinCustomer">
                  客户管理
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu  key="ownerFinancial"  title="货主金融管理">
                <Menu.Item key="ownerFinancialProducts">
                  <Link to="/shipperFinancialProducts">
                    产品管理
                  </Link>
                </Menu.Item>
                <Menu.Item key="ownerProductRate">
                  <Link to="/shipperFinLoan">
                    订单管理
                  </Link>
                </Menu.Item>
                <Menu.Item key="ownerLoan">
                  <Link to="/shipperFinCustomer">
                    客户管理
                  </Link>
                </Menu.Item>
            </SubMenu>
          <SubMenu  key="traffic"  title="车务管理">
            <Menu.Item key="trafficProducts">
              <Link to="/trafficProducts">
                车务产品
              </Link>
            </Menu.Item>
            <Menu.Item key="trafficOrders">
              <Link to="/trafficOrders">
                车务订单
              </Link>
            </Menu.Item>
            <Menu.Item key="trafficCustomers">
              <Link to="/trafficCustomers">
                车务客户
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu  key="commercial"  title="商事管理">
            <Menu.Item key="commercialProducts">
              <Link to="/trafficProducts">
                商事产品
              </Link>
            </Menu.Item>
            <Menu.Item key="commercialOrders">
              <Link to="/trafficOrders">
                商事订单
              </Link>
            </Menu.Item>
            <Menu.Item key="commercialCustomers">
              <Link to="/trafficCustomers">
                商事客户
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu  key="insurance"  title="保险管理">
            <Menu.Item key="insuranceProducts">
              <Link to="/insuranceProducts">
                保险产品
              </Link>
            </Menu.Item>
            <Menu.Item key="insuranceCustomers">
              <Link to="/insuranceCustomers">
                保险客户
              </Link>
            </Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="resources" title={<span><Icon type="team" /><span>资源管理</span></span>}>
          <Menu.Item key="affiliatedCompanies">
            <Link to="/brands">
              品牌管理
            </Link>
          </Menu.Item>
          <Menu.Item key="carSource">
            <Link to="/carSource">
              车源管理
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="function" title={<span><Icon type="pay-circle" /><span>功能管理</span></span>}>
          <Menu.Item key="positioning">
            <Link to="/positioning">
              定位管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="message">
            <Link to="/message">
              推送消息管理
            </Link>
          </Menu.Item>
          <Menu.Item key="recommended">
            <Link to="/recommended">
              推荐管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="feedback">
            <Link to="/feedback">
              反馈信息管理()
            </Link>
          </Menu.Item>
          <Menu.Item key="statistics">
            <Link to="/statistics">
              统计分析
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="system" title={<span><Icon type="area-chart" /><span>系统管理</span></span>}>
          <Menu.Item key="version">
            <Link to="/version">
              版本管理
            </Link>
          </Menu.Item>
          <Menu.Item key="splashScreen">
            <Link to="/splashScreen">
              启动画面()
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="app" title={<span><Icon type="area-chart" /><span>APP管理</span></span>}>
          <Menu.Item key="app_carBind">
            <Link to="/index">
              绑定车辆()
            </Link>
          </Menu.Item>
          <Menu.Item key="app_dw">
            <Link to="/splashScreen">
              定位管理()
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="set" title={<span><Icon type="setting" /><span>设置</span></span>}>
        </SubMenu>
      </Menu>

    );
  }
}

export default Sider;
