import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import { Form, Input, Button, TreeSelect, Switch, Cascader, Icon, Tooltip, Row, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

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
  channel: {
    id: 'FORM.CHANNEL_OPT',
    defaultMessage: '渠道(可选)'
  },
  channel_input: {
    id: 'FORM.CHANNEL_INPUT',
    defaultMessage: '请选择渠道'
  },
  all: {
    id: 'CHOOSE_ALL',
    defaultMessage: '全选'
  },
  channel_empty: {
    id: 'FORM.SWITCH_INPUT',
    defaultMessage: '空选默认为所有渠道'
  },
  switch: {
    id: 'FORM.SWITCH',
    defaultMessage: '开关'
  },
  open: {
    id: 'BUTTON.OPEN',
    defaultMessage: '开启'
  },
  off: {
    id: 'BUTTON.OFF',
    defaultMessage: '关闭'
  },
  switch_input: {
    id: 'FORM.SWITCH_INPUT',
    defaultMessage: '请选择公告开关状态'
  },
  login_tip: {
    id: 'TIP.LOGIN_NOTICE',
    defaultMessage: '新建公告默认关闭状态，如需修改请在新建之后进入首页修改'
  },
  tip: {
    id: 'FORM.TIP',
    defaultMessage: '标签'
  },
  tip_input: {
    id: 'FORM.TIPS_INPUT',
    defaultMessage: '请填写公告标签'
  },
  title: {
    id: 'TABLE.TITLE',
    defaultMessage: '标题'
  },
  title_input: {
    id: 'TABLE.TITLE_INPUT',
    defaultMessage: '请填写标题'
  },
  content: {
    id: 'TABLE.CONTENT',
    defaultMessage: '内容'
  },
  content_input: {
    id: 'TABLE.CONTENT_INPUT',
    defaultMessage: '请填写内容'
  },
  add: {
    id: 'BUTTON.ADD_NOTICE',
    defaultMessage: '添加公告'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reload: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  }
})


class NoticesLoginModal extends Component {

  static propTypes = {
    intl: PropTypes.object,
    optionsChild: PropTypes.array,
    options: PropTypes.array,
    form: PropTypes.object,
    onCreate: PropTypes.func,
    onSubmitting: PropTypes.func,
    channels: PropTypes.array
  }

  uuid = 0

  keys = []

  state = {
    productId: ['']
  }

  componentDidMount() {
  }

  remove = (k) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    this.uuid++
    const nextKeys = keys.concat(this.uuid)

