import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Cascader, TreeSelect, Switch, Tooltip, Icon, Input } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item


class AllianceModal extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    options: PropTypes.object,
    handleCancel: PropTypes.func,
    onExport: PropTypes.func
  }

  state = {
    switch: 1,
    // 选中产品时对应的服务器列表
    sers: []
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let val = {}
        val.productId = values.products[0]
        values.serverType ? (val.serverIdList = values.servers) : (val.serverIds = values.serverBlock)
        console.log(val)
        this.props.onExport(val)
        this.props.handleCancel()
      }
    })
  }

  onChange = (e) => {
    _.forEach(this.props.options.products.list, (v, k) => {
      v.value === e[0] &&
      this.setState({
        sers: v.children
      })
    })
  }

  // 多选服务器开关切换
  onServerTypeSwitch = (checked) => {

    this.setState({
      switch: checked ? 1 : 2
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
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

    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: { span: 24, offset: 0 },
    //     sm: { span: 14, offset: 8 }
    //   }
    // }

    let proOpts = []
    _.map(this.props.options.products.list, (v, k) => {
      proOpts.push({
        value: v.value,
        label: v.label
      })
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label='产品名称'>
          { getFieldDecorator('products', {
            rules: [{ required: true, message: '请选择产品(必选)' }]
          })(
            <Cascader
              style={{ width: '100%' }}
              options={proOpts}
              placeholder='请选择产品(必选)'
              showSearch
              expandTrigger='hover'
              onChange={e => this.onChange(e)}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='服务器选择方式'
        >
          {getFieldDecorator('serverType', {
            initialValue: this.state.switch === 1,
            valuePropName: 'checked'
          })(
            <Switch onChange={this.onServerTypeSwitch} checkedChildren={'多选'} unCheckedChildren={'区间'} />
          )}
        </FormItem>

        {
          this.state.switch === 1 ?
            <FormItem {...formItemLayout} label='多选服务器'>
              { getFieldDecorator('servers', {
                rules: [{ required: true, message: '请选择服务器(必选)' }]
              })(
                <TreeSelect
                  treeData={[{
                    label: '全选',
                    value: null,
                    key: '全选',
                    children: this.state.sers
                  }]}
                  showSearch
                  allowClear
                  treeDefaultExpandAll
                  multiple
                  treeCheckable
                  treeNodeFilterProp='label'
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  searchPlaceholder='请选择服务器'
                  dropdownStyle={{height: 300}}
                />
              )}
            </FormItem>
          :
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  填写服务器&nbsp;
                  <Tooltip
                    title={
                      <div>连续区间用 (-) 分隔. <i style={{color: '#f11738'}}>例：app_001-app_100</i><p>多段区间用 (,) 分割. <i style={{color: '#f11738'}}>例：app_001-app_002,app_100-app_102</i></p></div>
                    }
                  >
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('serverBlock', {
                rules: [
                  { required: true, whitespace: true, message: '输入区间数值!' }
                ]
              })(
                <Input type='textarea' placeholder='输入区间数值' autosize={{ minRows: 2, maxRows: 8 }} />
              )}
            </FormItem>
        }

        <FormItem {...formItemLayout}>
          <Button type='primary' htmlType='submit' >提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const Modal = Form.create()(AllianceModal)

export default Modal
