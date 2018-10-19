import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Select, DatePicker } from 'antd'
import _ from 'lodash'
import moment from 'moment'

class List extends Component {

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          productId: '_',
          serverId: '_',
          data: {
            groupId: this.props.data.groupId,
            productId: values.productId,
            serverIds: values.serverIds,
            startTime: moment(values.startTime).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(values.endTime).format('YYYY-MM-DD HH:mm:ss')
          }
        }
        this.props.onUpdate(data)
        this.props.handleUpdataCancel()
      }
    })
  }


  render() {
    const { form: { getFieldDecorator }, options: { products }, data } = this.props

    const prosList = _.map(products.options, (v) => {
      return (
        <Select.Option value={v.value} key={v.value}>{v.label}</Select.Option>
      )
    })

    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Form.Item>
            {getFieldDecorator('productId', {
              rules: [{
                required: true,
                message: '请选择产品'
              }],
              initialValue: data.productId
            })(
              <Select
                allowClear
                placeholder='请选择产品'
                optionFilterProp='children'
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {prosList}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('serverIds', {
              rules: [{
                required: true,
                message: '请选择服务器'
              }],
              initialValue: data.serverIds
            })(
              <Input.TextArea
                placeholder={'请输入服务器区间'}
                autosize={{minRows: 2}}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('startTime', {
              rules: [{
                required: true
              }],
              initialValue: moment(data.startTime, 'YYYY-MM-DD HH:mm:ss')
            })(
              <DatePicker
                showTime={{ defaultValue: moment('05:00:00', 'HH:mm:ss') }}
                format='YYYY-MM-DD HH:mm:ss'
                style={{ minWidth: 200 }}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('endTime', {
              rules: [{
                required: true
              }],
              initialValue: moment(data.endTime, 'YYYY-MM-DD HH:mm:ss')
            })(
              <DatePicker
                showTime={{ defaultValue: moment('05:00:00', 'HH:mm:ss') }}
                format='YYYY-MM-DD HH:mm:ss'
                style={{ minWidth: 200 }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button icon='search' type='primary' htmlType='submit'>提交</Button>
          </Form.Item>

        </Form>
      </div>
    )
  }
}

List.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  data: PropTypes.object,
  handleUpdataCancel: PropTypes.func,
  onUpdate: PropTypes.func
}

const Lists = Form.create()(List)
export default Lists
