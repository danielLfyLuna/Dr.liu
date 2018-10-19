import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import moment from 'moment'
import _ from 'lodash'

import ModalContainer from '../containers/ModalContainer'
import Generate from './Generate'
import LogsContainer from '../containers/LogsContainer'
import DropOption from '../../../../../../components/DropOption/DropOption'

const message = defineMessages({
  activityId: {
    id: 'TABLE.ACTIVITY_ID',
    defaultMessage: '礼包编号'
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  title: {
    id: 'TABLE.TITLE',
    defaultMessage: '标题'
  },
  type: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
  },
  beginDate: {
    id: 'TABLE.STARTTIME',
    defaultMessage: '开始时间'
  },
  endDate: {
    id: 'TABLE.ENDTIME',
    defaultMessage: '结束时间'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  cdkey_update: {
    id: 'CDKEY.TITLE.UPDATE',
    defaultMessage: '编辑兑换码'
  },
  cdkey_copy: {
    id: 'CDKEY.TITLE.COPY',
    defaultMessage: '拷贝兑换码'
  },
  cdkey_transform: {
    id: 'CDKEY.TITLE.TRANSFORM',
    defaultMessage: '生成 CDKey'
  },
  cdkey_log: {
    id: 'CDKEY.TITLE.LOG',
    defaultMessage: '生成日志'
  },
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  count: {
    id: 'TABLE.COUNT',
    defaultMessage: '数量'
  },
  empty: {
    id: 'NOTIFICATION.CDKEY_EMPTY',
    defaultMessage: '此礼包暂无奖励'
  }
})


export default class List extends Component {
  state = {
    dataSource: [],
    count: 0,
    editing: {},
    currentItem: {},
    modalType: 'update',
    modalTitle: '编辑兑换码礼包',
    visible: false,
    generateVisible: false,
    logsVisible: false
  }

  constructor(props) {
    super(props)
    const { initials, intl } = this.props
    this.columns = [
      {
        title: intl.formatMessage(message.activityId),
        dataIndex: 'activityId',
        key: 'activityId'
      }, {
        title: intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: intl.formatMessage(message.title),
        dataIndex: 'title',
        key: 'title'
      }, {
        title: intl.formatMessage(message.type),
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => {
          return initials.map.cdkeyTypes[record.type]
        }
      }, {
        title: intl.formatMessage(message.beginDate),
        dataIndex: 'beginDate',
        key: 'beginDate',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: intl.formatMessage(message.endDate),
        dataIndex: 'endDate',
        key: 'endDate',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          const { options } = this.props
          let menuOptions = [
            options.authorize.includes(30102) && {key: 'UPDATE', name: intl.formatMessage(message.cdkey_update)},
            options.authorize.includes(30104) && {key: 'COPY', name: intl.formatMessage(message.cdkey_copy)},
            options.authorize.includes(30105) && {key: 'GENERATE', name: intl.formatMessage(message.cdkey_transform)},
            options.authorize.includes(30106) && {key: 'LOGS', name: intl.formatMessage(message.cdkey_log)}
          ]
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={menuOptions.filter(o => o)}
              dropdownProps={{
                trigger: ['hover']
              }}
            />
          )
        }
      }
    ]
  }

  expandedRowRender = (rewards) => {
    const { options, intl } = this.props
    const columns = [
      {
        title: intl.formatMessage(message.item),
        dataIndex: 'itemId',
        key: 'itemId',
        width: '50%',
        render: (text, record) => {
          return `${options.items[record.itemId]}(${record.itemId})`
        }
      }, {
        title: intl.formatMessage(message.count),
        dataIndex: 'count',
        key: 'count',
        width: '50%'
      }
    ]

    const dataSource = [...rewards]

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={record => `${record.itemId}-${record.count}`}
        locale={{emptyText: intl.formatMessage(message.empty)}}
        pagination={false}
        showHeader={false}
      />
    )
  }

  componentWillReceiveProps(nextProps) {
    const cdkey = nextProps.data
    let dataSource = []
    cdkey.list.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

  onEditItem = (record) => {
    _.map(this.state.dataSource, (val, index) => {
      if (val.key === record.key) {
        this.setState({
          currentItem: record,
          modalType: 'update',
          visible: true,
          editing: val
        })
      }
    })
  }

  onCopyItem = (record) => {
    this.setState({
      currentItem: record,
      modalType: 'copy',
      modalTitle: this.props.intl.formatMessage(message.cdkey_copy),
      visible: true
    })
  }

  onGenerateItem = (record) => {
    this.setState({
      currentItem: record,
      modalType: 'generate',
      modalTitle: this.props.intl.formatMessage(message.cdkey_transform),
      generateVisible: true
    })
  }

  onLogsItem = (record) => {
    this.setState({
      currentItem: record,
      modalType: 'logs',
      modalTitle: this.props.intl.formatMessage(message.cdkey_log), // 生成日志列表
      logsVisible: true
    })
  }

  onUpdate = (values) => {
    const dataSource = [...this.state.dataSource]
    _.map(dataSource, (val, index) => {
      if (val.key === this.state.editing.key) {
        val = Object.assign(val, values.form)
      }
    })
    this.setState({
      visible: false,
      dataSource: [...dataSource]
    })
    this.props.onUpdate(values)
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
      generateVisible: false,
      logsVisible: false
    })
  }

  onModalLoad = () => {
    return this.state
  }

  handleMenuClick = (record, e) => {
    if (e.key === 'UPDATE') {
      this.onEditItem(record)
    } else if (e.key === 'COPY') {
      this.onCopyItem(record)
    } else if (e.key === 'GENERATE') {
      this.onGenerateItem(record)
    } else if (e.key === 'LOGS') {
      this.onLogsItem(record)
    }
  }

  render() {
    const { intl } = this.props
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
          expandedRowRender={record => this.expandedRowRender(record.activityRewards)}
          rowKey='activityId'
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
          <ModalContainer
            options={this.props.options}
            data={this.props.data}
            initials={this.props.initials}
            onRender={this.props.onRender}
            onModalLoad={this.onModalLoad}
            onUpdate={this.onUpdate}
            onSubmitting={this.handleCancel}
          />
        </Modal>
        <Modal
          width={800}
          key={Math.random()}
          title={this.state.modalTitle}
          visible={this.state.generateVisible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <Generate
            intl={intl}
            options={this.props.options}
            data={this.props.data}
            initials={this.props.initials}
            onRender={this.props.onRender}
            onModalLoad={this.onModalLoad}
            onGenerate={this.props.onGenerate}
            onSubmitting={this.handleCancel}
          />
        </Modal>
        <Modal
          width={900}
          key={Math.random()}
          title={this.state.modalTitle}
          visible={this.state.logsVisible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <LogsContainer
            items={this.state.currentItem}
            options={this.props.options}
            initials={this.props.initials}
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
  intl: PropTypes.object,
  data: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onUpdate: PropTypes.func,
  onGenerate: PropTypes.func,
  onRender: PropTypes.func
}
