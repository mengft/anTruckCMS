import { Table, Popconfirm, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

//卡车类型 1 平板 2 高栏 3 厢式 4 危险品 5 冷藏 6 高低板 7 搅拌车 8 泵车 9 自卸车 10 其它
const carTypeArray = ['平板','高栏','厢式','危险品','冷藏','高低板','搅拌车','泵车','自卸车','其它'];
//车牌类型 车牌类型 0 小型 1 大型
const carNumArray = ['小型', '大型'];

function BindVehicle({dispatch, data, loading, pagination }) {
  const columns = [
    {
      title: '车牌号',
      dataIndex: 'car_num',
      key: 'car_num',
      width: 100,
      fixed: 'left',
    },{
      title: '车牌类型',
      dataIndex: 'car_num_type',
      key: 'car_num_type',
      width: 100,
      render: (text) => <div>{ carNumArray[text] }</div>
    }, {
      title: '车型',
      dataIndex: 'car_type',
      key: 'car_type',
      width: 100,
      render: (text) =>  <div>{ carTypeArray[text - 1] }</div>,
    }, {
      title: '车属性',
      dataIndex: 'car_type_value',
      key: 'car_type_value',
      width: 120,
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
    }, {
      title: '发动机号',
      dataIndex: 'engine_num',
      key: 'engine_num',
      width: 100,
    }, {
      title: '车架号',
      dataIndex: 'frame_num',
      key: 'frame_num',
      width: 100,
    }, {
      title: '挂靠公司',
      dataIndex: 'company_name',
      key: 'company_name',
      width: 140,
    }, {
      title: '登记日期',
      dataIndex: 'entry_date',
      key: 'entry_date',
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '保险到期日',
      dataIndex: 'insurance_date',
      key: 'insurance_date',
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '车主姓名',
      dataIndex: 'c_username',
      key: 'c_username',
      width: 80,
    }, {
      title: '车主身份证号',
      dataIndex: 'c_id_num',
      key: 'c_id_num',
      width: 130,
    }, {
      title: '绑定人姓名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    }, {
      title: '绑定人手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 100,
    }, {
      title: '绑定时间',
      dataIndex: 'bind_date',
      key: 'bind_date',
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '录入时间',
      dataIndex: 'checkin_date',
      key: 'checkin_date',
      width: 100,
      render: (text) => {
        return (
          <div>
            { moment(text).format('YYYY-MM-DD') }
          </div>
        )
      }
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: 100,
      render: (text, record, index) => {
        return (
          data.length > 0 ?  //案例中的写法是.用一个 三元语法,写一个判断是否出现这个按钮
            (
              <div>
              <span>
                <a onClick={ () => editModal(text, record, index) }>编辑</a>
              </span>
                <span className="ant-divider"/>
                <Popconfirm title="确认删除?" onConfirm={ () => confirmFun(record, index) }>
                  <a href="#">删除</a>
                </Popconfirm>
              </div>

            ) : null
        );
      },
      fixed: 'right',
    }
  ];
  function onHandleChange(page) {
    dispatch({
      type:"bindVehicle/fetchList",
      payload: {
        current:page.current,
      },
    });
  }

  function confirmFun(record) {
    dispatch({
      type:"bindVehicle/deleteItem",
      payload: {
        id:record.id,
        current: pagination.current,
      },
    });
  }

  return (
    <div>
      <Table
        loading={ loading }
        dataSource={data}
        columns={columns}
        bordered
        rowKey="id"
        pagination={ pagination }
        scroll={{ x: 1800 }}
        onChange={ onHandleChange }
      />
    </div>
  )
}

function mapStateToProps(state) {
  return state.bindVehicle
}

export default connect(mapStateToProps)(BindVehicle);
