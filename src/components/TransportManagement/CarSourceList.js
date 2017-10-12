import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../constants'
import { warning } from '../../utils/noticeTips';

function CarSourceListUI( {dispatch, data, showModal, loading, showEditModal,  changeObject, pagination,} ) {

  // 表格数据分页
  function handleTableChange(pagination) {
    dispatch({
      type: 'carSourceListState/fetchCarSource',
      payload:{
        current: pagination.current
      }
    });
  }
  const carTypeArray = ['平板','高栏','厢式','危险品','冷藏','高低板','搅拌车','泵车','自卸车','其它'];
  const columns = [{
    title: '始发城市',
    dataIndex: 'origin_address',
    width: 120,
    key: 'origin_address',
  },{
    title: '目的城市',
    dataIndex: 'dest_address',
    width: 120,
    key: 'dest_address',
  },{
    title: '属性',
    dataIndex: 'truck_length',
    width: 50,
    key: 'truck_length',
  },{
    title: '车型',
    dataIndex: 'car_type',
    width: 50,
    key: 'car_type',
    render: (record, text) => { return (<span> {carTypeArray[record]} </span>)},
  }, {
    title: '联系人',
    dataIndex: 'username',
    width: 90,
    key: 'username',
  },{
    title: '电话',
    dataIndex: 'mobile',
    width: 100,
    key: 'mobile',
  },{
    title: '载重',
    dataIndex: 'car_load',
    width: 100,
    key: 'car_load',
  },{
    title: '公司名称',
    dataIndex: 'company_name',
    width: 100,
    key: 'company_name',
  }];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        loading={ loading }
        bordered
        rowKey={record => record.rowno}
        onChange = { handleTableChange }
        pagination={ pagination } />
    </div>
  )
}

export default CarSourceListUI;
