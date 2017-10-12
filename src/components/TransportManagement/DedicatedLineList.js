import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../constants'
import { warning } from '../../utils/noticeTips';
import moment from 'moment';

function DedicatedLineListUI( {dispatch, data, showModal, loading, showEditModal,  changeObject, pagination,} ) {
  // 表格数据分页
  function handleTableChange(pagination) {
    dispatch({
      type: 'dedicatedLineState/fetchDedicatedLine',
      payload:{
        current: pagination.current
      }
    });
  }

  const carTypeArray = ['平板','高栏','厢式','危险品','冷藏','高低板','搅拌车','泵车','自卸车','其它'];
  const zxTypeArr = ['一装一卸', '一装两卸', '一装多卸', '两装一卸', '两装两卸', '多装多卸'];
  const columns = [{
    title: '货物名称',
    dataIndex: 'name',
    width: 120,
    key: 'name',
    fixed: 'left',
  }, {
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
  },{
    title: '支付方式',
    dataIndex: 'pay_type',
    width: 120,
    key: 'pay_type',
  },{
    title: '始发省份',
    dataIndex: 'origin_province_name',
    width: 120,
    key: 'origin_province_name',
  },{
    title: '始发城市',
    dataIndex: 'origin_city_name',
    width: 120,
    key: 'origin_city_name',
  },{
    title: '始发区域',
    dataIndex: 'origin_zone_name',
    width: 120,
    key: 'origin_zone_name',
  }, {
    title: '目的省份',
    dataIndex: 'dest_province_name',
    width: 120,
    key: 'dest_province_name',
  },{
    title: '目的城市',
    dataIndex: 'dest_city_name',
    width: 120,
    key: 'dest_city_name',
  },{
    title: '目的区域',
    dataIndex: 'dest_zone_name',
    width: 120,
    key: 'dest_zone_name',
  },{
    title: '车型',
    dataIndex: 'truck_type',
    width: 100,
    key: 'truck_type',
    render: (record, text) => { return (<span> {carTypeArray[record]} </span>)},
  },{
    title: '车长',
    dataIndex: 'truck_length',
    width: 120,
    key: 'truck_length',
  }, {
    title: '吨位',
    dataIndex: 'truck_load',
    width: 100,
    key: 'truck_load',
  }, {
    title: '体积',
    dataIndex: 'truck_volume',
    width: 100,
    key: 'truck_volume',
  },{
    title: '装卸方式',
    dataIndex: 'zx_type',
    width: 100,
    key: 'zx_type',
    render: (text) => {
      return <span>{ zxTypeArr[text] }</span>
    }
  }, {
    title: '联系人数量',
    dataIndex: 'contact_num',
    width: 120,
    key: 'contact_num',
  }, {
    title: '运费',
    dataIndex: 'price',
    width: 120,
    key: 'price',
  }, {
    title: '装车时间',
    dataIndex: 'start_time',
    width: 100,
    key: 'start_time',
    fixed: 'right',
     render: (text) => {
      return (
          <div>
            { text!== null ? moment(text).format('YYYY-MM-DD'): '' }
          </div>
      )
    }
  }, {
    title: '发货时间',
    dataIndex: 'entry_date',
    width: 100,
    key: 'entry_date',
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
        scroll={{ x: 2160 }}
        onChange = { handleTableChange }
        pagination={ pagination } />
    </div>
  )
}

export default DedicatedLineListUI;
