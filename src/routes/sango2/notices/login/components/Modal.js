import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import { Form, Input, Button, TreeSelect, Cascader, InputNumber, Icon, Tooltip, Row, Select } from 'antd'
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
  order: {
    id: 'FORM.ORDER',
    defaultMessage: '排序'
  },
  order_input: {
    id: 'FORM.ORDER_INPUT',
    defaultMessage: '请填写排序'
  },
  number: {
    id: 'TIP.NUMBER_TYPE',
    defaultMessage: '非负整数'
  },
  notice_order: {
    id: 'TIP.LOGIN_NOTICE_ORDER',
    defaultMessage: '公告按照排序数由小到大的顺序从上到下显示。新建的公告自动生成排序，在本页面可以修改排序，注意不能设置两个相同的排序数！'
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
    options: PropTypes.array,
    form: PropTypes.object,
    items: PropTypes.object,
    onUpdate: PropTypes.func,
    onSubmitting: PropTypes.func,
    channels: PropTypes.array
  }

  uuid = this.props.items.noticeLabels ? this.props.items.noticeLabels.length : 0

  keys = []

  state = {
    productId: ['']
  }

  componentWillMount() {
    if (this.props.items.noticeLabels) {
      for (var i = 1; i <= this.props.items.noticeLabels.length; i++) {
        this.keys.push(i)
      }
    }
  }

  componentWillUnmount() {
    this.uuid = 0
    this.keys = []
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
        values.noticeLabels = []
        _.map(fieldValues.keys, (val, idx) => {
          values.noticeLabels.push({
            title: fieldValues[`title-${val}`],
            label: fieldValues[`label-${val}`],
            index: fieldValues[`index-${val}`],
            context: fieldValues[`context-${val}`]
          })
        })
        values.id = this.props.items.id
        this.props.onUpdate(values)
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
    const items = this.props.items

    let serverIds = []
    _.map(this.props.options, (v, i) => {
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


    // 产品下拉菜单
    let productsItems = []
    _.map(this.props.options, (val, idx) => {
      productsItems.push({value: val.value, label: `${val.label}(${val.value})`})
    })
    let serversItems = []
    if (items.serverIds) { serversItems = items.serverIds.split(',') }


    // 处理渠道
    let channelsItems = []
    items.channels && (channelsItems = items.channels.split(','))


    let initialKeys = this.keys

    getFieldDecorator('keys', { initialValue: initialKeys })
    const keys = getFieldValue('keys')

    const formItems = _.map(keys, (k, index) => {
      if (initialKeys.length > 0 && k <= this.props.items.noticeLabels.length) {
        return (
          <Row key={k}>
            <FormItem label={`${intl.formatMessage(message.tip)}${k}`} {...itemsLayout} required={false}>
              {getFieldDecorator(`label-${k}`, {
                rules: [{ required: true, message: intl.formatMessage(message.tip_input) }],
                initialValue: this.props.items.noticeLabels[k - 1].label
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label={`${intl.formatMessage(message.title)}${k}`} {...itemsLayout} required={false}>
              {getFieldDecorator(`title-${k}`, {
                rules: [{ required: true, message: intl.formatMessage(message.title_input) }],
                initialValue: this.props.items.noticeLabels[k - 1].title
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              label={
                <div style={{display: 'inline'}}>
                  {`${intl.formatMessage(message.order)}${k}`}<Tooltip title={intl.formatMessage(message.notice_order)}><Icon type='question-circle-o' /></Tooltip>
                </div>
              }
              {...itemsLayout}
              required={false}
            >
              {getFieldDecorator(`index-${k}`, {
                rules: [{
                  required: true,
                  message: intl.formatMessage(message.order_input)
                }, {
                  pattern: /^\d+$/,
                  message: intl.formatMessage(message.number)
                }],
                initialValue: this.props.items.noticeLabels[k - 1].index
              })(
                <InputNumber min={0} />
              )}
            </FormItem>

            <FormItem label={`${intl.formatMessage(message.content)}${k}`} {...itemsLayout} required={false}>
              {getFieldDecorator(`context-${k}`, {
                rules: [{ required: true, message: intl.formatMessage(message.content_input) }],
                initialValue: this.props.items.noticeLabels[k - 1].context
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
      }
      else {
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

            <FormItem
              label={
                <div style={{display: 'inline'}}>
                  {`${intl.formatMessage(message.order)}${k}`}<Tooltip title={intl.formatMessage(message.notice_order)}><Icon type='question-circle-o' /></Tooltip>
                </div>
              }
              {...itemsLayout}
            >
              {getFieldDecorator(`index-${k}`, {
                rules: [{
                  required: true,
                  message: intl.formatMessage(message.order_input)
                }, {
                  pattern: /^\d+$/,
                  message: intl.formatMessage(message.number)
                }]
              })(
                <InputNumber min={0} />
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
      }

    })
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={intl.formatMessage(message.product)} {...formItemLayout}>
          {getFieldDecorator('productId', {
            rules: [{ required: true, message: intl.formatMessage(message.product_input) }],
            initialValue: [items.productId]
          })(
            <Cascader
              showSearch
              options={productsItems}
              placeholder={intl.formatMessage(message.product)}
              onChange={this.handleProductChange}
              expandTrigger='hover'
            />
          )}
        </FormItem>

        <FormItem label={intl.formatMessage(message.server)} {...formItemLayout}>
          {getFieldDecorator('serverIds', {
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.server_input) }],
            initialValue: serversItems
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
            rules: [{ type: 'array', required: false, message: intl.formatMessage(message.channel_input) }],
            initialValue: channelsItems
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
              searchPlaceholder={intl.formatMessage(message.channel_input)}
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
          <Button type='ghost' htmlType='button' onClick={this.handleReset}>{intl.formatMessage(message.reload)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const Modal = Form.create()(NoticesLoginModal)

export default Modal
