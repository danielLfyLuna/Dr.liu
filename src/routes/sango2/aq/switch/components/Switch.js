import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import _ from 'lodash'

import { Form, Cascader, TreeSelect, Button, Switch, Card } from 'antd'

const FormItem = Form.Item


class SwitchForm extends Component {

  static propTypes = {
    form: PropTypes.object,
    switchAQ: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    products: PropTypes.object
  }

  state = {
    pro: '',
    open: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        let value = {
          productId: fieldValues.productId[0],
          open: fieldValues.open ? 1 : 0
        }
        if (fieldValues.serverIds) {
          value.serverIdList = fieldValues.serverIds
        }
        this.props.switchAQ(value)
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleChange = (e) => {
    this.setState({
      pro: e[0]
    })
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    let options = []
    let pros = []
    let sers = []
    if (this.props.products.options) {
      options = this.props.products.options
    }

    _.map(options, (v, i) => {
      pros.push({
        value: v.value,
        label: v.label
      })
      if (v.value === this.state.pro) {
        sers = v.children
      }
    })

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
      <Card>
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label='产品'
          >
            {getFieldDecorator('productId', {
              rules: [{ required: true, message: '请选择产品' }]
            })(
              <Cascader
                showSearch
                options={pros}
                placeholder='请选择产品'
                expandTrigger='hover'
                onChange={this.handleChange}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='目标服务器(多选)'
          >
            {getFieldDecorator('serverIds', {
              rules: [{ required: false, message: '请选择服务器' }]
            })(
              <TreeSelect
                treeData={[{
                  label: '全选',
                  value: null,
                  key: '全选',
                  children: [...sers]
                }]}
                showSearch
                allowClear
                treeDefaultExpandAll
                multiple
                treeCheckable
                treeNodeFilterProp='label'
                searchPlaceholder='请选择服务器'
                dropdownStyle={{height: 300}}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='开关'
          >
            {getFieldDecorator('open', { valuePropName: 'checked', initialValue: this.state.open })(
              <Switch checkedChildren={'打开'} unCheckedChildren={'关闭'} />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit' >提交</Button>
            <Button type='default' onClick={this.handleReset} style={{marginLeft: '10px'}}>重置</Button>
            <Link to={{pathname: '/sango2/answerQuestion/aqs'}}>
              <Button type='default' style={{marginLeft: '10px'}}>返回</Button>
            </Link>
          </FormItem>

        </Form>
      </Card>
    )
  }
}

const AQSwitch = Form.create()(SwitchForm)

export default AQSwitch
