import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Card, Table, Button, Form, Modal } from 'antd'
import { Link } from 'react-router'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import SetModal from './SetModal'


export default class Index extends Component {

  static propTypes = {
    login: PropTypes.object,
    router: PropTypes.object,
    setCDKey: PropTypes.object,
    fetchCD: PropTypes.func,
    setCD: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.columns = [{
        title: 'ID',
        dataIndex: 'createId',
        key: 'createId'
      }, {
        title: 'cdkey号',
        dataIndex: 'cdkey',
        key: 'cdkey'
      }, {
        title: '活动ID',
        dataIndex: 'activityId',
        key: 'activityId'
      }, {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (text) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        render: (text) => {
          if (!text) { return '' }
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }]
  }

  state = {
    visible: false
  }

  handleVisible = (e) => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  componentWillMount() {
    console.log(this.props.router)
    this.props.fetchCD(this.props.router.location.query)
  }

  render() {
    const { curd } = this.props.login
    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Form style={{marginBottom: 8}}>
            {
              _.has(curd, '30109') &&
              <Button type='primary' onClick={this.handleVisible} style={{marginRight: 6}}>设置</Button>
            }
            <Link
              to={{pathname: '/sango2/activity/cdkey/list'}}
            >
              <Button type='danger'>返回列表页</Button>
            </Link>
          </Form>

          <Table
            rowKey='id'
            bordered
            dataSource={this.props.setCDKey.list}
            columns={this.columns}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 50,
              pageSizeOptions: ['20', '50', '100', '200', '500']
            }}
          />

          <Modal
            width={1000}
            maskClosable={false}
            title='设置'
            footer={null}
            visible={this.state.visible}
            onCancel={this.handleCancel}
          >
            <SetModal
              data={this.props.router.location.query}
              setCD={this.props.setCD}
              onCancel={this.handleCancel}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}
