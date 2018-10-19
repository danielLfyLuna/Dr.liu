import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import _ from 'lodash'
import { Form, Row, Col, Cascader, Button, Input } from 'antd'
import { Link } from 'react-router'

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品与服务器(必选)'
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
  },
  ban: {
    id: 'BUTTON.BAN_BATCH',
    defaultMessage: '批量封禁'
  }
})


class BlackFilter extends Component {
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
    const { form: { getFieldDecorator }, options, initials, curd, intl } = this.props
    const check = initials.products.productId ? false : this.state.select
    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          {
            _.has(curd, '80201')
            ?
              <Row gutter={20} style={{ marginBottom: 6 }}>
                <Col className='gutter-row' span={6}>
                  {getFieldDecorator('products', {
                    initialValue: initials.products.productId ? [initials.products.productId, initials.products.serverId] : [],
                    rules: [{ type: 'array', required: true, message: intl.formatMessage(message.product) }]
                  })(
                    <Cascader
                      options={options.products.list}
                      showSearch
                      onChange={this.handleProductSelect}
                      placeholder={intl.formatMessage(message.product)}
                      expandTrigger='hover'
                    />
                  )}
                </Col>
                <Col className='gutter-row' span={4}>
                  {getFieldDecorator('nickname', {
                    rules: [{ required: false, message: intl.formatMessage(message.nickname) }]
                  })(
                    <Input placeholder={intl.formatMessage(message.nickname)} disabled={check} />
                  )}
                </Col>
                <Col className='gutter-row' span={4}>
                  {getFieldDecorator('playerId', {
                    rules: [{ required: false, message: intl.formatMessage(message.playerId) }]
                  })(
                    <Input placeholder={intl.formatMessage(message.playerId)} disabled={check} />
                  )}
                </Col>
                <Col className='gutter-row' span={2}>
                  <Button type='primary' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                </Col>
                {
                  _.has(curd, '80203') ?
                    <Col className='gutter-row' span={2}>
                      <Link className='margin-right' to={{ pathname: '/sango2/blacklist/batch' }} >
                        <Button type='primary'>{intl.formatMessage(message.ban)}</Button>
                      </Link>
                    </Col>
                  :
                    ''
                }
              </Row>
            :
              ''
          }
        </Form>
      </div>
    )
  }
}

BlackFilter.propTypes = {
  intl: PropTypes.object,
  curd: PropTypes.object.isRequired,
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
})(BlackFilter)

export default Filter
