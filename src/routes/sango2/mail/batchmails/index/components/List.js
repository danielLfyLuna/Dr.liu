import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Menu, Dropdown, Icon, Button, Table, Modal, Cascader } from 'antd'
import { defineMessages } from 'react-intl'

import Update from './Update'
import Upload from './Upload'
import _ from 'lodash'
const message = defineMessages({
  title: {
    id: 'TABLE.MAILTITLE',
    defaultMessage: '邮件标题'
  },
  context: {
    id: 'TABLE.MAILCONTEXT',
    defaultMessage: '邮件内容'
  },
  createTime: {
    id: 'TABLE.CREATETIME',
    defaultMessage: '创建时间'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  status0: {
    id: 'STATUS.MAIL.0',
    defaultMessage: '未发送'
  },
  status1: {
    id: 'STATUS.MAIL.7',
    defaultMessage: '已发送'
  },
  search: {
    id: 'BUTTON.SEARCH_PLAYER',
    defaultMessage: '查询发送玩家'
  },
  excel: {
    id: 'TIP.EXCEL_UPLOAD',
    defaultMessage: '上传EXCEL'
  },
  desc: {
    id: 'FORM.DESCRIPTION',
    defaultMessage: '描述'
  },
  desc_tip: {
    id: 'TIPS.DESC',
    defaultMessage: '仅管理台可见'
  },
  update: {
    id: 'BUTTON.UPDATE',
    defaultMessage: '修改'
  },
  item: {
    id: 'TABLE.ITEM',
    defaultMessage: '道具'
  },
  count: {
    id: 'TABLE.COUNT',
    defaultMessage: '数量'
  }
})


export default class List extends Component {
  static propTypes = {
    intl: PropTypes.object,
    login: PropTypes.object,
    itemPrice: PropTypes.object,
    mailMax: PropTypes.object,
    data: PropTypes.array,
    item: PropTypes.array,
    fetching: PropTypes.bool,
    onUpdate: PropTypes.func
  }

  constructor(props) {
    super(props)
    const { intl } = this.props
    this.columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 350
    }, {
      title: intl.formatMessage(message.title),
      dataIndex: 'title',
      key: 'title'
    }, {
      title: intl.formatMessage(message.context),
      dataIndex: 'context',
      key: 'context'
    }, {
      title: intl.formatMessage(message.createTime),
      dataIndex: 'createTime',
      key: 'createTime'
    }, {
      title: `${intl.formatMessage(message.desc)}(${intl.formatMessage(message.desc_tip)})`,
      dataIndex: 'description',
      key: 'description'
    }, {
      title: intl.formatMessage(message.status),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const intl = this.props.intl
        return (
          text === 1 ? intl.formatMessage(message.status1) : intl.formatMessage(message.status0)
        )
      }
    }, {
      title: intl.formatMessage(message.action),
      dataIndex: 'action',
      key: 'action',
      width: 80,
      render: (text, record) => {
        let menus = []
        _.forEach(record.curd, (value, key, collection) => {
          switch (key) {
            case '50202':
              menus.push(<Menu.Item key='1'>{intl.formatMessage(message.update)}</Menu.Item>)
              break
            case '50203':
              menus.push(<Menu.Item key='2'>{intl.formatMessage(message.excel)}</Menu.Item>)
              break
            case '50205':
              menus.push(
                <Menu.Item key='3'>
                  <Link to={{ pathname: '/sango2/mail/batchmail/batchmailPlayers', query: { id: record.id, title: record.title } }}>
                    {intl.formatMessage(message.search)}
                  </Link>
                </Menu.Item>
              )
              break
            default:

          }
        })
        return (
          <Dropdown overlay={
            <Menu onClick={e => this._handleMenuClick(record, e)}>
              {menus}
            </Menu>}
          >
            <Button type='default'>
              <Icon type='bars' />
              <Icon type='down' />
            </Button>
          </Dropdown>
        )
      }
    }]

    this.expandedColumns = [{
      title: intl.formatMessage(message.item),
      dataIndex: 'itemId',
      key: 'itemId',
      width: 300,
      render: (text, record) => {
        return (
          <Cascader
            options={this.props.item}
            defaultValue={[String(record.itemId)]}
            style={{width: 300}}
            disabled
          />
        )
      }
    }, {
      title: intl.formatMessage(message.count),
      dataIndex: 'count',
      key: 'count',
      width: 200
    }
    ]
  }

  state = {
    updateVisible: false,
    uploadVisible: false,
    mails: {}
  }

  _handleVisited = (e) => {
    if (e.key == 1) {
      this.setState({
        updateVisible: true
      })
    }
    if (e.key == 2) {
      this.setState({
        uploadVisible: true
      })
    }
  }

  _handleCancel1 = (e) => {
    this.setState({
      updateVisible: false
    })
  }

  _handleCancel2 = (e) => {
    this.setState({
      uploadVisible: false
    })
  }

  _handleOk = (e) => {
    if (e.key == 1) {
      this.setState({
        updateVisible: false
      })
    }
    if (e.key == 2) {
      this.setState({
        uploadVisible: false
      })
    }
  }

  _expandedMenus = (e) => {
    return (
      <Table
        rowKey='index'
        size='small'
        columns={this.expandedColumns}
        dataSource={e.rewards}
        pagination={false}
        scroll={{ y: 250 }}
      />
    )
  }

  _handleMenuClick = (record, e) => {
    this.setState({
      mails: record
    })
    this._handleVisited(e)
  }


  render() {
    const dataSource = this.props.data
    const {login: {curd}, intl} = this.props
    let list = _.forEach(dataSource, function(value, index, collection) {
      value.curd = curd
    })
    return (
      <div>
        <Table
          bordered
          rowKey='id'
          dataSource={list}
          columns={this.columns}
          expandedRowRender={record => { return this._expandedMenus(record) }}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
          loading={this.props.fetching}
        />
        <Modal
          key={Math.random()}
          title={intl.formatMessage(message.update)}
          width={1000}
          footer={null}
          maskClosable={false}
          visible={this.state.updateVisible}
          onCancel={this._handleCancel1}
        >
          <Update
            intl={intl}
            item={this.props.item}
            mailMax={this.props.mailMax}
            goodPrice={this.props.itemPrice}
            data={this.state.mails}
            onUpdate={this.props.onUpdate}
            _handleOk={this._handleOk}
          />
        </Modal>
        <Modal
          key={Math.random()}
          title={intl.formatMessage(message.excel)}
          width={1000}
          footer={null}
          maskClosable={false}
          visible={this.state.uploadVisible}
          onCancel={this._handleCancel2}
        >
          <Upload
            intl={intl}
            data={this.state.mails}
          />
        </Modal>
      </div>
    )
  }
}
