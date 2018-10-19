import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { FormattedMessage, defineMessages } from 'react-intl'

import RechargeModal from './Modal'
import Monthcard from './Monthcard'

const message = defineMessages({
  recharge: {
    id: 'BUTTON.RECHARGE',
    defaultMessage: '充值'
  },
  recharge_month: {
    id: 'BUTTON.RECHARGE_MONTH',
    defaultMessage: '月卡充值'
  },
  playerId: {
    id: 'TABLE.PLAYERID',
    defaultMessage: '玩家ID'
  },
  nickname: {
    id: 'TABLE.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  gender: {
    id: 'TABLE.GENDER',
    defaultMessage: '性别'
  },
  job: {
    id: 'TABLE.JOB',
    defaultMessage: '职业'
  },
  level: {
    id: 'TABLE.LEVEL',
    defaultMessage: '等级'
  },
  coin: {
    id: 'TABLE.DIAMOND',
    defaultMessage: '钻石'
  },
  payinfo: {
    id: 'TABLE.PAYINFO',
    defaultMessage: '充值记录'
  },
  online: {
    id: 'TABLE.ONLINE',
    defaultMessage: '在线状态'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  }
})


export default class List extends Component {
  state = {
    dataSource: [],
    count: 0,
    currentItem: {},
    visible: false,
    cardVisible: false
  }

  constructor(props) {
    super(props)
    const { initials, intl } = this.props
    this.columns = [
      {
        title: intl.formatMessage(message.playerId),
        dataIndex: 'playerId',
        key: 'playerId',
        width: 100
      }, {
        title: intl.formatMessage(message.nickname),
        dataIndex: 'nickname',
        key: 'nickname',
        width: 180
      }, {
        title: intl.formatMessage(message.gender),
        dataIndex: 'gender',
        key: 'gender',
        width: 60,
        render: (text, reason) => {
          return `${initials.map.genderTypes[text]}(${text})`
        }
      }, {
        title: intl.formatMessage(message.job),
        dataIndex: 'job',
        key: 'job',
        width: 70,
        render: (text, record) => {
          return `${initials.map.jobTypes[text]}(${text})`
        }
      }, {
        title: intl.formatMessage(message.level),
        dataIndex: 'level',
        key: 'level',
        width: 60
      }, {
        title: intl.formatMessage(message.coin),
        dataIndex: 'coin',
        key: 'coin',
        width: 80
      }, {
        title: intl.formatMessage(message.payinfo),
        dataIndex: 'payinfo',
        key: 'payinfo'
      }, {
        title: intl.formatMessage(message.online),
        dataIndex: 'online',
        key: 'online',
        width: 70,
        render: (text, record) => {
          return record.online ? `在线(${text})` : `下线(${text})`
        }
      }, {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        key: 'action',
        width: 120,
        render: (text, record) => {
          const { options } = this.props
          return (
            <div>
              {
                options.authorize.includes(40202) && <Button onClick={() => this.handleRecharge(record)}><FormattedMessage {...message.recharge} /></Button>
              }
              {
                options.authorize.includes(40203) && <Button onClick={() => this.handleMonthCard(record)}><FormattedMessage {...message.recharge_month} /></Button>
              }
            </div>
          )
        }
      }
    ]
  }

  handleRecharge = (record) => {
    this.setState({
      currentItem: record,
      visible: true
    })
  }

  handleMonthCard = (record) => {
    this.setState({
      currentItem: record,
      cardVisible: true
    })
  }

  componentWillReceiveProps(nextProps) {
    const players = nextProps.options.players
    let dataSource = []
    players.list.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

  handleCancel = () => {
    this.setState({
      currentItem: {},
      visible: false
    })
  }

  handleCardCancel = () => {
    this.setState({
      currentItem: {},
      cardVisible: false
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { intl } = this.props
    const { params, products, conf } = this.props.initials
    let arrParam = []
    products.productId ? arrParam.push(`产品/服务器：${products.productId}/${products.serverId}`) : ''
    params.nickname ? arrParam.push(`昵称：${params.nickname}`) : ''
    params.playerId ? arrParam.push(`玩家 ID：${params.playerId}`) : ''
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
          title={intl.formatMessage(message.recharge)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <RechargeModal
            intl={this.props.intl}
            options={this.props.options}
            initials={this.props.initials}
            onRecharge={this.props.onRecharge}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
        <Modal
          width={800}
          key={Math.random()}
          title={intl.formatMessage(message.recharge_month)}
          visible={this.state.cardVisible}
          onCancel={this.handleCardCancel}
          footer={null}
          maskClosable={false}
        >
          <Monthcard
            intl={this.props.intl}
            options={this.props.options}
            initials={this.props.initials}
            onModalLoad={this.onModalLoad}
            onSendMonthCard={this.props.onSendMonthCard}
            handleCardCancel={this.handleCardCancel}
          />
        </Modal>
      </div>
    )
  }
}

List.propTypes = {
  intl: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onRecharge: PropTypes.func,
  onSendMonthCard: PropTypes.func
}
