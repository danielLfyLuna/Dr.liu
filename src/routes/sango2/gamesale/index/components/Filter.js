import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Cascader, DatePicker, Button } from 'antd'
const { RangePicker } = DatePicker

class PlayersFilter extends Component {
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

  handleBack = () => {
    this.context.router.push('/sango2/gamesale/managers')
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
    const { form: { getFieldDecorator }, options, initials, location } = this.props
    const check = initials.products.productId ? false : this.state.select

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              options.authorize.includes(160101) &&
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
            }
            {
              options.authorize.includes(160101) &&
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
            }
            {
              options.authorize.includes(160101) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'>查询</Button>
              </Col>
            }
            {
              options.authorize.includes(160405) &&
              location.query.handle && location.query.handle === 'join' &&
              <Col className='gutter-row' span={2}>
                <Button onClick={this.handleBack}>返回</Button>
              </Col>
            }
          </Row>
        </Form>
      </div>
    )
  }
}

PlayersFilter.propTypes = {
  form: PropTypes.object,
  location: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func
}

PlayersFilter.contextTypes = {
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
})(PlayersFilter)

export default Filter
