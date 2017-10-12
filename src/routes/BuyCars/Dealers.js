import { Table, Popconfirm, Badge, Menu, Dropdown, Icon, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import * as Region from '../../utils/region'
import { Brands } from '../../utils/brands'

import AddModal from '../../components/BuyCars/AddModal'
import EditModal from '../../components/BuyCars/EditModal'

function Dealers({dispatch, data, pagination, currentDealer, loading, showAddModal, showEditModal, cascaderOptions }) {
  const columns = [
    {
      title: '经销商名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '品牌名称',
      dataIndex: 'brand_id',
      key: 'brand_id',
      width: 100,
      render: (text, recorder, index) => {
        let b = Brands.find( (value) => {
          return value.id == recorder.brand_id;
        });
        return (
          <div>
            {b ?  b.name : null}
          </div>
        )
      }
    },
    {
      title: '区域',
      dataIndex: 'region',
      width: 100,
      render: (text,recorder, index) => {
        let c = Region.cities.find( (value) => {
          return value.id == recorder.city_id;
        });
        return (
          <div>
            {c ?  c.name : null}
          </div>
        )
      }
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 100,
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: '固定电话',
      dataIndex: 'gddh',
      key: 'gddh',
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
      render: (text,record,index) => {
        return (
          data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
            (
              <div>
              <span>
                <a onClick={ () => edit(text, record, index) }>编辑</a>
              </span>
                <span className="ant-divider"/>
                <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(text,record,index) }>
                  <a href="#">删除</a>
                </Popconfirm>
              </div>
            ) : null
        )
      }
    },
  ];

  //删除一条记录
  function confirmFun(text,record,index) {
    dispatch({
      type: 'dealers/deleteDealer',
      payload: {
        id: record.id,
      }
    });
    dispatch({
      type: 'dealers/fetchList',
      payload: {
        current: pagination.current,
      }
    });
  }

  //处理表格下 页码切换
  function onHandleChange(page) {
    dispatch({
      type:"dealers/fetchList",
      payload: {
        current:page.current
      },
    });
  }

  //点击增加模块的取消按钮
  function handleCancel() {
    dispatch({
      type:'dealers/triggerModal'
    })
  }

  function handleShowModal() {
    dispatch({
      type:'dealers/triggerModal'
    })
  }

  //点击编辑按钮 (显示编辑框.)
  function edit(text, record, index) {
    dispatch({
      type:'dealers/updateCurrent',
      payload: {
        ...record
      }
    });
    dispatch({
      type:'dealers/triggerEditModal'
    })
  }

  function handleShowEditModal() {
    dispatch({
      type:'dealers/triggerEditModal'
    })
  }

  const addModalOpts = {
    showAddModal,
    handleCancel,
    dispatch,
    current: pagination.current,
    cascaderOptions,
  };
  const editModalOpts = {
    showEditModal,
    handleShowEditModal,
    dispatch,
    current: pagination.current,
    cascaderOptions,
    currentDealer,
  };

  return (
    <div>
      <Button className="editable-add-btn" onClick={ handleShowModal } style={{marginBottom: '8px'}}>增加</Button>
      <AddModal {...addModalOpts}/>
      <EditModal {...editModalOpts}/>
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

function mapStateToProp(state) {
  return state.dealers;
}

export default connect(mapStateToProp)(Dealers);
