import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Cascader, DatePicker, Modal, notification } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import { FormattedMessage, defineMessages } from 'react-intl'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import AddContainer from '../containers/AddContainer'


const { RangePicker } = DatePicker
const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  server: {
    id: 'FORM.SERVERS_INPUT',
    defaultMessage: '请选择服务器'
  },
  mailStatus: {
    id: 'FORM.MAILSTATUS_INPUT',
    defaultMessage: '请选择查看某种状态的邮件'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  add: {
    id: 'BUTTON.ADD',
    defaultMessage: '新建'
  },
  mail0: {
    id: 'STATUS.MAIL.0',
    defaultMessage: '未发送'
  },
  mail1: {
    id: 'STATUS.MAIL.1',
    defaultMessage: '发送成功'
  },
  mail2: {
    id: 'STATUS.MAIL.2',
    defaultMessage: '发送失败'
  },
  mail3: {
    id: 'STATUS.MAIL.3',
    defaultMessage: '审核中'
  },
  mail4: {
    id: 'STATUS.MAIL.4',
    defaultMessage: '审核通过'
  },
  mail5: {
    id: 'STATUS.MAIL.5',
    defaultMessage: '审核未通过'
  }
})


class OwnMailFilter extends Component {

  static propTypes = {
    intl: PropTypes.object,
    itemPrice: PropTypes.object,
    mailMax: PropTypes.object,
    curd: PropTypes.object,
    options: PropTypes.array,
    channels: PropTypes.array,
    goods: PropTypes.array,
    form: PropTypes.object,
    onSearch: PropTypes.func
  }

  state = {
    visible: false,
    serversOptions: []
  }

  handleProChange = (e) => {
    _.map(this.props.options, (val, idx) => {
      if (val.value === e[0]) {
        this.setState({
          serversOptions: val.children
        })
      }
    })
  }

  openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: msg,
      description: '邮件状态空选为查询所有状态邮件'
    })
  }

  handleVisible = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (err && err.productId.errors[0].message === '请选择产品(必选)') {
        this.openNotificationWithIcon('warning', err.productId.errors[0].message)
      }
      if (!err) {
        if (!fieldsValue.productId) {
          fieldsValue.productId = []
        }
        if (!fieldsValue.serverId) {
          fieldsValue.serverId = []
        }
        if (!fieldsValue.times) {
          fieldsValue.times = []
        }
        if (!fieldsValue.status) {
          fieldsValue.status = []
        }

        let value = {}
        if (fieldsValue.productId.length > 0) {
          value.productId = fieldsValue.productId[0]
        }
        if (fieldsValue.serverId.length > 0) {
          value.serverId = fieldsValue.serverId[0]
        }
        if (fieldsValue.times.length > 0) {
          value.startDate = fieldsValue.times[0].format('YYYY-MM-DD')
          value.endDate = fieldsValue.times[1].format('YYYY-MM-DD')
        }
        if (fieldsValue.nickname) {
          value.nickName = fieldsValue.nickname
        }
        if (fieldsValue.status.length > 0) {
          value.mailStatus = fieldsValue.status[0]
        }

        this.props.onSearch(value)
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, curd, intl } = this.props

    // 产品，服务器下拉
    let productsOptions = []
    _.map(this.props.options, (val, idx) => {
      productsOptions.push({
        value: val.value,
        label: val.label
      })
    })

    let statusItem = [
      {value: '0', label: intl.formatMessage(message.mail0)},
      {value: '1', label: intl.formatMessage(message.mail1)},
      {value: '2', label: intl.formatMessage(message.mail2)},
      {value: '3', label: intl.formatMessage(message.mail3)},
      {value: '4', label: intl.formatMessage(message.mail4)},
      {value: '5', label: intl.formatMessage(message.mail5)}
    ]

    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }

    const TwoColProps = {
      ...ColProps,
      xl: 96
    }
    const rangeConfig = {
      rules: [{ type: 'array', required: false, message: '请选择起止日期' }],
      initialValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss').subtract({days: -1})]
      // initialValue: [moment('00:00:00', 'HH:mm:ss').subtract({days: 1}), moment('00:00:00', 'HH:mm:ss')]
    }

    return (
      <div>
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          {
            _.has(curd, '50503')
            ?
              <Row gutter={20}>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('productId', {
                    rules: [{ required: false, message: '请选择产品(可选)' }]
                  })(
                    <Cascader
                      showSearch
                      options={productsOptions}
                      placeholder={intl.formatMessage(message.product)}
                      expandTrigger='hover'
                      onChange={this.handleProChange}
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('serverId', {
                    rules: [{ required: false, message: '选择服务器(可选)' }]
                  })(
                    <Cascader
                      showSearch
                      options={this.state.serversOptions}
                      placeholder={intl.formatMessage(message.server)}
                      expandTrigger='hover'
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                  {getFieldDecorator('times', rangeConfig)(
                    <RangePicker
                      showTime
                      format='YYYY-MM-DD'
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('status', {
                    rules: [{ required: false, message: '请选择邮件状态' }]
                  })(
                    <Cascader
                      showSearch
                      options={statusItem}
                      placeholder={intl.formatMessage(message.mailStatus)}
                      expandTrigger='hover'
                    />
                  )}
                </Col>
              </Row>
            :
              ''
          }

          <Row gutter={20}>
            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {
                    _.has(curd, '50503')
                    ?
                      <Button type='primary' className='margin-right' htmlType='submit'><FormattedMessage {...message.get} /></Button>
                    :
                      ''
                  }
                </div>
                <div>
                  {
                    _.has(curd, '50501')
                    ?
                      <Button type='danger' onClick={this.handleVisible}><FormattedMessage {...message.add} /></Button>
                    :
                      ''
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={1000}
          maskClosable={false}
          title={intl.formatMessage(message.add)}
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <AddContainer
            intl={this.props.intl}
            options={this.props.options}
            goods={this.props.goods}
            channels={this.props.channels}
            handleCancel={this.handleCancel}
            mailMax={this.props.mailMax}
            goodPrice={this.props.itemPrice}
          />
        </Modal>
      </div>
    )
  }
}

const Filter = Form.create()(OwnMailFilter)

export default Filter
