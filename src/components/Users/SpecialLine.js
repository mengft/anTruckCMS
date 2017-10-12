import { Icon, Button, Modal, DatePicker, InputNumber, Select, Table } from 'antd';
import {error} from '../../utils/noticeTips'

function FormModal ({ showSpecial, form, dispatch, handleCancel, pagination, current, data, columns }) {
  //点击Modal 里面的确认按钮
  function handleOk() {

  }

  return (
    <Modal
      title="专线详情"
      visible={ showSpecial }
      onOk={ handleOk }
      onCancel={ handleCancel }
      style={{ top: '46px' }}
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={pagination}
        rowKey="id"
      />
    </Modal>
  )
}


const WrappedAppForm = FormModal;

export default WrappedAppForm;

