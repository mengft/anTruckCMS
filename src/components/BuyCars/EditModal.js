import { Form, Input, Icon, Button, Modal, DatePicker, InputNumber, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import Cascader from './Cascader'
import {Brands} from '../../utils/brands'
import {error} from '../../utils/noticeTips'

function FormModal ({showEditModal, form, dispatch, handleShowEditModal, current,currentDealer, cascaderOptions }) {
  localStorage.c_pro_id = currentDealer.province_id;
  localStorage.c_city_id = currentDealer.city_id;
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  //点击Modal 里面的确认按钮

  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return false;
      } else {
        if (localStorage.c_pro_id == undefined || localStorage.c_pro_id == 'undefined' || localStorage.c_city_id == undefined || localStorage.c_city_id == 'undefined') {
          error('请选择行政区域');
        } else {
          dispatch({
            type: 'dealers/editDealer',
            payload: {
              ...value,
              pro_id:localStorage.c_pro_id,
              city_id:localStorage.c_city_id,
              id:currentDealer.id,
            }
          });
        }
      }
    });
  }
  //表单布局用的参数
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  function onChange(value, selectedOptions) {
    //选中 目标区域的 回调
    localStorage.c_pro_id = value[0];
    localStorage.c_city_id = value[1];
  }

  const option = {
    options: cascaderOptions,
    placeholder: '请选择所在市/区。',
    onChange: onChange,
    style: {
      width: '100%'
    },
    defaultValue: [currentDealer.province_id , currentDealer.city_id],
  };


  return (
    <Modal
      title="修改一条经销商信息"
      visible={ showEditModal }
      onOk={ handleOk }
      onCancel={ handleShowEditModal }
      style={{ top: '46px' }}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="经销商名字"
          hasFeedback
        >
          {getFieldDecorator('name', {
            initialValue: currentDealer.name,
            rules: [{
              required: true, message: '请输入经销商名字',
            }],
          })(
            <Input type="text" placeholder="请输入经销商名字"/>
          )}
        </FormItem>
        <FormItem
          label="经营品牌"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('brand_id', {
            initialValue: String(currentDealer.brand_id),
            rules: [{ required: true, message: '请选择品牌' }],
          })(
            <Select
              placeholder="请选择品牌"
            >
              {Brands.map(d => <Option value={ String(d.id) } key={d.id}>{d.name}</Option>)}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
          hasFeedback
        >
          {getFieldDecorator('phone', {
            initialValue: currentDealer.phone,
            rules: [{
              required: true, message: '请输入手机号码',
            }],
          })(
            <Input type="text" placeholder="请输入手机号码"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="固定电话"
          hasFeedback
        >
          {getFieldDecorator('gddh', {
            initialValue: currentDealer.gddh,
            rules: [{
              required: true, message: '请输入固定电话',
            }],
          })(
            <Input type="text" placeholder="请输入固定电话"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="区域"
          hasFeedback
        >
          <Cascader {...option}/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="详细地址"
          hasFeedback
        >
          {getFieldDecorator('address', {
            initialValue: currentDealer.address,
            rules: [{
              required: true, message: '请输入详细地址',
            }],
          })(
            <Input type="text" placeholder="请输入详细地址"/>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}


const WrappedAppForm = Form.create()(FormModal);

export default WrappedAppForm;

