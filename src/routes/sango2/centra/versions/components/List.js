import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import _ from 'lodash'

import VersionModal from './Modal'
import DropOption from '../../../../../components/DropOption/DropOption'

const versionTypes = {
  1: '软更新(没有硬更新版本)',
  2: '软更新(但有硬更新版本)',
  3: '硬更新',
  4: '审核版本(非正式更新用)'
}

const versionStatus = {
  1: '正式',
  2: '测试'
}

export default class List extends Component {
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
    this.columns = [
      {
        title: '产品 ID',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: '分组',
        dataIndex: 'group',
        key: 'group'
      }, {
        title: '版本',
        dataIndex: 'version',
        key: 'version'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          return versionTypes[record.type]
        }
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return versionStatus[record.status]
        }
      }, {
        title: '资源 URL',
        dataIndex: 'resourceUrl',
        key: 'resourceUrl'
      }, {
        title: '应用 URL',
        dataIndex: 'appUrl',
        key: 'appUrl'
      }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
      }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => {
          let menuOptions = []
          _.forEach(record.curd, (value, key, collection) => {
            switch (key) {
              case '20502':
                menuOptions.push({key: 'UPDATE', name: '编辑'})
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
    const version = nextProps.data
    let dataSource = []
    version.list.map(function(elem, index) {
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
    }
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
        <Table bordered dataSource={list} columns={this.columns} rowKey='version' pagination={pagination} />
        <Modal
          width={1000}
          key={Math.random()}
          title='编辑版本'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <VersionModal
            data={this.props.data}
            maps={this.props.maps}
            options={this.props.options}
            onModalLoad={this.onModalLoad}
            onUpdate={this.onUpdate}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }

}

List.propTypes = {
  curd: PropTypes.object.isRequired,
  data: PropTypes.object,
  maps: PropTypes.array,
  options: PropTypes.array,
  onUpdate: PropTypes.func
}
