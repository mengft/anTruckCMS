import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../constants'
import { warning } from '../../utils/noticeTips';
import moment from 'moment';
function OrderListUI( {dispatch, data, showModal, loading, showEditModal,  changeObject, pagination,} ) {

  // 表格数据分页的时候
  function handleTableChange(pagination) {
    dispatch({
      type: 'orderState/fetchOrder',
      payload:{
        current: pagination.current
      }
    });
  }
  const columns = [{
    title: '联系人',
    dataIndex: 'username',
    width: 50,
    key: 'username',
  },{
    title: '联系电话',
    dataIndex: 'mobile',
    width: 50,
    key: 'mobile',
  },{
    title: '时间',
    dataIndex: 'entry_date',
    width: 50,
    key: 'entry_date',
   render: (text) => {
      return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
      )
    }
  }, {
    title: '用户名',
    dataIndex: 'own_username',
    width: 50,
    key: 'own_username',
  }, {
    title: '用户联系方式',
    dataIndex: 'own_mobile',
    width: 60,
    key: 'own_mobile',
  }, {
    title: '运输信息',
    dataIndex: 'msg',
    width: 200,
    key: 'msg',
  }];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        loading={ loading }
        bordered
        rowKey="id"
        onChange = { handleTableChange }
        pagination={ pagination } />
    </div>
  )
}

export default OrderListUI;
