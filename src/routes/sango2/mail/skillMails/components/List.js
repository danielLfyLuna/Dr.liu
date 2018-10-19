import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { defineMessages } from 'react-intl'
import moment from 'moment'

const message = defineMessages({
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  serverId: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  skillId: {
    id: 'TABLE.SKILLID',
    defaultMessage: '技能id'
  },
  skillName: {
    id: 'TABLE.SKILLNAME',
    defaultMessage: '技能名称'
  },
  createTime: {
    id: 'TABLE.CREATETIME',
    defaultMessage: '创建时间'
  },
  admin: {
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
  status1: {
    id: 'STATUS.MAIL.1',
    defaultMessage: '发送成功'
  },
  status2: {
    id: 'STATUS.MAIL.2',
    defaultMessage: '发送失败'
  }
})


export default class List extends Component {

  static propTypes = {
    intl: PropTypes.object,
    data: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
    const { intl } = this.props
    this.columns = [{
      title: intl.formatMessage(message.productId),
      dataIndex: 'productId',
      key: 'productId'
    }, {
      title: intl.formatMessage(message.serverId),
      dataIndex: 'serverId',
      key: 'serverId'
    }, {
      title: intl.formatMessage(message.nickname),
      dataIndex: 'nickname',
      key: 'nickname'
    }, {
      title: intl.formatMessage(message.skillId),
      dataIndex: 'skillId',
      key: 'skillId'
    }, {
      title: intl.formatMessage(message.skillName),
      dataIndex: 'skillName',
      key: 'skillName'
    }, {
      title: intl.formatMessage(message.admin),
      dataIndex: 'adminUserName',
      key: 'adminUserName'
    }, {
      title: intl.formatMessage(message.createTime),
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text, record) => {
        return moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    }, {
      title: intl.formatMessage(message.status),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status === 0) { return <div style={{color: '#d7390f'}}>{intl.formatMessage(message.status2)}</div> }
        if (record.status === 1) { return <div>{intl.formatMessage(message.status1)}</div> }
      }
    }]
  }

  render() {
    return (
      <div>
        <Table
          rowKey='id'
          bordered
          dataSource={this.props.data}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </div>
    )
  }
}
