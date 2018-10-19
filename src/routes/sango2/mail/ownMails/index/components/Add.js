import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { FormattedMessage, defineMessages } from 'react-intl'

import { Form, Input, InputNumber, Tooltip, Icon, Radio, Row, Col, Button, Cascader, Tag } from 'antd'
import { RuleTransFrom } from '../../../../../../components/ruleTransform/RuleTransFrom.js'

const FormItem = Form.Item
const RadioGroup = Radio.Group

const message = defineMessages({
  products_input: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  receivers_input: {
    id: 'FORM.RECEIVERS_INPUT',
    defaultMessage: '多个昵称之间用(,)分隔'
  },

  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  playerId: {
    id: 'FORM.PLAYERID',
    defaultMessage: '玩家ID'
  },
  platformId: {
    id: 'FORM.PLATFORMID',
    defaultMessage: '平台ID'
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
  receiverType: {
    id: 'FORM.RECEIVERTYPE',
    defaultMessage: '玩家格式'
  },
  receivers: {
    id: 'FORM.RECEIVERS',
    defaultMessage: '玩家'
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
    goodPrice: PropTypes.object,
    mailMax: PropTypes.object,
    intl: PropTypes.object,
    curd: PropTypes.object.isRequired,
    options: PropTypes.array,
    goods: PropTypes.array,
    form: PropTypes.object,
    handleCancel: PropTypes.func,
    onAdd: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.itemPrice = {}
    this.totalPrice = 0
  }

  uuid = 0

  products = []

  keys = []

  state = {
    ruleTransFrom: 0,
    products: []
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
    _.map(this.props.goodPrice.options, (val, i) => {
      if (String(val.itemId) == e[0]) { id = val.coin }
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
        value.productId = fieldValues.products[0]
        value.serverIds = fieldValues.products[1]
        if (!fieldValues.products[1]) { value.serverIds = '' }
        value.title = fieldValues.title
        value.senderName = fieldValues.senderName
        value.receiverType = fieldValues.receiverType
        value.receivers = fieldValues.receivers
        value.context = fieldValues.context
        value.description = fieldValues.description
        value.type = 1

        value.rewards = []
        _.map(fieldValues.keys, (val, idx) => {
          value.rewards.push({
            itemId: fieldValues[`item-${val}`][0],
            count: fieldValues[`number-${val}`]
          })
        })
        this.props.onAdd(value)
        this.props.handleCancel()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
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
    const { mailMax } = this.props
    const { curd, intl } = this.props

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

    const userTypeOptions = [
      { label: intl.formatMessage(message.nickname), value: '1' },
      { label: intl.formatMessage(message.playerId), value: '2' },
      { label: intl.formatMessage(message.platformId), value: '3' }
    ]

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
                    onFocus={this.handlerRoleTransFromFocus}
                    onChange={(e) => this.numChange(e, k)}
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
            rules: [{ required: true, message: '请选择产品与服务器(必选)' }]
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
          label={intl.formatMessage(message.receiverType)}
        >
          {getFieldDecorator('receiverType', {
            initialValue: '1',
            rules: [{ required: true, message: '必填!', whitespace: true }]
          })(
            <RadioGroup options={userTypeOptions} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              {intl.formatMessage(message.receivers)}&nbsp;
              <Tooltip title={intl.formatMessage(message.receivers_input)} >
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('receivers', {
            rules: [{ required: true, message: '必填!', whitespace: true }]
          })(
            <Input type='textarea' placeholder={intl.formatMessage(message.receivers_input)} autosize={{ minRows: 3, maxRows: 10 }} />
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

        {
          _.has(curd, '50308')
          ?
            <FormItem {...tailFormItemLayout}>
              <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
                <Icon type='plus' /> {intl.formatMessage(message.item_add)}
              </Button>
            </FormItem>
          :
            ''
        }


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
