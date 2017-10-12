import { Table, Popconfirm, Badge, Menu, Dropdown, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

//卡车类型 1 平板 2 高栏 3 厢式 4 危险品 5 冷藏 6 高低板 7 搅拌车 8 泵车 9 自卸车 10 其它
const carTypeArray = ['平板','高栏','厢式','危险品','冷藏','高低板','搅拌车','泵车','自卸车','其它'];
//车牌类型 车牌类型 0 小型 1 大型
const carNumArray = ['小型', '大型'];

function AtUsers({dispatch, data, expandedDataArray, pagination, loading}) {
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
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: '注册时间',
      dataIndex: 'entry_date',
      width: 100,
      render: (text) => <div>{ moment(text).format('YYYY-MM-DD') }</div>,
    },
    {
      title: '操作',
      dataIndex: 'operations',
      width: 100,
      render: (text) => {
        return (
          <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(index) }>
            <a href="#">删除</a>
          </Popconfirm>
        )
      }
    },
  ];
  const expandedRowRender = (recorder, index) => {
   /* console.log('recorder', recorder);
    console.log('index', index);*/
    const columns = [
     /* {
        title: '挂靠车辆序号',
        dataIndex: 'index',
        width: 100,
        render: (text,recorder,index) => (<div style={{width: '100%', textAlign: 'center'}}>{ index + 1 }</div>)},*/
      {title: '车牌号', dataIndex: 'car_num', key: 'car_num', width: 100, fixed:'left'},
      {title: '挂靠公司', dataIndex: 'company_name', key: 'company_name', width: 150},
      {
        title: '车牌类型',
        dataIndex: 'car_num_type',
        width: 100,
        render: (text) => <div>{ carNumArray[text] }</div>
      },
      {title: '发动机号', dataIndex: 'engine_num', key: 'engine_num', width: 140},
      {title: '车架号', dataIndex: 'frame_num', key: 'frame_num', width: 100},
      {
        title: '登记时间',
        dataIndex: 'entry_date',
        width: 140,
        render: (text) => (
          <div>{ moment(text).format('YYYY-MM-DD') }</div>
        ),
      },
      {title: '车型', dataIndex: 'car_type', key: 'car_type', width: 100},
      {
        title: '车型属性',
        dataIndex: 'car_type_value',
        width: 100,
        render: (text, record) => {
          const car_type = record.car_type;
          if (car_type > 0 && car_type < 7 ||  car_type == 8 ) {
            return (
              <div>长度:{ text } </div>
            )
          } else if ( car_type == '7' ) {
            return (
              <div>罐体方量:{ text }</div>
            )
          } else if ( car_type == '9' ) {
            return (
              <div>吨位:{ text } </div>
            )
          }
        }
      },
      {
        title: '保险到期时间',
        dataIndex: 'insurance_date',
        width: 140,
        render: (text) => (
          <div>{ moment(text).format('YYYY-MM-DD') }</div>
        ),
      },
      {
        title: '录入时间',
        dataIndex: 'checkin_date',
        width: 140,
        render: (text) => (
          <div>{ moment(text).format('YYYY-MM-DD') }</div>
        ),
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span>
            <span>
              <a onClick={ () => edit(text, record, index) }>编辑</a>
            </span>
            <span className="ant-divider"/>
            <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(index) }>
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
        fixed: 'right',
      },
    ];


    return (
      <Table
        columns={columns}
        dataSource={ expandedDataArray[recorder.userid] }
        pagination={{pageSize: 3}}
        rowKey="id"
        scroll={{ x: '125%' , y: 540 }}
      />
    );
  };

  //点击表头展开的监听
  function onExpand(expanded, record) {
    //点击前面的 + 号 来的 监听 方法
    if (expanded) {
      dispatch({
        type:'users/fetchExpandedData',
        payload: {
          userid: record.userid,
        },
      })
    }

  }
  //展开的行变化时触发  expandedRows
  function onExpandedRowsChange(expandedRows) {

  }

  function onHandleChange(page) {
    dispatch({
      type:"users/fetchUsersList",
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
        rowKey="userid"
        expandedRowRender={expandedRowRender}
        onExpand={onExpand}
        onExpandedRowsChange={onExpandedRowsChange}
        onChange={onHandleChange}
      />
    </div>
  )
}

function mapStateToProp(state) {
  return state.users;
}

export default connect(mapStateToProp)(AtUsers);




















