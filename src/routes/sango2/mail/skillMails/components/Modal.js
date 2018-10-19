import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import { Form, Input, Cascader, Button } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item
const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS/SERVERS',
    defaultMessage: '产品与服务器'
  },
  products_input: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  skill: {
    id: 'APP.MAIL.SKILLMAIL',
    defaultMessage: '技能列表'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})


class Modal extends Component {
  static propTypes = {
    intl: PropTypes.object,
    handleCancel: PropTypes.func,
    onSend: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    item: PropTypes.object.isRequired
  }

  _itemReduce = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: _.toNumber(key), label: `${option}(${key})` })
      return result
    }, [])
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSend(values)
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props

    const itemsLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      }
    }

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

    let skillPt = this._itemReduce(this.props.item.data)

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...itemsLayout}
          label={intl.formatMessage(message.products)}
        >
          {getFieldDecorator('products', {
            rules: [{ required: true, message: '必填!' }]
          })(
            <Cascader
              showSearch
              placeholder={intl.formatMessage(message.products_input)}
              options={this.props.options}
              expandTrigger='hover'
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.nickname)}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '必填!', whitespace: true }]
          })(
            <Input placeholder={intl.formatMessage(message.nickname)} />
          )}
        </FormItem>

        <FormItem
          {...itemsLayout}
          label={intl.formatMessage(message.skill)}
        >
          {getFieldDecorator('skillId', {
            rules: [{
              required: true,
              message: 'required!'
            }]
          })(
            <Cascader
              placeholder={intl.formatMessage(message.skill)}
              showSearch
              options={skillPt}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const SkillModal = Form.create()(Modal)

export default SkillModal
