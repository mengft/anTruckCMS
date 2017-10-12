import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../constants'
import { warning } from '../../utils/noticeTips';
import moment from 'moment';

function AffiliatedCompaniesListUI( {dispatch, data, showModal, loading, showEditModal,  changeObject, pagination,} ) {
  // 表格数据分页
  function handleTableChange(pagination) {
    dispatch({
      type: 'affiliatedComponentListState/fetch',
      payload:{
        current: pagination.current
      }
    });
  }
  const columns = [{
    title: '工商代码',
    dataIndex: 'business_num',
    width: '90px',
    key: 'business_num',
  },{
    title: '公司名称',
    dataIndex: 'company_name',
    width: 120,
    key: 'company_name',
  },{
    title: '公司地址',
    dataIndex: 'company_address',
    width: 100,
    key: 'company_address',
  }, {
    title: '联系方式',
    dataIndex: 'mobile',
    width: 90,
    key: 'mobile',
  },{
    title: '用户名',
    dataIndex: 'username',
    width: 100,
    key: 'username',
  },{
    title: '邮箱',
    dataIndex: 'email',
    width: 150,
    key: 'email',
  },{
    title: '更新日期',
    dataIndex: 'entry_date',
    width: 90,
    key: 'entry_date',
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
        onChange = { handleTableChange }
        pagination={ pagination } />
    </div>
  )
}

export default AffiliatedCompaniesListUI;
