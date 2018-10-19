/* global API_HOST */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Cascader, Upload, Icon, Card, Button } from 'antd'
import _ from 'lodash'
import { Link } from 'react-router'

import openNotificationWithIcon from '../../../../../components/notification'


const FormItem = Form.Item

class AddMSGIndex extends Component {

  state = {
    note: []
  }

  componentWillMount() {
    this.props.fetchTemp()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    })
  }

  onChange = (e) => {
    this.setState({
      note: e
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const router = this.props.router
    let options = []
    _.map(this.props.message.templates, v => {
      options.push({
        value: v.templateId,
        label: `(ID:${v.templateId})${v.message}`
      })
    })

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
    const uploadLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    let props = {
      name: 'file',
      action: `${API_HOST}/short-message/tempalte/${this.state.note[0]}/add`,
      headers: { adminUserId: JSON.parse(sessionStorage.getItem('sango2')).userId,
                Authorization: `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}` },
      disabled: !(this.state.note && this.state.note.length > 0),
      onChange(info) {
        if (info.file.status === 'done') {
          openNotificationWithIcon('success', '上传成功')
          router.push({pathname: '/sango2/message/msgIndex'})
        } else if (info.file.status === 'error') {
          openNotificationWithIcon('error', '上传失败')
        }
      }
    }

    return (
      <Card>
        <Form>
          <FormItem
            {...formItemLayout}
            label='模板'
          >
            {getFieldDecorator('templateId', {
              rules: [
                { required: true, message: '请选择模板' }
              ]
            })(
              <Cascader
                placeholder='请选择模板'
                showSearch
                options={options}
                popupClassName='messageCascaderMenu'
                onChange={this.onChange}
              />
            )}
          </FormItem>
          <br />
          <br />
          <br />
          <FormItem
            {...uploadLayout}
            label='Dragger'
          >
            <div className='dropbox'>
              {getFieldDecorator('uploadFiles')(
                <Upload.Dragger {...props}>
                  <p className='ant-upload-drag-icon'>
                    <Icon type='inbox' />
                  </p>
                  {
                    (this.state.note && this.state.note.length > 0) ?
                      <p className='ant-upload-text'>请上传EXCEL</p>
                    :
                      <p className='ant-upload-text'>请先选择模板</p>
                  }
                  <p className='ant-upload-text'>**支持点击上传和拖拽上传**</p>
                </Upload.Dragger>
              )}
            </div>
          </FormItem>
          <FormItem
            {...uploadLayout}
          >
            <Link className='margin-right' to={{ pathname: '/sango2/message/msgIndex' }} >
              <Button type='primary'>返回</Button>
            </Link>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

AddMSGIndex.propTypes = {
  form: PropTypes.object,
  message: PropTypes.object,
  router: PropTypes.object,
  fetchTemp: PropTypes.func
}

const Index = Form.create()(AddMSGIndex)

export default Index
