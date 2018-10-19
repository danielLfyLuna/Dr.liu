import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Popconfirm, Icon } from 'antd'
import _ from 'lodash'
import { defineMessages } from 'react-intl'

const message = defineMessages({
  ip: {
    id: 'FORM.IP',
    defaultMessage: 'IP 地址'
  },
  ip_input: {
    id: 'TIP.IP_DELETE',
    defaultMessage: '是否确认删除 IP 地址'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  delete: {
    id: 'BUTTON.DELETE',
    defaultMessage: '删除'
  }
})


export default class List extends Component {

  constructor(props) {
    super(props)
    const intl = this.props.intl
    this.columns = [
      {
        title: intl.formatMessage(message.ip),
        dataIndex: 'ip',
        key: 'ip'
      }, {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          return (
            <div>
              {
                _.has(this.props.curd, '140202')
                ?
                  <Popconfirm title={`${intl.formatMessage(message.ip_input)}: [${record.ip}]`} onConfirm={() => this.handleDelete(record)} okText='Yes' cancelText='No'>
                    <Button type='primary'><Icon type='close-circle-o' /> {intl.formatMessage(message.delete)}</Button>
                  </Popconfirm>
                :
                  ''
              }
            </div>
          )
        }
      }
    ]
  }

  handleDelete = (record) => {
    const { noPass } = this.props
    if (noPass.items.productId !== '') {
      this.props.onDelete({
        ip: record.ip,
        productId: noPass.items.productId,
        serverId: noPass.items.serverId
      })
    }
  }

  render() {
    const { noPass } = this.props
    let dataSource = []
    _.map(noPass.list, (v, i) => {
      dataSource.push({ ip: v })
    })

    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500']
    }
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          rowKey='ip'
          pagination={{...pagination, total: dataSource.length}}
          bordered
        />
      </div>
    )
  }
}

List.propTypes = {
  intl: PropTypes.object,
  curd: PropTypes.object,
  noPass: PropTypes.object,
  onDelete: PropTypes.func
}
