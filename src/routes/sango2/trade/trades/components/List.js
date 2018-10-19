import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Dropdown, Menu, Icon, Button } from 'antd'
import _ from 'lodash'
import moment from 'moment'

export default class List extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 500,
      total: 0
    },
    dataSource: [],
    visible: false,
    option: {}
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '交易 ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        fixed: 'left'
      }, {
        title: '价格',
        dataIndex: 'price',
        key: 'price'
      }, {
        title: '数量',
        dataIndex: 'num',
        key: 'num'
      }, {
        title: '原本道具 ID',
        dataIndex: 'itemId',
        key: 'itemId'
      }, {
        title: '道具 ID',
        dataIndex: 'templateId',
        key: 'templateId',
        render: (text, record) => {
          return `${record.templateId}(${record.itemName})`
        }
      }, {
        title: '上架人自身 ID',
        dataIndex: 'sourceId',
        key: 'sourceId'
      }, {
        title: '卖家名称',
        dataIndex: 'sellerName',
        key: 'sellerName'
      }, {
        title: '购买者 ID',
        dataIndex: 'buyerId',
        key: 'buyerId'
      }, {
        title: '购买者',
        dataIndex: 'buyerName',
        key: 'buyerName'
      }, {
        title: '上架时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '关注人数',
        dataIndex: 'watchCount',
        key: 'watchCount'
      }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => {
          return record.mapping ? this.props.initials.map.tradeState[record.mapping.state] : '无'
        }
      }, {
        title: '是否标注',
        dataIndex: 'isSign',
        key: 'isSign',
        width: 70,
        fixed: 'right',
        render: (text, record) => {
          return (record.mapping && record.mapping.sign) ? <span style={{color: '#f50'}}>已标注</span> : '未标注'
        }
      }, {
        title: '交易状态',
        dataIndex: 'status',
        key: 'status',
        fixed: 'right',
        render: (text, record) => {
          return this.props.initials.map.tradeStatus[record.status]
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        width: 100,
        fixed: 'right',
        render: (text, record) => {
          const { tradeState } = this.props.initials.conf
          const { options } = this.props
          const menu = (
            <Menu onClick={(e) => this.handleCheck(record, e)}>
              {
                options.authorize.includes(100102) &&
                <Menu.Item key='SIGN'>{record.mapping.sign ? '取消标注' : '添加标注'}</Menu.Item>
              }
              {
                record.state !== tradeState.reject &&
                <Menu.Item key='REJECT'>驳回</Menu.Item>
              }
              {
                record.state === tradeState.none &&
                <Menu.Item key='PASS'>通过</Menu.Item>
              }
            </Menu>
          )
          return (
            <div>
              <Dropdown overlay={menu}>
                <Button><Icon type='down' />操作</Button>
              </Dropdown>
            </div>
          )
        }
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    const { pagination = {}, trades = [] } = nextProps.data.list
    let dataSource = []
    trades.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      pagination: {
        current: pagination.pageNum,
        pageSize: pagination.pageSize,
        total: pagination.total
      }
    })
  }

  handlePage = (pagination) => {
    const { pageFields } = this.props.options
    const values = _.pickBy(pageFields, (v, i) => v.length !== 0 && i !== 'products')
    this.props.fetchTrades({
      products: {
        productId: pageFields.products[0],
        serverId: pageFields.products[1]
      },
      data: {
        ...values,
        pageNum: pagination.current,
        pageSize: pagination.pageSize
      }
    })
  }

  handleCheck = (record, e) => {
    const { tradeState, tradeSign } = this.props.initials.conf
    if (e.key == 'SIGN') {
      this.setState({
        visible: e.key !== 'SIGN',
        option: {
          ...record,
          sign: record.mapping.sign ? tradeSign.no : tradeSign.yes
        }
      })
      this.onCheck({
        ...record,
        sign: record.mapping.sign ? tradeSign.no : tradeSign.yes
      })
    }
    if (e.key == 'REJECT') {
      this.setState({
        visible: e.key !== 'SIGN',
        option: {
          ...record,
          state: tradeState.reject
        }
      })
    }
    if (e.key == 'PASS') {
      this.setState({
        visible: e.key !== 'SIGN',
        option: {
          ...record,
          state: tradeState.pass
        }
      })
    }
  }

  onCheck = (option) => {
    this.props.onCheck({
      send: {
        id: option.id,
        sign: !option.mapping.sign,
        state: option.state
      },
      products: this.props.initials.products
    })
  }

  actionOnOk = () => {
    const option = this.state.option
    const dataSource = [...this.state.dataSource]

    _.map(dataSource, (val, index) => {
      if (val.key === option.key) {
        val = Object.assign(val, option)
      }
    })
    this.setState({
      visible: false,
      dataSource: [...dataSource]
    })
    this.onCheck(option)
  }

  actionOnCancel = () => {
    this.setState({
      visible: false,
      option: {}
    })
  }

  render() {
    const { params, products, conf, map: { tradeState, selectTypes } } = this.props.initials
    let arrParam = []
    products.productId ? arrParam.push(`产品/服务器：${products.productId}/${products.serverId}`) : ''
    params.selectType ? arrParam.push(`类型：${selectTypes[params.selectType]}`) : ''
    params.items.itemId ? arrParam.push(`道具：${params.items.itemId}`) : ''
    params.low ? arrParam.push(`最小值：${params.low}`) : ''
    params.high ? arrParam.push(`最大值：${params.high}`) : ''
    let strParam = arrParam.join('，')
    let defaultLocale = {
      emptyText: conf.locale ? `查询：{ ${strParam} }，暂未查到数据` : '未作查询，暂无数据'
    }
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 500,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      current: this.state.pagination.current,
      pageSize: this.state.pagination.pageSize,
      total: this.state.pagination.total
    }

    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          locale={defaultLocale}
          rowKey='id'
          scroll={{ x: 1600 }}
          pagination={pagination}
          onChange={this.handlePage}
        />

        <Modal
          title='操作提示'
          visible={this.state.visible}
          onOk={this.actionOnOk}
          onCancel={this.actionOnCancel}
          okText='确认'
          cancelText='取消'
        >
          <p data={this.props.data}>确定 {tradeState[this.state.option.state]} 此条记录吗? ...</p>
        </Modal>
      </div>
    )
  }

}

List.propTypes = {
  data: PropTypes.object,
  initials: PropTypes.object,
  options: PropTypes.object,
  onCheck: PropTypes.func,
  fetchTrades: PropTypes.func
}
