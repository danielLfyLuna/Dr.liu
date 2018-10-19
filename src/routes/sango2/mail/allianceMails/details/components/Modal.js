import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item
const message = defineMessages({
  pro: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  ser: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  info: {
    id: 'TABLE.PLAYERINFO',
    defaultMessage: '玩家信息'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})

class Modals extends Component {

  static propTypes = {
    intl: PropTypes.object,
    data: PropTypes.object,
    form: PropTypes.object,
    handleCancel: PropTypes.func,
    updateAllianceEmailPlayer: PropTypes.func
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        let values = {}
        values.playerName = fieldValues.playerName
        values.index = this.props.data.index
        values.productId = this.props.data.productId
        values.serverId = this.props.data.serverId
        values.id = this.props.data.mailId

        this.props.updateAllianceEmailPlayer(values)
        this.props.handleCancel()
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
          {getFieldDecorator('productId', {
            initialValue: this.props.data.productId
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.ser)}
        >
          {getFieldDecorator('serverId', {
            initialValue: this.props.data.serverId
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.info)}
        >
          {getFieldDecorator('playerName', {
            rules: [{ required: true, message: '请填写玩家昵称' }],
            initialValue: this.props.data.playerName
          })(
            <Input placeholder={intl.formatMessage(message.info)} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} >
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const PlayersModal = Form.create()(Modals)

export default PlayersModal
