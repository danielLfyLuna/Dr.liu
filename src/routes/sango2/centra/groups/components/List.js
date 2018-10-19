import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import _ from 'lodash'

import GroupModal from './Modal'
import DropOption from '../../../../../components/DropOption/DropOption'

let verifyTypes = { 0: '不验证', 1: '验证' }

export default class List extends Component {
  state = {
    dataSource: [],
    count: 0,
    editing: {},
    currentItem: {},
    modalType: 'update',
    visible: false,
    deleteVisible: false,
    deleteItem: {}
  }
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '分组',
        dataIndex: 'group',
        key: 'goup'
      }, {
        title: '分组名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '是否验证',
        dataIndex: 'verify',
        key: 'verify',
        render: (text, record) => {
          return verifyTypes[record.verify]
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => {
          let menuOptions = []
          _.forEach(record.curd, (value, key, collection) => {
            switch (key) {
              case '20402':
                menuOptions.push({key: 'UPDATE', name: '编辑'})
                break
              case '20404':
                menuOptions.push({key: 'DELETE', name: '删除'})
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
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    const group = nextProps.data
    let dataSource = []
    group.list.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

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

  onUpdate = (fieldsValue) => {
    const dataSource = [...this.state.dataSource]
    _.map(dataSource, (val, index) => {
      if (val.key === this.state.editing.key) {
        val = Object.assign(val, fieldsValue)
      }
    })
    this.setState({
      visible: false,
      dataSource: [...dataSource]
    })
    this.props.onUpdate(fieldsValue)
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
    if (e.key === 'UPDATE') {
      this.onEditItem(record)
    } else if (e.key === 'DELETE') {
      this.deleteModalShow(record)
    }
  }

  deleteModalShow = (deleteItem) => {
    this.setState({
      deleteVisible: true,
      deleteItem: deleteItem
    })
  }

  deleteOnOk = () => {
    const deleteItem = this.state.deleteItem
    const dataSource = [...this.state.dataSource]
    dataSource.splice(_.findIndex(dataSource, function(o) { return o.key === deleteItem.key }), 1)
    this.setState({
      dataSource: [...dataSource],
      deleteVisible: false
    })
    this.props.onDeleteItem(deleteItem)
  }

  deleteOnCancel = () => {
    this.setState({
      deleteVisible: false,
      deleteItem: {}
    })
  }


  render() {
    const {curd} = this.props
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.count
    }
    let list = _.forEach(this.state.dataSource, function(value, index, collection) {
      value.curd = curd
    })
    return (
      <div>
        <Table bordered dataSource={list} columns={this.columns} rowKey='group' pagination={pagination} />
        <Modal
          width={1000}
          key={Math.random()}
          title='编辑分组'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <GroupModal
            data={this.props.data}
            onModalLoad={this.onModalLoad}
            onUpdate={this.onUpdate}
            onSubmitting={this.handleCancel}
          />
        </Modal>

        <Modal
          title='提示'
          visible={this.state.deleteVisible}
          onOk={this.deleteOnOk}
          onCancel={this.deleteOnCancel}
          okText='确认'
          cancelText='取消'
        >
          <p>确定删除此条记录吗? ...</p>
        </Modal>
      </div>
    )
  }

}

List.propTypes = {
  curd: PropTypes.object.isRequired,
  data: PropTypes.object,
  onUpdate: PropTypes.func,
  onDeleteItem: PropTypes.func
}
