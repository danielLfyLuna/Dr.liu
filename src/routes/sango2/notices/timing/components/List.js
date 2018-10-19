import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'
import moment from 'moment'

import DropOption from './../../../../../components/DropOption/DropOption'

const message = defineMessages({
  title: {
    id: 'TABLE.TITLE',
    defaultMessage: '标题'
  },
  type: {
    id: 'FORM.TYPE_NOTICE',
    defaultMessage: '公告类型'
  },
  circulation: {
    id: 'FORM.CIRCULATION',
    defaultMessage: '循环模式'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  endTime: {
    id: 'TABLE.ENDTIME',
    defaultMessage: '结束时间'
  },
  circulation_time: {
    id: 'FORM.CIRCULATION_TIME',
    defaultMessage: '循环间隔'
  },
  circulation_count: {
    id: 'FORM.CIRCULATION_COUNT',
    defaultMessage: '循环次数'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  performAmount: {
    id: 'TABLE.PERFORMAMOUNT',
    defaultMessage: '执行次数'
  },
  amount: {
    id: 'TABLE.AMOUNT',
    defaultMessage: '总次数'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  delete: {
    id: 'BUTTON.DELETE',
    defaultMessage: '删除'
  },
  stop: {
    id: 'BUTTON.STOP',
    defaultMessage: '停止'
  },
  perform: {
    id: 'BUTTON.PERFORM',
    defaultMessage: '执行'
  },
  notice_1: {
    id: 'NOTICE.TYPE.1',
    defaultMessage: '定时公告'
  },
  notice_100: {
    id: 'NOTICE.TYPE.100',
    defaultMessage: '跑马灯公告'
  },
  circulation_1: {
    id: 'CIRCULATION.1',
    defaultMessage: '无限循环'
  },
  circulation_2: {
    id: 'CIRCULATION.2',
    defaultMessage: '限定次数'
  },
  circulation_3: {
    id: 'CIRCULATION.3',
    defaultMessage: '限定时间'
  },
  sec: {
    id: 'STATUS.TYPE.TIME.SEC',
    defaultMessage: '秒'
  },
  min: {
    id: 'STATUS.TYPE.TIME.MIN',
    defaultMessage: '分钟'
  },
  hour: {
    id: 'STATUS.TYPE.TIME.HOUR',
    defaultMessage: '小时'
  },
  day: {
    id: 'STATUS.TYPE.TIME.DAY',
    defaultMessage: '天'
  },
  forever: {
    id: 'STATUS.TYPE.TIME.FOREVER',
    defaultMessage: '永久'
  }
})


export default class List extends Component {

  static propTypes = {
    intl: PropTypes.object,
    curd: PropTypes.object.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onStopItem: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
  }

  state = {
    dataSource: [],
    count: 0,
    editing: {},
    visible: false,
    deleteVisible: false,
    deleteItem: {},
    map: {
      noticeTypes: { 1: this.props.intl.formatMessage(message.notice_1), 100: this.props.intl.formatMessage(message.notice_100) },
      circleTypes: { 1: this.props.intl.formatMessage(message.circulation_1), 2: this.props.intl.formatMessage(message.circulation_2), 3: this.props.intl.formatMessage(message.circulation_3) },
      timeUnits: { 1: this.props.intl.formatMessage(message.sec), 2: this.props.intl.formatMessage(message.min), 3: this.props.intl.formatMessage(message.hour), 4: this.props.intl.formatMessage(message.day), 5: this.props.intl.formatMessage(message.forever) }
    }
  }

  constructor(props) {
    super(props)

    this.columns = [{
        title: this.props.intl.formatMessage(message.title),
        dataIndex: 'title',
        key: 'title'
      }, {
        title: this.props.intl.formatMessage(message.type),
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          return (
            this.state.map.noticeTypes[record.type]
          )
        }
      }, {
        title: this.props.intl.formatMessage(message.circulation),
        dataIndex: 'circleType',
        key: 'circleType',
        render: (text, record) => {
          return (
            this.state.map.circleTypes[record.circleType]
          )
        }
      }, {
        title: `${this.props.intl.formatMessage(message.performAmount)} / ${this.props.intl.formatMessage(message.amount)}`,
        dataIndex: 'count',
        key: 'count'
      }, {
        title: this.props.intl.formatMessage(message.status),
        dataIndex: 'open',
        key: 'open',
        render: (text, record) => {
          const props = this.props
          return (
            record.open ? props.intl.formatMessage(message.perform) : props.intl.formatMessage(message.stop)
          )
        }
      }, {
        title: this.props.intl.formatMessage(message.circulation_time),
        width: 140,
        dataIndex: 'interval',
        key: 'interval',
        render: (text, record) => {
          return (
            record.interval + this.state.map.timeUnits[record.intervalUnit]
          )
        }
      }, {
        title: this.props.intl.formatMessage(message.endTime),
        width: 140,
        dataIndex: 'endTime',
        key: 'endTime'
      }, {
        title: this.props.intl.formatMessage(message.server),
        dataIndex: 'serverIds',
        key: 'serverIds'
      }, {
        title: this.props.intl.formatMessage(message.action),
        key: 'operation',
        width: 100,
        render: (text, record) => {
          const {curd, intl} = this.props
          if (_.has(curd, '60203')) {
            return (
              record.open ?
                <DropOption
                  onMenuClick={e => this.handleMenuClick(record, e)}
                  menuOptions={
                    [
                      { key: '1', name: intl.formatMessage(message.stop) }
                    ]
                  }
                />
                :
                <DropOption
                  onMenuClick={e => this.handleMenuClick(record, e)}
                  menuOptions={
                    [
                      { key: '2', name: intl.formatMessage(message.delete) }
                    ]
                  }
                />
            )
          } else {
            return (
              <span>No Permission(无操作权限)</span>
            )
          }
        }
      }]
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.data)
    const list = nextProps.data
    let dataSource = []
    list.map(function(elem, index) {
      dataSource.push({
        key: index,
        id: elem.id,
        productId: elem.productId,
        title: elem.title,
        type: elem.type,
        circleType: elem.circleType,
        count: `${elem.count} / ${elem.maxCount}`,
        open: elem.open,
        interval: elem.interval,
        intervalUnit: elem.intervalUnit,
        endTime: moment(elem.endTime).format('YYYY-MM-DD HH:mm:ss'),
        serverIds: elem.serverIds
      })
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

  onStopItem = (record) => {
    const dataSource = [...this.state.dataSource]
    _.map(dataSource, (val, index) => {
      if (val.key === this.state.editing.key) {
        val = Object.assign(val, record)
      }
    })
    this.setState({
      dataSource: [...dataSource],
      editing: {}
    })
    this.props.onStopItem(record)
  }

  deleteModalShow = (deleteItem) => {
    this.setState({
      deleteVisible: true,
      deleteItem: deleteItem
    })
  }

  deleteOnOk = () => {
    const deleteItem = this.state.deleteItem
    const dataSource = [...this.state.dataSource]
    dataSource.splice(_.findIndex(dataSource, function(o) { return o.key === deleteItem.key }), 1)
    this.setState({
      dataSource: [...dataSource],
      deleteVisible: false
    })
    this.props.onDeleteItem(deleteItem)
  }

  deleteOnCancel = () => {
    this.setState({
      deleteVisible: false,
      deleteItem: {}
    })
  }

  handleMenuClick = (record, e) => {
    if (e.key === '1') {
      _.map(this.state.dataSource, (val, index) => {
        if (val.key === record.key) {
          val.open = false
          this.setState({
            editing: val
          })
        }
      })
      this.onStopItem(record)
    } else if (e.key === '2') {
      this.deleteModalShow(record)
    }
  }

  render() {
    const { intl } = this.props
    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          title={intl.formatMessage(message.delete)}
          visible={this.state.deleteVisible}
          onOk={this.deleteOnOk}
          onCancel={this.deleteOnCancel}
          okText='OK'
          cancelText='CANCEL'
        >
          <p>确定删除此条记录吗? ...</p>
        </Modal>
      </div>
    )
  }

}
