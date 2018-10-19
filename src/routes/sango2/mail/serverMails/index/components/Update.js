import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Icon, Button, Row, Col, Cascader, TreeSelect, Tag } from 'antd'
import { FormattedMessage, defineMessages } from 'react-intl'
import _ from 'lodash'

import { RuleTransFrom } from '../../../../../../components/ruleTransform/RuleTransFrom.js'

const FormItem = Form.Item
const { TextArea } = Input

let uuid = 0
const message = defineMessages({
  products_input: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
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
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
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
  receiver_alliance: {
    id: 'FORM.REVEIVER_ALLIANCE',
    defaultMessage: '原始收件人(联盟)'
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
  },
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
  }
})


class UpdateMail extends Component {

  static propTypes = {
    intl: PropTypes.object,
    mailMax: PropTypes.object,
    goodPrice: PropTypes.object,
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    goods: PropTypes.array,
    options: PropTypes.array,
    channels: PropTypes.array,
    updateServerEmail: PropTypes.func,
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
        if (!fieldsValue.serverIds) { fieldsValue.serverIds = [] }
        values.serverIds = fieldsValue.serverIds.join(',')
        if (!fieldsValue.channels) { fieldsValue.channels = [] }
        fieldsValue.channels.length > 0 && (values.channels = fieldsValue.channels.join(','))
        values.title = fieldsValue.title
        values.senderName = fieldsValue.senderName
        values.context = fieldsValue.context
        values.description = fieldsValue.description
        values.rewards = []
        _.map(fieldsValue.keys, (val, idx) => {
          values.rewards.push({
            itemId: fieldsValue[`itemId-${val}`][0],
            count: fieldsValue[`count-${val}`]
          })
        })

        this.props.updateServerEmail(values)
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
    const { intl } = this.props
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

    let channelsItem = []
    if (this.props.data.channels) { channelsItem = this.props.data.channels.split(',') }

    // 服务器下拉列表
    let serverOptions = []
    _.map(this.props.options, (val, idx) => {
      if (val.value === this.props.data.productId) {
        serverOptions = val.children
      }
    })
    let serverItems = this.props.data.serverIds.split(',')

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
          label={intl.formatMessage(message.server)}
        >
          {getFieldDecorator('serverIds', {
            rules: [{ required: true, message: '请选择服务器' }],
            initialValue: serverItems
          })(
            <TreeSelect
              treeData={[{
                label: intl.formatMessage(message.all),
                value: null,
                key: intl.formatMessage(message.all),
                children: serverOptions
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

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.channel)}
        >
          {getFieldDecorator('channels', {
            rules: [{ required: false, message: intl.formatMessage(message.channel_input) }],
            initialValue: channelsItem
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
          { getFieldDecorator('title', {
            rules: [{ required: true, message: intl.formatMessage(message.mailTitle) }],
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
        <FormItem>
          <Button type='primary' htmlType='submit' disabled={this.totalPrice > this.props.mailMax.list}><FormattedMessage {...message.submit} /></Button>
        </FormItem>
      </Form>
    )
  }
}

const Update = Form.create()(UpdateMail)

export default Update
