import { Table, Popconfirm, message, Input, Button, Modal, Form } from 'antd';
import moment from 'moment';
import { PAGE_SIZE , carTypeArrayBX} from '../../constants'
import { warning } from '../../utils/noticeTips';

function CustomerInformationUI( {dispatch, data, showModal, showEditModal,  changeObject, pagination,currentUserInfo} ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'shipperFinCustomerInformation/handleCustomerInformation',
      payload: {
        type: 'del', ...value,
      }
    })
  }

  //确认编辑 按钮.
  function confirmFb(index) {
    const value = data[index];
    dispatch({
      type: 'shipperFinCustomerInformation/handleCustomerInformation',
      payload: {
        type: 'fb', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    dispatch({
      type: 'shipperFinCustomerInformation/fetch',
      payload:{
        current: pagination.current,
        userInfo:currentUserInfo
      }
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);

    dispatch({
      type: 'shipperFinCustomerInformation/handleEdit',
      payload: {
        insuranceCustomer: record,
        index,
      }
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'shipperFinCustomerInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'shipperFinCustomerInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'shipperFinCustomerInformation/handleEditCancel'
    })
  }

  function changeUserInfo(event){
    dispatch({
        type: 'shipperFinCustomerInformation/updateCurrentUserInfo',
        payload: {
          currentUserInfo:event.target.value
        } ,
     });
  }

  const columns = [{
    title: '用户名',
    dataIndex: 'mobile',
    key: 'insurance_mobile',
  },{
    title: '服务商名称',
    dataIndex: 'userName',
    key: 'insurance_userName',
  },{
    title: '客户名称',
    dataIndex: 'company',
    key: 'insurance_company',
  },{
    title: '联系人',
    dataIndex: 'contact_name',
    key: 'insurance_contact_name',
  },{
    title: '联系方式',
    dataIndex: 'contact_tel',
    key: 'insurance_contact_tel',
  }, {
    title: '车辆数量',
    dataIndex: 'car_num',
    key: 'insurance_car_num',
  },{
    title: '备注',
    dataIndex: 'remark',
    key: 'insurance_remark',
  },{
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'insurance_create_time',
    render: (text) => {
      return (
          <div> { moment(text).format('YYYY-MM-DD HH:mm:ss') }</div>
        )
    }
  }, {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record, index) => {
      return (
            data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
              (
                <div>            
                  <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(index) }>
                    <a href="#">删除</a>
                  </Popconfirm>
                </div>
              ): null
          );
      
    },
  }];

  return (
    <div>
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      服务商信息：<Input style={{ width: '150px' }} onChange={changeUserInfo} placeholder="用户名或名称"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button className="editable-add-btn" onClick={ handleTableChange } style={{marginBottom: '8px'}}>搜索</Button>
      <Table
        dataSource={data}
        columns={columns}
        bordered
        rowKey="id"
        onChange={ handleTableChange }
        pagination={ pagination } />
    </div>
  )
}

export default CustomerInformationUI;
