/* global SANGO2_API_HOST */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Upload, Icon } from 'antd'
import { defineMessages } from 'react-intl'
import openNotificationWithIcon from '../../../../../../components/notification'


const FormItem = Form.Item
const Dragger = Upload.Dragger
const message = defineMessages({
  excel1: {
    id: 'TIP.EXCEL_1',
    defaultMessage: '仅支持EXCEL文件'
  },
  excel2: {
    id: 'TIP.EXCEL_2',
    defaultMessage: '支持点击上传和拖拽上传,选择文件后立即上传'
  },
  uploading: {
    id: 'TIPS.UPLOADING',
    defaultMessage: '正在上传，请稍后'
  },
  upload_suc: {
    id: 'TIPS.UPLOAD_SUCCESS',
    defaultMessage: '上传成功'
  },
  upload_failed: {
    id: 'TIPS.UPLOAD_FAILED',
    defaultMessage: '上传失败'
  }
})


class UpLoadForm extends Component {
  static propTypes = {
    intl: PropTypes.object,
    form: PropTypes.object,
    data: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }



  render() {
    const { form: { getFieldDecorator }, intl } = this.props
    const mailId = this.props.data.id
    const title = this.props.data.title
    const router = this.context.router
    const path = {pathname: '/sango2/mail/batchmail/batchmailPlayers', query: {id: mailId, title: title}}

    const props = {
      name: 'file',
      showUploadList: false,
      action: `${SANGO2_API_HOST}/products/batchmails/${this.props.data.id}`,
      headers: {
        'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
        'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
      },
      onChange(info) {
        const status = info.file.status
        if (status !== 'uploading') {
          openNotificationWithIcon('info', intl.formatMessage(message.uploading))
        }
        if (status === 'done') {
          openNotificationWithIcon('success', intl.formatMessage(message.upload_suc))
          router.push(path)
        } else if (status === 'error') {
          openNotificationWithIcon('error', intl.formatMessage(message.upload_failed), info.file.response.tips)
        }
      }
    }

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('upload')(
            <Dragger {...props} >
              <p className='ant-upload-drag-icon'>
                <Icon type='inbox' />
              </p>
              <p className='ant-upload-hint'>{`${intl.formatMessage(message.excel2)}, ${intl.formatMessage(message.excel1)}`}</p>
            </Dragger>
          )}
        </FormItem>
      </Form>
    )
  }
}

const UploadMail = Form.create()(UpLoadForm)

export default UploadMail
