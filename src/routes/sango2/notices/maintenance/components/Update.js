import React, { Component } from 'react'
import { Form, Input, Button, TreeSelect, Cascader, Switch, Tooltip, Icon } from 'antd'
import { defineMessages } from 'react-intl'
import PropTypes from 'prop-types'
import _ from 'lodash'

const FormItem = Form.Item

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  server_input: {
    id: 'FORM.SERVERS_INPUT',
    defaultMessage: '请选择服务器'
  },
  server_type: {
    id: 'FORM.SERVERTYPE',
    defaultMessage: '服务器选择方式'
  },
  mul: {
    id: 'CHOOSE_MUL',
    defaultMessage: '多选'
  },
  qujian: {
    id: 'CHOOSE_QUJIAN',
    defaultMessage: '区间'
  },
  all: {
    id: 'CHOOSE_ALL',
    defaultMessage: '全选'
  },
  qujian_input: {
    id: 'FORM.SERVERIDS_INPUT',
    defaultMessage: '输入区间数值'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reload: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  },
  tip: {
    id: 'TABLE.NOTICE_TIP',
    defaultMessage: '维护提示'
  },
  tip_input: {
    id: 'FORM.NOTICE_TIP_INPUT',
    defaultMessage: '请输入维护提示内容'
  },
  lianxu: {
    id: 'OPENCONDITION_PS_1',
    defaultMessage: '连续区间用 (-) 分隔.'
  },
  duoduan: {
    id: 'OPENCONDITION_PS_2',
    defaultMessage: '多段区间用 (,) 分割.'
  }
})


class UpdateMaintenance extends Component {

  state = {
    pro: '',
    switch: 1
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let val = {}
        val.productId = values.productId[0]
        if (values.notice) { val.notice = values.notice }
        values.switch ? (val.servers = values.servers) : (val.serverIds = values.serverIds)
        this.props.onUpdate(val)
        this.props.handleCancel()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  proChosen = (e) => {
    this.setState({
      pro: e[0]
    })
  }

  onSwitch = (e) => {
    this.setState({
      switch: (e ? 1 : 2)
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { intl } = this.props
    // 产品，服务器下拉
    let productsOptions = []
    _.map(this.props.options, (val, idx) => {
      productsOptions.push({
        value: val.value,
        label: val.label
      })
    })

    let serverOptions = []
    _.map(this.props.options, (val, idx) => {
      if (val.value === this.state.pro) {
        serverOptions = val.children
      }
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={intl.formatMessage(message.tip)}>
          {getFieldDecorator('notice', {
            rules: [{ required: false, message: intl.formatMessage(message.tip_input), whitespace: true }]
          })(
            <Input type='textarea' autosize={{ minRows: 2, maxRows: 4 }} placeholder={intl.formatMessage(message.tip_input)} />
          )}
        </FormItem>

        <FormItem label={intl.formatMessage(message.product)}>
          {getFieldDecorator('productId', {
            rules: [{ required: true, message: intl.formatMessage(message.product_input) }]
          })(
            <Cascader
              showSearch
              options={productsOptions}
              placeholder={intl.formatMessage(message.product_input)}
              onChange={this.proChosen}
            />
          )}
        </FormItem>

        <FormItem label={intl.formatMessage(message.server_type)}>
          {getFieldDecorator('switch', {
            initialValue: this.state.switch === 1,
            valuePropName: 'checked'
          })(
            <Switch checkedChildren={intl.formatMessage(message.mul)} unCheckedChildren={intl.formatMessage(message.qujian)} onChange={this.onSwitch} />
          )}
        </FormItem>

        {
          this.state.switch === 1 ?
            <FormItem label={intl.formatMessage(message.server)}>
              { getFieldDecorator('servers', {
                rules: [{ required: true, message: intl.formatMessage(message.server_input) }]
              })(
                <TreeSelect
                  treeData={[{
                    label: intl.formatMessage(message.all),
                    value: null,
                    key: intl.formatMessage(message.all),
                    children: [...serverOptions]
                  }]}
                  showSearch
                  allowClear
                  treeDefaultExpandAll
                  multiple
                  treeCheckable
                  treeNodeFilterProp='label'
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  searchPlaceholder={intl.formatMessage(message.server_input)}
                  dropdownStyle={{height: 300}}
                />
              )}
            </FormItem>
          :
            <FormItem
              label={(
                <span>
                  {intl.formatMessage(message.server)}&nbsp;
                  <Tooltip
                    title={
                      <div>{intl.formatMessage(message.lianxu)} <i style={{color: '#f11738'}}>e.g：app_001-app_100</i><p>{intl.formatMessage(message.duosuan)} <i style={{color: '#f11738'}}>e.g：app_001-app_002,app_100-app_102</i></p></div>
                    }
                  >
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('serverIds', {
                rules: [
                  { required: true, whitespace: true, message: intl.formatMessage(message.qujian_input) }
                ]
              })(
                <Input type='textarea' placeholder={intl.formatMessage(message.qujian_input)} autosize={{ minRows: 2, maxRows: 8 }} />
              )}
            </FormItem>
        }

        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
          >
            {intl.formatMessage(message.submit)}
          </Button>
          <Button onClick={this.handleReset} style={{marginLeft: '20px'}}>{intl.formatMessage(message.reload)}</Button>
        </FormItem>
      </Form>
    )
  }
}

UpdateMaintenance.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.array,
  handleCancel: PropTypes.func,
  onUpdate: PropTypes.func
}

const Update = Form.create()(UpdateMaintenance)


export default Update
