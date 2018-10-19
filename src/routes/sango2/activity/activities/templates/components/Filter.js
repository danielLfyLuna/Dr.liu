import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'

import { Form, Row, Col, Cascader, Button } from 'antd'

const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS/SERVERS',
    defaultMessage: '产品与服务器'
  },
  products_input: {
    id: 'FORM.PRODUCTS/SERVERS_INPUT',
    defaultMessage: '请选择产品/服务器'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  back: {
    id: 'BUTTON.BACK',
    defaultMessage: '返回'
  }
})


class TemplateFilter extends Component {

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.productId = values.products
          ? values.products[0]
          : this.props.initials.products.productId
        values.serverId = values.products
          ? values.products[1]
          : this.props.initials.products.serverId
        this.props.onSearch({
          productId: values.productId,
          serverId: values.serverId,
          handle: 'SEARCH'
        })
      }
    })
  }

  handleBack = () => {
    this.context.router.push('/sango2/activity/activities/index')
  }

  handleGo = () => {
    this.context.router.push('/sango2/activity/activities/templates/allTemplates')
  }

  render() {
    const { form: { getFieldDecorator }, options, initials, intl } = this.props

    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={2} style={{ marginBottom: 6 }}>
            {
              options.authorize.includes(90109) &&
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('products', {
                  initialValue: initials.products.productId
                    ? [initials.products.productId, initials.products.serverId]
                    : [],
                  rules: [
                    { type: 'array', required: true, message: intl.formatMessage(message.products_input) }
                  ]
                })(
                  <Cascader
                    options={options.products.options}
                    showSearch
                    expandTrigger='hover'
                    placeholder={intl.formatMessage(message.products)}
                  />
                )}
              </Col>
            }
            {
              options.authorize.includes(90109) &&
              <Col className='gutter-row' span={2}>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ marginLeft: 16 }}
                >
                  {intl.formatMessage(message.get)}
                </Button>
              </Col>
            }
            {
              options.authorize.includes(90109) &&
              <Col className='gutter-row' span={2}>
                <Button onClick={this.handleBack}>{intl.formatMessage(message.back)}</Button>
              </Col>
            }
            <Col className='gutter-row' span={2}>
              <Button onClick={this.handleGo}>批量配置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

TemplateFilter.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func
}

TemplateFilter.contextTypes = {
  router: PropTypes.object
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: {
        ...props.products
      }
    }
  },
  onValuesChange(_, values) {}
})(TemplateFilter)

export default Filter
