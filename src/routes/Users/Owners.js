import { Table, Popconfirm } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import style from './style.css';
import SpecialModal from '../../components/Users/SpecialLine'

function Owners({dispatch, data, pagination, loading, showSpecial}) {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 100,
    },
    {
      title: '混凝土发货数',
      dataIndex: 'beton_nums',
      key: 'beton_nums',
      className: style.showCenter,
      width: 100,
    },
    {
      title: '专线发货数',
      dataIndex: 'special_nums',
      className: style.showCenter,
      width: 100,
      render: (text) => {
        return (
          <a onClick={ showSpecialLine }>
            { text }
          </a>
        )
      }
    },
    {
      title: '总交易量',
      dataIndex: 'deal_nums',
      key: 'deal_nums',
      className: style.showCenter,
      width: 100,
    },
    {
      title: '注册时间',
      dataIndex: 'entry_date',
      className: style.showCenter,
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operations',
      className: style.showCenter,
      width: 100,
      render: (text, record, index) => {
        return (
          data.length > 0 ?
            (
              <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(text, record, index) }>
                <a href="#">删除</a>
              </Popconfirm>
            ) : null
        )
      }
    },
  ];

  function showSpecialLine(e) {
    e.preventDefault();
    console.log(666);
    dispatch({
      type:'owners/triggerSpecial',
      payload:{},
    })
  }

  function onHandleChange(page) {
    dispatch({
      type: "owners/fetchList",
      payload: {
        current: page.current
      },
    });
  }

  function handleCancel() {

    dispatch({
      type:'owners/triggerSpecial',
      payload:{},
    })
  }

  const specialModalOpts = {
    columns,
    showSpecial,
    data,
    pagination,
    handleCancel,
    dispatch,
    current: pagination.current,
  };


  return (
    <div>
      <SpecialModal {...specialModalOpts} />
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
  return state.owners
}


export default connect(mapStateToProps)(Owners);
