import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Modal } from 'antd'
import _ from 'lodash'


import Modals from './Modal'

export default class List extends Component {
  state = {
    data: {},
    visible: false
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'id',
        dataIndex: 'itemId',
        key: 'itemId'
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '价格',
        dataIndex: 'coin',
        key: 'coin'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          if (_.has(this.props.login.curd, '120303')) {
            return <Button onClick={() => this.handleClick(record)}>修改价格</Button>
          } else {
            return ''
          }
        }
      }
    ]
  }

  handleClick = (v) => {
    this.setState({
      data: v,
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { itemPrice, onUpdate } = this.props
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500']
    }

    return (
      <div>
        <Table
          bordered
          dataSource={itemPrice.options}
          columns={this.columns}
          rowKey='itemId'
          pagination={pagination}
        />

        <Modal
          title='修改价格'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
          width={500}
          destroyOnClose
        >
          <Modals
            data={this.state.data}
            handleCancel={this.handleCancel}
            onUpdate={onUpdate}
          />
        </Modal>
      </div>
    )
  }

}

List.propTypes = {
  login: PropTypes.object,
  itemPrice: PropTypes.object,
  onUpdate: PropTypes.func
}
