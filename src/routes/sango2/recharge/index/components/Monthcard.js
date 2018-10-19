import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Button, Tooltip, Icon } from 'antd'
import { FormattedMessage, defineMessages } from 'react-intl'

const FormItem = Form.Item

const message = defineMessages({
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  playerId: {
    id: 'FORM.PLAYERID',
    defaultMessage: '玩家ID'
  },
  purchase: {
    id: 'FORM.PURCHASE',
    defaultMessage: '购买物品'
  },
  goodcount: {
    id: 'FORM.GOODCOUNT',
    defaultMessage: '物品数量'
  },
  nickname_input: {
    id: 'FORM.NICKNAME_INPUT',
    defaultMessage: '请输入玩家昵称'
  },
  playerId_input: {
    id: 'FORM.PLAYERID_INPUT',
    defaultMessage: '请输入玩家ID'
  },
  purchase_input: {
    id: 'FORM.PURCHASE_INPUT',
    defaultMessage: '请输入购买物品'
  },
  goodcount_input: {
    id: 'FORM.GOODCOUNT_INPUT',
    defaultMessage: '请输入物品数量'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  goodcount_PS: {
    id: 'GOODCOUNT_PS',
    defaultMessage: '物品数量说明：默认值为 1，取值范围 0 ~ 50，超出该范围则取默认值 1'
  }
})


class RechargeModal extends Component {
  state = {
    currentItem: {}
  }

  componentWillMount() {
    const { currentItem } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          productId: this.props.initials.products.productId,
          serverId: this.props.initials.products.serverId,
          items: {
            playerId: values.playerId,
            purchaseId: values.purchases[0],
            count: values.count
          }
        }
        this.props.onSendMonthCard(data)
        this.props.handleCardCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, intl } = this.props
    let detail = this.state.currentItem

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
        <FormItem {...formItemLayout} label={intl.formatMessage(message.nickname)}>
          {getFieldDecorator('nickname', {
            initialValue: detail.nickname ? detail.nickname : '',
            rules: [{ required: true, message: '请填写玩家昵称!' }]
          })(<Input placeholder={intl.formatMessage(message.nickname_input)} disabled />)}
        </FormItem>

        <FormItem {...formItemLayout} label={intl.formatMessage(message.playerId)}>
          {getFieldDecorator('playerId', {
            initialValue: detail.playerId ? detail.playerId : '',
            rules: [{ required: true, message: '请填写玩家 ID!' }]
          })(
            <InputNumber
              placeholder={intl.formatMessage(message.playerId_input)}
              disabled
              style={{ width: '100%' }}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={intl.formatMessage(message.purchase)}>
          {getFieldDecorator('purchases', {
            rules: [{ type: 'array', required: true, message: '请选择购买物品' }],
            initialValue: ['2001002']
          })(
            <Cascader
              options={options.purchases.list}
              disabled
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={
            <span>
              <Tooltip title={intl.formatMessage(message.goodcount_PS)}>
                <FormattedMessage {...message.goodcount} />&nbsp;<Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('count', {
            initialValue: 1,
            rules: [{ required: true, message: '请填写物品数量!' }]
          })(
            <InputNumber
              disabled
              min={0}
              formatter={value => (value >= 0 && value <= 50 ? value : 1)}
              placeholder={intl.formatMessage(message.goodcount_input)}
              style={{ width: '100%' }}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            <FormattedMessage {...message.submit} />
          </Button>
        </FormItem>
      </Form>
    )
  }
}

RechargeModal.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onModalLoad: PropTypes.func,
  onSendMonthCard: PropTypes.func,
  handleCardCancel: PropTypes.func
}

const Modal = Form.create()(RechargeModal)

export default Modal
