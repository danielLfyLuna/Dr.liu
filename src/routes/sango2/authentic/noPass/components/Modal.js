import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Cascader } from 'antd'
import { defineMessages } from 'react-intl'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const FormItem = Form.Item
const message = defineMessages({
  ip: {
    id: 'FORM.IP',
    defaultMessage: 'IP 地址'
  },
  ip_input: {
    id: 'FORM.IP_INPUT',
    defaultMessage: '请输入正确的 IP 地址'
  },
  products_input: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  products: {
    id: 'FORM.PRODUCTS/SERVERS',
    defaultMessage: '产品与服务器'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})


class AuthenticModal extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        this.props.onCreate({
          productId: value.products[0],
          serverId: value.products[1],
          ip: value.ip
        })
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props

    const ipRegEx = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.products)}
        >
          {getFieldDecorator('products', {
            rules: [{ required: true, message: '请选择产品与服务器' }]
          })(
            <Cascader
              style={{ width: '100%' }}
              options={this.props.options}
              placeholder={intl.formatMessage(message.products_input)}
              showSearch
              expandTrigger='hover'
              popupClassName='cascaderMenu'
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.ip)}
        >
          {getFieldDecorator('ip', {
            validateTrigger: ['onBlur'],
            rules: [
              { required: true, message: intl.formatMessage(message.ip_input), pattern: ipRegEx }
            ]
          })(
            <Input placeholder={intl.formatMessage(message.ip)} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

AuthenticModal.propTypes = {
  intl: PropTypes.object,
  options: PropTypes.array,
  form: PropTypes.object,
  onCreate: PropTypes.func,
  handleCancel: PropTypes.func
}

const Modal = Form.create()(AuthenticModal)

export default Modal
