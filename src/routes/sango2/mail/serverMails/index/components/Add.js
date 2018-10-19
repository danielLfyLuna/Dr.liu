import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FormattedMessage, defineMessages } from 'react-intl'

import { Form, Input, InputNumber, Icon, Row, Col, Button, Cascader, TreeSelect, Switch, Tooltip, Tag } from 'antd'
import { RuleTransFrom } from '../../../../../../components/ruleTransform/RuleTransFrom.js'

const FormItem = Form.Item
const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
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
  channel: {
    id: 'FORM.CHANNEL_OPT',
    defaultMessage: '渠道(可选)'
  },
  channel_input: {
    id: 'FORM.CHANNEL_INPUT',
    defaultMessage: '请选择渠道'
  },
  qujian_input: {
    id: 'FORM.SERVERIDS_INPUT',
    defaultMessage: '输入区间数值'
  },
  lianxu: {
    id: 'OPENCONDITION_PS_1',
    defaultMessage: '连续区间用 (-) 分隔.'
  },
  duoduan: {
    id: 'OPENCONDITION_PS_2',
    defaultMessage: '多段区间用 (,) 分割.'
  },
  mailTitle: {
    id: 'FORM.MAILTITLE',
    defaultMessage: '邮件标题'
  },
  mailContext: {
    id: 'FORM.MAILCONTEXT',
    defaultMessage: '邮件内容'
  },
  sender: {
    id: 'FORM.SENDER',
    defaultMessage: '发件人'
  },
  description: {
    id: 'FORM.DESCRIPTION',
    defaultMessage: '描述'
  },
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reload: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  },
  item_add: {
    id: 'BUTTON.ITEM_ADD',
    defaultMessage: '添加道具'
  },
  team: {
    id: 'FORM.TEAM',
    defaultMessage: '运营团队'
  },
  tips: {
    id: 'FORM.TIPS',
    defaultMessage: '友情提示'
  }
})


class AddForm extends Component {

  static propTypes = {
    intl: PropTypes.object,
    goodPrice: PropTypes.object,
    mailMax: PropTypes.object,
    options: PropTypes.array,
    goods: PropTypes.array,
    channels: PropTypes.array,
    form: PropTypes.object,
    handleCancel: PropTypes.func,
    addServerMail: PropTypes.func
  }

  uuid = 0

  keys = []

  state = {
    ruleTransFrom: 0,
    serversOptions: [],
    switch: 1
  }

  constructor(props) {
    super(props)
    this.itemPrice = {}
    this.totalPrice = 0
  }

