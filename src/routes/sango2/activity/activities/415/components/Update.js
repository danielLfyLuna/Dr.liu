import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { Form, Input, Cascader, Button, DatePicker, InputNumber, TreeSelect, Switch } from 'antd'
import _ from 'lodash'
const FormItem = Form.Item
const { RangePicker } = DatePicker
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

let productOpt = []
let serverOpt = []
let goodOpt = []
let itemsOpt = []
let rewardList = []
const message = defineMessages({
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  skill: {
    id: 'STATUS.GOODS.1',
    defaultMessage: '技能'
  },
  person: {
    id: 'STATUS.GOODS.2',
    defaultMessage: '武将'
  },
  activityId: {
    id: 'FORM.GIFT_ID',
    defaultMessage: '礼包ID'
  },
  name: {
    id: 'TABLE.NAME',
    defaultMessage: '名称'
  },
  activityId_last: {
    id: 'FORM.GIFT_ID_LAST',
    defaultMessage: '前一个礼包ID'
  },
  description: {
    id: 'FORM.DESCRIPTION',
    defaultMessage: '描述'
  },
  clientValue: {
    id: 'FORM.CLIENTVALUE',
    defaultMessage: '客户端显示值'
  },
  diamond: {
    id: 'FORM.DIAMOND',
    defaultMessage: '钻石'
  },
  diamond_system: {
    id: 'FORM.DIAMOND_SYSTEM',
    defaultMessage: '系统钻石'
  },
  rmb: {
    id: 'TABLE.RMB',
    defaultMessage: '人民币'
  },
  vip: {
    id: 'FORM.VIP_EXP',
    defaultMessage: 'VIP成长值'
  },
  target: {
    id: 'FORM.TARGETVALUE',
    defaultMessage: '目标值'
  },
  complete: {
    id: 'FORM.COMPLETECONDITION',
    defaultMessage: '完成条件'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  addItem: {
    id: 'BUTTON.ITEM_ADD',
    defaultMessage: '添加道具'
  },
  delete: {
    id: 'BUTTON.GIFT_DELETE',
    defaultMessage: '删除礼包'
  },
  activity_type: {
    id: 'FORM.ACTIVITY_TYPE',
    defaultMessage: '活动类型'
  },
  activity: {
    id: 'FORM.ACTIVITY_ID',
    defaultMessage: '活动ID'
  },
  activity_last: {
    id: 'FORM.ACTIVITY_ID_LAST',
    defaultMessage: '前一个活动ID'
  },
  activity_name: {
    id: 'FORM.ACTIVITY_NAME',
    defaultMessage: '活动名称'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  openCondition: {
    id: 'FORM.OPENCONDITION',
    defaultMessage: '开启条件'
  },
  visibleCondition: {
    id: 'FORM.VISIBLECONDITION',
    defaultMessage: '开启条件'
  },
  type: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
  },
  time: {
    id: 'FORM.START&END',
    defaultMessage: '开始&结束'
  },
  afterday: {
    id: 'STATUS.OPENCONDITION.1.AFTERDAY',
    defaultMessage: '{X}天后开启'
  },
  lastday: {
    id: 'STATUS.OPENCONDITION.1.LASTDAY',
    defaultMessage: '持续天数'
  },
  clear: {
    id: 'FORM.CLEARSERVICEDATA',
    defaultMessage: '清理业务数据'
  },
  add: {
    id: 'BUTTON.GIFT_ADD',
    defaultMessage: '添加礼包'
  },
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  all: {
    id: 'CHOOSE_ALL',
    defaultMessage: '全选'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})

class UpdateForm extends Component {
  state = {
    initials: {
      products: {
        productId: 0
      },
      config: {
        openCondition: 1001,
        openTypes: { 1001: 'fixed', 1002: 'after' }
      },
      conf: {
        goodTypes: { 'item': 0, 'skill': 4, 'soldier': 5 },
        level: 0
      },
      map: {
        goodTypes: { 0: this.props.intl.formatMessage(message.item), 4: this.props.intl.formatMessage(message.skill), 5: this.props.intl.formatMessage(message.person) }
      },
      enum: {
        goodTypes: [
          { label: this.props.intl.formatMessage(message.item), value: 0 },
          { label: this.props.intl.formatMessage(message.skill), value: 4 },
          { label: this.props.intl.formatMessage(message.person), value: 5 }
        ]
      }
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchGoodsMap(this.props.location.query)
  }

  _activityReducer = (options, templateId) => {
    return _.reduce(options, (result, option) => {
      if (option.templateId === templateId) {
        result = option
      }
      return result
    }, {})
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  _serverReduce = (options, productId) => {
    return _.reduce(options, (result, option) => {
      if (option.value === productId) {
        result = _.reduce(option.children, (res, opt) => {
          res.push({ value: opt.value, label: opt.label })
          return res
        }, [])
      }
      return result
    }, [])
  }

  _goodReduce = (options, types) => {
    let goods = []
    _.reduce(options, (result, option, index) => {
      let gds = []
      _.reduce(option, (res, opt, idx) => {
        res.push({ value: Number(idx), label: `${opt} (${idx})` })
        return res
      }, gds)
      result.push({ value: Number(index), label: `${types[index]} (${index})`, children: gds })
      return result
    }, goods)
    return goods
  }

  _itemReduce = (options, types) => {
    return _.reduce(options, (result, option) => {
      if (types.includes(option.value)) {
        result.push(option)
      }
      return result
    }, [])
  }

  _numFormat = (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  _numParse = (value) => value.toString().replace(/\$\s?|(,*)/g, '')

  handleProductSelect = (product) => {
    serverOpt = this._serverReduce(this.props.products.options, product[0])
    this.props.fetchGoodsMap({ productId: product[0] })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      let detail = this._activityReducer(this.props.activities.list, Number(this.props.location.query.templateId))
      let data = {}
      data.activityItems = _.reduce(values.activityItems, (result, option, index) => {
        let obj = {}
        obj.activityItemId = option.activityItemId
        obj.description = option.description
        obj.clientValue = option.clientValue
        obj.coin = option.coin
        obj.coinToken = option.coinToken
        obj.rmb = option.rmb
        obj.vipValue = option.vipValue
        obj.targetValue = option.targetValue
        obj.completeConditionIds = detail.activityItems[index].completeConditionIds
        obj.rewardList = _.reduce(option.rewardList, (res, opt) => {
          res.push({
            num: opt.num,
            type: opt.items.length ? Number(opt.items[0]) : opt.type,
            templateId: opt.items.length ? Number(opt.items[1]) : opt.templateId
          })
          return res
        }, [])
        result.push(obj)
        return result
      }, [])
      data.functionId = values.functionId
      data.templateId = values.templateId
      data.name = values.name
      data.openCondition = {
        desc: values.openCondition.desc,
        type: values.openCondition.type,
        params: {
          startTime: values.openCondition.params ? values.openCondition.params['time-picker'][0].format('YYYY-MM-DD HH:mm:ss') : detail.openCondition.params.startTime,
          endTime: values.openCondition.params ? values.openCondition.params['time-picker'][1].format('YYYY-MM-DD HH:mm:ss') : detail.openCondition.params.endTime
        }
      }
      data.visibleCondition = {
        desc: values.visibleCondition.desc,
        type: values.visibleCondition.type,
        params: values.visibleCondition.params
      }
      data.clearServiceData = values.clearServiceData
      data.productId = values.products[0]
      data.serverIdList = values.serverIdList
      data.serverId = this.props.location.query.serverId

      if (!err) {
        if (this.props.location.query.handle === 'update') {
          this.props.updateActivity(data)
        }
      }
    })
  }

  uuid = 0

  handleItemRemove = (k) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length === 1) {
      return
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  handleItemAdd = () => {
    this.uuid++
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(this.uuid)
    form.setFieldsValue({
      keys: nextKeys
    })
  }


  render() {
    const { form: { getFieldDecorator }, location, activities, products, goods, intl } = this.props
    const initials = this.state.initials
    const check = location.query.handle === 'detail'
    const create = location.query.handle === 'create'
    const detail = create ? {} : this._activityReducer(activities.list, Number(location.query.templateId))
    const activityItems = detail.activityItems || []
    if (productOpt.length == 0) {
      productOpt = this._productReduce(products.options)
    }
    if (serverOpt.length == 0) {
      serverOpt = this._serverReduce(products.options, detail.productId)
    }
    if (goodOpt.length === 0) {
      goodOpt = this._goodReduce(goods.options, initials.map.goodTypes)
    }
    if (goodOpt.length) {
      const goodTypes = initials.conf.goodTypes
      itemsOpt = this._itemReduce(goodOpt, [goodTypes.item, goodTypes.soldier])
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    }

    const formItem2Layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 0 }
      }
    }

    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 4 }
      }
    }

    const tail2FormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 0 }
      }
    }

    const formActivityItems = activityItems.map((option, index) => {
      rewardList = option.rewardList || []
      return (
        <div>
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.activityId)} #${index + 1}`}
            key={index + 1}
          >
            {getFieldDecorator(`activityItems[${index}].activityItemId`, {
              initialValue: option.activityItemId,
              rules: [{ required: true, message: '礼包 ID' }]
            })(
              <Input disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.description)} #${index + 1}`}
            key={index + 2}
          >
            {getFieldDecorator(`activityItems[${index}].description`, {
              initialValue: option.description,
              rules: [{ required: true, message: '描述' }]
            })(
              <Input disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
          {
            option.preActivityItemId > 0 &&
            <FormItem
              {...formItemLayout}
              label={`${this.props.intl.formatMessage(message.activity_last)} #${index + 1}`}
              key={index + 3}
              >
                {getFieldDecorator(`activityItems[${index}].preActivityItemId`, {
                  initialValue: option.preActivityItemId,
                  rules: [{ required: true, message: '前一个礼包 ID' }]
                })(
                  <InputNumber disabled style={{ width: '100%' }} />
                )}
              </FormItem>
          }
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.clientValue)} #${index + 1}`}
            key={index + 4}
          >
            {getFieldDecorator(`activityItems[${index}].clientValue`, {
              initialValue: option.clientValue,
              rules: [{ required: true, message: '客户端显示值' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={check}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.diamond)} #${index + 1}`}
            key={index + 5}
          >
            {getFieldDecorator(`activityItems[${index}].coin`, {
              initialValue: option.coin,
              rules: [{ required: true, message: '钻石' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={check}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.diamond_system)} #${index + 1}`}
            key={index + 6}
          >
            {getFieldDecorator(`activityItems[${index}].coinToken`, {
              initialValue: option.coinToken,
              rules: [{ required: true, message: '系统钻石' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={check}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.rmb)} #${index + 1}`}
            key={index + 7}
          >
            {getFieldDecorator(`activityItems[${index}].rmb`, {
              initialValue: option.rmb,
              rules: [{ required: true, message: '人民币' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={check}
                style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.vip)} #${index + 1}`}
            key={index + 8}
          >
            {getFieldDecorator(`activityItems[${index}].vipValue`, {
              initialValue: option.vipValue,
              rules: [{ required: true, message: 'VIP 成长值' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={check}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${this.props.intl.formatMessage(message.target)} #${index + 1}`}
            key={index + 9}
          >
            {getFieldDecorator(`activityItems[${index}].targetValue`, {
              initialValue: option.targetValue,
              rules: [{ required: true, message: '目标值' }]
            })(
              <InputNumber disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          {
            rewardList.map((opt, idx) => {
              return (
                <div>
                  <FormItem
                    {...(idx === 0 ? tail2FormItemLayout : tailFormItemLayout)}
                    label={idx === 0 ? this.props.intl.formatMessage(message.item) : ''}
                    required={false}
                    key={idx + 1000}
                  >
                    {getFieldDecorator(`activityItems[${index}].rewardList[${idx}].items`, {
                      initialValue: [opt.type, opt.templateId],
                      rules: [{
                        required: true,
                        message: '请选择类型/道具'
                      }]
                    })(
                      <Cascader
                        options={itemsOpt}
                        showSearch
                        expandTrigger='hover'
                        disabled={check}
                        placeholder='请选择类型/道具'
                        style={{ width: '36%', marginRight: 8 }}
                      />
                    )}
                    {getFieldDecorator(`activityItems[${index}].rewardList[${idx}].num`, {
                      initialValue: opt.num,
                      rules: [{
                        required: true,
                        message: '请填写数量'
                      }]
                    })(
                      <InputNumber
                        min={0}
                        formatter={this._numFormat}
                        parser={this._numParse}
                        placeholder='数量'
                        disabled={check}
                        style={{ width: '14%', marginRight: 8 }}
                      />
                    )}
                    {/* <Icon
                      className='dynamic-delete-button'
                      type='minus-circle-o'
                      disabled={rewardList.length === 1}
                      onClick={() => this.handelItemRemove(idx + 1000)}
                    /> */}
                  </FormItem>
                </div>
              )
            })
          }
          {/* <FormItem {...tailFormItemLayout}>
            <Button type='dashed' onClick={this.handleItemAdd}>
              <Icon type='plus' />添加道具
            </Button>
          </FormItem> */}
        </div>
      )
    })



    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.activity_type)}
        >
          {getFieldDecorator('functionId', {
            initialValue: detail.functionId,
            rules: [{ required: true, message: '活动类型' }]
          })(
            <InputNumber disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.activity)}
        >
          {getFieldDecorator('templateId', {
            initialValue: detail.templateId,
            rules: [{ required: true, message: '活动 ID!' }]
          })(
            <InputNumber disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.activity_name)}
        >
          {getFieldDecorator('name', {
            initialValue: detail.name,
            rules: [{ required: true, message: '活动名称' }]
          })(
            <Input disabled={check} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.openCondition)}
        >
          <FormItem
            {...formItem2Layout}
            label={this.props.intl.formatMessage(message.description)}
          >
            {getFieldDecorator('openCondition.desc', {
              initialValue: detail.openCondition.desc,
              rules: [{ required: true, message: '开启条件 描述!' }]
            })(
              <Input disabled />
            )}
          </FormItem>
          <div>&nbsp;</div>
          <FormItem
            {...formItem2Layout}
            label={this.props.intl.formatMessage(message.type)}
          >
            {getFieldDecorator('openCondition.type', {
              initialValue: detail.openCondition.type,
              rules: [{ required: true, message: '开启条件 类型!' }]
            })(
              <Input disabled />
            )}
          </FormItem>
          <div>&nbsp;</div>
          {
            detail.openCondition && detail.openCondition.type &&
            initials.config.openTypes[detail.openCondition.type] === 'after' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.afterday)}
              key='openCondition.params.afterDays'
              style={{ paddingBottom: '32px' }}
            >
              {getFieldDecorator('openCondition.params.afterDays', {
                initialValue: (detail.openCondition && detail.openCondition.params && detail.openCondition.params.afterDays) || null,
                rules: [{ required: true, message: '可见条件 {X}天后开启!' }]
              })(
                <InputNumber disabled={check} placeholder='填写{X}天后开启' style={{ width: '100%' }} />
              )}
            </FormItem>
          }
          {
            detail.openCondition && detail.openCondition.type &&
            initials.config.openTypes[detail.openCondition.type] === 'after' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.lastday)}
              key='openCondition.params.lastDays'
            >
              {getFieldDecorator('openCondition.params.lastDays', {
                initialValue: (detail.openCondition && detail.openCondition.params && detail.openCondition.params.lastDays) || null,
                rules: [{ required: true, message: '可见条件 持续天数!' }]
              })(
                <InputNumber disabled={check} placeholder='填写持续天数' style={{ width: '100%' }} />
              )}
            </FormItem>
          }
          {
            detail.openCondition && detail.openCondition.type &&
            initials.config.openTypes[detail.openCondition.type] === 'fixed' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.startTime)}
              key='openCondition.params.startTime'
              style={{ paddingBottom: '32px' }}
            >
              {getFieldDecorator('openCondition.params.startTime', {
                initialValue: (detail.openCondition && detail.openCondition.params && detail.openCondition.params.startTime) || '',
                rules: [{ required: true, message: '开启条件 开始时间!' }]
              })(
                <DatePicker
                  showTime={{ defaultValue: moment('05:00:00', 'HH:00:00') }}
                  format='YYYY-MM-DD HH:00:00'
                  placeholder='开始时间'
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
          }
          {
            detail.openCondition && detail.openCondition.type &&
            initials.config.openTypes[detail.openCondition.type] === 'fixed' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.endTime)}
              key='openCondition.params.endTime'
            >
              {getFieldDecorator('openCondition.params.endTime', {
                initialValue: (detail.openCondition && detail.openCondition.params && detail.openCondition.params.endTime) || '',
                rules: [{ required: true, message: '开启条件 结束时间!' }]
              })(
                <DatePicker
                  showTime={{ defaultValue: moment('05:00:00', 'HH:00:00') }}
                  format='YYYY-MM-DD HH:00:00'
                  placeholder='结束时间'
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
          }
          {
            detail.openCondition.params.startTime == '-1' && detail.openCondition.params.endTime == '-1' &&
            <FormItem
              {...formItem2Layout}
              label={this.props.intl.formatMessage(message.time)}
            >
              {getFieldDecorator('openCondition.params.time-picker', {
                initialValue: [
                  moment(detail.openCondition.params.startTime),
                  moment(detail.openCondition.params.endTime)
                ],
                rules: [{ required: true, message: '开启条件 时间!' }]
              })(
                <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' disabled={check} />
              )}
            </FormItem>
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.visibleCondition)}
        >
          <FormItem
            {...formItem2Layout}
            label={this.props.intl.formatMessage(message.description)}
          >
            {getFieldDecorator('visibleCondition.desc', {
              initialValue: detail.visibleCondition.desc,
              rules: [{ required: true, message: '可见条件 描述!' }]
            })(
              <Input disabled />
            )}
          </FormItem>
          <div>&nbsp;</div>
          <FormItem
            {...formItem2Layout}
            label={this.props.intl.formatMessage(message.type)}
          >
            {getFieldDecorator('visibleCondition.type', {
              initialValue: detail.visibleCondition.type,
              rules: [{ required: true, message: '可见条件 类型!' }]
            })(
              <InputNumber disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <div>&nbsp;</div>
          <FormItem
            {...formItem2Layout}
            label={this.props.intl.formatMessage(message.activity_last)}
          >
            {getFieldDecorator('visibleCondition.params.preActivityTemplateId', {
              initialValue: detail.visibleCondition.params.preActivityTemplateId,
              rules: [{ required: true, message: '可见条件 前一个活动!' }]
            })(
              <InputNumber disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <div>&nbsp;</div>
          <FormItem
            {...formItem2Layout}
            label={this.props.intl.formatMessage(message.lastday)}
          >
            {getFieldDecorator('visibleCondition.params.lastDays', {
              initialValue: detail.visibleCondition.params.lastDays,
              rules: [{ required: true, message: '可见条件 持续天数!' }]
            })(
              <InputNumber disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.clear)}
        >
          {getFieldDecorator('clearServiceData', {
            initialValue: detail.clearServiceData,
            rules: [{ type: 'boolean', required: true, message: '清除服务数据!' }]
          })(
            <Switch checkedChildren defaultChecked={detail.clearServiceData} disabled={check} />
          )}
        </FormItem>
        {
          formActivityItems
        }
        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.product)}
        >
          {getFieldDecorator('products', {
            initialValue: [`${detail.productId}`],
            rules: [{ type: 'array', required: true, message: '请选择产品ID!', whitespace: true }],
            onChange: this.handleProductSelect
          })(
            <Cascader options={productOpt} showSearch disabled />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={this.props.intl.formatMessage(message.server)}
        >
          {getFieldDecorator('serverIdList', {
            initialValue: detail.serverIdList,
            rules: [{ required: true, message: '请选择服务器!' }]
          })(
            <TreeSelect
              treeData={[{
                label: this.props.intl.formatMessage(message.all),
                value: null,
                key: '全选',
                children: [...serverOpt]
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              searchPlaceholder='请选择服务器'
              disabled={check}
            />
          )}
        </FormItem>
        {
          location.query.handle === 'update' &&
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit' >{this.props.intl.formatMessage(message.submit)}</Button>
          </FormItem>
        }
      </Form>
    )
  }
}

UpdateForm.propTypes = {
  intl: intlShape,
  form: PropTypes.object,
  products: PropTypes.object,
  goods: PropTypes.object,
  location: PropTypes.object,
  activities: PropTypes.object,
  updateActivity: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  fetchGoodsMap: PropTypes.func
}

const Update = Form.create()(UpdateForm)

export default Update
