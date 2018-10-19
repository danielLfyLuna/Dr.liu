import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Modal, Progress } from 'antd'

import Detail from './Detail'
import Update from './Update'


export default class List extends Component {
  state = {
    visible: false,
    updateVisible: false,
    data: {}
  }

  constructor(props) {
    super(props)
    this.types = {
      1: '配置完成',
      2: '正在同步到服务器',
      3: '将定时同步',
      4: '同步完成'
      // 5: '同步成功',
      // 6: '同步失败'
    }
    this.excel = {
      update: 'update',
      delete: 'delete'
    }
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '模板ID',
        dataIndex: 'templateId',
        key: 'templateId'
      }, {
        title: '产品ID',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: '服务器',
        dataIndex: 'serverIds',
        key: 'serverIds'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
      }, {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime'
      }, {
        title: '结束时间',
        dataIndex: 'endTime',
        key: 'endTime'
      }, {
        title: '操作人',
        dataIndex: 'adminUserName',
        key: 'adminUserName'
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return this.types[text] ?
            (!record.total && (record.status !== 2 || record.status !== 4)) ?
            this.types[text] :
            <div><span>{this.types[text]}</span><div style={{ width: '120px' }}><Progress format={() => `${record.success}/${record.total}`} percent={Math.round(record.success / record.total * 100)} size='small' /></div></div> :
            <div style={{ color: 'red' }}>未知状态码({text})</div>
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <Button.Group>
              {
                this.props.options.authorize.includes(90113) && <Button onClick={() => this.handleDetail(record)}>详情</Button>
              }
              {
                this.props.options.authorize.includes(90115) && <Button onClick={() => this.handleVisible(record, this.excel.update)}>修改</Button>
              }
              {
                this.props.options.authorize.includes(90116) && <Button onClick={() => this.handleVisible(record, this.excel.delete)}>删除</Button>
              }
            </Button.Group>
          )
        }
      }
    ]
  }

  state = {
    selectedRowKeys: []
  }

  selectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
    this.props.onChange(selectedRowKeys)
  }

  handleDetail = (record) => {
    this.props.getDetail({
      productId: '_',
      serverId: '_',
      groupId: record.groupId
    })
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleVisible = (record, symbol) => {
    const onDelete = this.props.onDelete
    if (symbol === 'update') {
      this.setState({
        updateVisible: true,
        data: record
      })
    } else {
      Modal.confirm({
        title: `确认删除 (${record.groupId}) 吗?`,
        content: '确认删除请点击“确认”,取消操作请点击”取消',
        onOk() {
          onDelete({
            productId: '_',
            serverId: '_',
            groupId: record.groupId
          })
        }
      })
    }
  }

  handleUpdataCancel = () => {
    this.setState({
      updateVisible: false
    })
  }

  render() {
    const { options, temDetail, onUpdate } = this.props
    let dataSource = options.allTemplatesList.templates
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.selectChange
    }

    return (
      <div>
        <Table
          bordered
          rowKey='groupId'
          dataSource={dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['50', '100', '200', '500']
          }}
          rowSelection={rowSelection}
        />
        <Modal
          title='详情'
          visible={this.state.visible}
          maskClosable={false}
          destroyOnClose
          onCancel={this.handleCancel}
          footer={null}
        >
          <Detail
            temDetail={temDetail}
            onCancel={this.handleCancel}
          />
        </Modal>
        <Modal
          title='修改'
          visible={this.state.updateVisible}
          maskClosable={false}
          destroyOnClose
          onCancel={this.handleUpdataCancel}
          footer={null}
        >
          <Update
            data={this.state.data}
            options={options}
            onUpdate={onUpdate}
            handleUpdataCancel={this.handleUpdataCancel}
          />
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  options: PropTypes.object,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  temDetail: PropTypes.object,
  getDetail: PropTypes.func
}
