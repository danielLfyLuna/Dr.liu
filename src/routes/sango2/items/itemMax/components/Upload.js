import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Upload, Icon } from 'antd'

const FormItem = Form.Item

class PlayerImport extends Component {

  state = {
    fileList: []
  }

  componentWillMount() {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values.files)
      if (!err) {
        const data = new FormData()
        data.append('file', values.files.file)
        this.props.onUpload(data)
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props

    const props = {
      action: '',
      onRemove: (file) => {
        this.setState({
          fileList: []
        })
      },
      beforeUpload: (file) => {
        this.setState({
          fileList: [file]
        })
        return false
      },
      fileList: this.state.fileList
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
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit} encType='multipart/form-data'>
        <FormItem
          {...formItemLayout}
          label='选择文件'
        >
          {getFieldDecorator('files', {
            rules: [{ required: true, message: '请选择上传文件!' }]
          })(
            <Upload {...props}>
              <Button>
                <Icon type='upload' /> 请选择文件
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' disabled={!this.state.fileList.length}>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

PlayerImport.propTypes = {
  form: PropTypes.object,
  onUpload: PropTypes.func,
  handleCancel: PropTypes.func
}

const Imports = Form.create()(PlayerImport)

export default Imports
