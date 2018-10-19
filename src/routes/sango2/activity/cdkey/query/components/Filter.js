import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input, Row, Col } from 'antd'
import { defineMessages } from 'react-intl'

const message = defineMessages({
  search: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  cdkey: {
    id: 'FORM.CDKEY_INPUT',
    defaultMessage: '请输入CDKey兑换码'
  }
})


class CDKeyFilter extends Component {
  state = {
    select: true
  }

  handleProductSelect = (products) => {
    if (products.length) {
      this.props.onSearch({
        products: {
          productId: products[0]
        }
      })
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
            cdkey: values.cdkey
          }
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, intl } = this.props
    return (
      <div style={{ marginBottom: 12 }}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={10}>
            {
              options.authorize.includes(30201) &&
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('cdkey', {
                  rules: [{ type: 'string', required: true, message: intl.formatMessage(message.cdkey) }]
                })(
                  <Input
                    placeholder={intl.formatMessage(message.cdkey)}
                     />
                )}
              </Col>
            }
            {
              options.authorize.includes(30201) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit' style={{ marginLeft: 16 }}>{intl.formatMessage(message.search)}</Button>
              </Col>
            }
          </Row>
        </Form>
      </div>
    )
  }
}

CDKeyFilter.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  onSearch: PropTypes.func
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: {
        ...props.products
      },
      cdkey: props.cdkey
    }
  },
  onValuesChange(_, values) {
  }
})(CDKeyFilter)

export default Filter