  remove = (k) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length === 0) {
      return
    }
    Object.assign(this.itemPrice[k], {num: 0}, {id: 0})
    this.totalPrice = _.reduce(this.itemPrice, (res, opt) => {
      return res + opt.num * opt.id
    }, 0)
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }
  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length >= 10) { return }
    this.uuid++
    this.itemPrice[this.uuid] = { num: 0, id: 0 }
    const nextKeys = keys.concat(this.uuid)

    form.setFieldsValue({
      keys: nextKeys
    })
  }
  numChange = (e, v) => {
    this.handlerRoleTransFrom(e)
    if (typeof (e) === 'number' && /^\+?[1-9][0-9]*$/.test(e)) {
      Object.assign(this.itemPrice[v], {num: e})
      this.totalPrice = _.reduce(this.itemPrice, (res, opt) => {
        return res + opt.num * opt.id
      }, 0)
    } else {
      Object.assign(this.itemPrice[v], {num: 0})
      this.totalPrice = _.reduce(this.itemPrice, (res, opt) => {
        return res + opt.num * opt.id
      }, 0)
    }
  }

  itemChange = (e, v) => {
    let id = 0
    _.map(this.props.goodPrice.options, (v, i) => {
      if (String(v.itemId) == e[0]) { id = v.coin }
    })
    if (e[0]) {
      Object.assign(this.itemPrice[v], {id: id})
      this.totalPrice = _.reduce(this.itemPrice, (res, opt) => {
        return res + opt.num * opt.id
      }, 0)
    } else {
      Object.assign(this.itemPrice[v], {id: 0})
      this.totalPrice = _.reduce(this.itemPrice, (res, opt) => {
        return res + opt.num * opt.id
      }, 0)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {

        let value = {}
        value.productId = fieldValues.productId[0]
        value.serverIds = fieldValues.serverId ? fieldValues.serverId.join(',') : fieldValues.serverBlock
        if (!fieldValues.channels) { fieldValues.channels = [] }
        value.channels = fieldValues.channels.join(',')
        value.title = fieldValues.title
        value.senderName = fieldValues.senderName
        value.context = fieldValues.context
        value.description = fieldValues.description

        value.rewards = []
        _.map(fieldValues.keys, (val, idx) => {
          value.rewards.push({
            itemId: fieldValues[`item-${val}`][0],
            count: fieldValues[`number-${val}`]
          })
        })

        this.props.addServerMail(value)
        this.props.handleCancel()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleProChange = (e) => {
    _.map(this.props.options, (val, idx) => {
      if (val.value === e[0]) {
        this.setState({
          serversOptions: val.children
        })
      }
    })
  }

  // 验证
  handlerRoleTransFrom = (value) => {
    this.setState({
      ruleTransFrom: _.toNumber(value)
    })
  }
  handlerRoleTransFromFocus = (event) => {
    event.preventDefault()
    this.setState({
      ruleTransFrom: _.toNumber(event.target.value)
    })
  }

  // 多选服务器开关切换
  onServerTypeSwitch = (checked) => {

    this.setState({
      switch: checked ? 1 : 2
    })
  }


  render() {

    const { form: { getFieldDecorator, getFieldValue }, intl } = this.props
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
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
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

    // 产品，服务器下拉
    let productsOptions = []
    _.map(this.props.options, (val, idx) => {
      productsOptions.push({
        value: val.value,
        label: val.label
      })
    })

    let initialKeys = this.keys

    getFieldDecorator('keys', { initialValue: initialKeys })
    const keys = getFieldValue('keys')

    const formItems = keys.map((k, index) => {
        return (
          <Row key={k}>
            <Col span='12' offset={3}>
              <FormItem
                {...itemsLayout}
                label={`${intl.formatMessage(message.item)}${k}`}
              >
                {getFieldDecorator(`item-${k}`, {
                  rules: [{
                    required: true,
                    message: '必须选择道具！若不发送，请删除此条目'
                  }]
                })(
                  <Cascader
                    placeholder={intl.formatMessage(message.item)}
                    showSearch
                    options={this.props.goods}
                    onChange={(e) => this.itemChange(e, k)}
                  />
                )}
              </FormItem>
            </Col>
            <Col span='8'>
              <FormItem
                {...itemsLayout}
              >
                {getFieldDecorator(`number-${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  // initialValue: 1,
                  rules: [{
                    required: true,
                    message: '请填写数量'
                  }, {
                    pattern: /^\d+$/,
                    message: '非负整数'
                  }]
                })(
                  <InputNumber
                    min={1}
                    placeholder={intl.formatMessage(message.count)}
                    // onChange={this.handlerRoleTransFrom}
                    onChange={(e) => this.numChange(e, k)}
                    onFocus={this.handlerRoleTransFromFocus}
                  />
                )}
                <Icon
                  className='dynamic-delete-button'
                  type='minus-circle-o'
                  disabled={keys.length === 1}
                  onClick={() => this.remove(k)}
                />
                <Tag style={{ marginLeft: '20px' }} color='#2db7f5'>total: { this.itemPrice[k] ? this.itemPrice[k].id * this.itemPrice[k].num : 0 }</Tag>
              </FormItem>
            </Col>
          </Row>
        )
    })


    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.products)}
        >
          {getFieldDecorator('productId', {
            rules: [{ required: true, message: intl.formatMessage(message.products) }]
          })(
            <Cascader
              showSearch
              options={productsOptions}
              placeholder={intl.formatMessage(message.products)}
              expandTrigger='hover'
              onChange={this.handleProChange}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.server_type)}
        >
          {getFieldDecorator('serverType', {
            initialValue: this.state.switch === 1,
            valuePropName: 'checked'
          })(
            <Switch onChange={this.onServerTypeSwitch} checkedChildren={intl.formatMessage(message.mul)} unCheckedChildren={intl.formatMessage(message.qujian)} />
          )}
        </FormItem>

        {
          this.state.switch === 1 ?
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.server)}
            >
              {getFieldDecorator('serverId', {
                rules: [{ required: true, message: intl.formatMessage(message.server_input) }]
              })(
                <TreeSelect
                  treeData={[{
                    label: intl.formatMessage(message.all),
                    value: null,
                    key: intl.formatMessage(message.all),
                    children: this.state.serversOptions
                  }]}
                  showSearch
                  allowClear
                  treeDefaultExpandAll
                  multiple
                  treeCheckable
                  treeNodeFilterProp='label'
                  style={{ maxHeight: 100, overflow: 'auto' }}
                  dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  searchPlaceholder={intl.formatMessage(message.server_input)}
                />
              )}
            </FormItem>
          :
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  {intl.formatMessage(message.server)}&nbsp;
                  <Tooltip
                    title={
                      <div>{intl.formatMessage(message.lianxu)} <i style={{color: '#f11738'}}>e.g：app_001-app_100</i><p>{intl.formatMessage(message.duoduan)} <i style={{color: '#f11738'}}>e.g：app_001-app_002,app_100-app_102</i></p></div>
                    }
                  >
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('serverBlock', {
                rules: [
                  { required: true, message: intl.formatMessage(message.qujian_input) }
                ]
              })(
                <Input type='textarea' placeholder={intl.formatMessage(message.qujian_input)} autosize={{ minRows: 1, maxRows: 5 }} />
              )}
            </FormItem>
        }

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.channel)}
        >
          {getFieldDecorator('channels', {
            rules: [{ required: false, message: intl.formatMessage(message.channel_input) }]
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
              showCheckedStrategy={TreeSelect.SHOW_CHILD}
              style={{ maxHeight: 100, overflow: 'auto' }}
              dropdownStyle={{ maxHeight: 300 }}
              searchPlaceholder={intl.formatMessage(message.channel_input)}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.mailTitle)}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请填写邮件标题' }]
          })(
            <Input placeholder={intl.formatMessage(message.mailTitle)} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.sender)}
        >
          {getFieldDecorator('senderName', {
            rules: [{ required: true, message: '请填写发件人' }],
            initialValue: intl.formatMessage(message.team)
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.mailContext)}
        >
          {getFieldDecorator('context', {
            rules: [{ required: true, message: 'required!', whitespace: true }]
          })(
            <Input type='textarea' placeholder={intl.formatMessage(message.mailContext)} autosize={{ minRows: 3, maxRows: 10 }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.description)}
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'required!', whitespace: true }]
          })(
            <Input type='textarea' placeholder={intl.formatMessage(message.description)} autosize={{ minRows: 3, maxRows: 10 }} />
          )}
        </FormItem>

        {formItems}
        <FormItem {...tailFormItemLayout}>
          <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
            <Icon type='plus' /> {intl.formatMessage(message.item_add)}
          </Button>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.tips)}
        >
          <RuleTransFrom
            value={this.state.ruleTransFrom}
          />
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' disabled={this.totalPrice > this.props.mailMax.list}><FormattedMessage {...message.submit} /></Button>
          <Button type='default' onClick={this.handleReset} style={{marginLeft: '10px'}}><FormattedMessage {...message.reload} /></Button>
        </FormItem>
      </Form>
    )
  }
}

const Add = Form.create()(AddForm)

export default Add
