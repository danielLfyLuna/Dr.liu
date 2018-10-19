import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Button, DatePicker } from 'antd'
const FormItem = Form.Item
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

class PlayersModal extends Component {
  state = {
    currentItem: {},
    modalType: '',
    select: true
  }

  componentWillMount() {
    this.props.onRender({ renderState: false })
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: currentItem,
      modalType: modalType
    })
    this.props.fetchGameSaleJoinTypes({
      path: { type: currentItem.joinType }
    })
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { initials } = this.props
      if (!err) {
        let data = {}
        data.playerId = values.playerId
        data.nickname = values.nickname
        data.birthday = values.birthday.format('YYYY-MM-DD')
        if (values.phoneNum) data.phoneNum = values.phoneNum
        data.qq = values.qq
        data.joinType = values.joinTypes[0]
        data.gsManagerId = values.gsManagers[0]

        let posts = {
          form: data,
          path: { ...initials.products, playerId: data.playerId }
        }

        if (this.state.modalType === 'update') {
          this.props.onUpdate(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  _joinReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.id, label: `${option.name} (${option.id})` })
      return result
    }, [])
  }

  render() {
    const { form: { getFieldDecorator }, gamesale, options, initials } = this.props

    const initialValues = this.state.currentItem
    const show = this.state.modalType === 'detail'
    options.join.list = this._joinReduce(gamesale.joinTypes)

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

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label='玩家 ID'
        >
          {getFieldDecorator('playerId', {
            initialValue: initialValues.playerId,
            rules: [{ required: true, message: '请填写玩家 ID!' }]
          })(
            <InputNumber placeholder='请填写玩家 ID' disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='玩家昵称'
        >
          {getFieldDecorator('nickname', {
            initialValue: initialValues.nickname,
            rules: [{ required: true, message: '请填写玩家昵称!' }]
          })(
            <Input placeholder='请填写玩家昵称' disabled />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='生日'
        >
          {getFieldDecorator('birthday', {
            initialValue: moment(initialValues.birthday),
            rules: [{ required: false, message: '请选择生日!' }]
          })(
            <DatePicker
              format='YYYY-MM-DD'
              disabled={show}
              placeholder='请选择生日'
              style={{ width: '100%' }}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='电话'
        >
          {getFieldDecorator('phoneNum', {
            initialValue: initialValues.phoneNum,
            rules: [
              { required: false, message: '请填写电话!' },
              { pattern: /^1(3|4|5|7|8)[0-9]\d{8}$/i, message: '请填写有效的手机号' }
            ]
          })(
            <Input disabled={show} placeholder='请填写电话' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='QQ'
        >
          {getFieldDecorator('qq', {
            initialValue: initialValues.qq,
            rules: [
              { required: false, message: '请填写 QQ!' },
              { pattern: /^[1-9]\d{4,9}$/, message: '请填写有效的 QQ 号' }
            ]
          })(
            <Input disabled={show} placeholder='请填写 QQ' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='类型'
        >
          {getFieldDecorator('joinTypes', {
            initialValue: [initialValues.joinType],
            rules: [{ type: 'array', required: true, message: '请选择类型' }]
          })(
            <Cascader
              options={initials.enum.gsTypes}
              showSearch
              expandTrigger='hover'
              disabled={show}
              placeholder='请选择类型'
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='接入成员'
        >
          {getFieldDecorator('gsManagers', {
            initialValue: [initialValues.gsManagerId],
            rules: [{ type: 'array', required: true, message: '请选择接入成员' }]
          })(
            <Cascader
              options={options.join.list}
              showSearch
              expandTrigger='hover'
              disabled={show}
              placeholder='请选择接入成员'
            />
          )}
        </FormItem>
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='VIP 等级'
          >
            {getFieldDecorator('vipLevel', {
              initialValue: initialValues.vipLevel,
              rules: [{ required: false, message: '请填写 VIP 等级!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写 VIP 等级' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='战力'
          >
            {getFieldDecorator('fightCapactity', {
              initialValue: initialValues.fightCapactity,
              rules: [{ required: false, message: '请填写战力!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写战力' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='备注'
          >
            {getFieldDecorator('remarks', {
              initialValue: initialValues.remarks,
              rules: [{ required: false, message: '请填写备注!' }]
            })(
              <Input disabled={show} placeholder='请填写备注' />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='产品/服务器'
          >
            {getFieldDecorator('products', {
              initialValue: [initialValues.productId, initialValues.serverId],
              rules: [{ type: 'array', required: true, message: '请选择产品/服务器' }]
            })(
              <Cascader
                options={options.products.list}
                showSearch
                expandTrigger='hover'
                disabled={show}
                placeholder='请选择产品/服务器'
              />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='UID'
          >
            {getFieldDecorator('uid', {
              initialValue: initialValues.uid,
              rules: [{ required: false, message: '请填写UID!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写UID' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='总计充值'
          >
            {getFieldDecorator('totalRecharge', {
              initialValue: initialValues.totalRecharge,
              rules: [{ required: false, message: '请填写总计充值!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写总计充值' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        { show &&
          <FormItem
            {...formItemLayout}
            label='当天充值'
          >
            {getFieldDecorator('currDayRecharge', {
              initialValue: initialValues.currDayRecharge,
              rules: [{ required: false, message: '请填写当天充值!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写当天充值' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='昨天充值'
          >
            {getFieldDecorator('yesterdayRecharge', {
              initialValue: initialValues.yesterdayRecharge,
              rules: [{ required: false, message: '请填写昨天充值!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写昨天充值' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='当月充值'
          >
            {getFieldDecorator('currMonthRecharge', {
              initialValue: initialValues.currMonthRecharge,
              rules: [{ required: false, message: '请填写当月充值!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写当月充值' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='纳入后充值'
          >
            {getFieldDecorator('afterRecharge', {
              initialValue: initialValues.afterRecharge,
              rules: [{ required: false, message: '请填写纳入后充值!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写纳入后充值' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='未充值天数'
          >
            {getFieldDecorator('nonRechargeDays', {
              initialValue: initialValues.nonRechargeDays,
              rules: [{ required: false, message: '请填写未充值天数!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写未充值天数' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='未登录天数'
          >
            {getFieldDecorator('nonLoginDays', {
              initialValue: initialValues.nonLoginDays,
              rules: [{ required: false, message: '请填写未登录天数!' }]
            })(
              <InputNumber min={0} disabled={show} placeholder='请填写未登录天数' style={{ width: '100%' }} />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='加入 GS 日期'
          >
            {getFieldDecorator('joinGSDate', {
              initialValue: moment(initialValues.joinGSDate),
              rules: [{ type: 'object', required: false, message: '请选择加入 GS 日期!' }]
            })(
              <DatePicker
                showTime
                format='YYYY-MM-DD HH:mm:ss'
                disabled={show}
                placeholder='请选择加入 GS 日期'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
        }
        {
          show &&
          <FormItem
            {...formItemLayout}
            label='最后登录日期'
          >
            {getFieldDecorator('lastLoginDate', {
              initialValue: moment(initialValues.lastLoginDate),
              rules: [{ type: 'object', required: false, message: '请选择最后登录日期!' }]
            })(
              <DatePicker
                showTime
                format='YYYY-MM-DD HH:mm:ss'
                disabled={show}
                placeholder='请选择最后登录日期'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
        }
        {
          !show &&
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>提交</Button>
          </FormItem>
        }
      </Form>
    )
  }
}

PlayersModal.propTypes = {
  form: PropTypes.object,
  gamesale: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func,
  onUpdate: PropTypes.func,
  onRender: PropTypes.func,
  fetchGameSaleJoinTypes: PropTypes.func
}

const Modal = Form.create()(PlayersModal)

export default Modal
