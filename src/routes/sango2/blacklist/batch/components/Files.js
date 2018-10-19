import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Upload, Icon, Card } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'

const FormItem = Form.Item

const message = defineMessages({
  excel1: {
    id: 'TIP.EXCEL_UPLOAD',
    defaultMessage: '上传EXCEL'
  },
  excel2: {
    id: 'TIP.EXCEL_1',
    defaultMessage: '仅支持EXCEL文件'
  },
  excel3: {
    id: 'TIP.EXCEL_2',
    defaultMessage: '支持点击上传和拖拽上传,选择文件后立即上传'
  }
})


class ForbidModal extends Component {

  render() {
    const { form: { getFieldDecorator }, login: { curd }, intl } = this.props

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

    return (
      <Card>
        {
          _.has(curd, '80204') ?
            <Form>
              <FormItem
                {...formItemLayout}
                label={intl.formatMessage(message.excel1)}
              >
                <div className='dropbox'>
                  {getFieldDecorator('uploadFiles')(
                    <Upload.Dragger {...this.props.formProps}>
                      <p className='ant-upload-drag-icon'>
                        <Icon type='inbox' />
                      </p>
                      <p className='ant-upload-text'>{intl.formatMessage(message.excel2)}</p>
                      <p className='ant-upload-text'>**{intl.formatMessage(message.excel3)}**</p>
                    </Upload.Dragger>
                  )}
                </div>
              </FormItem>
            </Form>
          :
            ''
        }
      </Card>
    )
  }
}

ForbidModal.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  login: PropTypes.object,
  formProps: PropTypes.object
}

const Files = Form.create()(ForbidModal)

export default Files
