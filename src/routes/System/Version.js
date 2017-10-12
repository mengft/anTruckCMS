import { Table, Popconfirm, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import {error,success,warning} from '../../utils/noticeTips'

import AddModal from '../../components/System/AddModal'
import EditModal from '../../components/System/EditModal'

function Version({dispatch, data, loading, pagination, showAddModal, showEditModal, currentVersion}) {
  const columns = [
    {
      title: '版本ID',
      dataIndex: 'version_id',
      key: 'version_id',
      sorter: true,
      width: 100,
    },
    {
      title: '更新说明',
      dataIndex: 'descr',
      key: 'descr',
      width: 400,
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: '下载地址',
      dataIndex: 'url',
      width: 150,
      render: (text, record, index) => {
        return (
          <div>
            <a href={text}>点击下载 {record.version_id}版本 的APP</a>
          </div>
        )
      }
    },
    {
      title: '更新时间',
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
    dispatch({
      type: 'version/operationData',
      payload: {
        ...record,
        oper: 'del',
        current: pagination.current,
      }
    });
  }

  //点击页面切换 pagination, filters, sorter
  function onHandleChange(page,filters, sorter) {
    console.log(sorter);
    dispatch({
      type:"version/fetchList",
      payload: {
        current:page.current,
        sord:sorter.order,
      },
    });
  }
  //点击编辑按钮
  function edit(text, record, index) {
    dispatch({
      type:'version/updateCurrent',
      payload: {
        ...record
      }
    });
    dispatch({
      type:'version/triggerEditModal'
    })
  }

  //点击显示增加Modal
  function handleShowModal() {

    dispatch({
      type:'version/triggerModal'
    })
  }
  //点击增加模块的取消按钮
  function handleCancel() {
    dispatch({
      type:'version/triggerModal'
    })
  }
  //点击取消编辑模块的按钮
  function handleShowEditModal() {
    dispatch({
      type:'version/triggerEditModal'
    })
  }

  const addModalOpts = {
    showAddModal,
    handleCancel,
    dispatch,
    current: pagination.current,
  };

  const editModalOpts = {
    showEditModal,
    handleShowEditModal,
    dispatch,
    current: pagination.current,
    currentVersion
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
        onChange={onHandleChange}
        rowKey="id"
      />
    </div>
  )
}

 function mapStateToProps(state) {
   return state.version
 }

 export default connect(mapStateToProps)(Version);
