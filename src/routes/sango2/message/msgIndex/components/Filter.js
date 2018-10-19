import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Button, DatePicker, Input, Cascader } from 'antd'
import { Link } from 'react-router'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


const RangePicker = DatePicker.RangePicker

class MessageFilter extends Component {
  static propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    onSearch: PropTypes.func
  }

  state = {
    status: [
      {value: 0, label: '未发送'},
      {value: 1, label: '已发送'}
    ]
  }

  handleSearch = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let value = {}
        if (fieldsValue.phone) { value.phone = fieldsValue.phone }
        if (fieldsValue.status) { value.status = fieldsValue.status[0] }
        if (fieldsValue.times && fieldsValue.times.length > 0) {
          value.startDate = fieldsValue.times[0].format('YYYY-MM-DD')
          value.endDate = fieldsValue.times[1].format('YYYY-MM-DD')
        }
        this.props.onSearch(value)
      }
    })
  }

  render() {
    const { form: {getFieldDecorator}, login: { curd } } = this.props

    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }
    const rangeConfig = {
      rules: [{ type: 'array', required: false, message: '请选择起止时间' }],
      initialValue: [moment(), moment().subtract({days: -1})]
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} >
          <Row gutter={20} style={{ marginBottom: 6 }}>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
              {getFieldDecorator('times', rangeConfig)(
                <RangePicker format='YYYY-MM-DD' />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 4 }}>
              {getFieldDecorator('phone', {
                rules: [{ required: false, message: '请填写电话', pattern: /^\d+$/ }]
              })(
                <Input
                  placeholder='请填写电话'
                />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 4 }}>
              {getFieldDecorator('status', {
                rules: [{ required: false, message: '请选择状态' }]
              })(
                <Cascader
                  options={this.state.status}
                  placeholder='请选择状态'
                  showSearch
                />
              )}
            </Col>
          </Row>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              _.has(curd, '190101')
              ?
                <Col className='gutter-row' span={2}>
                  <Button type='primary' className='margin-right' htmlType='submit'>查询</Button>
                </Col>
              :
                ''
            }
            {
              _.has(curd, '190103')
              ?
                <Col className='gutter-row' span={2}>
                  <Link className='margin-right' to={{ pathname: '/sango2/message/newTemp' }} >
                    <Button type='default'>添加短信</Button>
                  </Link>
                </Col>
              :
                ''
            }
            {
              _.has(curd, '190105')
              ?
                <Col className='gutter-row' span={2}>
                  <Link className='margin-right' to={{ pathname: '/sango2/message/tempIndex' }} >
                    <Button type='default'>查看模板列表</Button>
                  </Link>
                </Col>
              :
                ''
            }

          </Row>
        </Form>
      </div>
    )
  }
}

const Filter = Form.create()(MessageFilter)

export default Filter
