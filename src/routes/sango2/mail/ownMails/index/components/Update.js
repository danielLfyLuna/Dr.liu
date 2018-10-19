import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Icon, Button, Row, Col, Cascader, Tag } from 'antd'
import _ from 'lodash'
import { defineMessages } from 'react-intl'

import { RuleTransFrom } from '../../../../../../components/ruleTransform/RuleTransFrom.js'

const FormItem = Form.Item
const { TextArea } = Input
const RadioGroup = Radio.Group

let uuid = 0
const message = defineMessages({
  mail0: {
    id: 'STATUS.MAIL.0',
    defaultMessage: '未发送'
  },
  mail1: {
    id: 'STATUS.MAIL.1',
    defaultMessage: '发送成功'
  },
  mail2: {
    id: 'STATUS.MAIL.2',
    defaultMessage: '发送失败'
  },
  mail3: {
    id: 'STATUS.MAIL.3',
    defaultMessage: '审核中'
  },
  mail4: {
    id: 'STATUS.MAIL.4',
    defaultMessage: '审核通过'
  },
  mail5: {
    id: 'STATUS.MAIL.5',
    defaultMessage: '审核未通过'
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
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  products: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  servers: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
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
    id: 'FORM.SENDER_MAIL',
    defaultMessage: '(邮件内)发件人'
  },
  type: {
    id: 'FORM.RECEIVERTYPE',
    defaultMessage: '邮件格式'
  },
  description: {
    id: 'FORM.DESCRIPTION',
    defaultMessage: '描述'
  },
  receiver: {
    id: 'FORM.RECEIVERS',
    defaultMessage: '玩家'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  item_add: {
    id: 'BUTTON.ITEM_ADD',
    defaultMessage: '添加道具'
  },
  tip: {
    id: 'FORM.TIPS',
    defaultMessage: '友情提示'
  }
})

class UpdateMail extends Component {

  static propTypes = {
    intl: PropTypes.object,
    curd: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    mailMax: PropTypes.object,
    goodPrice: PropTypes.object,
    goods: PropTypes.array,
    options: PropTypes.array,
    updateOwnMail: PropTypes.func,
    handleCancel: PropTypes.func
  }

  state = {
    num: [],
    ruleTransFrom: 0
  }

  constructor(props) {
    super(props)
    this.itemPrice = {}
    this.totalPrice = 0
  }

  componentWillMount() {
    uuid = this.props.data.rewards.length
    let numbers = []
    // for (let i = 0 ; i < this.props.data.rewards.length ; i++) {
    //   numbers.push(i + 1)
    // }
    this.props.data.rewards.forEach((v, i) => {
      numbers.push(i + 1)
      let id = 0
      _.map(this.props.goodPrice.options, (val, idx) => {
        if (val.itemId == v.itemId) { id = val.coin }
      })
      this.itemPrice[i + 1] = {
        id: id,
        num: this.props.data.rewards[i].count
      }
     })
    // _.map(numbers, (v, i) => {
    //   this.itemPrice[v] = {
    //     id: 50,
    //     num: this.props.data.rewards[i].count
    //   }
    // })
    this.totalPrice = _.reduce(this.itemPrice, (res, opt) => {
      return res + opt.num * opt.id
    }, 0)
    this.setState({
      num: numbers
    })
  }

  componentWillUnmount() {
    uuid = 0
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {

      if (!err) {
        let values = {}
        values.id = this.props.data.id
        values.productId = fieldsValue.productId[0]
        values.serverIds = fieldsValue.serverIds[0]
        values.title = fieldsValue.title
        values.senderName = fieldsValue.senderName
        values.context = fieldsValue.context
        values.receiverType = fieldsValue.receiverType
        values.receivers = fieldsValue.receivers
        values.description = fieldsValue.description
        values.rewards = []
        _.map(fieldsValue.keys, (val, idx) => {
          values.rewards.push({
            itemId: fieldsValue[`itemId-${val}`][0],
            count: fieldsValue[`count-${val}`]
          })
        })

        this.props.updateOwnMail(values)
        this.props.handleCancel()
      }
    })
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
    uuid++
    this.itemPrice[uuid] = { num: 0, id: 0 }
    const nextKeys = keys.concat(uuid)
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
    const {getFieldDecorator, getFieldValue} = this.props.form
    const { mailMax } = this.props
    const { curd, intl } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
    const formItemLayoutWithOutLabel = {
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

    // 处理状态数据显示格式
    let statusItem = ''
    if (this.props.data.status === 0) { statusItem = intl.formatMessage(message.mail0) }
    if (this.props.data.status === 1) { statusItem = intl.formatMessage(message.mail1) }
    if (this.props.data.status === 2) { statusItem = intl.formatMessage(message.mail2) }
    if (this.props.data.status === 3) { statusItem = intl.formatMessage(message.mail3) }
    if (this.props.data.status === 4) { statusItem = intl.formatMessage(message.mail4) }
    if (this.props.data.status === 5) { statusItem = intl.formatMessage(message.mail5) }

    // 服务器下拉列表
    let serverItems = []
    _.map(this.props.options, (val, idx) => {
      if (val.value === this.props.data.productId) {
        serverItems = val.children
      }
    })

    // 玩家格式
    const userTypeOptions = [
      { label: intl.formatMessage(message.nickname), value: '1' },
      { label: intl.formatMessage(message.playerId), value: '2' },
      { label: intl.formatMessage(message.platformId), value: '3' }
    ]

    // 添加模块
    getFieldDecorator('keys', { initialValue: this.props.data.rewards ? this.state.num : [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      if (this.props.data.rewards
        && this.props.data.rewards.length > 0
        && k <= this.props.data.rewards.length
      ) {
        return (
          <Row key={k}>
            <Col span='12' offset={3}>
              <FormItem
                {...formItemLayout}
                label={intl.formatMessage(message.item) + k}
                required={false}
              >
                {getFieldDecorator(`itemId-${k}`, {
                  rules: [{
                    required: true,
                    message: '请选择道具'
                  }],
                  initialValue: [String(this.props.data.rewards[index].itemId)]
                })(
                  <Cascader
                    options={this.props.goods}
                    placeholder={intl.formatMessage(message.item)}
                    showSearch
                    onChange={(e) => this.itemChange(e, k)}
                  />
                )}
              </FormItem>
            </Col>
            <Col span='8'>
              <FormItem
                {...formItemLayout}
                label={intl.formatMessage(message.count) + k}
                required={false}
              >
                {getFieldDecorator(`count-${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: this.props.data.rewards[index].count,
                  rules: [{
                    required: true,
                    message: '请输入数量(整数)',
                    pattern: /^\d+$/
                  }]
                })(
                  <InputNumber
                    placeholder={intl.formatMessage(message.count)}
                    // onChange={this.handlerRoleTransFrom}
                    onChange={(e) => this.numChange(e, k)}
                    onFocus={this.handlerRoleTransFromFocus}
                  />
                )}
                <Icon
                  style={{marginLeft: '20px'}}
                  type='minus-circle-o'
                  onClick={() => this.remove(k)}
                />
                <Tag style={{ marginLeft: '20px' }} color='#2db7f5'>total: { this.itemPrice[k] ? this.itemPrice[k].id * this.itemPrice[k].num : 0 }</Tag>
              </FormItem>
            </Col>
          </Row>
        )
      } else {
        return (
          <Row key={k}>
            <Col span='12' offset={3}>
              <FormItem
                {...formItemLayout}
                label={intl.formatMessage(message.item) + k}
                required={false}
              >
                {getFieldDecorator(`itemId-${k}`, {
                  rules: [{
                    required: true,
                    message: '请选择道具'
                  }]
                })(
                  <Cascader
                    options={this.props.goods}
                    placeholder={intl.formatMessage(message.item)}
                    onChange={(e) => this.itemChange(e, k)}
                    showSearch
                  />
                )}
              </FormItem>
            </Col>
            <Col span='8'>
              <FormItem
                {...formItemLayout}
                label={intl.formatMessage(message.count) + k}
                required={false}
              >
                {getFieldDecorator(`count-${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{
                    required: true,
                    message: '请输入数量(整数)',
                    pattern: /^\d+$/
                  }]
                })(
                  <InputNumber
                    placeholder={intl.formatMessage(message.count)}
                    // onChange={this.handlerRoleTransFrom}
                    onChange={(e) => this.numChange(e, k)}
                    onFocus={this.handlerRoleTransFromFocus}
                  />
                )}
                <Icon
                  style={{marginLeft: '20px'}}
                  type='minus-circle-o'
                  onClick={() => this.remove(k)}
                />
                <Tag style={{ marginLeft: '20px' }} color='#2db7f5'>total: { this.itemPrice[k] ? this.itemPrice[k].id * this.itemPrice[k].num : 0 }</Tag>
              </FormItem>
            </Col>
          </Row>
        )
      }
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.products)}
        >
          {getFieldDecorator('productId', {
            initialValue: [this.props.data.productId]
          })(
            <Cascader
              options={this.props.options}
              disabled
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.servers)}
        >
          {getFieldDecorator('serverIds', {
            rules: [{ required: true, message: '请选择服务器' }],
            initialValue: [this.props.data.serverIds]
          })(
            <Cascader
              disabled
              options={serverItems}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.mailTitle)}
        >
          { getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入邮件标题' }],
            initialValue: this.props.data.title
          })(
            <Input placeholder={intl.formatMessage(message.mailTitle)} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.sender)}
        >
          {getFieldDecorator('senderName', {
            rules: [{ required: true, message: '请输入发件人名字' }],
            initialValue: this.props.data.senderName
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.mailContext)}
        >
          { getFieldDecorator('context', {
            rules: [{ required: true, message: '请输入邮件内容' }],
            initialValue: this.props.data.context
          })(
            <TextArea
              autosize={{ minRows: 3, maxRows: 6 }}
              placeholder={intl.formatMessage(message.mailContext)}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.type)}
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
          label={intl.formatMessage(message.receiver)}
        >
          {getFieldDecorator('receivers', {
            initialValue: this.props.data.receivers
          })(
            <TextArea
              autosize={{ minRows: 3, maxRows: 6 }}
              placeholder={intl.formatMessage(message.receiver)}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.description)}
        >
          { getFieldDecorator('description', {
            rules: [{ required: true, message: '请输入描述' }],
            initialValue: this.props.data.description
          })(
            <TextArea
              autosize={{ minRows: 3, maxRows: 6 }}
              placeholder={intl.formatMessage(message.description)}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.status)}
        >
          {getFieldDecorator('status', {
            initialValue: statusItem
          })(
            <Input disabled />
          )}
        </FormItem>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          {
            _.has(curd, '50308')
            ?
              <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
                <Icon type='plus' /> {intl.formatMessage(message.item_add)}
              </Button>
            :
              ''
          }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.tip)}
        >
          <RuleTransFrom
            value={this.state.ruleTransFrom}
          />
        </FormItem>

        {
          _.has(curd, '50308')
          ?
            <FormItem>
              <Button type='primary' htmlType='submit' disabled={this.totalPrice > mailMax.list}>{intl.formatMessage(message.submit)}</Button>
            </FormItem>
          :
            ''
        }

      </Form>
    )
  }
}

const Update = Form.create()(UpdateMail)

export default Update
