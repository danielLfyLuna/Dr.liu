import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item
import moment from 'moment'
import { defineMessages } from 'react-intl'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const message = defineMessages({
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  ip: {
    id: 'FORM.IP',
    defaultMessage: 'IP 地址'
  },
  ip_input: {
    id: 'FORM.IP_INPUT',
    defaultMessage: '请输入正确的 IP 地址'
  }
})


class AuthenticModal extends Component {

  componentWillMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let posts = {
          form: {
            ip: values.ip
          }
        }

        this.props.onCreate(posts)
        this.props.onSubmitting()
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
        sm: { span: 12 }
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
  form: PropTypes.object,
  onCreate: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(AuthenticModal)

export default Modal
