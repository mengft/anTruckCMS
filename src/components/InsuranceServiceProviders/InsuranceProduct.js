import { Table, Popconfirm, message, Input, Button, Modal, Form, Select } from 'antd';
import { PAGE_SIZE , carTypeArrayBX} from '../../constants'
import moment from 'moment';
import { warning } from '../../utils/noticeTips';
import {provinces} from '../../utils/region'

function InsuranceProductInformationUI( {dispatch, data, pagination,currentPage,currentCarType,currentProvince,currentCity ,cities,currentCompany,currentUserInfo} ) {

  //确认编辑 按钮.
  function confirmFun(index) {
    const value = data[index];
    dispatch({
      type: 'insuranceProductInformation/handleInsuranceProductInformation',
      payload: {
        type: 'del', ...value,
      }
    })
  }

  //确认编辑 按钮.
  function confirmXj(index) {
    const value = data[index];
    dispatch({
      type: 'insuranceProductInformation/handleInsuranceProductInformation',
      payload: {
        type: 'xj', ...value,
      }
    })
  }

  //切换 表格数据的时候
  function handleTableChange(pagination) {
    let current = pagination.current || currentPage || 1;
    dispatch({
      type: 'insuranceProductInformation/fetch',
      payload:{
        current: current,
        car_type:currentCarType,
        province_id:currentProvince,
        city_id:currentCity,
        insurance_company:currentCompany,
        userInfo:currentUserInfo
      }
    });
    dispatch({
      type: 'insuranceProductInformation/updateCurrentPage',
      payload: {
        currentCity:pagination.current
      } ,
    });
  }

  //点击  编辑 按钮
  function edit(text, record, index) {
    console.log(text, record, index);

    dispatch({
      type: 'insuranceProductInformation/handleInsuranceEdit',
      payload: record
    })
  }



  //点击显示 增加的Modal (增加的功能.)
  function handleShowModal() {
    dispatch({
      type:'insuranceProductInformation/triggerModal'
    })
  }

  //点击Modal 里面的 取消按钮
  function handleCancel() {
    dispatch({
      type:'insuranceProductInformation/triggerModal'
    })
  }


  //点击 编辑Modal 里面的 取消按钮
  function handleEditCancel() {
    dispatch({
      type:'insuranceProductInformation/handleEditCancel'
    })
  }

  function onChange(value) {
    if(value != ''){
        dispatch({
          type: 'insuranceProductInformation/updateCities',
          payload: {
            value : value
          } ,
        });
    }
    dispatch({
      type: 'insuranceProductInformation/updateCurrentProvince',
      payload: {
        currentProvince:value
      } ,
    });
  }

  function changeCarType(value){
    dispatch({
      type: 'insuranceProductInformation/updateCurrentCarType',
      payload: {
        currentCarType:value
      } ,
    });
  }

  function changeCity(value){
    dispatch({
      type: 'insuranceProductInformation/updateCurrentCity',
      payload: {
        currentCity:value
      } ,
    });
  }

  function changeCompany(event){
    dispatch({
        type: 'insuranceProductInformation/updateCurrentCompany',
        payload: {
          currentCompany:event.target.value
        } ,
     });
  }

  function changeUserInfo(event){
    dispatch({
        type: 'insuranceProductInformation/updateCurrentUserInfo',
        payload: {
          currentUserInfo:event.target.value
        } ,
     });
  }

   //车型
  const carTypeOpionts = carTypeArrayBX.map((v, index) => <Select.Option key={ String(index)} value={ String(index) }>{ v }</Select.Option>);

  const provinceOption = provinces.map((v, index) => <Select.Option key={ String(v.id)} value={ String(v.id) }>{ v.name }</Select.Option>);

  const cityOption = cities.map((v, index) => <Select.Option key={ String(v.id)} value={ String(v.id) }>{ v.name }</Select.Option>);

  const columns = [{
    title: '用户名',
    dataIndex: 'mobile',
    width: 100,
    key: 'insurance_mobile',
    fixed: 'left',
  },{
    title: '服务商名称',
    dataIndex: 'userName',
    width: 100,
    key: 'insurance_userName',
    fixed: 'left',
  },{
    title: '保险公司',
    dataIndex: 'insurance_company',
    key: 'insurance_company'
  },{
    title: '经纪人',
    dataIndex: 'agent',
    key: 'insurance_agent',
  },{
    title: '联系方式',
    dataIndex: 'contact_tel',
    key: 'insurance_contact_tel',
  },{
    title: '车型',
    dataIndex: 'car_type',
    key: 'insurance_name',
    render: (text) =>  <div>{ carTypeArrayBX[text] }</div>,
  }, {
    title: '吨位',
    dataIndex: 'onnage',
    key: 'insurance_boss_name',
  }, {
    title: '省份',
    dataIndex: 'province_name',
    key: 'insurance_address',
  }, {
    title: '城市',
    dataIndex: 'city_name',
    key: 'insurance_city',
  },{
    title: '返点',
    dataIndex: 'rebate',
    key: 'insurance_rebate',
    render: (text) => {
      return (
          <div>{text+'%'}</div>
        )
    }
  },{
    title: '备注',
    dataIndex: 'remark',
    key: 'insurance_remark',
  },{
    title: '状态',
    dataIndex: 'fb_status',
    key: 'insurance_fb_status',
    render: (text) => {
      if(text == 0){
        return (
            <div>未发布</div>
          )
      }else{
        return (
            <div>已发布</div>
          )
      }
    }
  },{
    title: '销售状态',
    dataIndex: 'sale_status',
    key: 'insurance_sale_status',
    render: (text) => {
      if(text == 0){
        return (
            <div>正常</div>
          )
      }else{
        return (
            <div>已下架</div>
          )
      }
    }
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
    width: 100,
    render: (text, record, index) => {
      if(record.sale_status == 0){
          return (
            data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
              (
                <div>            
                  <span>
                    <Popconfirm title="确认下架?" onConfirm={ () => confirmXj(index) }>
                    <a href="#">下架</a>
                  </Popconfirm>
                  </span>
                  <span className="ant-divider" />
                  <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(index) }>
                    <a href="#">删除</a>
                  </Popconfirm>
                </div>
              ): null
          );
      }else{
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
      }
    },
    fixed: 'right',
  }];

  return (
    <div>

      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        车辆类型：
        <Select style={{ width: '120px' }} defaultValue='0' onChange={changeCarType}>
          {carTypeOpionts}
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         省  份：
        <Select style={{ width: '120px' }} onChange={onChange} defaultValue='0'>
          <Select.Option key='0' value='0'>请选择省份</Select.Option>
          {provinceOption}
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         城  市：
        <Select style={{ width: '120px' }} defaultValue='0' onChange={changeCity}>
          <Select.Option key='0' value='0'>请选择城市</Select.Option>
          {cityOption}
        </Select>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        保险公司名称：<Input style={{ width: '120px',marginBottom: '8px',marginTop: '8px' }} onChange={changeCompany}/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        服务商信息：<Input style={{ width: '150px' }} onChange={changeUserInfo} placeholder="用户名或名称"/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button className="editable-add-btn" onClick={ handleTableChange } style={{marginBottom: '8px'}}>搜索</Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        bordered
        rowKey="id"
        onChange={ handleTableChange }
        pagination={ pagination }
        scroll={{ x: 1300 }}
         />
    </div>
  )
}

export default InsuranceProductInformationUI;
