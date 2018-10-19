import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import _ from 'lodash'

import PlayersModal from '../containers/ModalContainer'

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
        title: '电话',
        dataIndex: 'phoneNum',
        key: 'phoneNum'
      }, {
        title: 'QQ',
        dataIndex: 'qq',
        key: 'qq'
      }, {
        title: '接入成员 ID',
        dataIndex: 'gsManagerId',
        key: 'gsManagerId'
      }, {
        title: 'VIP 等级',
        dataIndex: 'vipLevel',
        key: 'vipLevel'
      }, {
        title: '接入组',
        dataIndex: 'joinType',
        key: 'joinType'
      }, {
        title: '战力',
        dataIndex: 'fightCapactity',
        key: 'fightCapactity'
      }, {
        title: '当天充值',
        dataIndex: 'currDayRecharge',
        key: 'currDayRecharge'
      }, {
        title: '昨天充值',
        dataIndex: 'yesterdayRecharge',
        key: 'yesterdayRecharge'
      }, {
        title: '当月充值',
        dataIndex: 'currMonthRecharge',
        key: 'currMonthRecharge'
      }, {
        title: '纳入后充值',
        dataIndex: 'afterRecharge',
        key: 'afterRecharge'
      }, {
        title: '总计充值',
        dataIndex: 'totalRecharge',
        key: 'totalRecharge'
      }, {
        title: '未登录天数',
        dataIndex: 'nonLoginDays',
        key: 'nonLoginDays'
      }, {
        title: '未充值天数',
        dataIndex: 'nonRechargeDays',
        key: 'nonRechargeDays'
      }, {
        title: '纳入日期',
        dataIndex: 'joinGSDate',
        key: 'joinGSDate'
      }, {
        title: '最后登录日期',
        dataIndex: 'lastLoginDate',
        key: 'lastLoginDate'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const { options } = this.props
          return (
            <div>
              {
                options.authorize.includes(160101) &&
                <Button onClick={() => this.handleClick({...record}, {handle: 'DETAIL'})}>详情...</Button>
              }
              {
                options.authorize.includes(160103) &&
                <Button onClick={() => this.handleClick({...record}, {handle: 'UPDATE'})}>修改...</Button>
              }
            </div>
          )
        }
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    const gamesale = nextProps.options.gamesale
    let dataSource = []
    gamesale.players.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

  handleClick = (option, action) => {
    switch (action.handle) {
      case 'DETAIL':
        this.onDetailAction(option)
        break
      case 'UPDATE':
        this.onUpdateAction(option)
        break
      default:
        console.log('Error')
    }
  }

  onDetailAction = (data) => {
    this.setState({
      currentItem: data,
      modalType: 'detail',
      modalTitle: '查看 VIP 详情',
      visible: true
    })
  }

  onUpdateAction = (data) => {
    _.map(this.state.dataSource, (val, index) => {
      if (val.key === data.key) {
        this.setState({
          currentItem: data,
          modalType: 'update',
          modalTitle: '修改 VIP 信息',
          visible: true,
          editing: val
        })
      }
    })
  }

  handleCancel = (e) => {
    switch (this.state.modalType) {
      case 'detail':
        this.setState({
          currentItem: {},
          modalType: '',
          modalTitle: '',
          visible: false
        })
        break
      case 'update':
        this.setState({
          currentItem: {},
          modalType: '',
          modalTitle: '',
          visible: false,
          editing: {}
        })
        break
      default:
        console.log('Error')
    }
  }

  onModalLoad = () => {
    return this.state
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
      total: this.state.count
    }
    return (
      <div>
        <Table
          dataSource={this.state.dataSource}
          columns={this.columns}
          locale={defaultLocale}
          rowKey='playerId'
          pagination={pagination}
          bordered
        />

        <Modal
          width={800}
          key={Math.random()}
          title={this.state.modalTitle}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <PlayersModal
            options={this.props.options}
            initials={this.props.initials}
            onUpdate={this.props.onUpdate}
            onRender={this.props.onRender}
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
  onUpdate: PropTypes.func,
  onRender: PropTypes.func
}
