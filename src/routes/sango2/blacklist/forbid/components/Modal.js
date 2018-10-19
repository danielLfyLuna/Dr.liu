import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Button } from 'antd'
import { defineMessages } from 'react-intl'
const FormItem = Form.Item
// const { TextArea } = Input

const message = defineMessages({
  playerId: {
    id: 'TABLE.PLAYERID',
    defaultMessage: '玩家ID'
  },
  playerId_input: {
    id: 'FORM.PLAYERID_INPUT',
    defaultMessage: '请输入玩家ID'
  },
  reason: {
    id: 'FORM.BAN_REASON',
    defaultMessage: '禁言原因'
  },
  reason_input: {
    id: 'FORM.BAN_REASON_INPUT',
    defaultMessage: '请输入禁言原因'
  },
  time: {
    id: 'FORM.BAN_TIME',
    defaultMessage: '禁言时长'
  },
  time_input: {
    id: 'FORM.BAN_TIME_INPUT',
    defaultMessage: '请输入禁言时长'
  },
  unit: {
    id: 'FORM.TIMEUNIT',
    defaultMessage: '时间单位'
  },
  unit_input: {
    id: 'FORM.TIMEUNIT_INPUT',
    defaultMessage: '请选择时间单位'
  },
  type: {
    id: 'FORM.BANTYPE',
    defaultMessage: '禁言类型'
  },
  type_input: {
    id: 'FORM.BANTYPE_INPUT',
    defaultMessage: '请选择禁言类型'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})


class ForbidModal extends Component {
  state = {
    currentItem: {}
  }

  componentWillMount() {
    const { currentItem } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { options, initials } = this.props
      if (!err) {
        let data = {}
        data.playerId = values.playerId
        data.reason = values.reason
        data.intervalUnit = values.intervalUnits[0]
        if (data.intervalUnit !== initials.conf.timeUnits.lasting) {
          data.interval = values.interval
        }
        data.forbidType = values.forbidTypes[0]
        data.manager = options.login.admin.userName

        let posts = {
          form: data,
          path: initials.products
        }

        this.props.onForbid(posts)
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, initials, intl } = this.props

    let detail = this.state.currentItem

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
          label={intl.formatMessage(message.playerId)}
        >
          {getFieldDecorator('playerId', {
            initialValue: detail.playerId ? detail.playerId : '',
            rules: [{ required: true, message: intl.formatMessage(message.playerId_input) }]
          })(
            <InputNumber placeholder={intl.formatMessage(message.playerId_input)} disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.reason)}
        >
          {getFieldDecorator('reason', {
            rules: [{ required: true, message: intl.formatMessage(message.reason_input), whitespace: true }]
          })(
            <Input type='textarea' placeholder={intl.formatMessage(message.reason_input)} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.time)}
        >
          {getFieldDecorator('interval', {
            rules: [{ required: false, message: intl.formatMessage(message.time_input) }]
          })(
            <InputNumber min={0} placeholder={intl.formatMessage(message.time_input)} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.unit)}
        >
          {getFieldDecorator('intervalUnits', {
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.unit_input) }]
          })(
            <Cascader
              options={initials.enum.timeUnits}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.unit_input)}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.type)}
        >
          {getFieldDecorator('forbidTypes', {
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.type_input) }]
          })(
            <Cascader
              options={initials.enum.forbidTypes}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.type_input)}
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

ForbidModal.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func,
  onForbid: PropTypes.func
}

const Modal = Form.create()(ForbidModal)

export default Modal
