import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, DatePicker, Button, Icon } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const FormItem = Form.Item
const RangePicker = DatePicker.RangePicker


class RechargeModal extends Component {

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onExport({
          startTime: values.time[0].format('YYYY-MM-DD HH:mm:ss'),
          endTime: values.time[1].format('YYYY-MM-DD HH:mm:ss')
        })
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    const rangeConfig = {
      rules: [{ required: true, message: '请选择起止时间!' }],
      initialValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss').subtract({days: -1})]
    }
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label='日期'>
          {getFieldDecorator('time', rangeConfig)(
            <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit'><Icon type='download' />导出</Button>
        </FormItem>
      </Form>
    )
  }
}

RechargeModal.propTypes = {
  form: PropTypes.object,
  onExport: PropTypes.func,
  handleCancel: PropTypes.func
}

const Modal = Form.create()(RechargeModal)

export default Modal
