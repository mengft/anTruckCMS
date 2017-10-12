import { Table, Popconfirm } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

function TransportCompanies({dispatch, data, pagination, loading}) {
  const columns = [
    {
      title: '用户名字',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 100,
    },
    {
      title: '公司名字',
      dataIndex: 'business_num',
      key: 'business_num',
      width: 100,
    },
    {
      title: '公司地址',
      dataIndex: 'company_address',
      key: 'company_address',
      width: 100,
    },
    {
      title: '用户手机',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 100,
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: '注册时间',
      dataIndex: 'entry_date',
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    },
  ];

  function onHandleChange(page) {
    dispatch({
      type:"transportCompanies/fetchList",
      payload: {
        current:page.current
      },
    });
  }

  return (
    <div>
      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={pagination}
        rowKey="id"
        onChange={onHandleChange}
      />
    </div>
  )
}


function mapStateToProps(state) {
  return state.transportCompanies
}


export default connect(mapStateToProps)(TransportCompanies);
