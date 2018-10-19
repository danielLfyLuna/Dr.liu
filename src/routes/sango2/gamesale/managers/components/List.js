import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Row, Col, Button, Icon } from 'antd'
import _ from 'lodash'

import ManagerModal from './Modal'

export default class List extends Component {
  state = {
    dataSource: [],
    count: 0,
    editing: {},
    currentItem: {},
    modalType: '',
    modalTitle: '',
    visible: false
  }

  constructor(props) {
    super(props)
    const { initials } = this.props
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '账号',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          return `${initials.map.gsTypes[record.type]}(${record.type})`
        }
      }, {
        title: '等级',
        dataIndex: 'grade',
        key: 'grade',
        render: (text, record) => {
          return `${initials.map.gradeTypes[record.grade]}(${record.grade})`
        }
      }, {
        title: 'AdminUserId',
        dataIndex: 'adminUserId',
        key: 'adminUserId'
      }, {
        title: 'AdminUserName',
        dataIndex: 'adminUserName',
        key: 'adminUserName'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 300,
        render: (text, record) => {
          const { options } = this.props
          return (
            <Row gutter={32}>
              {
                options.authorize.includes(160405) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'JOIN'})}>纳入用户</Button>
                </Col>
              }
              {
                options.authorize.includes(160403) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'MOD'})}>修改信息</Button>
                </Col>
              }
              {
                options.authorize.includes(160404) &&
                <Col span={7}>
                  <Button onClick={() => this.handleClick({...record}, {handle: 'DEL'})}>删除帐号</Button>
                </Col>
              }
            </Row>
          )
        }
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    const gamesale = nextProps.options.gamesale
    let dataSource = []
    gamesale.managers.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

  handleClick = (option, action) => {
    switch (action.handle) {
      case 'JOIN':
        this.onJoinAction(option, action)
        break
      case 'MOD':
        this.onModAction(option)
        break
      case 'DEL':
        this.onDelAction(option)
        break
      default:
        console.log('Error')
    }
  }

  onJoinAction = (option, data) => {
    this.context.router.push({
      pathname: '/sango2/gamesale/index',
      query: {
        managerId: option.id,
        handle: data.handle.toLowerCase()
      }
    })
  }

  onModAction = (data) => {
    _.map(this.state.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          currentItem: data,
          modalType: 'update',
          modalTitle: '修改 GS 管理',
          visible: true,
          editing: val
        })
      }
    })
  }

  onDelAction = (data) => {
    this.setState({
      currentItem: data,
      modalType: 'delete',
      modalTitle: '删除提示',
      visible: true
    })
  }

  handleCancel = (e) => {
    switch (this.state.modalType) {
      case 'update':
        this.setState({
          currentItem: {},
          modalType: '',
          modalTitle: '',
          visible: false,
          editing: {}
        })
        break
      case 'delete':
        this.setState({
          currentItem: {},
          modalType: '',
          modalTitle: '',
          visible: false
        })
        break
      default:
        console.log('Error')
    }
  }

  onOK = () => {
    const deleteItem = this.state.currentItem
    const dataSource = [...this.state.dataSource]
    dataSource.splice(_.findIndex(dataSource, function(o) { return o.key === deleteItem.key }), 1)
    this.setState({
      dataSource: [...dataSource],
      currentItem: {},
      modalType: '',
      modalTitle: '',
      visible: false
    })
    this.props.onDelete({
      form: deleteItem,
      path: {
        managerId: deleteItem.id
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.count
    }
    const modalType = this.state.modalType
    return (
      <div>
        <Table
          dataSource={this.state.dataSource}
          columns={this.columns}
          rowKey='id'
          pagination={pagination}
          bordered
        />

        <Modal
          width={800}
          key={Math.random()}
          title={modalType === 'update' && this.state.modalTitle}
          visible={modalType === 'update' && this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ManagerModal
            options={this.props.options}
            initials={this.props.initials}
            onRender={this.props.onRender}
            onUpdate={this.props.onUpdate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>

        <Modal
          title={modalType === 'delete' && this.state.modalTitle}
          visible={modalType === 'delete' && this.state.visible}
          onOk={this.onOK}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
        >
          <p><Icon type='question-circle-o' style={{ fontSize: 24, color: '#f00' }} /> 确定删除此条记录吗? ...</p>
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  options: PropTypes.object,
  initials: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  onRender: PropTypes.func
}

List.contextTypes = {
  router: PropTypes.object
}
