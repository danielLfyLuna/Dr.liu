import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Cascader, Button, Input } from 'antd'

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
    const { form: { getFieldDecorator }, options, initials, curd } = this.props
    const check = initials.products.productId ? false : this.state.select

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          {
            _.has(curd, '80101')
            ?
              <Row gutter={20} style={{ marginBottom: 6 }}>
                <Col className='gutter-row' span={6}>
                  {getFieldDecorator('products', {
                    initialValue: initials.products.productId ? [initials.products.productId, initials.products.serverId] : [],
                    rules: [{ type: 'array', required: true, message: '请选择产品/服务器!' }]
                  })(
                    <Cascader
                      options={options.products.list}
                      showSearch
                      onChange={this.handleProductSelect}
                      placeholder='请选择产品/服务器'
                      expandTrigger='hover'
                    />
                  )}
                </Col>
                <Col className='gutter-row' span={4}>
                  {getFieldDecorator('nickname', {
                    rules: [{ required: false, message: '请填写玩家昵称!' }]
                  })(
                    <Input placeholder='请填写玩家昵称' disabled={check} />
                  )}
                </Col>
                <Col className='gutter-row' span={4}>
                  {getFieldDecorator('playerId', {
                    rules: [{ required: false, message: '请填写玩家 ID!' }]
                  })(
                    <Input placeholder='请填写玩家 ID' disabled={check} />
                  )}
                </Col>
                <Col className='gutter-row' span={2}>
                  <Button type='primary' htmlType='submit'>查询</Button>
                </Col>
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
