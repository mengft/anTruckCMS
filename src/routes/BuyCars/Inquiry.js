import { Table, Popconfirm, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import {error,success,warning} from '../../utils/noticeTips'
import * as Region from '../../utils/region'

import AddModal from '../../components/System/AddModal'
import EditModal from '../../components/System/EditModal'

function Inquiry({dispatch, data, loading, pagination, showAddModal, showEditModal, currentVersion}) {
  const buyTimeArray = ['一周', '一个月', '三个月'];
  const stateArray = ['已提交', '已删除'];

  const columns = [
    {
      title: '询价者姓名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: '询价目标车型的信息',
      dataIndex: 'truck_info_name',
      key: 'truck_info_name',
      width: 350,
    },
    {
      title: '提车城市',
      dataIndex: 't_city_id',
      width: 100,
      render: (text, recorder, index) => {
        let c = Region.cities.find((value) => {
          return value.id == text;
        });
        return (
          <div>
            {c ? c.name : null}
          </div>
        )
      }
    },
    {
      title: '上牌城市',
      dataIndex: 's_city_id',
      width: 100,
      render: (text, recorder, index) => {
        let c = Region.cities.find((value) => {
          return value.id == text;
        });
        return (
          <div>
            {c ? c.name : null}
          </div>
        )
      }
    },
    {
      title: '购车数量(辆)',
      dataIndex: 'buy_nums',
      key: 'buy_nums',
      width: 100,
    },
    {
      title: '提车期限',
      dataIndex: 'buy_time',
      width: 100,
      render: (text, record, index) => {
        return (
          <div>
            {buyTimeArray[text]}
          </div>
        )
      }
    },
    {
      title: '询价时间',
      dataIndex: 'entry_date',
      width: 100,
      render: (text, record, index) => {
        return (
          <div>
            {moment(text).format('YYYY-MM-DD')}
          </div>
        )
      }
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      width: 100,
      render: (text, record, index) => {
        return (
          <div>
            {stateArray[text]}
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 140,
      render: (text, record, index) => {
        return (
          data.length > 0 ?
            (
              <div>
                <Popconfirm title="确认修改状态?" onConfirm={ () => changeStatue(text, record, index) }>
                  <a href="#">切换状态</a>
                </Popconfirm>
                <span className="ant-divider"/>
                <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(text, record, index) }>
                  <a href="#">删除</a>
                </Popconfirm>
              </div>
            ) : null
        )
      }
    },
  ];

  function changeStatue(text, record, index) {
    let tmp;
    if (record.status == 0) {
      tmp = 1;
    } else if (record.status == 1) {
      tmp = 0;
    }
    dispatch({
      type: 'inquiry/operationData',
      payload: {
        status: tmp,
        id: record.id,
        oper: 'edit',
        current: pagination.current,
      }
    });
  }

  function confirmFun(text, record, index) {
    dispatch({
      type: 'inquiry/operationData',
      payload: {
        ...record,
        oper: 'del',
        current: pagination.current,
      }
    });
  }

  //点击页面切换 pagination, filters, sorter
  function onHandleChange(page, filters, sorter) {
    console.log(sorter);
    dispatch({
      type: "inquiry/fetchList",
      payload: {
        current: page.current,
        sord: sorter.order,
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
  return state.inquiry
}

export default connect(mapStateToProps)(Inquiry);
