import React, { Component } from 'react'
import { defineMessages } from 'react-intl'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Button } from 'antd'

const FormItem = Form.Item
const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  giftid: {
    id: 'FORM.GIFT_ID',
    defaultMessage: '礼包ID'
  },
  giftid_input: {
    id: 'FORM.GIFTID_INPUT',
    defaultMessage: '请填写礼包ID'
  },
  gift_name: {
    id: 'FORM.GIFT_NAME',
    defaultMessage: '礼包名称'
  },
  gift_name_input: {
    id: 'FORM.GIFT_NAME_INPUT',
    defaultMessage: '请填写礼包名称'
  },
  creator: {
    id: 'FORM.CREATOR',
    defaultMessage: '创建人'
  },
  creator_input: {
    id: 'FORM.CREATOR_INPUT',
    defaultMessage: '请填写创建人'
  },
  channel: {
    id: 'FORM.CHANNEL',
    defaultMessage: '渠道'
  },
  channel_input: {
    id: 'FORM.CHANNEL_INPUT',
    defaultMessage: '请选择渠道'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})


class GenerateModal extends Component {
  state = {
    currentItem: {},
    modalType: ''
  }

  componentWillMount() {
    this.props.onRender({ renderState: false })
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem,
      modalType: modalType
    })
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        data.productId = values.products[0]
        data.activityId = values.activityId
        data.creator = values.creator
        data.channel = values.channels[0]
        data.number = values.number

        let posts = {
          form: data,
          path: {
            productId: data.productId,
            activityId: data.activityId
          }
        }

        this.props.onGenerate(posts)
        this.props.onSubmitting()
      }
    })
  }

  _numFormat = (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  _numParse = (value) => value.toString().replace(/\$\s?|(,*)/g, '')

  render() {
    const { options, form: { getFieldDecorator }, intl } = this.props

    let detail = this.state.currentItem
    const check = this.state.modalType === 'generate'

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
          label={intl.formatMessage(message.product)}
        >
          {getFieldDecorator('products', {
            initialValue: detail.productId ? [`${detail.productId}`] : [],
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.product_input) }]
          })(
            <Cascader
              options={this.props.options.productIds}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.product_input)}
              disabled={check}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.giftid)}
        >
          {getFieldDecorator('activityId', {
            initialValue: detail.activityId ? detail.activityId : '',
            rules: [{ required: true, message: intl.formatMessage(message.giftid_input), whitespace: true }]
          })(
            <Input placeholder={intl.formatMessage(message.giftid_input)} disabled={check} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.gift_name)}
        >
          {getFieldDecorator('title', {
            initialValue: detail.title ? detail.title : '',
            rules: [{ required: true, message: intl.formatMessage(message.gift_name_input), whitespace: true }]
          })(
            <Input placeholder={intl.formatMessage(message.gift_name_input)} disabled={check} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.creator)}
        >
          {getFieldDecorator('creator', {
            initialValue: detail.creator ? detail.creator : options.login.admin.userName,
            rules: [{ required: true, message: intl.formatMessage(message.creator_input), whitespace: true }]
          })(
            <Input placeholder={intl.formatMessage(message.creator_input)} disabled={check} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.channel)}
        >
          {getFieldDecorator('channels', {
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.channel_input) }]
          })(
            <Cascader
              options={this.props.options.channels.list}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.channel_input)}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.count)}
        >
          {getFieldDecorator('number', {
            rules: [{ required: true, message: intl.formatMessage(message.count) }]
          })(
            <InputNumber
              min={0}
              formatter={this._numFormat}
              parser={this._numParse}
              placeholder={intl.formatMessage(message.count)}
              style={{ width: '100%' }}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

GenerateModal.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  onModalLoad: PropTypes.func,
  onRender: PropTypes.func,
  onSubmitting: PropTypes.func,
  onGenerate: PropTypes.func
}

const Generate = Form.create()(GenerateModal)

export default Generate
