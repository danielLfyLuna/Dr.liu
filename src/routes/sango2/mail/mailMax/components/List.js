import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Table, Modal, Button } from 'antd'

import Modals from './Modal'

export default class List extends Component {
  static propTypes = {
    mailMaxPrice: PropTypes.object,
    login: PropTypes.object,
    onEdit: PropTypes.func
  }

  state = {
    visible: false,
    data: {}
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '模块名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return `${text}邮件`
        }
      }, {
        title: '道具总最高价格',
        dataIndex: 'maxPrice',
        key: 'maxPrice'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              {
                _.has(this.props.login.curd, '50602') &&
                <Button onClick={() => this.handleClick(record)}>修改价格上限</Button>
              }
            </div>
          )
        }
      }
    ]
  }

  handleClick = (record) => {
    this.setState({
      visible: true,
      data: record
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { mailMaxPrice } = this.props

    return (
      <div>
        <Table
          bordered
          dataSource={mailMaxPrice.list}
          columns={this.columns}
          rowKey='id'
          pagination={false}
        />
        <Modal
          key={Math.random()}
          title='修改'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          destroyOnClose
        >
          <Modals
            data={this.state.data}
            onEdit={this.props.onEdit}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}
