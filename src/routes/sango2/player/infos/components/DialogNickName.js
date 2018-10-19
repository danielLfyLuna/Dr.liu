import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'

import { Form, Input, Button } from 'antd'
const FormItem = Form.Item
const message = defineMessages({
  pro: {
    id: 'FORM.PRODUCTS/SERVERS',
    defaultMessage: '产品与服务器'
  },
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})

class NickNameForm extends Component {

  static propTypes = {
    intl: PropTypes.object,
    record: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }

  state = {
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {onSubmit, onCancel} = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit(values)
        onCancel()
      }
    })
  }

  render() {
    const {form: {getFieldDecorator}, products, record, intl} = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.pro)}
        >
          {getFieldDecorator('products', {
            initialValue: `${products.value[0]}/${products.value[1]}`
          })(
            <Input disabled />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.nickname)}
        >
          {getFieldDecorator('nickname', {
            initialValue: `${record.nickname}`,
            rules: [
              { required: true, message: '必填用户昵称!' }
            ]
          })(
            <Input placeholder={intl.formatMessage(message.nickname)} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const DialogNickName = Form.create()(NickNameForm)

export default DialogNickName
