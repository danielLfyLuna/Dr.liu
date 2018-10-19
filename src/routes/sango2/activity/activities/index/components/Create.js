import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Cascader, Button } from 'antd'
import { defineMessages } from 'react-intl'

const FormItem = Form.Item
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
  add: {
    id: 'BUTTON.ACTIVITY_ADD',
    defaultMessage: '添加活动'
  },
  activity_type: {
    id: 'FORM.ACTIVITY_TYPE',
    defaultMessage: '活动类型'
  },
  activity_type_input: {
    id: 'FORM.ACTIVITY_TYPE_INPUT',
    defaultMessage: '请选择活动类型'
  }
})


class CreateModal extends Component {

  componentWillMount() {
    this.props.onRender({ renderState: false })
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        this.context.router.push({
          pathname: `/sango2/activity/activities/${values.functionIds[0]}`,
          query: {
            handle: 'create',
            productId: values.productIds[0],
            serverId: values.productIds[1],
            functionId: values.functionIds[0]
          }
        })
        this.props.onSubmitting()
      }
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form
    const { options, initials, intl } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 8 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.products)}
        >
          {getFieldDecorator('productIds', {
            initialValue: [],
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.products_input) }]
          })(
            <Cascader options={options.products.list} showSearch expandTrigger='hover' placeholder={intl.formatMessage(message.products_input)} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity_type)}
        >
          {getFieldDecorator('functionIds', {
            initialValue: [],
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.activity_type_input) }]
          })(
            <Cascader options={initials.enum.functionIds} showSearch expandTrigger='hover' placeholder={intl.formatMessage(message.activity_type)} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.add)}</Button>
        </FormItem>
      </Form>
    )
  }
}

CreateModal.propTypes = {
  intl: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  form: PropTypes.object,
  onRender: PropTypes.func,
  onSubmitting: PropTypes.func
}

CreateModal.contextTypes = {
  router: PropTypes.object
}

const Create = Form.create()(CreateModal)

export default Create
