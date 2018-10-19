import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Cascader, Button } from 'antd'
const FormItem = Form.Item


class GroupModal extends Component {
  state = {
    enum: {
      verifyTypes: [
        { label: '不验证', value: 0 },
        { label: '验证', value: 1 }
      ]
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.modalType === 'create') {
          this.props.onCreate(values)
        } else {
          this.props.onUpdate(values)
        }
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const { currentItem, modalType } = this.props.onModalLoad()
    const check = modalType !== 'create'
    const item = modalType === 'create' ? {} : currentItem

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
        sm: { span: 14, offset: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label='分组' hasFeedback>
          {getFieldDecorator('group', {
            initialValue: item.group,
            rules: [{ required: true, message: '请填写分组!', whitespace: true }]
          })(
            <Input disabled={check} placeholder='填写分组' />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label='名称' hasFeedback>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '请填写名称!', whitespace: true }]
          })(
            <Input placeholder='填写名称' />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label='是否验证'>
          {getFieldDecorator('verify', {
            initialValue: item.verify ? [item.verify] : [0],
            rules: [{ type: 'array', required: true, message: '请选择是否验证客户端!' }]
          })(
            <Cascader
              options={this.state.enum.verifyTypes}
              showSearch
              expandTrigger='hover'
              placeholder='选择是否验证客户端'
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('modalType', {
            initialValue: modalType
          })(
            <Input type='hidden' />
        )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >提交</Button>
        </FormItem>
      </Form>
    )
  }
}

GroupModal.propTypes = {
  form: PropTypes.object,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onSubmitting: PropTypes.func,
  onModalLoad: PropTypes.func
}

const Modal = Form.create()(GroupModal)

export default Modal
