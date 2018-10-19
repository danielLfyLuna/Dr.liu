import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Cascader, Button, Input } from 'antd'
import { FormattedMessage, defineMessages } from 'react-intl'

const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS/SERVERS_INPUT',
    defaultMessage: '请选择产品/服务器'
  },
  nickname: {
    id: 'FORM.NICKNAME_INPUT',
    defaultMessage: '请输入玩家昵称'
  },
  playerId: {
    id: 'FORM.PLAYERID_INPUT',
    defaultMessage: '请输入玩家ID'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  }
})

class RechargeFilter extends Component {
  state = {
    select: true
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

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch({
          path: {
            productId: values.products[0],
            serverId: values.products[1]
          },
          params: {
            nickname: values.nickname ? values.nickname : '',
            playerId: values.playerId ? values.playerId : ''
          },
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
        {
          options.authorize.includes(40201) &&
          <Form layout='inline' onSubmit={this.handleSearch}>
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
                  <Input placeholder={intl.formatMessage(message.playerId)} disabled={check} />
                )}
              </Col>
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'><FormattedMessage {...message.get} /></Button>
              </Col>
            </Row>
          </Form>
        }
      </div>
    )
  }
}

RechargeFilter.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: props.products,
      nickname: props.nickname,
      playerId: props.playerId
    }
  },
  onValuesChange(_, values) {
  }
})(RechargeFilter)

export default Filter
