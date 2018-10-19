import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Input } from 'antd'

const FormItem = Form.Item

class Modals extends Component {
  static propTypes = {
    data: PropTypes.object,
    form: PropTypes.object,
    onEdit: PropTypes.func,
    handleCancel: PropTypes.func
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let val = {
          product: '_',
          list: {
            id: this.props.data.id,
            maxPrice: values.maxPrice
          }
        }
        this.props.onEdit(val)
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, data } = this.props

    return (
      <div>
        <Form hideRequiredMark onSubmit={this.handleSearch} layout='inline'>
          <FormItem
            label='最大值'
          >
            {getFieldDecorator('maxPrice', {
              rules: [{ required: true, message: '请输入最大值', pattern: /^\d+$/ }],
              initialValue: data.maxPrice
            })(
              <Input />
            )}
          </FormItem>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form>
      </div>
    )
  }
}

const ModalsF = Form.create()(Modals)

export default ModalsF
