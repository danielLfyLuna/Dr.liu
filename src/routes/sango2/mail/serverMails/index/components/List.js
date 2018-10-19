import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Cascader, Dropdown, Button, Icon, Menu, Modal, Popconfirm } from 'antd'
import { defineMessages } from 'react-intl'
import { Link } from 'react-router'
import _ from 'lodash'
import UpdateContainer from './../containers/UpdateContainer'
import Copy from './Copy'

const message = defineMessages({
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  serverIds: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
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
    id: 'STATUS.MAIL.1',
    defaultMessage: '发送成功'
  },
  status2: {
    id: 'STATUS.MAIL.2',
    defaultMessage: '发送失败'
  },
  status3: {
    id: 'STATUS.MAIL.3',
    defaultMessage: '审核中'
  },
  status4: {
    id: 'STATUS.MAIL.4',
    defaultMessage: '审核通过'
  },
  status5: {
    id: 'STATUS.MAIL.5',
    defaultMessage: '审核未通过'
  },
  detail: {
    id: 'BUTTON.DETAIL',
    defaultMessage: '详情'
  },
  add: {
    id: 'BUTTON.ADD',
    defaultMessage: '新建'
  },
  copy: {
    id: 'BUTTON.COPY',
    defaultMessage: '复制'
  },
  update: {
    id: 'BUTTON.UPDATE',
    defaultMessage: '修改'
  },
  pass: {
    id: 'BUTTON.PASS',
    defaultMessage: '审核通过'
  },
  decline: {
    id: 'BUTTON.DECLINE',
    defaultMessage: '审核拒绝'
  },
  send: {
    id: 'BUTTON.SEND',
    defaultMessage: '发送'
  },
  tip_send: {
    id: 'TIP.MAILSEND',
    defaultMessage: '确认要发送吗?'
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
    itemPrice: PropTypes.object,
    mailMax: PropTypes.object,
    curd: PropTypes.object,
    onSend: PropTypes.func,
    onPass: PropTypes.func,
    onAdd: PropTypes.func,
    data: PropTypes.object,
    goods: PropTypes.array,
    channels: PropTypes.array,
    options: PropTypes.array
  }

  constructor(props) {
    super(props)
    const { intl } = this.props
    this.columns = [{
        title: 'id',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: intl.formatMessage(message.serverIds),
        dataIndex: 'serverIds',
        key: 'serverIds'
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
        title: intl.formatMessage(message.status),
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          if (record.status === 0) { return <div>{intl.formatMessage(message.status0)}</div> }
          if (record.status === 1) { return <div style={{color: '#0fd233'}}>{intl.formatMessage(message.status1)}</div> }
          if (record.status === 2) { return <div style={{color: '#ce1c40'}}>{intl.formatMessage(message.status2)}</div> }
          if (record.status === 3) { return <div style={{color: '#cec21c'}}>{intl.formatMessage(message.status3)}</div> }
          if (record.status === 4) { return <div style={{color: '#9907d5'}}>{intl.formatMessage(message.status4)}</div> }
          if (record.status === 5) { return <div style={{color: '#ce1c40'}}>{intl.formatMessage(message.status5)}</div> }
        }
      }, {
        title: intl.formatMessage(message.action),
        key: 'action',
        render: (text, record, index, e) => {
          let menus = []
          _.forEach(record.curd, (value, key, collection) => {
            switch (key) {
              case '50504':
                menus.push(
                  <Menu.Item key='1'>
                    <Link
                      to={{
                        pathname: '/sango2/mail/serverMail/details',
                        query: {
                          id: record.id
                        }
                      }}>
                      {intl.formatMessage(message.detail)}
                    </Link>
                  </Menu.Item>
                )
                break
              case '50505':
                menus.push(
                  <Menu.Item key='7'>{intl.formatMessage(message.copy)}</Menu.Item>
                )
                break
              case '50502':
                menus.push(
                  record.status !== 3 && <Menu.Item key='2'>{intl.formatMessage(message.update)}</Menu.Item>
                )
                break
              case '50507':
                menus.push(
                  record.status === 3 && <Menu.Item key='3'>{intl.formatMessage(message.pass)}</Menu.Item>
                )
                menus.push(
                  record.status === 3 && <Menu.Item key='4'>{intl.formatMessage(message.decline)}</Menu.Item>
                )
                break
              case '50506/TEST_REFUSE':
                menus.push(
                  <Menu.Item key='5'>
                    <Popconfirm
                      title='确认要发送吗?'
                      onConfirm={() => this._handleConfirm(record)}
                    >
                      {intl.formatMessage(message.send)}
                    </Popconfirm>
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
            options={this.props.goods}
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
    }]
  }

  state = {
    visible: false,
    id: null,
    mail: {},
    copyVisible: false,
    copy: {}
  }

  _handleConfirm = (value) => {
    this.props.onSend(value)
  }

  _handleMenuClick = (record, e) => {
    if (e.key === '2') {
      this.setState({
        visible: true,
        mail: record
      })
    }
    if (e.key === '3') {
      this.props.onPass({id: record.id, status: 4})
    }
    if (e.key === '4') {
      this.props.onPass({id: record.id, status: 5})
    }
    if (e.key === '7') {
      this.setState({
        copyVisible: true,
        copy: record
      })
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false,
      id: null
    })
  }

  _handleCancel = () => {
    this.setState({
      copyVisible: false
    })
  }

  _expandedMenus = (e) => {
    return (
      <Table
        rowKey='index'
        size='small'
        columns={this.expandedColumns}
        dataSource={e.rewards}
        pagination={false}
        scroll={{ y: 400 }}
      />
    )
  }

  render() {
    const {curd, intl} = this.props
    const dataSource = this.props.data.ownMails
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
          loading={this.props.data.fetching}
        />
        <Modal
          width={1000}
          maskClosable={false}
          key={Math.random()}
          title={intl.formatMessage(message.update)}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <UpdateContainer
            intl={this.props.intl}
            data={this.state.mail}
            goods={this.props.goods}
            mailMax={this.props.mailMax}
            goodPrice={this.props.itemPrice}
            options={this.props.options}
            channels={this.props.channels}
            handleCancel={this.handleCancel}
          />
        </Modal>
        <Modal
          width={1000}
          maskClosable={false}
          key={Math.random()}
          title={intl.formatMessage(message.copy)}
          visible={this.state.copyVisible}
          footer={null}
          onCancel={this._handleCancel}
        >
          <Copy
            intl={this.props.intl}
            data={this.state.copy}
            goods={this.props.goods}
            options={this.props.options}
            mailMax={this.props.mailMax}
            goodPrice={this.props.itemPrice}
            channels={this.props.channels}
            onAdd={this.props.onAdd}
            handleCancel={this._handleCancel}
          />
        </Modal>
      </div>
    )
  }

}
