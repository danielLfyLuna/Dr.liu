import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import moment from 'moment'

import OrdersModal from './Modal'

export default class List extends Component {
  state = {
    data: {
      dataSource: [],
      count: 0
    },
    modal: {
      editing: {},
      currentIds: [],
      currentItems: [],
      modalType: '',
      modalTitle: '',
      visible: false
    },
    selection: {
      selectedRowKeys: [],
      selectedRows: []
    }
  }

  constructor(props) {
    super(props)
    const { initials } = this.props
    this.columns = [
      {
        title: '玩家 ID',
        dataIndex: 'playerId',
        key: 'playerId'
      }, {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname'
      }, {
        title: 'productId',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: 'itemName',
        dataIndex: 'itemName',
        key: 'itemName'
      }, {
        title: 'orderId',
        dataIndex: 'orderId',
        key: 'orderId'
      }, {
        title: 'orderStatus',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (text, record) => {
          return `${initials.map.orderStatus[text]} (${text})`
        }
      }, {
        title: 'amount',
        dataIndex: 'amount',
        key: 'amount'
      }, {
        title: 'coinCount',
        dataIndex: 'coinCount',
        key: 'coinCount'
      }, {
        title: 'operationStatus',
        dataIndex: 'operationStatus',
        key: 'operationStatus',
        render: (text, record) => {
          return `${initials.map.operationStatus[text]} (${text})`
        }
      }, {
        title: 'channel',
        dataIndex: 'channel',
        key: 'channel'
      }, {
        title: 'purchaseId',
        dataIndex: 'purchaseId',
        key: 'purchaseId'
      }, {
        title: 'uid',
        dataIndex: 'uid',
        key: 'uid'
      }, {
        title: 'applicant',
        dataIndex: 'applicant',
        key: 'applicant'
      }, {
        title: 'createTime',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: 'commitTime',
        dataIndex: 'commitTime',
        key: 'commitTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const { options } = this.props
          return (
            options.authorize.includes(160201) &&
            record.operationStatus === 0
            ? <Button onClick={() => this.handleClick({...record}, {handle: 'ORDER'})}>提单...</Button>
            : initials.map.operationStatus[record.operationStatus]
          )
        }
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    const gamesale = nextProps.options.gamesale
    let dataSource = []
    gamesale.orders.map(function(elem, index) {
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
      case 'ORDER':
        this.onTakeOrderAction(option)
        break
      case 'ORDERS':
        this.onTakeOrdersAction(option)
        break
      default:
        console.log('Error')
    }
  }

  onTakeOrderAction = (data) => {
    this.setState({
      modal: {
        ...this.state.modal,
        currentIds: [data.orderId],
        currentItems: [data],
        modalType: 'order',
        modalTitle: '提单',
        visible: true
      }
    })
  }

  onTakeOrdersAction = (data) => {
    this.setState({
      modal: {
        ...this.state.modal,
        currentIds: data.selectedRowKeys,
        currentItems: data.selectedRows,
        modalType: 'orders',
        modalTitle: '多个提单',
        visible: true
      }
    })
  }

  handleCancel = (e) => {
    if (['order', 'orders'].includes(this.state.modal.modalType)) {
      this.setState({
        ...this.state,
        modal: {
          ...this.state.modal,
          currentIds: [],
          currentItems: [],
          modalType: '',
          modalTitle: '',
          visible: false
        },
        selection: {
          selectedRowKeys: [],
          selectedRows: []
        }
      })
    }
  }

  onModalLoad = () => {
    return this.state.modal
  }

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selection: {
         selectedRowKeys,
         selectedRows
      }
    })
  }

  render() {
    const { params, products, conf } = this.props.initials
    const { options } = this.props
    let arrParam = []
    products.productId ? arrParam.push(`产品/服务器：${products.productId}/${products.serverId}`) : ''
    params.startTime ? arrParam.push(`开始时间：${params.startTime}`) : ''
    params.endTime ? arrParam.push(`结束时间：${params.endTime}`) : ''
    let strParam = arrParam.join('，')
    let defaultLocale = {
      emptyText: conf.locale ? `查询：{ ${strParam} }，暂未查到数据` : '未作查询，暂无数据'
    }
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.data.count
    }

    const { selectedRowKeys, selectedRows } = this.state.selection
    const rowSelection = {
      selectedRowKeys,
      selectedRows,
      onChange: this.handleSelectChange,
      getCheckboxProps: record => ({
        disabled: record.operationStatus > 0
      })
    }
    const hasSelected = selectedRowKeys.length > 0
    return (
      <div>
        {
          options.authorize.includes(160202) &&
          <div style={{ marginBottom: 8 }}>
            <Button
              type='primary'
              onClick={() => this.handleClick({selectedRowKeys, selectedRows}, {handle: 'ORDERS'})}
              disabled={!hasSelected}
            >
              多个提单
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `已选择 ${selectedRowKeys.length} 个订单` : ''}
            </span>
          </div>
        }
        <Table
          rowSelection={rowSelection}
          dataSource={this.state.data.dataSource}
          columns={this.columns}
          locale={defaultLocale}
          rowKey='orderId'
          pagination={pagination}
          bordered
        />

        <Modal
          width={800}
          key={Math.random()}
          title={this.state.modal.modalTitle}
          visible={this.state.modal.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <OrdersModal
            options={this.props.options}
            initials={this.props.initials}
            onTakeOrders={this.props.onTakeOrders}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  options: PropTypes.object,
  initials: PropTypes.object,
  onTakeOrders: PropTypes.func
}
