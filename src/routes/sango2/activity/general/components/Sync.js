import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Switch, Input, Button, Select, TreeSelect } from 'antd'
import _ from 'lodash'


class List extends Component {
  state = {
    pro: '',
    isSwitch: 'select'
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          templateId: this.props.data.templateId,
          data: {
            productId: values.productId
          }
        }
        if (values.switch) {
          data.data.serverIdList = values.serverIdList
        } else {
          data.data.serverIds = values.serverIds
        }
        this.props.onSync(data)
        this.props.handleSyncCancel()
      }
    })
  }

  handleSwitch = (e) => {
    this.setState({
      isSwitch: e ? 'select' : 'input'
    })
  }

  handleChange = (e) => {
    this.setState({
      pro: e
    })
  }

  render() {
    const { form: { getFieldDecorator }, products } = this.props

    const prosList = _.map(products.options, (v) => {
      return (
        <Select.Option value={v.value} key={v.value}>{v.label}</Select.Option>
      )
    })
    const sers = _.find(products.options, (v) => v.value === this.state.pro) ?
      (_.find(products.options, (v) => v.value === this.state.pro)).children ?
        (_.find(products.options, (v) => v.value === this.state.pro)).children :
          [] :
            []

    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Form.Item>
            {getFieldDecorator('productId', {
              rules: [{
                required: true,
                message: '请选择产品'
              }]
            })(
              <Select
                onChange={this.handleChange}
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
            {getFieldDecorator('switch', {
              valuePropName: 'checked',
              initialValue: this.state.isSwitch === 'select'
            })(
              <Switch checkedChildren='全选' unCheckedChildren='区间' onChange={this.handleSwitch} />
            )}
          </Form.Item>
          {
            this.state.isSwitch === 'select' &&
            <Form.Item>
              {getFieldDecorator('serverIdList', {
                rules: [{ required: true, message: '请选择服务器' }]
              })(
                <TreeSelect
                  treeData={[{
                    label: '全选',
                    value: null,
                    key: '全选',
                    children: sers
                  }]}
                  showSearch
                  allowClear
                  treeDefaultExpandAll
                  multiple
                  treeCheckable
                  treeNodeFilterProp='label'
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  style={{ maxHeight: 100, overflow: 'auto' }}
                  dropdownStyle={{ maxHeight: 300 }}
                  searchPlaceholder='请选择服务器'
                />
              )}
            </Form.Item>
          }
          {
            this.state.isSwitch === 'input' &&
            <Form.Item>
              {getFieldDecorator('serverIds', {
                rules: [{
                  required: true,
                  message: '请选择服务器'
                }]
              })(
                <Input.TextArea
                  placeholder={'请输入服务器区间'}
                  autosize={{minRows: 2}}
                />
              )}
            </Form.Item>
          }
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
  products: PropTypes.object,
  data: PropTypes.object,
  onSync: PropTypes.func,
  handleSyncCancel: PropTypes.func
}

const Lists = Form.create()(List)
export default Lists
