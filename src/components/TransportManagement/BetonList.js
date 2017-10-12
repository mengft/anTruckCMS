import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../constants'
import { warning } from '../../utils/noticeTips';
import moment from 'moment';

function BetonListUI( {dispatch, data, showModal, loading, showEditModal,  changeObject, pagination,} ) {

  // 数据分页
  function handleTableChange(pagination) {
    dispatch({
      type: 'betonState/fetchBeton',
      payload:{
        current: pagination.current
      }
    });
  }

  const zqArr = ['长租', '临租', '一个月', '三个月', '六个月', '一年'];
  const payTypeArr = ['天', '周', '月', '季度', '半年'];

  const columns = [{
    title: '联系人',
    dataIndex: 'v_username',
    width: 120,
    key: 'v_username',
    fixed: 'left',
  },{
    title: '联系电话',
    dataIndex: 'v_mobile',
    width: 120,
    key: 'v_mobile',
  }, {
    title: '租期',
    dataIndex: 'zq',
    width: 80,
    key: 'zq',
    render: (text) => {
      return <span>{ zqArr[text] }</span>
    },
  }, {
    title: '省份',
    dataIndex: 'province_name',
    width: 80,
    key: 'province_name',
  }, {
    title: '城市',
    dataIndex: 'city_name',
    width: 80,
    key: 'city_name',
  }, {
    title: '区域',
    dataIndex: 'zone_name',
    width: 80,
    key: 'zone_name',
  }, {
    title: '结算方式',
    dataIndex: 'pay_type',
    width: 90,
    key: 'pay_type',
    render: (text) => {
      return <span>{ payTypeArr[text] }</span>
    },
  },{
    title: '用车地点',
    dataIndex: 'address',
    width: 120,
    key: 'address',
  },{
    title: '联系人数量',
    dataIndex: 'contact_num',
    width: 100,
    key: 'contact_num',
  },{
    title: '搅拌车数量',
    dataIndex: 'mixer_num',
    width: 90,
    key: 'mixer_num',
  },{
    title: '泵车数量',
    dataIndex: 'pump_num',
    width: 90,
    key: 'pump_num',
  },{
    title: '录入时间',
    dataIndex: 'entry_date',
    width: 110,
    key: 'entry_date',
    render: (text) => {
      return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
      )
    }
  }, {
    title: '开始时间',
    dataIndex: 'start_time',
    width: 110,
    key: 'start_time',
    render: (text) => {
      return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
      )
    }
  },{
    title: '结束时间',
    dataIndex: 'end_time',
    width: 90,
    key: 'end_time',
    fixed: 'right',
    render: (text) => {
      return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
      )
    }
  }];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        loading={ loading }
        bordered
        rowKey="id"
        scroll={{ x: 1360 }}
        pagination={ pagination } 
        onChange = { handleTableChange }
        />
    </div>
  )
}

export default BetonListUI;
