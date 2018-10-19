import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

import { FormattedMessage, defineMessages } from 'react-intl'

const message = defineMessages({
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  orderId_input: {
    id: 'FORM.ORDERID_INPUT',
    defaultMessage: '请输入订单ID'
  },
  orderId: {
    id: 'FORM.ORDERID',
    defaultMessage: '订单ID'
  }
})

class RepairModal extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { initials } = this.props
      if (!err) {
        let data = {}
        data.orderId = values.orderId
        let posts = {
          form: data,
          path: initials.products
        }

        this.props.onRepair(posts)
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props

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
          label={intl.formatMessage(message.orderId)}
        >
          {getFieldDecorator('orderId', {
            rules: [{ required: true, message: '请填写订单 ID!' }]
          })(
            <Input placeholder={intl.formatMessage(message.orderId_input)} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'><FormattedMessage {...message.submit} /></Button>
        </FormItem>
      </Form>
    )
  }
}

RepairModal.propTypes = {
  form: PropTypes.object,
  intl: PropTypes.object,
  initials: PropTypes.object,
  onSubmitting: PropTypes.func,
  onRepair: PropTypes.func
}

const Modal = Form.create()(RepairModal)

export default Modal
