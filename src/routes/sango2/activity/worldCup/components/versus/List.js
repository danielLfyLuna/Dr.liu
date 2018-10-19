import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import moment from 'moment'

import Modals from '../Modal'
import Amend from '../Amend'

export default class List extends Component {
  static propTypes = {
    worldCup: PropTypes.object,
    onSend: PropTypes.func,
    handleRender: PropTypes.func
  }

  state = {
    visible: false,
    serVis: false,
    data: {},
    serverData: {}
  }

  constructor(props) {
    super(props)
    this.tip = {
      score: 'score',
      server: 'server'
    }
    this.columns = [
      {
        title: '比赛ID',
        dataIndex: 'versusId',
        key: 'versusId'
      }, {
        title: '赛程ID',
        dataIndex: 'scheduleId',
        key: 'scheduleId'
      }, {
        title: '主队ID',
        dataIndex: 'hostCountryId',
        key: 'hostCountryId'
      }, {
        title: '主队名字',
        dataIndex: 'hostCountryName',
        key: 'hostCountryName'
      }, {
        title: '主队得分',
        dataIndex: 'hostCountryScore',
        key: 'hostCountryScore',
        render: (text) => {
          return <span style={{ color: '#00CD00' }}>{text}</span>
        }
      }, {
        title: '客队ID',
        dataIndex: 'guestCountryId',
        key: 'guestCountryId'
      }, {
        title: '客队名字',
        dataIndex: 'guestCountryName',
        key: 'guestCountryName'
      }, {
        title: '客队得分',
        dataIndex: 'guestCountryScore',
        key: 'guestCountryScore',
        render: (text) => {
          return <span style={{ color: '#0000FF' }}>{text}</span>
        }
      }, {
        title: '赛程名字',
        dataIndex: 'scheduleName',
        key: 'scheduleName'
      }, {
        title: '比赛开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 250,
        render: (text, record) => {
          return (
            <div>
              <Button type='primary' onClick={() => this.handleClick(record, this.tip.score)}>提交比赛得分</Button>
              <Button style={{ marginLeft: '8px' }} onClick={() => this.handleClick(record, this.tip.server)}>失败记录</Button>
            </div>
          )
        }
      }
    ]
  }

  handleClick = (v, i) => {
    if (i === this.tip.score) {
      this.setState({
        visible: true,
        data: v
      })
    }
    if (i === this.tip.server) {
      this.setState({
        serVis: true,
        serverData: v
      })
      this.props.handleRender(false)
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  cancelServer = () => {
    this.setState({
      serVis: false
    })
    this.props.handleRender(true)
  }

  render() {
    const { worldCup, handleRender } = this.props

    return (
      <div>
        <Table
          bordered
          dataSource={worldCup.versus}
          columns={this.columns}
          rowKey='versusId'
          Pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 50,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          key={Math.random()}
          title='提交比赛得分'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          destroyOnClose
        >
          <Modals
            data={this.state.data}
            onSend={this.props.onSend}
            handleCancel={this.handleCancel}
            icons='versus'
          />
        </Modal>
        <Modal
          key={Math.random()}
          title='失败记录'
          visible={this.state.serVis}
          onCancel={this.cancelServer}
          footer={null}
          maskClosable={false}
          destroyOnClose
        >
          <Amend
            data={this.state.serverData}
            icons='versus'
            handleRender={handleRender}
            cancelServer={this.cancelServer}
          />
        </Modal>
      </div>
    )
  }
}
