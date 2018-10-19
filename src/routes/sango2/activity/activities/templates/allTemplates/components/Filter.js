import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Row, Col, Cascader, Button } from 'antd'


class TemplateFilter extends Component {

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.products.length) {
          this.props.onSearch({
            productId: values.products[0],
            serverId: values.products[1],
            handle: 'SEARCH'
          })
        }
      }
    })
  }

  handleBack = () => {
    this.context.router.push('/sango2/activity/activities/templates')
  }

  render() {
    const { form: { getFieldDecorator }, options } = this.props

    return (
      <div>
        <Form onSubmit={this.handleSearch}>

          <Row gutter={2} style={{ marginBottom: 6 }}>
            {
              options.authorize.includes(90109) &&
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('products', {
                  rules: [
                    { type: 'array', required: true, message: '请选择产品服务器(必选)' }
                  ]
                })(
                  <Cascader
                    options={options.products.options}
                    showSearch
                    expandTrigger='hover'
                    placeholder='请选择产品服务器(必选)'
                  />
                )}
              </Col>
            }
            {
              options.authorize.includes(90109) &&
              <Col className='gutter-row' span={4}>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ marginLeft: 16 }}
                >
                  查询活动
                </Button>
              </Col>
            }
            {
              options.authorize.includes(90109) &&
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

TemplateFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onSearch: PropTypes.func
}

TemplateFilter.contextTypes = {
  router: PropTypes.object
}

const Filter = Form.create()(TemplateFilter)

export default Filter
