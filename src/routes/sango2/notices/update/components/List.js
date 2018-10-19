import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import { Table, Modal } from 'antd'
import _ from 'lodash'

import MocalContainer from './../containers/ModalContainer'
import DropOption from './../../../../../components/DropOption/DropOption'

const message = defineMessages({
  version: {
    id: 'TABLE.APPVERSION',
    defaultMessage: '版本号'
  },
  title: {
    id: 'TABLE.TITLE',
    defaultMessage: '标题'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  open: {
    id: 'BUTTON.OPEN',
    defaultMessage: '开启'
  },
  off: {
    id: 'BUTTON.OFF',
    defaultMessage: '关闭'
  },
  update: {
    id: 'BUTTON.UPDATE',
    defaultMessage: '修改'
  }
})


export default class List extends Component {

  static propTypes = {
    intl: PropTypes.object,
    curd: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
  }

  state = {
    dataSource: [],
    count: 0,
    editing: {},
    currentItem: {},
    modalType: 'update',
    visible: false
  }

  constructor(props) {
    super(props)

    this.columns = [{
        title: this.props.intl.formatMessage(message.version),
        dataIndex: 'appversion',
        key: 'appversion'
      }, {
        title: this.props.intl.formatMessage(message.title),
        dataIndex: 'title',
        key: 'title'
      }, {
        title: this.props.intl.formatMessage(message.status),
        dataIndex: 'open',
        key: 'open',
        render: (text, record) => {
          const props = this.props
          return (
            record.open ? props.intl.formatMessage(message.open) : props.intl.formatMessage(message.off)
          )
        }
      }, {
        title: this.props.intl.formatMessage(message.action),
        key: 'operation',
        width: 100,
        render: (text, record) => {
          const {curd, intl} = this.props
          let menuOptions = []
          _.forEach(curd, (value, key, collection) => {
            switch (key) {
              case '60302':
                menuOptions.push({key: '1', name: intl.formatMessage(message.update)})
                break
              default:

            }
          })
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={menuOptions}
              dropdownProps={{
                trigger: ['hover']
              }}
            />
          )
        }
      }]
  }

  // 每次接收props 更新dataSource
  componentWillReceiveProps(nextProps) {
    console.log(this.props.data)
    const list = nextProps.data
    let dataSource = []
    list.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

  // 编辑弹出框
  onEditItem = (record) => {
    _.map(this.state.dataSource, (val, index) => {
      if (val.key === record.key) {
        this.setState({
          currentItem: record,
          visible: true,
          editing: val
        })
      }
    })
  }

  // 更新表格数据
  onUpdate = (fieldsValue) => {
    const dataSource = [...this.state.dataSource]
    _.map(dataSource, (val, index) => {
      if (val.key === this.state.editing.key) {
        val = Object.assign(val, fieldsValue)
      }
    })
    this.setState({
      visible: false,
      dataSource: [...dataSource],
      editing: {}
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  onModalLoad = () => {
    return this.state
  }

  handleMenuClick = (record, e) => {
    if (e.key === '1') {
      this.onEditItem(record)
    }
  }

  render() {
    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          width={700}
          key={Math.random()}
          title={this.props.intl.formatMessage(message.update)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <MocalContainer
            options={this.props.options}
            intl={this.props.intl}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
            onUpdate={this.onUpdate}
          />
        </Modal>
      </div>
    )
  }

}
