import {  Form, Input, Tooltip, Icon, Steps, Cascader, Select, Button, AutoComplete,Row, Col, Card, Checkbox, Spin, message } from 'antd';
import { Link } from 'dva/router'
import { connect } from 'dva';
import style from './account.css'
const Step = Steps.Step;

const FormItem = Form.Item;

function Retrieve( { dispatch, current } ) {

  function next() {
    dispatch({
      type:'account/nextStep'
    })
  }

  function prev() {
    dispatch({
      type:'account/prevStep'
    })
  }

  const steps = [{
    title: '第一步',
    content: 'First-content',
  }, {
    title: '第二步',
    content: 'Second-content',
  }, {
    title: '第三步',
    content: 'Last-content',
  }];

  const height = document.body.clientHeight;
  return (
    <Row type="flex" justify="space-around" align="middle" style={{ height: height}} className={ style.row }>
      <Col style={{ width: 450 }}>
        <Card bordered={false} className={ style.card } >
          <h4 className={ style.title }>找回密码</h4>
          <div>
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div className={ style.stepsContent }>{steps[current].content}</div>
            <div className={ style.stepsAction } >
              {
                current === 0
                &&
                <Link className={ style.goLogin } to="">&lt;返回登录界面</Link>
              }
              {
                current > 0
                &&
                <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                  上一步
                </Button>
              }
              {
                current < steps.length - 1
                &&
                <Button type="primary" onClick={() => next()}>下一步</Button>
              }
              {
                current === steps.length - 1
                &&
                <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
              }
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  return state['account'];
}

export default connect(mapStateToProps)(Form.create()(Retrieve));


