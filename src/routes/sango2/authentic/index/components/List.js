import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Tabs, Popconfirm, Icon } from 'antd'
import _ from 'lodash'
import { defineMessages } from 'react-intl'

const TabPane = Tabs.TabPane
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
  },
  endTime: {
    id: 'TABLE.ENDTIME',
    defaultMessage: '结束时间'
  },
  authentic_long: {
    id: 'BUTTON.AUTHENTIC_LONG',
    defaultMessage: '永久白名单'
  },
  authentic_short: {
    id: 'BUTTON.AUTHENTIC_SHORT',
    defaultMessage: '临时白名单'
  }
})


export default class List extends Component {

  constructor(props) {
    super(props)
    const intl = this.props.intl
    this.columns = {
      auth: [
        {
          title: intl.formatMessage(message.ip),
          dataIndex: 'authenticIp',
          key: 'authenticIp'
        }, {
          title: intl.formatMessage(message.action),
          dataIndex: 'action',
          key: 'action',
          render: (text, record) => (
            <div>
              {
                this.props.options.authorize.includes(140102) &&
                <Popconfirm title={`${intl.formatMessage(message.ip_input)}: [${record.authenticIp}]`} onConfirm={() => this.handleDelete(record)} okText='Yes' cancelText='No'>
                  <Button><Icon type='close-circle-o' /> {intl.formatMessage(message.delete)}</Button>
                </Popconfirm>
              }
            </div>
          )
        }
      ],
      temp: [
        {
          title: intl.formatMessage(message.ip),
          dataIndex: 'temporaryIp',
          key: 'temporaryIp'
        }, {
          title: intl.formatMessage(message.endTime),
          dataIndex: 'time',
          key: 'time'
        }
      ]
    }

    this.dataSource = {
      auth: [],
      temp: []
    }
  }

  handleDelete = (record) => {
    const dataSource = [...this.dataSource.auth]
    dataSource.splice(_.findIndex(dataSource, function(o) { return o.authenticIp === record.authenticIp }), 1)

    this.dataSource.auth = dataSource
    this.props.onDelete({
      form: {
        ip: record.authenticIp
      }
    })
  }

  render() {
    const { intl } = this.props
    const { authentic } = this.props.options
    this.dataSource.auth = _.reduce(authentic.list.authenticIps, (result, option) => {
      result.push({ authenticIp: option })
      return result
    }, [])
    this.dataSource.temp = _.reduce(authentic.list.temporaryIps, (result, option, index) => {
      result.push({ temporaryIp: index, time: option })
      return result
    }, [])

    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500']
    }
    return (
      <div>
        <Tabs defaultActiveKey='1' >
          <TabPane tab={intl.formatMessage(message.authentic_long)} key='1'>
            <Table
              dataSource={this.dataSource.auth}
              columns={this.columns.auth}
              rowKey='authenticIp'
              pagination={{...pagination, total: this.dataSource.auth.length}}
              bordered
            />
          </TabPane>
          <TabPane tab={intl.formatMessage(message.authentic_short)} key='2'>
            <Table
              dataSource={this.dataSource.temp}
              columns={this.columns.temp}
              rowKey='temporaryIp'
              pagination={{...pagination, total: this.dataSource.temp.length}}
              bordered
            />
          </TabPane>
        </Tabs>

      </div>
    )
  }
}

List.propTypes = {
  intl: PropTypes.object,
  options: PropTypes.object,
  onDelete: PropTypes.func
}
