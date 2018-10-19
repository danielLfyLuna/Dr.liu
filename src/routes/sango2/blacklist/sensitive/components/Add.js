import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'

import { Form, Input, Cascader, Button } from 'antd'

const FormItem = Form.Item

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS/SERVERS',
    defaultMessage: '产品与服务器'
  },
  product_input: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品与服务器(必选)'
  },
  content: {
    id: 'TABLE.CONTENT',
    defaultMessage: '内容'
  },
  content_input: {
    id: 'TABLE.CONTENT_INPUT',
    defaultMessage: '请填写内容'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reload: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  }
})


class AddForm extends Component {

  static propTypes = {
    intl: PropTypes.object,
    options: PropTypes.array,
    form: PropTypes.object,
    handleCancel: PropTypes.func,
    onAdd: PropTypes.func
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        let value = {
          productId: fieldValues.products[0],
          serverId: fieldValues.products[1],
          obj: fieldValues.sensitiveObj
        }
        this.props.onAdd(value)
        this.props.handleCancel()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
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
          label={intl.formatMessage(message.product)}
        >
          {getFieldDecorator('products', {
            rules: [{ required: true, message: intl.formatMessage(message.product_input) }]
          })(
            <Cascader
              showSearch
              options={this.props.options}
              placeholder={intl.formatMessage(message.product_input)}
              expandTrigger='hover'
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.content)}
        >
          {getFieldDecorator('sensitiveObj', {
            rules: [{ required: true, message: intl.formatMessage(message.content_input) }]
          })(
            <Input type='textarea' placeholder={intl.formatMessage(message.content_input)} autosize={{ minRows: 3, maxRows: 10 }} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
          <Button type='default' onClick={this.handleReset} style={{marginLeft: '10px'}}>{intl.formatMessage(message.reload)}</Button>
        </FormItem>

      </Form>
    )
  }
}

const Add = Form.create()(AddForm)

export default Add
