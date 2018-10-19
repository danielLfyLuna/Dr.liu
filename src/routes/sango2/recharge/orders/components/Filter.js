import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Cascader, Button, DatePicker, Input, InputNumber, Modal, Tooltip } from 'antd'
const { RangePicker } = DatePicker

import { FormattedMessage, defineMessages } from 'react-intl'


import RepairModal from './Modal'

const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS/SERVERS_INPUT',
    defaultMessage: '请选择产品/服务器'
  },
  startTime: {
    id: 'FORM.STARTTIME_INPUT',
    defaultMessage: '请选择开始时间'
  },
  endTime: {
    id: 'FORM.ENDTIME_INPUT',
    defaultMessage: '请选择结束时间'
  },
  nickname: {
    id: 'FORM.NICKNAME_INPUT',
    defaultMessage: '请输入玩家昵称'
  },
  playerId: {
    id: 'FORM.PLAYERID_INPUT',
    defaultMessage: '请输入玩家ID'
  },
  orderId: {
    id: 'FORM.ORDERID_INPUT',
    defaultMessage: '请输入订单ID'
  },
  platformId: {
    id: 'FORM.PLATFORMID_INPUT',
    defaultMessage: '请输入平台ID'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  recharges: {
    id: 'BUTTON.RECHARGES',
    defaultMessage: '充值补单'
  },
  export_data: {
    id: 'BUTTON.EXPORT_DATA',
    defaultMessage: '数据导出'
  }
})

class OrderFilter extends Component {
  state = {
    select: true,
    visible: false
  }

  handleProductSelect = (products) => {
    if (products.length) {
      this.setState({
        select: false
      })
    } else {
      this.setState({
        select: true
      })
    }
  }

  handleRepair = () => {
    this.setState({
      visible: true
    })
  }

  handleExport = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = this._formMap(values)
        this.props.onExport({ ...data })
      }
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  onModalLoad = () => {
    return this.state
  }

  _formMap = (values) => {
    return {
      path: {
        productId: values.products[0],
        serverId: values.products[1]
      },
      params: {
        startTime: values.times ? values.times[0].format('YYYY-MM-DD HH:mm:ss') : '',
        endTime: values.times ? values.times[1].format('YYYY-MM-DD HH:mm:ss') : '',
        nickname: values.nickname ? values.nickname : '',
        playerId: values.playerId ? values.playerId : '',
        orderId: values.orderId ? values.orderId : '',
        platformId: values.platformId ? values.platformId : ''
      }
    }
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = this._formMap(values)
        this.props.onSearch({
          ...data,
          handle: 'SEARCH'
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, initials, intl } = this.props
    const check = initials.products.productId ? false : this.state.select

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          {
            options.authorize.includes(40102) &&
            <Row gutter={16} style={{ marginBottom: 6 }}>
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('products', {
                  initialValue: initials.products.productId ? [initials.products.productId, initials.products.serverId] : [],
                  rules: [{ type: 'array', required: true, message: '请选择产品/服务器!' }]
                })(
                  <Cascader
                    options={options.products.list}
                    showSearch
                    onChange={this.handleProductSelect}
                    placeholder={intl.formatMessage(message.products)}
                    expandTrigger='hover'
                  />
                )}
              </Col>
              <Col className='gutter-row' span={7}>
                {getFieldDecorator('times', {
                  rules: [{ required: false, message: '请选择开始时间和结束时间' }]
                })(
                  <RangePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder={[intl.formatMessage(message.startTime), intl.formatMessage(message.endTime)]}
                    disabled={check}
                    style={{ width: '100%' }}
                  />
                )}
              </Col>
            </Row>
          }
          {
            options.authorize.includes(40102) &&
            <Row gutter={16} style={{ marginBottom: 6 }}>
              <Col className='gutter-row' span={4}>
                {getFieldDecorator('nickname', {
                  rules: [{ required: false, message: '请填写玩家昵称!' }]
                })(
                  <Input placeholder={intl.formatMessage(message.nickname)} disabled={check} />
                )}
              </Col>
              <Col className='gutter-row' span={4}>
                {getFieldDecorator('playerId', {
                  rules: [{ required: false, message: '请填写玩家 ID!' }]
                })(
                  <InputNumber
                    min={0}
                    placeholder={intl.formatMessage(message.playerId)}
                    disabled={check}
                    style={{ width: '100%' }}
                  />
                )}
              </Col>
              <Col className='gutter-row' span={4}>
                {getFieldDecorator('orderId', {
                  rules: [{ required: false, message: '请填写订单 ID!', pattern: /^\d+$/g }]
                })(
                  <Input
                    placeholder={intl.formatMessage(message.orderId)}
                    disabled={check}
                    style={{ width: '100%' }}
                  />
                )}
              </Col>
              <Col className='gutter-row' span={4}>
                {getFieldDecorator('platformId', {
                  rules: [{ required: false, message: '请填写平台 ID!', pattern: /^\d+$/g }]
                })(
                  <Input
                    placeholder={intl.formatMessage(message.platformId)}
                    disabled={check}
                    style={{ width: '100%' }}
                  />
                )}
              </Col>
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'><FormattedMessage {...message.get} /></Button>
              </Col>
              {
                options.authorize.includes(40101) &&
                <Col className='gutter-row' span={2}>
                  <Button type='ghost' onClick={this.handleRepair}><FormattedMessage {...message.recharges} /></Button>
                </Col>
              }
              {
                options.authorize.includes(40103) &&
                <Col className='gutter-row' span={2}>
                  <Tooltip title='请先选择产品和服务器！！！'>
                    <Button type='ghost' onClick={this.handleExport} disabled={check}><FormattedMessage {...message.export_data} /></Button>
                  </Tooltip>
                </Col>
              }
            </Row>
          }
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title={intl.formatMessage(message.recharges)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <RepairModal
            intl={this.props.intl}
            options={this.props.options}
            initials={this.props.initials}
            onRepair={this.props.onRepair}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

OrderFilter.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func,
  onExport: PropTypes.func,
  onRepair: PropTypes.func
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: props.products,
      times: props.times,
      nickname: props.nickname,
      playerId: props.playerId,
      orderId: props.orderId,
      platformId: props.platformId
    }
  },
  onValuesChange(_, values) {
  }
})(OrderFilter)

export default Filter
