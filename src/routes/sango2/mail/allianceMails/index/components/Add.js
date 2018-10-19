import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FormattedMessage, defineMessages } from 'react-intl'

import { Form, Input, InputNumber, Icon, Row, Col, Button, Cascader, Tag } from 'antd'
import { RuleTransFrom } from '../../../../../../components/ruleTransform/RuleTransFrom.js'

const FormItem = Form.Item
const message = defineMessages({
  products_input: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  products: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
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
  alliance: {
    id: 'FORM.ALLIANCE',
    defaultMessage: '联盟名称'
  },
  alliance_input: {
    id: 'FORM.ALLIANCE_INPUT',
    defaultMessage: '请输入联盟名称'
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
    form: PropTypes.object,
    handleCancel: PropTypes.func,
    addAllianceMail: PropTypes.func
  }

  uuid = 0

  products = []

  keys = []

  state = {
    ruleTransFrom: 0,
    products: []
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

  handleReset = () => {
    this.props.form.resetFields()
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        let value = {}
        value.productId = fieldValues.products[0]
        value.serverIds = fieldValues.products[1]
        if (!fieldValues.products[1]) { value.serverIds = '' }
        value.title = fieldValues.title
        value.senderName = fieldValues.senderName
        value.receivers = fieldValues.receivers
        value.context = fieldValues.context
        value.description = fieldValues.description

        value.rewards = []
        _.map(fieldValues.keys, (val, idx) => {
          value.rewards.push({
            itemId: fieldValues[`item-${val}`][0],
            count: fieldValues[`number-${val}`]
          })
        })
        console.log(fieldValues)
        this.props.addAllianceMail(value)
        this.props.handleCancel()
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

  render() {

    const { getFieldDecorator, getFieldValue } = this.props.form
    const { mailMax, intl } = this.props

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
          {getFieldDecorator('products', {
            rules: [{ required: true, message: intl.formatMessage(message.products_input) }]
          })(
            <Cascader
              showSearch
              options={this.props.options}
              placeholder={intl.formatMessage(message.products_input)}
              expandTrigger='hover'
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

        {/* <FormItem
          {...formItemLayout}
          label='渠道'
        >
          {getFieldDecorator('channels', {
            rules: [{ required: false, message: '请选择渠道' }]
          })(
            <TreeSelect
              treeData={[{
                label: '全选',
                value: null,
                key: '全选',
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
              searchPlaceholder='多选渠道'
            />
          )}
        </FormItem> */}
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.alliance)}
        >
          {getFieldDecorator('receivers', {
            rules: [{ required: true, message: 'required!', whitespace: true }]
          })(
            <Input type='textarea' placeholder={intl.formatMessage(message.alliance_input)} autosize={{ minRows: 2, maxRows: 10 }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.mailContext)}
        >
          {getFieldDecorator('context', {
            rules: [{ required: true, message: '必填!', whitespace: true }]
          })(
            <Input type='textarea' placeholder={intl.formatMessage(message.mailContext)} autosize={{ minRows: 3, maxRows: 10 }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.description)}
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: '必填!', whitespace: true }]
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
          <Button type='primary' htmlType='submit' disabled={this.totalPrice > mailMax.list}><FormattedMessage {...message.submit} /></Button>
          <Button type='default' onClick={this.handleReset} style={{marginLeft: '10px'}}><FormattedMessage {...message.reload} /></Button>
        </FormItem>
      </Form>
    )
  }
}

const Add = Form.create()(AddForm)

export default Add
