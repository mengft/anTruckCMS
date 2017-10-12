import { Layout, Row, Col } from 'antd';
import { Link } from 'dva/router'
import Avatar from './Avatar'
import styles from './Header.css'

const { Header } = Layout;

function atHeader( { exit } ) {
  return (
    <Header className={styles['header']}>
      <Row>
        <Col span={20} className={styles['header-logo']}><Link to="/index">壹卡车后台管理系统</Link></Col>
        <Col span={4}>
          <Row type="flex" justify="end" align="middle">
            <Col>
              <Avatar exit={ exit } />
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default atHeader;
