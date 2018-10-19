import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Cascader, Button } from 'antd'
const FormItem = Form.Item

class ManagerModal extends Component {
  state = {
    currentItem: {},
    modalType: '',
    select: true
  }

  componentWillMount() {
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem,
      modalType: modalType
    })
  }

  handleSubmit = (e) => {
    const { options } = this.props
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        if (values.id) data.id = values.id
        data.name = values.name
        data.type = values.types[0]
        data.grade = values.grades[0]
        data.adminUserId = values.adminUsers[0]
        data.adminUserName = options.users.map[data.adminUserId]

        let posts = {
          form: data,
          path: { managerId: data.id }
        }

        if (this.state.modalType === 'update') {
          this.props.onUpdate(posts)
        } else {
          this.props.onCreate(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, initials } = this.props

    const detail = this.state.currentItem
    const check = this.state.modalType === 'update'

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
        {
          check &&
          <FormItem
            {...formItemLayout}
            label='ID'
          >
            {getFieldDecorator('id', {
              initialValue: detail.id || '',
              rules: [{ required: true, message: '请填写 ID!' }]
            })(
              <Input placeholder='请填写 ID' disabled={check} />
            )}
          </FormItem>
        }
        <FormItem
          {...formItemLayout}
          label='账号'
        >
          {getFieldDecorator('name', {
            initialValue: detail.name || '',
            rules: [{ required: true, message: '请填写账号!' }]
          })(
            <Input placeholder='请填写账号' disabled={check} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='类型'
        >
          {getFieldDecorator('types', {
            initialValue: [detail.type] || [],
            rules: [{ type: 'array', required: true, message: '请选择类型' }]
          })(
            <Cascader
              options={initials.enum.gsTypes}
              showSearch
              expandTrigger='hover'
              placeholder='请选择类型'
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='等级'
        >
          {getFieldDecorator('grades', {
            initialValue: [detail.grade] || [],
            rules: [{ type: 'array', required: true, message: '请选择等级' }]
          })(
            <Cascader
              options={initials.enum.gradeTypes}
              showSearch
              expandTrigger='hover'
              placeholder='请选择等级'
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='AdminUsers'
        >
          {getFieldDecorator('adminUsers', {
            initialValue: detail.adminUserId && [detail.adminUserId] || [],
            rules: [{ type: 'array', required: true, message: '请选择 AdminUsers' }]
          })(
            <Cascader
              options={options.users.list}
              showSearch
              expandTrigger='hover'
              placeholder='请选择 AdminUsers'
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

ManagerModal.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(ManagerModal)

export default Modal
