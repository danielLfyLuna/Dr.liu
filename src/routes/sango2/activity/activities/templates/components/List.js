import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Row, Col, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'

import CreateModal from './Create'

const message = defineMessages({
  templateId: {
    id: 'FORM.TEMPLATEID',
    defaultMessage: '模板ID'
  },
  name: {
    id: 'TABLE.NAME',
    defaultMessage: '名称'
  },
  functionId: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
  },
  adminUserName: {
    id: 'TABLE.ADMINUSERNAME',
    defaultMessage: '操作人'
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  serverIdList: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  preview: {
    id: 'BUTTON.PREVIEW',
    defaultMessage: '预览模板'
  },
  new: {
    id: 'BUTTON.ACTIVITY_NEW',
    defaultMessage: '创建活动'
  }
})


export default class List extends Component {
  state = {
    data: {
      dataSource: [],
      count: 0
    },
    modal: {
      editing: {},
      currentItem: {},
      modalType: '',
      modalTitle: '',
      visible: false
    }
  }

  constructor(props) {
    super(props)
    const intl = this.props.intl
    this.columns = [
      { title: intl.formatMessage(message.templateId), dataIndex: 'templateId' },
      { title: intl.formatMessage(message.name), dataIndex: 'name', width: 250 },
      { title: intl.formatMessage(message.functionId), dataIndex: 'functionId' },
      { title: intl.formatMessage(message.adminUserName), dataIndex: 'adminUserName' },
      { title: intl.formatMessage(message.productId), dataIndex: 'productId' },
      // { title: intl.formatMessage(message.serverIdList), dataIndex: 'serverIdList', width: 300, render: (text, record) => record.serverIdList.join() },
      {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        width: 230,
        render: (text, record) => {
          const { options } = this.props
          return (
            <div>
              <Row gutter={96}>
                {
                  options.authorize.includes(90109) &&
                  <Col span={6}>
                    <Button onClick={() => this.handleClick({ ...record }, { handle: 'PREVIEW' })}>{intl.formatMessage(message.preview)}</Button>
                  </Col>
                }
                {
                  (
                    options.authorize.includes(90101) ||
                    options.authorize.includes(90107) ||
                    options.authorize.includes(90110)
                  ) &&
                  <Col span={6}>
                    <Button onClick={() => this.handleClick({ ...record }, { handle: 'TEMPLATE' })}>{intl.formatMessage(message.new)}</Button>
                  </Col>
                }

              </Row>
            </div>
          )
        }
      }
    ]

    this.dataSource = []
  }

  componentWillReceiveProps(nextProps) {
    const activities = nextProps.options.activities
    let dataSource = []
    activities.templates.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      data: {
        dataSource: [...dataSource],
        count: dataSource.length
      }
    })
  }

  handleClick = (option, action) => {
    switch (action.handle) {
      case 'PREVIEW':
        this.onDetailAction(option, action)
        break
      case 'TEMPLATE':
        this.onCreateAction(option)
        break
      default:
        console.log('Error')
    }
  }

  onDetailAction = (option, action) => {
    const { initials } = this.props
    let pathname = `/sango2/activity/activities/${option.functionId}`
    let query = {
      ...initials.products,
      functionId: option.functionId,
      templateId: option.templateId,
      handle: action.handle.toLowerCase()
    }
    this.context.router.push({
      pathname,
      query
    })
  }

  onCreateAction = (data) => {
    _.map(this.state.data.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          modal: {
            currentItem: data,
            modalType: 'template',
            modalTitle: this.props.intl.formatMessage(message.new),
            visible: true,
            editing: val
          }
        })
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      modal: {
        currentItem: {},
        modalType: '',
        modalTitle: '',
        visible: false,
        editing: {}
      }
    })
  }

  onModalLoad = () => {
    return this.state.modal
  }

  render() {
    const { options, initials, intl } = this.props
    this.dataSource = [...options.activities.templates]
    const products = initials.products
    const defaultLocale = {
      emptyText: products.productId ? `${products.productId}/${products.serverId}: 暂未查到数据` : '未作查询，暂无数据'
    }
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 500,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.data.count
    }

    return (
      <div>
        <Table
          bordered
          dataSource={this.state.data.dataSource}
          columns={this.columns}
          locale={defaultLocale}
          rowKey='templateId'
          pagination={pagination}
        />

        <Modal
          width={1000}
          key={Math.random()}
          title={this.state.modal.modalTitle}
          visible={this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <CreateModal
            options={this.props.options}
            intl={intl}
            initials={this.props.initials}
            onCreate={this.props.onCreate}
            onClear={this.props.onClear}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  intl: PropTypes.object,
  initials: PropTypes.object,
  options: PropTypes.object,
  onCreate: PropTypes.func,
  onClear: PropTypes.func
}

List.contextTypes = {
  router: PropTypes.object
}
