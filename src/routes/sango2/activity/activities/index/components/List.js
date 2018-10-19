import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Row } from 'antd'
import { Link } from 'react-router'
import { defineMessages } from 'react-intl'

const message = defineMessages({
  functionId: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
  },
  name: {
    id: 'TABLE.NAME',
    defaultMessage: '名称'
  },
  templateId: {
    id: 'FORM.TEMPLATEID',
    defaultMessage: '模板 ID'
  },
  startTime: {
    id: 'TABLE.STARTTIME',
    defaultMessage: '开始时间'
  },
  endTime: {
    id: 'TABLE.ENDTIME',
    defaultMessage: '结束时间'
  },
  updateTime: {
    id: 'TABLE.UPDATETIME',
    defaultMessage: '更新时间'
  },
  adminUserName: {
    id: 'TABLE.ADMINUSERNAME',
    defaultMessage: '操作人'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  detail: {
    id: 'BUTTON.DETAIL',
    defaultMessage: '详情'
  },
  open: {
    id: 'BUTTON.OPEN',
    defaultMessage: '开启'
  },
  tuangouzhekou: {
    id: 'BUTTON.TUANGOUZHEKOU',
    defaultMessage: '查看团购折扣'
  },
  offline: {
    id: 'BUTTON.OFFLINE',
    defaultMessage: '下线'
  },
  activity_status_0: {
    id: 'STATUS.ACTIVITY.0',
    defaultMessage: '初始化'
  },
  activity_status_1: {
    id: 'STATUS.ACTIVITY.1',
    defaultMessage: '预热，玩家可见，还未开始'
  },
  activity_status_2: {
    id: 'STATUS.ACTIVITY.2',
    defaultMessage: '开启，正在进行'
  },
  activity_status_3: {
    id: 'STATUS.ACTIVITY.3',
    defaultMessage: '活动结束，等待处理结果'
  },
  activity_status_4: {
    id: 'STATUS.ACTIVITY.4',
    defaultMessage: '结果处理完毕'
  },
  activity_status_5: {
    id: 'STATUS.ACTIVITY.5',
    defaultMessage: '运营人员强制下线'
  }
})


export default class List extends Component {
  state = {
    currentItem: {},
    modalType: 'update',
    visible: false
  }
  constructor(props) {
    super(props)
    const intl = this.props.intl
    this.activityStates = {
      0: intl.formatMessage(message.activity_status_0),
      1: intl.formatMessage(message.activity_status_1),
      2: intl.formatMessage(message.activity_status_2),
      3: intl.formatMessage(message.activity_status_3),
      4: intl.formatMessage(message.activity_status_4),
      5: intl.formatMessage(message.activity_status_5)
    }
    this.columns = [
      {
        title: intl.formatMessage(message.functionId),
        dataIndex: 'functionId'
      }, {
        title: intl.formatMessage(message.name),
        dataIndex: 'name'
      }, {
        title: intl.formatMessage(message.templateId),
        dataIndex: 'templateId'
      }, {
        title: intl.formatMessage(message.startTime),
        dataIndex: 'startTime'
      }, {
        title: intl.formatMessage(message.endTime),
        dataIndex: 'endTime'
      }, {
        title: intl.formatMessage(message.updateTime),
        dataIndex: 'updateTime'
      }, {
        title: intl.formatMessage(message.adminUserName),
        dataIndex: 'adminUserName'
      }, {
        title: intl.formatMessage(message.status),
        dataIndex: 'state',
        render: (text, record) => {
          return this.activityStates[record.state]
        }
      }, {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        render: (text, record) => {
          const { options } = this.props
          let pathname = `/sango2/activity/activities/${record.functionId}`
          let discountPath = '/sango2/activity/activities/discountList'
          let query = { ...this.props.initials.products, templateId: record.templateId }
          // let copyCheck = _.includes(_.map(this.props.initials.enum.functionIds, 'value'), record.functionId)
          return (
            <div>
              <Row gutter={10}>
                {
                  options.authorize.includes(90103) &&
                  <Link to={{ pathname: pathname, query: { ...query, handle: 'detail' } }}>
                    <Button>{intl.formatMessage(message.detail)}</Button>
                  </Link>
                }
                {/* {
                  (options.authorize.includes(90101) || options.authorize.includes(90107)) &&
                  copyCheck &&
                  <Link to={{ pathname: pathname, query: { ...query, functionId: record.functionId, handle: 'copy' } }}>
                    <Button>拷贝</Button>
                  </Link>
                } */}
                {/* {
                  (options.authorize.includes(90102) || options.authorize.includes(90108)) &&
                  record.state !== 2 && record.state !== 5 &&
                  <Link to={{ pathname: pathname, query: { ...query, handle: 'update' } }}>
                    <Button>修改</Button>
                  </Link>
                } */}
                {
                  options.authorize.includes(90105) &&
                  record.functionId === 422 &&
                  <Link to={{ pathname: discountPath, query: { ...query } }}>
                    <Button>{intl.formatMessage(message.tuangouzhekou)}</Button>
                  </Link>
                }
                {
                  options.authorize.includes(90106) &&
                  record.state === 2 &&
                  <Button type='danger' ghost onClick={() => this.handleSwitch({
                    ...record,
                    switchKey: 0
                  })}>{intl.formatMessage(message.offline)}</Button>
                }
                {
                  options.authorize.includes(90106) &&
                  record.state === 5 &&
                  <Button type='primary' ghost onClick={() => this.handleSwitch({
                    ...record,
                    switchKey: 1
                  })}>{intl.formatMessage(message.open)}</Button>
                }
              </Row>
            </div>
          )
        }
      }
    ]

    this.data = {
      dataSource: []
    }
  }

  handleSwitch = (record) => {
    this.props.onSwitch({ ...record, ...this.props.initials.products })
  }

  render() {
    const products = this.props.initials.products
    const activities = this.props.data
    // const dataSource = activities.list
    const functionIdArr = [
      108,
      401, 402, 405, 406, 407, 408, 409, 410,
      415, 417, 418, 420,
      422, 429, 430,
      431, 433, 434,
      441, 442,
      601, 602, 604, 607
    ]
    const dataSource = []
    activities.list.map(function(elem) {
      if (functionIdArr.includes(elem.functionId)) {
        dataSource.push({...elem})
      }
    })
    this.data = {
      dataSource: [...dataSource]
    }
    const columns = this.columns
    const defaultLocale = {
      emptyText: products.productId ? `${products.productId}/${products.serverId}: 暂未查到数据` : '未作查询，暂无数据'
    }
    const pagination = {
      showSizeChanger: true,
      defaultPageSize: 500,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.count
    }

    return (
      <div>
        <Table
          bordered
          dataSource={this.data.dataSource}
          columns={columns}
          locale={defaultLocale}
          rowKey='templateId'
          pagination={pagination}
        />
      </div>
    )
  }
}

List.propTypes = {
  intl: PropTypes.object,
  data: PropTypes.object,
  initials: PropTypes.object,
  options: PropTypes.object,
  onSwitch: PropTypes.func
}
