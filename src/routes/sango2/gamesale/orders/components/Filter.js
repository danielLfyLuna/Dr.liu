import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Cascader, DatePicker, Button } from 'antd'
const { RangePicker } = DatePicker

class OrdersFilter extends Component {
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
            startTime: values.times ? values.times[0].format('YYYY-MM-DD HH:mm:ss') : '',
            endTime: values.times ? values.times[1].format('YYYY-MM-DD HH:mm:ss') : ''
          },
          handle: 'SEARCH'
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, initials } = this.props
    const check = initials.products.productId ? false : this.state.select

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          {
            options.authorize.includes(160203) &&
            <Row gutter={20} style={{ marginBottom: 12 }}>
              <Col className='gutter-row' span={5}>
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
              <Col className='gutter-row' span={7}>
                {getFieldDecorator('times', {
                  rules: [{ required: false, message: '请选择开始时间和结束时间' }]
                })(
                  <RangePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder={['请选择开始时间', '请选择结束时间']}
                    disabled={check}
                    style={{ width: '100%' }}
                  />
                )}
              </Col>
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'>查询</Button>
              </Col>
            </Row>
          }
        </Form>
      </div>
    )
  }
}

OrdersFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func
}

OrdersFilter.contextTypes = {
  router: PropTypes.object
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: props.products,
      times: props.times
    }
  },
  onValuesChange(_, values) {
  }
})(OrdersFilter)

export default Filter
