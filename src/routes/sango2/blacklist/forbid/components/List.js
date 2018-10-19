import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'

import ForbidModal from './Modal'

const message = defineMessages({
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
  ban_type: {
    id: 'TABLE.STATUS_BAN',
    defaultMessage: '封禁状态'
  },
  ban: {
    id: 'APP.BLACKLIST.FORBID',
    defaultMessage: '禁言封号'
  },
  normal: {
    id: 'STATUS.NORMAL',
    defaultMessage: '正常'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  none: {
    id: 'NOTIFICATION.FOUND_NORESULT',
    defaultMessage: '暂无数据'
  }
})


export default class List extends Component {
  state = {
    dataSource: [],
    count: 0,
    currentItem: {},
    visible: false
  }

  constructor(props) {
    super(props)
    const { initials, intl } = this.props
    this.columns = [
      {
        title: intl.formatMessage(message.playerId),
        dataIndex: 'playerId',
        key: 'playerId'
      }, {
        title: intl.formatMessage(message.nickname),
        dataIndex: 'nickname',
        key: 'nickname'
      }, {
        title: intl.formatMessage(message.gender),
        dataIndex: 'gender',
        key: 'gender',
        render: (text, reason) => {
          return `${initials.map.genderTypes[text]}(${text})`
        }
      }, {
        title: intl.formatMessage(message.job),
        dataIndex: 'job',
        key: 'job',
        render: (text, record) => {
          return `${initials.map.jobTypes[text]}(${text})`
        }
      }, {
        title: intl.formatMessage(message.level),
        dataIndex: 'level',
        key: 'level'
      }, {
        title: intl.formatMessage(message.ban_type),
        dataIndex: 'forbidList',
        key: 'forbidList',
        render: (text, record) => {
          return record.forbidList && record.forbidList.length
                  ? _.join(_.values(_.pick(initials.map.forbidTypes, record.forbidList)), '；')
                  : intl.formatMessage(message.normal)
        }
      }, {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const { curd } = this.props
          let menuOptions = []
          _.forEach(curd, (value, key, collection) => {
            switch (key) {
              case '80201':
                menuOptions.push(<Button key={record.playerId} onClick={() => this.handleForbid(record)}>{intl.formatMessage(message.ban)}</Button>)
                break
              default:
            }
          })
          return (
            <div>{menuOptions}</div>
          )
        }
      }
    ]
  }

  handleForbid = (record) => {
    this.setState({
      currentItem: record,
      visible: true
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

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { params, products, conf } = this.props.initials
    const { intl } = this.props
    let arrParam = []
    products.productId ? arrParam.push(`productID/serverID：${products.productId}/${products.serverId}`) : ''
    params.nickname ? arrParam.push(`nickname：${params.nickname}`) : ''
    params.playerId ? arrParam.push(`playerID：${params.playerId}`) : ''
    let strParam = arrParam.join('，')
    let defaultLocale = {
      emptyText: conf.locale ? `search：{ ${strParam} }，${intl.formatMessage(message.none)}` : intl.formatMessage(message.none)
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
          title={intl.formatMessage(message.ban)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ForbidModal
            intl={intl}
            options={this.props.options}
            initials={this.props.initials}
            onForbid={this.props.onForbid}
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
  curd: PropTypes.object.isRequired,
  options: PropTypes.object,
  initials: PropTypes.object,
  onForbid: PropTypes.func
}
