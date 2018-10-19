import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Card } from 'antd'
import { Link } from 'react-router'
import _ from 'lodash'
import { intlShape, defineMessages } from 'react-intl'

const message = defineMessages({
  mailId: {
    id: 'TABLE.MAILID',
    defaultMessage: '邮件ID'
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  serverId: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  playerId: {
    id: 'TABLE.PLAYERID',
    defaultMessage: '玩家ID'
  },
  userId: {
    id: 'TABLE.USERID',
    defaultMessage: '用户id'
  },
  info: {
    id: 'TABLE.PLAYERINFO',
    defaultMessage: '玩家信息'
  },
  rewards_done: {
    id: 'TABLE.REWARDS_DONE',
    defaultMessage: '已得到奖励'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  operateTime: {
    id: 'TABLE.OPERATETIME',
    defaultMessage: '操作时间'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  resend: {
    id: 'BUTTON.RESEND',
    defaultMessage: '补发'
  },
  success_no: {
    id: 'STATUS.SUCCESS_0',
    defaultMessage: '未成功'
  },
  success_yes: {
    id: 'STATUS.SUCCESS_1',
    defaultMessage: '已成功'
  }
})


export default class Search extends Component {

  static propTypes = {
    intl: intlShape,
    login: PropTypes.object.isRequired,
    batchmailPlayer: PropTypes.object.isRequired,
    location: PropTypes.object,
    fetchBatchmailPlayer: PropTypes.func.isRequired,
    sendBatchmailPlayers: PropTypes.func.isRequired,
    sendSingleBatchmailPlayer: PropTypes.func.isRequired,
    fetching: PropTypes.bool
  }

  constructor(props) {
    super(props)
    const { intl } = this.props
    this.columns = [{
      title: intl.formatMessage(message.mailId),
      dataIndex: 'mailId',
      key: 'mailId'
    }, {
      title: intl.formatMessage(message.productId),
      dataIndex: 'productId',
      key: 'productId'
    }, {
      title: intl.formatMessage(message.serverId),
      dataIndex: 'serverId',
      key: 'serverId'
    }, {
      title: intl.formatMessage(message.info),
      dataIndex: 'playerName',
      key: 'playerName'
    }, {
      title: intl.formatMessage(message.playerId),
      dataIndex: 'playerId',
      key: 'playerId'
    }, {
      title: intl.formatMessage(message.userId),
      dataIndex: 'uid',
      key: 'uid'
    }, {
      title: intl.formatMessage(message.rewards_done),
      dataIndex: 'rewards',
      key: 'rewards'
    }, {
      title: intl.formatMessage(message.operateTime),
      dataIndex: 'operateTime',
      key: 'operateTime'
    }, {
      title: intl.formatMessage(message.status),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const intl = this.props.intl
        return (
          <div style={{color: `${record.status === 0 ? 'red' : 'black'}`}}>
            {record.status === 0 ? intl.formatMessage(message.success_no) : intl.formatMessage(message.success_yes) }
          </div>
        )
      }
    }, {
      title: intl.formatMessage(message.action),
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        if (_.has(record.curd, '50207')) {
          return (
            <div>
              <Button
                type='primary'
                disabled={record.status === 1}
                onClick={() => this.onSingleSend(record)}
              >
                {intl.formatMessage(message.resend)}
              </Button>
            </div>
          )
        } else {
          return (
            <span>No Permission</span>
          )
        }
      }
    }]
  }

  componentWillMount() {
    this.props.fetchBatchmailPlayer(this.props.location.query.id)
  }


  // 批量发送
  onSend = () => {
    let value = {
      id: this.props.location.query.id,
      list: this.props.batchmailPlayer.players
    }

    this.props.sendBatchmailPlayers(value)
  }

  // 单独发送
  onSingleSend = (record) => {

    const value = {
      id: record.mailId,
      list: record
    }
    this.props.sendSingleBatchmailPlayer(value)
  }

  render() {
    const {login: {curd}, batchmailPlayer: {players}} = this.props
    let list = _.forEach(players, function(value, index, collection) {
      value.curd = curd
    })
    return (
      <Card>
        <Table
          bordered
          rowKey='index'
          dataSource={list}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
          loading={this.props.fetching}
          title={() => { return this.props.location.query.title }}
        />
        {
          _.has(curd, '50206')
          ?
            <Button
              type='primary'
              onClick={this.onSend}
              style={{marginRight: 30}}
            >
              SEND ALL
            </Button>
          :
            ''
        }

        <Button type='default'>
          <Link to={{ pathname: '/sango2/mail/batchmail/index' }}>
            BACK
          </Link>
        </Button>
      </Card>
    )
  }
}
