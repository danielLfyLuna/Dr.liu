import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Modal } from 'antd'
import {browserHistory} from 'react-router'
import _ from 'lodash'

import Detail from './Detail'
import Sync from './Sync'


export default class List extends Component {
  static propTypes = {
    authorize: PropTypes.array,
    goods: PropTypes.object,
    products: PropTypes.object,
    general: PropTypes.object,
    onSync: PropTypes.func
  }

  state = {
    visible: false,
    syncVisible: false,
    data: {}
  }

  constructor(props) {
    super(props)
    this.excel = {
      detail: 'detail',
      sync: 'sync'
    }
    this.columns = [
      {
        title: '模板ID',
        dataIndex: 'templateId',
        key: 'templateId'
      }, {
        title: '活动名字',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '功能ID',
        dataIndex: 'functionId',
        key: 'functionId'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const authorize = this.props.authorize
          return (
            <Button.Group>
              {
                authorize.includes(90303) && <Button type='primary' onClick={() => this.handleUpdate(record)}>修改</Button>
              }
              {
                authorize.includes(90304) && <Button type='primary' onClick={() => this.handleVisible(record, this.excel.detail)}>详情</Button>
              }
              {
                authorize.includes(90305) && <Button type='primary' onClick={() => this.handleVisible(record, this.excel.sync)}>同步</Button>
              }
            </Button.Group>
          )
        }
      }
    ]
  }

  handleUpdate = (record) => {
    browserHistory.push({
      pathname: '/sango2/activity/update',
      state: {
        data: record
      }
    })
  }

  handleVisible = (record, symbol) => {
    if (symbol === 'detail') {
      this.setState({
        visible: true,
        data: record
      })
    }
    if (symbol === 'sync') {
      this.setState({
        syncVisible: true,
        data: record
      })
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleSyncCancel = () => {
    this.setState({
      syncVisible: false
    })
  }

  render() {
    const { general, goods, products, onSync } = this.props

    const datasource = _.map(general.list, (v, i) => {
      const value = {...v.template, items: v.items, temp: v.template}
      return value
    })

    return (
      <div>
        <Table
          bordered
          dataSource={datasource}
          columns={this.columns}
          rowKey='templateId'
          Pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 50,
            showSizeChanger: true,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          key={Math.random()}
          title='详情'
          width={900}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          destroyOnClose
        >
          <Detail
            data={this.state.data}
            goods={goods}
          />
        </Modal>
        <Modal
          key={Math.random()}
          title='同步'
          width={600}
          visible={this.state.syncVisible}
          onCancel={this.handleSyncCancel}
          footer={null}
          maskClosable={false}
          destroyOnClose
        >
          <Sync
            handleSyncCancel={this.handleSyncCancel}
            products={products}
            data={this.state.data}
            onSync={onSync}
          />
        </Modal>
      </div>
    )
  }
}
