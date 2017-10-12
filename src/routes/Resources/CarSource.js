import { Table, Popconfirm } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import style from './carSources.css';

function CarSource({dispatch, data, pagination, loading}) {
  const stateArray = ['在售', '下架'];
  const columns = [
    {
      title: '品牌名称',
      dataIndex: 'brandName',
      key: 'brandName',
      width: 200,
    },
    {
      title: '发动机',
      dataIndex: 'engine',
      key: 'engine',
      width: 200,
    },
    {
      title: '马力',
      dataIndex: 'horsepower',
      key: 'horsepower',
      width: 200,
    },
    {
      title: '图片',
      dataIndex: 'logo',
      width: 10,
      render: (text) => {
        return (
          <div  style={{width: '300px', height: '200px', margin: '0'}} >
            <img  style={{width: '300px', height: '200px'}} src={text}/>
          </div>
        )
      }
    },
    {
      title: '卡车特征值',
      dataIndex: 'tags',
      key: 'tags',
      className: style.showCenter,
      width: 200,
    },
    {
      title: '类型',
      dataIndex: 's_name',
      key: 's_name',
      className: style.showCenter,
      width: 200,
    },
    {
      title: '点击查看资料',
      dataIndex: 'source_url',
      className: style.showCenter,
      width: 200,
      render: (text) => {
        return (
          <div>
            <a href={text} >点击查看</a>
          </div>
        )
      }
    },
    {
      title: '录入时间',
      dataIndex: 'entry_date',
      className: style.showCenter,
      width: 200,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      className: style.showCenter,
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
      className: style.showCenter,
      width: 200,
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
      type:"carSources/fetchList",
      payload: {
        current:page.current
      },
    });
  }

  //确认删除按钮
  function confirmFun(text,record,index) {
    dispatch({
      type: 'carSources/deleteBrand',
      payload: {
        id: record.id,
      }
    });
    dispatch({
      type: 'carSources/fetchList',
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
  return state.carSources
}

export default connect(mapStateToProps)(CarSource);
