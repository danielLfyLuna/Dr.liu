import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Switch } from 'antd'
import { defineMessages } from 'react-intl'
import moment from 'moment'
import _ from 'lodash'

import LoginModal from './Modal'
import DropOption from './../../../../../components/DropOption/DropOption'

const message = defineMessages({
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  channel: {
    id: 'FORM.CHANNEL',
    defaultMessage: '渠道'
  },
  createTime: {
    id: 'TABLE.CREATETIME',
    defaultMessage: '创建时间'
  },
  operateTime: {
    id: 'TABLE.OPERATETIME',
    defaultMessage: '操作时间'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  open: {
    id: 'BUTTON.OPEN',
    defaultMessage: '开启'
  },
  off: {
    id: 'BUTTON.OFF',
    defaultMessage: '关闭'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  update: {
    id: 'BUTTON.UPDATE',
    defaultMessage: '修改'
  },
  delete: {
    id: 'BUTTON.DELETE',
    defaultMessage: '删除'
  },
  no_permission: {
    id: 'NO_PERMISSION',
    defaultMessage: '没有权限'
  },
  tip: {
    id: 'FORM.TIP',
    defaultMessage: '标签'
  },
  title: {
    id: 'TABLE.TITLE',
    defaultMessage: '标题'
  },
  content: {
    id: 'TABLE.CONTENT',
    defaultMessage: '内容'
  },
  tips: {
    id: 'FORM.TIPS',
    defaultMessage: '友情提示'
  },
  delete_confirm: {
    id: 'TIP.DELETE_CONFIRM',
    defaultMessage: '确定删除此条记录吗?'
  }
})


export default class List extends Component {

  state = {
    visible: false,
    items: {},
    deleteVisible: false,
    deleteItem: {}
  }

  constructor(props) {
    super(props)

    this.columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: this.props.intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: this.props.intl.formatMessage(message.channel),
        dataIndex: 'channels',
        key: 'channels'
      }, {
        title: this.props.intl.formatMessage(message.createTime),
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return (
            record.createTime ? moment(record.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
          )
        }
      }, {
        title: this.props.intl.formatMessage(message.operateTime),
        dataIndex: 'operationTime',
        key: 'operationTime'
      }, {
        title: this.props.intl.formatMessage(message.status),
        dataIndex: 'open',
        key: 'open',
        render: (text, record) => {
          const props = this.props
          if (_.has(record.curd, '60104')) {
            return (
              <Switch
                checkedChildren={props.intl.formatMessage(message.open)}
                unCheckedChildren={props.intl.formatMessage(message.off)}
                defaultChecked={record.open === 1}
                onChange={(e) => this.handleSwitchChange(e, record)}
              />
            )
          } else {
            return (
              <span>{props.intl.formatMessage(message.no_permission)}</span>
            )
          }
        }
      }, {
        title: this.props.intl.formatMessage(message.action),
        key: 'operation',
        width: 100,
        render: (text, record) => {
          const props = this.props
          let menuOptions = []
          _.forEach(record.curd, (value, key, collection) => {
            switch (key) {
              case '60102':
                menuOptions.push({key: '1', name: props.intl.formatMessage(message.update)})
                break
              case '60105':
                menuOptions.push({key: '2', name: props.intl.formatMessage(message.delete)})
                break
              default:

            }
          })
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={menuOptions}
              dropdownProps={{
                trigger: ['hover']
              }}
            />
          )
        }
      }]

    this.noticeColumns = [{
      title: this.props.intl.formatMessage(message.title),
      dataIndex: 'title',
      key: 'title'
    }, {
      title: this.props.intl.formatMessage(message.tip),
      dataIndex: 'label',
      key: 'label'
    }, {
      title: this.props.intl.formatMessage(message.content),
      dataIndex: 'context',
      key: 'context'
    }]
  }

  loginItems = (value) => {
    return (
      <Table
        rowKey='index'
        columns={this.noticeColumns}
        dataSource={value}
        pagination={false}
      />
    )
  }

  onUpdate = (fieldsValue) => {
    this.props.onUpdate(fieldsValue)
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props.data)
  //   const list = nextProps.data
  //   let dataSource = []
  //   list.map(function(elem, index) {
  //     dataSource.push({key: index, ...elem})
  //   })
  //   this.setState({
  //     dataSource: [...dataSource],
  //     count: dataSource.length
  //   })
  // }


  handleMenuClick = (record, e) => {
    if (e.key === '1') {
      this.setState({
        items: record,
        visible: true
      })

    } else if (e.key === '2') {
      this.deleteModalShow(record)
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  deleteModalShow = (deleteItem) => {
    this.setState({
      deleteVisible: true,
      deleteItem: deleteItem
    })
  }

  deleteOnOk = () => {
    this.props.onDeleteItem(this.state.deleteItem)
    this.setState({
      deleteVisible: false
    })
  }

  deleteOnCancel = () => {
    this.setState({
      deleteVisible: false,
      deleteItem: {}
    })
  }

  handleSwitchChange = (e, record) => {
    this.props.onOpen({
      id: record.id,
      open: e ? 1 : 0
    })
  }


  render() {
    const {curd, data, intl} = this.props
    let list = _.forEach(data, function(value, index, collection) {
      value.curd = curd
    })
    return (
      <div>
        <Table
          rowKey='id'
          bordered
          dataSource={list}
          expandedRowRender={(record) => this.loginItems(record.noticeLabels)}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          width={700}
          key={Math.random()}
          title={intl.formatMessage(message.update)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <LoginModal
            intl={intl}
            channels={this.props.channels}
            options={this.props.options}
            onUpdate={this.onUpdate}
            onSubmitting={this.handleCancel}
            items={this.state.items}
          />
        </Modal>

        <Modal
          title={intl.formatMessage(message.tips)}
          visible={this.state.deleteVisible}
          onOk={this.deleteOnOk}
          onCancel={this.deleteOnCancel}
          okText='OK'
          cancelText='CANCEL'
        >
          <p>{intl.formatMessage(message.delete_confirm)} ...</p>
        </Modal>
      </div>
    )
  }

}

List.propTypes = {
  intl: PropTypes.object,
  curd: PropTypes.object,
  data: PropTypes.array,
  options: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onUpdate: PropTypes.func,
  onOpen: PropTypes.func,
  channels: PropTypes.array
}
