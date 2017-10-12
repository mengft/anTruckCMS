import { Table, Popconfirm, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import {error,success,warning} from '../../utils/noticeTips'

import AddModal from '../../components/System/AddModal'
//import EditModal from '../../components/System/EditModal'

function Message({dispatch, data, loading, pagination, showAddModal, showEditModal, currentMessage}) {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 100,
    },
    {
      title: '消息内容',
      dataIndex: 'msg',
      key: 'msg',
      width: 250,
    },
    {
      title: '用户id',
      dataIndex: 'userid',
      key: 'userid',
      width: 100,
    },
    {
      title: '设备类型',
      dataIndex: 'device_type',
      key: 'device_type',
      width: 100,
    },
    {
      title: '设备id',
      dataIndex: 'channelid',
      key: 'channelid',
      width: 100,
    },
    {
      title: '推送创建时间',
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
      title: '操作',
      dataIndex: 'operations',
      width: 100,
      render: (text,record,index) => {
        return (
          data.length > 0 ?
            (
              <div>
              <span>
                <a onClick={ () => edit(text, record, index) }>编辑</a>
              </span>
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
  function confirmFun(text, record, index) {
    warning('暂未开通');
    /*dispatch({
      type: 'message/operationData',
      payload: {
        ...record,
        oper: 'del',
        current: pagination.current,
      }
    });*/
  }

  //点击页面切换 pagination, filters, sorter
  function onHandleChange(page,filters, sorter) {
    dispatch({
      type:"message/fetchList",
      payload: {
        current:page.current,
        sord:sorter.order,
      },
    });
  }
  //点击编辑按钮
  function edit(text, record, index) {
    warning('暂未开通');
    /*dispatch({
      type:'message/updateCurrent',
      payload: {
        ...record
      }
    });
    dispatch({
      type:'message/triggerEditModal'
    })*/
  }

  //点击显示增加Modal
  function handleShowModal() {
    warning('暂未开通');
    /*dispatch({
      type:'message/triggerModal'
    })*/
  }
  //点击增加模块的取消按钮
  function handleCancel() {
    dispatch({
      type:'message/triggerModal'
    })
  }
  //点击取消编辑模块的按钮
  function handleShowEditModal() {
    dispatch({
      type:'message/triggerEditModal'
    })
  }

  const addModalOpts = {
    showAddModal,
    handleCancel,
    dispatch,
    current: pagination.current,
  };

/*  const editModalOpts = {
    showEditModal,
    handleShowEditModal,
    dispatch,
    current: pagination.current,
    currentMessage
  };*/

  return (
    <div>
      <Button className="editable-add-btn" onClick={ handleShowModal } style={{marginBottom: '8px'}}>增加</Button>
      <AddModal {...addModalOpts}/>

      <Table
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={pagination}
        onChange={onHandleChange}
        rowKey="id"
      />
    </div>
  )
}

function mapStateToProps(state) {
  return state.message
}

export default connect(mapStateToProps)(Message);
