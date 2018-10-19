import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Button, Tooltip, Icon, Row, Col, Card } from 'antd'
import _ from 'lodash'
import { FormattedMessage, defineMessages } from 'react-intl'

const FormItem = Form.Item


const message = defineMessages({
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  playerId: {
    id: 'FORM.PLAYERID',
    defaultMessage: '玩家ID'
  },
  templateId: {
    id: 'FORM.TEMPLATEID',
    defaultMessage: '模板ID'
  },
  purchase: {
    id: 'FORM.PURCHASE',
    defaultMessage: '购买物品'
  },
  goodcount: {
    id: 'FORM.GOODCOUNT',
    defaultMessage: '物品数量'
  },
  nickname_input: {
    id: 'FORM.NICKNAME_INPUT',
    defaultMessage: '请输入玩家昵称'
  },
  playerId_input: {
    id: 'FORM.PLAYERID_INPUT',
    defaultMessage: '请输入玩家ID'
  },
  templateId_input: {
    id: 'FORM.TEMPLATEID_INPUT',
    defaultMessage: '请输入模板ID'
  },
  purchase_input: {
    id: 'FORM.PURCHASE_INPUT',
    defaultMessage: '请输入购买物品'
  },
  goodcount_input: {
    id: 'FORM.GOODCOUNT_INPUT',
    defaultMessage: '请输入物品数量'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  templateId_PS: {
    id: 'TEMPLATEID_PS',
    defaultMessage: '模板 ID 说明：活动礼包类的充值，需要查找对应活动开启的模板 Id，非活动礼包类的充值，模板 Id 填 -1'
  },
  goodcount_PS: {
    id: 'GOODCOUNT_PS',
    defaultMessage: '物品数量说明：默认值为 1，取值范围 0 ~ 50，超出该范围则取默认值 1'
  },
  gift: {
    id: 'GIFT',
    defaultMessage: '礼包内容'
  }
})


class RechargeModal extends Component {
  state = {
    currentItem: {},
    list: ''
  }

  componentWillMount() {
    const { currentItem } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { initials } = this.props
      if (!err) {
        let data = {}
        data.playerId = values.playerId
        data.templateId = values.templateId
        if (values.level) data.level = values.level
        data.purchaseId = values.purchases[0]
        data.count = values.count

        let posts = {
          form: data,
          path: initials.products
        }

        this.props.onRecharge(posts)
        this.props.onSubmitting()
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      list: e[0]
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, intl } = this.props
    let detail = this.state.currentItem
    let groupList = []
    _.map(options.recharge.groupList, (v, i) => {
      if (String(v.rechargeId) === this.state.list) {
        groupList = v.rechargeList
      }
    })

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    }

    const itemsLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label={intl.formatMessage(message.nickname)}>
          {getFieldDecorator('nickname', {
            initialValue: detail.nickname ? detail.nickname : '',
            rules: [{ required: true, message: '请填写玩家昵称!' }]
          })(<Input placeholder={intl.formatMessage(message.nickname_input)} disabled />)}
        </FormItem>

        <FormItem {...formItemLayout} label={intl.formatMessage(message.playerId)}>
          {getFieldDecorator('playerId', {
            initialValue: detail.playerId ? detail.playerId : '',
            rules: [{ required: true, message: '请填写玩家 ID!' }]
          })(
            <InputNumber
              placeholder={intl.formatMessage(message.playerId_input)}
              disabled
              style={{ width: '100%' }}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={
            <span>
              <Tooltip title={intl.formatMessage(message.templateId_PS)}>
                <FormattedMessage {...message.templateId} />&nbsp;<Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('templateId', {
            initialValue: -1,
            rules: [{ required: true, message: '请填写模板 ID!' }]
          })(<InputNumber placeholder={intl.formatMessage(message.templateId_input)} style={{ width: '100%' }} />)}
        </FormItem>

        {/* <FormItem
          {...formItemLayout}
          label={(
            <span>
              <Tooltip title='等级说明：超值锦囊 6 元对应等级 1，超值锦囊 68 元对应等级 2'>
                等级&nbsp;<Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('level', {
            rules: [{ required: false, message: '请填写等级!' }]
          })(
            <InputNumber min={0} placeholder='请填写等级' style={{ width: '100%' }} />
          )}
        </FormItem> */}

        <FormItem {...formItemLayout} label={intl.formatMessage(message.purchase)}>
          {getFieldDecorator('purchases', {
            rules: [{ type: 'array', required: true, message: '请选择购买物品' }]
          })(
            <Cascader
              options={options.purchases.list}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.purchase_input)}
              onChange={this.handleChange}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={
            <span>
              <Tooltip title={intl.formatMessage(message.goodcount_PS)}>
                <FormattedMessage {...message.goodcount} />&nbsp;<Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('count', {
            initialValue: 1,
            rules: [{ required: true, message: '请填写物品数量!' }]
          })(
            <InputNumber
              min={0}
              formatter={value => (value >= 0 && value <= 50 ? value : 1)}
              placeholder={intl.formatMessage(message.goodcount_input)}
              style={{ width: '100%' }}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            <FormattedMessage {...message.submit} />
          </Button>
        </FormItem>

        {
          groupList.length > 0 &&
          <Card style={{ marginBottom: 50 }} title={intl.formatMessage(message.gift)} bordered={false} noHovering={false}>
            {
              _.map(groupList, v => {
                return (
                  <Row key={v.rechargeId} type='flex' justify='center'>
                    <Col xs={{span: 24, offset: 0}} sm={{span: 8}}>
                      <FormItem {...itemsLayout} label={intl.formatMessage(message.purchase)}>
                        {getFieldDecorator('itemId', {
                          initialValue: [String(v.rechargeId)]
                        })(
                          <Cascader
                            options={options.purchases.list}
                            disabled
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col xs={{span: 24, offset: 0}} sm={{span: 8}}>
                      <FormItem {...itemsLayout} label={intl.formatMessage(message.goodcount)}>
                        {getFieldDecorator('itemNumber', {
                          initialValue: v.count
                        })(
                          <Input
                            disabled
                          />
                        )}
                      </FormItem>
                    </Col>
                  </Row>
                )
              })
            }
          </Card>
        }
      </Form>
    )
  }
}

RechargeModal.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func,
  onRecharge: PropTypes.func
}

const Modal = Form.create()(RechargeModal)

export default Modal
