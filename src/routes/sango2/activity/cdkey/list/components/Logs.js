/* global SANGO2_API_HOST */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import { Link } from 'react-router'
import { intlShape, defineMessages } from 'react-intl'

const message = defineMessages({
  activityId: {
    id: 'TABLE.ACTIVITY_ID',
    defaultMessage: '礼包编号'
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  channel: {
    id: 'FORM.CHANNEL',
    defaultMessage: '渠道'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  creator: {
    id: 'FORM.CREATOR',
    defaultMessage: '创建人'
  },
  creatTime: {
    id: 'TABLE.CREATETIME',
    defaultMessage: '创建时间'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  download: {
    id: 'FORM.DOWNLOAD',
    defaultMessage: '下载'
  },
  download_no: {
    id: 'NOTIFICATION.DOWNLOAD_NO',
    defaultMessage: '无下载权限'
  },
  set: {
    id: 'APP.CDKEY.SETCDKEY',
    defaultMessage: '设置CDKEY'
  }
})


export default class Logs extends Component {
  state = {
    currentItem: {},
    modalType: ''
  }

  constructor(props) {
    super(props)
    const { intl } = this.props

    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: intl.formatMessage(message.activityId),
        dataIndex: 'activityId',
        key: 'activityId'
      }, {
        title: intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: intl.formatMessage(message.channel),
        dataIndex: 'channel',
        key: 'channel',
        render: (text, record) => {
          return record.channel ? `${this.props.options.channels.map[record.channel]}(${record.channel})` : ''
        }
      }, {
        title: intl.formatMessage(message.count),
        dataIndex: 'number',
        key: 'number'
      }, {
        title: intl.formatMessage(message.creator),
        dataIndex: 'creator',
        key: 'creator'
      }, {
        title: intl.formatMessage(message.creatTime),
        dataIndex: 'createDate',
        key: 'createDate'
      }, {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          let path = `${SANGO2_API_HOST}/products/${record.productId}/activitys/${record.activityId}/cdkeys/download/${record.id}`
          const { options } = this.props
          return (
            <ul>
              <li>
                {
                  options.authorize.includes(30107) &&
                  <Button type='primary' onClick={() => this.handleDownload(path)}>{intl.formatMessage(message.download)}</Button> ||
                  <span>{intl.formatMessage(message.download_no)}</span>
                }
              </li>
              {
                (this.props.items.type === 7 && options.authorize.includes(30108)) &&
                <li style={{marginTop: '3px'}}>
                  <Button type='primary'>
                    <Link to={{
                      pathname: '/sango2/activity/cdkey/setCDKey',
                      query: {
                        productId: record.productId,
                        id: record.id
                      }
                    }}>
                      {intl.formatMessage(message.set)}
                    </Link>
                  </Button>
                </li>
              }
            </ul>
          )
        }
      }
    ]

    this.dataSource = []
  }



  componentWillMount() {
    this.props.onRender({ renderState: false })
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem,
      modalType: modalType
    })
    this.props.fetchGenerateLog({
      path: {
        productId: currentItem.productId,
        activityId: currentItem.activityId
      }
    })
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: true })
  }

  handleDownload = (link) => {
    window.open(link)
  }

  render() {
    const { cdkey: { generateLogs } } = this.props

    this.dataSource = generateLogs.length ? [...generateLogs] : []

    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.dataSource.length
    }

    return (
      <div>
        <Table
          dataSource={this.dataSource}
          columns={this.columns}
          rowKey='id'
          pagination={pagination}
          bordered
        />
      </div>
    )
  }
}

Logs.propTypes = {
  intl: intlShape,
  cdkey: PropTypes.object,
  items: PropTypes.object,
  options: PropTypes.object,
  onModalLoad: PropTypes.func,
  onRender: PropTypes.func,
  fetchGenerateLog: PropTypes.func
}
