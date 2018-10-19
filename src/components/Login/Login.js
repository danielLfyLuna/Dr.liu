import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, FormattedMessage } from 'react-intl'
import { Form, Icon, Input, Button } from 'antd'


const FormItem = Form.Item

class HorizontalLoginForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values)
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 5 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 8 }
      }
    }
    return (
      <Form layout='vertical' onSubmit={this.handleSubmit}>
        <FormItem {...tailFormItemLayout}>
          <input type='hidden' />
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: 'LOGIN.USER.MESSAGE', defaultMessage: '输入用户名!'})
              }
            ]
          })(
            <Input
              prefix={<Icon type='user' style={{fontSize: 13}} />}
              placeholder={intl.formatMessage({id: 'LOGIN.USER.PLACEHOLDER', defaultMessage: '用户名'})}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: intl.formatMessage({id: 'LOGIN.PWD.MESSAGE', defaultMessage: '输入密码!'})
              }
            ]
          })(
            <Input
              prefix={<Icon type='lock' style={{fontSize: 13}} />}
              type='password'
              placeholder={intl.formatMessage({id: 'LOGIN.PWD.PLACEHOLDER', defaultMessage: '密码'})}
            />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <input type='hidden' />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            <FormattedMessage id='LOGIN.SUBMIT' defaultMessage={'登录'} />
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm)
export default WrappedHorizontalLoginForm
