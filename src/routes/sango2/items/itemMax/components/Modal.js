import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, InputNumber, Button } from 'antd'

const FormItem = Form.Item

class RepairModal extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        let val = {
          itemId: this.props.data.itemId,
          rewardType: this.props.data.rewardType,
          coin: values.price
        }
        this.props.onUpdate(val)
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, data } = this.props

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
          label='价格'
        >
          {getFieldDecorator('price', {
            rules: [{ required: true, message: '请填写价格!', pattern: /^\d+$/ }],
            initialValue: data.coin
          })(
            <InputNumber />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

RepairModal.propTypes = {
  form: PropTypes.object,
  data: PropTypes.object,
  handleCancel: PropTypes.func,
  onUpdate: PropTypes.func
}

const Modal = Form.create()(RepairModal)

export default Modal