    form.setFieldsValue({
      keys: nextKeys
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        if (!fieldValues.productId) { fieldValues.productId = [] }
        if (!fieldValues.channels) { fieldValues.channels = [] }
        let values = {}
        if (fieldValues.productId.length > 0) { values.productId = fieldValues.productId[0] }
        if (fieldValues.channels.length > 0) { values.channels = fieldValues.channels.join(',') }
        if (_.indexOf(fieldValues.serverIds, 'all') >= 0) {
          values.serverIds = ['all']
        } else {
          values.serverIds = fieldValues.serverIds.join(',')
        }
        values.status = fieldValues.status === true ? 1 : 0
        values.noticeLabels = []
        _.map(fieldValues.keys, (val, idx) => {
          values.noticeLabels.push({
            title: fieldValues[`title-${val}`],
            label: fieldValues[`label-${val}`],
            context: fieldValues[`context-${val}`]
          })
        })
        this.props.onCreate(values)
        this.props.onSubmitting()
      }
    })
  }

  handleProductChange = (v) => {
    this.setState({
      productId: v
    })
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, intl } = this.props

    let serverIds = []
    _.map(this.props.optionsChild, (v, i) => {
      if (v.value === this.state.productId[0]) {
        if (v.children && v.children.length) {
          _.map(v.children, (val, inx) => {
            serverIds.unshift(<Option key={val.value} value={val.value}>{val.label}</Option>)
          })
          serverIds.unshift(<Option key='all' value='all'>{intl.formatMessage(message.all)}</Option>)
        }
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

    const itemsLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
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

    const minusItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 10
        }
      }
    }

    let initialKeys = this.keys

    getFieldDecorator('keys', { initialValue: initialKeys })
    const keys = getFieldValue('keys')

    const formItems = _.map(keys, (k, index) => {
        return (
          <Row key={k}>
            <FormItem label={`${intl.formatMessage(message.tip)}${k}`} {...itemsLayout}>
              {getFieldDecorator(`label-${k}`, {
                rules: [{ required: true, message: intl.formatMessage(message.tip_input) }]
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label={`${intl.formatMessage(message.title)}${k}`} {...itemsLayout}>
              {getFieldDecorator(`title-${k}`, {
                rules: [{ required: true, message: intl.formatMessage(message.title_input) }]
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label={`${intl.formatMessage(message.content)}${k}`} {...itemsLayout}>
              {getFieldDecorator(`context-${k}`, {
                rules: [{ required: true, message: intl.formatMessage(message.content_input) }]
              })(
                <Input type='textarea' autosize={{ minRows: 2, maxRows: 10 }} />
              )}
            </FormItem>

            <FormItem {...minusItemLayout}>
              <Icon
                className='dynamic-delete-button'
                type='minus-circle-o'
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
            </FormItem>
          </Row>
        )
    })
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={intl.formatMessage(message.product)} {...formItemLayout}>
          {getFieldDecorator('productId', {
            rules: [{ required: true, message: intl.formatMessage(message.product_input) }]
          })(
            <Cascader
              showSearch
              options={this.props.options}
              placeholder={intl.formatMessage(message.product_input)}
              onChange={this.handleProductChange}
              expandTrigger='hover'
            />
          )}
        </FormItem>

        <FormItem label={intl.formatMessage(message.server)} {...formItemLayout}>
          {getFieldDecorator('serverIds', {
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.server_input) }]
          })(
            <Select
              allowClear
              mode='multiple'
              style={{ width: '100%' }}
              placeholder={intl.formatMessage(message.server_input)}
              notFoundContent='no data'
              optionFilterProp='children'
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {serverIds}
            </Select>
          )}
        </FormItem>

        <FormItem label={intl.formatMessage(message.channel)} {...formItemLayout}>
          {getFieldDecorator('channels', {
            rules: [{ type: 'array', required: false, message: intl.formatMessage(message.channel_input) }]
          })(
            <TreeSelect
              treeData={[{
                label: intl.formatMessage(message.all),
                value: null,
                key: intl.formatMessage(message.all),
                children: this.props.channels
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              style={{ maxHeight: 100, overflow: 'auto' }}
              dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
              showCheckedStrategy={TreeSelect.SHOW_CHILD}
              searchPlaceholder={intl.formatMessage(message.channel_empty)}
            />
          )}
        </FormItem>

        <FormItem
          label={<div style={{display: 'inline'}}>{intl.formatMessage(message.switch)}<Tooltip title={intl.formatMessage(message.login_tip)}><Icon type='question-circle-o' /></Tooltip></div>}
          {...formItemLayout}
        >
          {getFieldDecorator('status', {
            rules: [{ required: false, message: intl.formatMessage(message.switch_input) }],
            initialValue: false,
            valuePropName: 'checked'
          })(
            <Switch
              checkedChildren={intl.formatMessage(message.open)}
              unCheckedChildren={intl.formatMessage(message.off)}
              disabled
            />
          )}
        </FormItem>
        { formItems }
        <FormItem {...tailFormItemLayout}>
          <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
            <Icon type='plus' /> {intl.formatMessage(message.add)}
          </Button>
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
          <Button type='ghost' htmlType='button' onClick={this.handleReset} style={{marginLeft: '10px'}}>{intl.formatMessage(message.reload)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const Add = Form.create()(NoticesLoginModal)

export default Add
