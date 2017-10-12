import { Form, Input, Icon, Button, Modal, DatePicker, InputNumber, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {Brands} from '../../utils/brands'
import {error} from '../../utils/noticeTips'

function FormModal ({ showEditModal, form, dispatch, handleShowEditModal, current, currentVersion }) {
  const { validateFields, getFieldDecorator, setFieldsValue } = form;
  //点击Modal 里面的确认按钮
  function handleOk() {
    validateFields((errors,value) => {
      if (errors) {
        return false;
      } else {
        dispatch({
          type: 'version/operationData',
          payload: {
            ...value,
            id: currentVersion.id,
            oper: 'edit',
          }
        });
        dispatch({
          type: 'version/triggerEditModal',
          payload: {
            current: current,
          }
        });
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



  return (
    <Modal
      title="编辑本条APP版本的信息"
      visible={ showEditModal }
      onOk={ handleOk }
      onCancel={ handleShowEditModal }
      style={{ top: '46px' }}
    >
      <Form>
        <FormItem
          {...formItemLayout}
          label="版本号"
          hasFeedback
        >
          {getFieldDecorator('version_id', {
            initialValue: currentVersion.version_id,
            rules: [{
              required: true, message: '请输入版本号',
            }],
          })(
            <Input type="text" placeholder="请输入版本号"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="下载地址"
          hasFeedback
        >
          {getFieldDecorator('url', {
            initialValue: currentVersion.url,
            rules: [{
              required: true, message: '请输入下载地址',
            }],
          })(
            <Input type="text" placeholder="请输入下载地址"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="文件大小(MB)"
          hasFeedback
        >
          {getFieldDecorator('size', {
            initialValue: currentVersion.size ? Number(currentVersion.size.slice(0,-2)) : null ,
            rules: [{
              required: true, message: '请输入文件大小',
            }],
          })(
            <Input type="number" placeholder="请输入文件大小"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="更新说明"
          hasFeedback
        >
          {getFieldDecorator('descr', {
            initialValue: currentVersion.descr,
            rules: [{
              required: true, message: '请输入更新说明',
            }],
          })(
            <Input type="text" placeholder="请输入更新说明"/>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}


const WrappedAppForm = Form.create()(FormModal);

export default WrappedAppForm;

