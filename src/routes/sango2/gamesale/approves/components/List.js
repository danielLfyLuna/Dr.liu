import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button, Icon, Row, Col } from 'antd'
// import _ from 'lodash'
import moment from 'moment'

export default class List extends Component {
  state = {
    data: {
      dataSource: [],
      count: 0
    },
    modal: {
      currentItem: {},
      modalType: '',
      visible: false
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
        title: 'orderId',
        dataIndex: 'orderId',
        key: 'orderId'
      }, {
        title: 'approver',
        dataIndex: 'approver',
        key: 'approver'
      }, {
        title: 'operationStatus',
        dataIndex: 'operationStatus',
        key: 'operationStatus',
        render: (text, record) => {
          return `${initials.map.operationStatus[text]} (${text})`
        }
      }, {
        title: 'applicant',
        dataIndex: 'applicant',
        key: 'applicant'
      }, {
        title: 'approveTime',
        dataIndex: 'approveTime',
        key: 'approveTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: 'applyTime',
        dataIndex: 'applyTime',
        key: 'applyTime',
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
            options.authorize.includes(160302) &&
            record.operationStatus === initials.conf.operationStatus.after
            ?
              <Row gutter={16}>
                <Col className='gutter-row' span={10}>
                  <Button icon='check-circle' onClick={() => this.handleClick({...record}, {handle: 'PASS'})}>通过</Button>
                </Col>
                <Col className='gutter-row' span={4}>
                  <Button icon='close-circle' onClick={() => this.handleClick({...record}, {handle: 'FAIL'})}>拒绝</Button>
                </Col>
              </Row>
            :
              record.operationStatus === initials.conf.operationStatus.fail
              ?
                <Row gutter={16}>
                  <Col className='gutter-row' span={4}>
                    <Button icon='check-circle' onClick={() => this.handleClick({...record}, {handle: 'PASS'})}>通过</Button>
                  </Col>
                </Row>
              :
                '审核完成！'
          )
        }
      }
    ]
  }

  expandedRowRender = (rewards) => {
    const { options } = this.props
    const columns = [
      {
        title: '道具',
        dataIndex: 'itemId',
        key: 'itemId',
        width: '50%',
        render: (text, record) => {
          return `${options.goods.map[record.itemId]}(${record.itemId})`
        }
      }, {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
        width: '50%'
      }
    ]

    const dataSource = ((rewards.split(';')).filter(o => o)).map(val => {
      let [itemId, count] = val.split(',')
      return ({'itemId': itemId, 'count': count})
    })

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey='itemId'
        locale={{emptyText: '此礼包暂无奖励'}}
        pagination={false}
        showHeader={false}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    const gamesale = nextProps.options.gamesale
    let dataSource = []
    gamesale.approves.map(function(elem, index) {
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
    this.setState({
      modal: {
        currentItem: option,
        modalType: action.handle.toLowerCase(),
        visible: true
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      modal: {
        currentItem: {},
        modalType: '',
        visible: false
      }
    })
  }

  onOK = () => {
    const { products, conf } = this.props.initials
    const { currentItem, modalType } = this.state.modal
    this.setState({
      modal: {
        currentItem: {},
        modalType: '',
        visible: false
      }
    })
    this.props.onApprove({
      form: {
        orderId: currentItem.orderId,
        operationStatus: conf.operationStatus[modalType]
      },
      path: { ...products }
    })
  }

  onModalLoad = () => {
    return this.state.modal
  }

  render() {
    const { params, products, conf } = this.props.initials
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

    return (
      <div>
        <Table
          dataSource={this.state.data.dataSource}
          columns={this.columns}
          expandedRowRender={record => this.expandedRowRender(record.rewardItems)}
          locale={defaultLocale}
          rowKey='orderId'
          pagination={pagination}
          bordered
        />

        <Modal
          title='操作提示'
          visible={this.state.modal.visible}
          onOk={this.onOK}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
        >
          <p data-x={this.props.options}>
            <Icon type='question-circle-o' style={{ fontSize: 24, color: '#f00' }} />
            确定 {conf.operationTypes[this.state.modal.modalType]} 此条记录吗? ...
          </p>
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  options: PropTypes.object,
  initials: PropTypes.object,
  onApprove: PropTypes.func
}
