import { Table, Popconfirm } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

function Brands({dispatch, data, pagination, loading}) {
  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '品牌Logo',
      dataIndex: 'logo',
      width: 100,
      render: (text) => {
        return (
          <div>
            <img src={text}/>
          </div>
        )
      }
    },
    {
      title: '录入时间',
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
    {
      title: '操作',
      dataIndex: 'operations',
      width: 100,
      render: (text,record,index) => {
        return (
          data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
            (
              <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(text,record,index) }>
                <a href="#">删除</a>
              </Popconfirm>
            ) : null
        )
      }
    },
  ];

  //点击页面切换
  function onHandleChange(page) {
    dispatch({
      type:"brands/fetchList",
      payload: {
        current:page.current
      },
    });
  }

  //确认删除按钮
  function confirmFun(text,record,index) {
    dispatch({
      type: 'brands/deleteBrand',
      payload: {
        id: record.id,
      }
    });
    dispatch({
      type: 'brands/fetchList',
      payload: {
        current: pagination.current,
      }
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
  return state.brands
}

export default connect(mapStateToProps)(Brands);
