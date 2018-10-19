import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Icon, Button, Row, Col, Cascader, Tag } from 'antd'
import _ from 'lodash'
import { FormattedMessage, defineMessages } from 'react-intl'

const FormItem = Form.Item
const { TextArea } = Input

let uuid = 0
const message = defineMessages({
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
  desc_tip: {
    id: 'TIPS.DESC',
    defaultMessage: '仅管理台可见'
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

class AddBatchmail extends Component {

  static propTypes = {
    intl: PropTypes.object,
    form: PropTypes.object,
    goodPrice: PropTypes.object,
    mailMax: PropTypes.object,
    item: PropTypes.array,
    handleCreate: PropTypes.func,
    onAdd: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.itemPrice = {}
    this.totalPrice = 0
  }

  componentWillMount() {
    // this.props.clearBatchmailAdd()
  }

  componentWillUnmount() {
    uuid = 0
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let value = {}
        value.title = fieldsValue.title
        value.context = fieldsValue.context
        value.description = fieldsValue.description
        value.rewards = []
        _.map(fieldsValue.keys, (val, idx) => {
          value.rewards.push({
            itemId: fieldsValue[`itemId-${val}`][0],
            count: fieldsValue[`count-${val}`]
          })
        })
        this.props.handleCreate(value)
        this.props.onAdd()
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
    if (keys.length >= 4) { return }
    uuid++
    this.itemPrice[uuid] = { num: 0, id: 0 }
    const nextKeys = keys.concat(uuid)
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  numChange = (e, v) => {
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

  render() {
    const { form: { getFieldDecorator, getFieldValue }, mailMax, intl } = this.props
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

    // 添加模块
    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      return (
        <Row key={k}>
          <Col span='12'>
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
                  options={this.props.item}
                  placeholder={intl.formatMessage(message.item)}
                  showSearch
                  onChange={(e) => this.itemChange(e, k)}
                />
              )}
            </FormItem>
          </Col>
          <Col span='12'>
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
                  onChange={(e) => this.numChange(e, k)}
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
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label={intl.formatMessage(message.mailTitle)}
        >
          { getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入邮件标题' }]
          })(
            <Input placeholder={intl.formatMessage(message.mailTitle)} />
          )}
        </FormItem>
        <FormItem
          label={intl.formatMessage(message.mailContext)}
        >
          { getFieldDecorator('context', {
            rules: [{ required: true, message: '请输入邮件内容' }]
          })(
            <TextArea
              rows={4}
              placeholder={intl.formatMessage(message.mailContext)}
            />
          )}
        </FormItem>
        <FormItem
          label={`${intl.formatMessage(message.description)}(${intl.formatMessage(message.desc_tip)})`}
        >
          { getFieldDecorator('description', {
            rules: [{ required: true, message: '请输入描述' }]
          })(
            <TextArea
              rows={4}
              placeholder={intl.formatMessage(message.description)}
            />
          )}
        </FormItem>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type='dashed' onClick={this.add} style={{ width: '60%' }}>
            <Icon type='plus' /> {intl.formatMessage(message.item_add)}
          </Button>
        </FormItem>
        <FormItem>
          {/* <Tag style={{ marginLeft: '20px' }} color='#2db7f5'>total: { this.totalPrice }</Tag> */}
          <Button type='primary' htmlType='submit' disabled={this.totalPrice > mailMax.list}><FormattedMessage {...message.submit} /></Button>
        </FormItem>
      </Form>
    )
  }
}

const Add = Form.create()(AddBatchmail)

export default Add
