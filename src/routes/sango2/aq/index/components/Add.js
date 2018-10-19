import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import Editor from '../../../../../components/react-lz-editor'

import {Form, Input, InputNumber, Button} from 'antd'

const FormItem = Form.Item

class AddForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    handleCancel: PropTypes.func,
    onAdd: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        this.props.onAdd(fieldValues)
        this.props.handleCancel()
      }
    })
  };

  handleReset = () => {
    this.props.form.resetFields()
  };

  render() {
    const {getFieldDecorator} = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14}
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
        <FormItem {...formItemLayout} label='问题'>
          {getFieldDecorator('question', {
            rules: [{required: true, message: '请填写问题'}]
          })(
            <Input
              type='textarea'
              placeholder='问题'
              autosize={{minRows: 1, maxRows: 5}}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label='答案'>
          {getFieldDecorator('answer', {
            rules: [{required: true, message: '请填写答案'}]
          })(
            <Input
              type='textarea'
              placeholder='答案'
              autosize={{minRows: 3, maxRows: 10}}
            />
          )}
        </FormItem>

        {/* <FormItem {...formItemLayout} label='答案'>
          {getFieldDecorator('editor', {
            rules: [{required: true, message: '请填写答案'}]
          })(<Editor />)}
        </FormItem> */}

        <FormItem {...formItemLayout} label='排序'>
          {getFieldDecorator('order', {
            rules: [{required: true, message: '请填写排序'}]
          })(<InputNumber placeholder='排序' />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
          <Button
            type='default'
            onClick={this.handleReset}
            style={{marginLeft: '10px'}}
          >
            重置
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const Add = Form.create()(AddForm)

export default Add
