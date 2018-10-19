import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'

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
      result: 'result',
      server: 'server'
    }
    this.columns = [
      {
        title: '国家ID',
        dataIndex: 'countryId',
        key: 'countryId'
      }, {
        title: '国家名字',
        dataIndex: 'countryName',
        key: 'countryName'
      }, {
        title: '国家排名',
        dataIndex: 'index',
        key: 'index'
      }, {
        title: '是否淘汰',
        dataIndex: 'eliminated',
        key: 'eliminated',
        render: (text, record) => {
          return text ? <span style={{ color: '#E61A1A' }}>是</span> : '否'
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 250,
        render: (text, record) => {
          return (
            <div>
              <Button type='primary' onClick={() => this.handleClick(record, this.tip.result)}>提交比赛结果</Button>
              <Button style={{ marginLeft: '8px' }} onClick={() => this.handleClick(record, this.tip.server)}>失败记录</Button>
            </div>
          )
        }
      }
    ]
  }

  handleClick = (v, i) => {
    if (i === this.tip.result) {
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
          dataSource={worldCup.country}
          columns={this.columns}
          rowKey='countryId'
          Pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 50,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          key={Math.random()}
          title='提交比赛结果'
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
            icons='country'
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
            icons='country'
            handleRender={handleRender}
            cancelServer={this.cancelServer}
          />
        </Modal>
      </div>
    )
  }
}
