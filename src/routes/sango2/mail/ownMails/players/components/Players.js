import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Modal, Card } from 'antd'
import { Link } from 'react-router'

import PlayersModal from './Modal'


export default class Players extends Component {

  static propTypes = {
    location: PropTypes.object,
    checkOwnMail: PropTypes.func,
    updateOwnEmailPlayer: PropTypes.func,
    ownMailPlayer: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.columns = [{
      title: '玩家信息',
      dataIndex: 'playerName',
      key: 'playerName'
    }, {
      title: '产品ID',
      dataIndex: 'productId',
      key: 'productId'
    }, {
      title: '服务器ID',
      dataIndex: 'serverId',
      key: 'serverId'
    }, {
      title: '创建时间',
      dataIndex: 'operateTime',
      key: 'operateTime'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status === 0) {
          return <div style={{color: '#f90b16'}}>未成功</div>
        }
        if (record.status === 1) {
          return '已成功'
        }
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <Button onClick={e => this.handleOk(record)}>
            修改昵称
          </Button>
        )
      }
    }]
  }

  state = {
    visible: false,
    record: {}
  }

  handleOk = (value) => {
    this.setState({
      visible: true,
      record: value
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  componentWillMount() {
    this.props.checkOwnMail(this.props.location.query.id)
  }


  render() {

    const { check } = this.props.ownMailPlayer

    let tags = ''
    if (check.sango2Mails && check.sango2Mails.receiverType === 1) { tags = '玩家昵称' }
    if (check.sango2Mails && check.sango2Mails.receiverType === 2) { tags = '玩家ID' }
    if (check.sango2Mails && check.sango2Mails.receiverType === 3) { tags = '平台ID' }

    return (
      <Card
        title={<div>玩家信息(<i style={{color: '#cd0a3c'}}>{tags}</i>)</div>}
        noHovering
      >
        <Table
          rowKey='index'
          bordered
          dataSource={check.mailPlayers}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Button type='primary'>
          <Link to='/sango2/mail/ownMail/index'>返回</Link>
        </Button>
        <Modal
          width={700}
          maskClosable={false}
          key={Math.random()}
          title='修改邮件目标玩家'
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <PlayersModal
            handleCancel={this.handleCancel}
            data={this.state.record}
            updateOwnEmailPlayer={this.props.updateOwnEmailPlayer}
          />
        </Modal>
      </Card>
    )
  }
}
