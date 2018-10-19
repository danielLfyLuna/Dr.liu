import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { intlShape, defineMessages } from 'react-intl'
import { Form, Input, Cascader, Button, InputNumber, TreeSelect, Icon, Switch, Col, DatePicker } from 'antd'
import _ from 'lodash'
const FormItem = Form.Item
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

let productOpt = []
let serverOpt = []
let itemOPt = []
let record = {}
let itemsId = 0
let rewardId = [0]
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
  currency: {
    id: 'TABLE.CURRENCY',
    defaultMessage: '货币类型'
  },
  name: {
    id: 'TABLE.NAME',
    defaultMessage: '名称'
  },
  purchase: {
    id: 'FORM.PURCHASENUM',
    defaultMessage: '每日购买数量'
  },
  people: {
    id: 'FORM.PURCHASEPEOPLE',
    defaultMessage: '购买人数'
  },
  discount: {
    id: 'TABLE.DISCOUNT',
    defaultMessage: '折扣'
  },
  gears: {
    id: 'FORM.GEARS',
    defaultMessage: '档位'
  },
  price_origin: {
    id: 'FORM.PRICE_ORIGIN',
    defaultMessage: '原始价格'
  },
  item_id: {
    id: 'FORM.ITEMID',
    defaultMessage: '道具ID'
  },
  item_name: {
    id: 'FORM.ITEMNAME',
    defaultMessage: '道具名称'
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
  clientValue_horse: {
    id: 'FORM.CLIENTVALUE_HORSE',
    defaultMessage: '坐骑ID'
  },
  price: {
    id: 'FORM.PRICE',
    defaultMessage: '价格'
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
    defaultMessage: '可见条件'
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
  startTime: {
    id: 'TABLE.STARTTIME',
    defaultMessage: '开始时间'
  },
  endTime: {
    id: 'TABLE.ENDTIME',
    defaultMessage: '结束时间'
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
  },
  back: {
    id: 'BUTTON.BACK',
    defaultMessage: '返回'
  }
})


class UpdateForm extends Component {
  state = {
    initials: {
      config: {
        openCondition: 1001,
        openTypes: { 1001: 'fixed', 1002: 'after' }
      },
      map: {
        goodTypes: { 0: this.props.intl.formatMessage(message.item), 4: this.props.intl.formatMessage(message.skill), 5: this.props.intl.formatMessage(message.person) }
      }
    }
  }

  componentWillMount() {
    const { activities, location, form } = this.props
    this.props.fetchProductsMap()
    this.props.fetchGoodsMap({productId: location.query.productId})
    record = this._activityReducer(activities.list, Number(location.query.templateId))
    form.getFieldDecorator('itemsKeys', { initialValue: [] })
    form.getFieldDecorator('rewardKeys', { initialValue: [[]] })
    itemsId = 0
    rewardId = [0]
    this._fieldSet(record.activityItems)
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

  _numFormat = (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  _numParse = (value) => value.toString().replace(/\$\s?|(,*)/g, '')

  handleProductSelect = (product) => {
    serverOpt = this._serverReduce(this.props.products.options, product[0])
    this.props.fetchGoodsMap({productId: product[0]})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      let detail = this._activityReducer(this.props.activities.list, Number(this.props.location.query.templateId))
      let data = {}
      data.activityItems = _.reduce(values.activityItems.filter(opt => opt), (result, option, index) => {
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
        obj.rewardList = _.reduce(option.rewardList.filter(opt => opt), (res, opt) => {
          res.push({
            num: opt.num,
            type: opt.item.length ? opt.item[0] : opt.type,
            templateId: opt.item.length ? opt.item[1] : opt.templateId
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
        params: values.openCondition.params
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

  handleItemsAdd = () => {
    itemsId++
    rewardId[itemsId] = 0
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    const rewardKeys = form.getFieldValue('rewardKeys')
    const nextKeys = itemsKeys.concat(itemsId)
    rewardKeys.push([])
    form.setFieldsValue({
      itemsKeys: nextKeys,
      rewardKeys: rewardKeys
    })
  }

  handleItemsRemove = (k) => {
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    if (itemsKeys.length === 1) {
      return
    }
    form.setFieldsValue({
      itemsKeys: itemsKeys.filter(key => key !== k)
    })
  }

  handleRewardRemove = (key, k) => {
    const { form } = this.props
    const rewardKeys = form.getFieldValue('rewardKeys')
    if (rewardKeys[key].length === 1) {
      return
    }
    rewardKeys[key] = rewardKeys[key].filter(ky => ky !== k)
    form.setFieldsValue({
      rewardKeys: rewardKeys
    })
  }

  handleRewardAdd = (k) => {
    rewardId[k]++
    const { form } = this.props
    const rewardKeys = form.getFieldValue('rewardKeys')
    rewardKeys[k].push(rewardId[k])
    form.setFieldsValue({
      rewardKeys: rewardKeys
    })
  }

  _fieldSet = (activityItems) => {
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    const rewardKeys = form.getFieldValue('rewardKeys')
    if (activityItems && !itemsKeys.length) {
      activityItems.map((option, index) => {
        itemsId++
        rewardId[itemsId] = 0
        rewardKeys.push([])
        if (option.rewardList) {
          option.rewardList.map((opt, idx) => {
            rewardId[itemsId]++
            rewardKeys[itemsId].push(rewardId[itemsId])
          })
        }
        itemsKeys.push(itemsId)
        form.setFieldsValue({
          itemsKeys: itemsKeys,
          rewardKeys: rewardKeys
        })
      })
    }
  }


  render() {
    const { form: { getFieldDecorator, getFieldValue }, location, products, goods, intl } = this.props
    const check = location.query.handle === 'detail'
    const activityItems = record.activityItems || []

    const initials = this.state.initials
    if (productOpt.length == 0) {
      productOpt = this._productReduce(products.options)
    }
    if (serverOpt.length == 0) {
      serverOpt = this._serverReduce(products.options, record.productId)
    }
    itemOPt = this._goodReduce(goods.options, initials.map.goodTypes)

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

    const itemsKeys = getFieldValue('itemsKeys')
    const rewardKeys = getFieldValue('rewardKeys')

    const formItems = itemsKeys.map((key, index) => {
      return (
        <div key={`activityItems-${key}`}>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.activityId)} #${key}`}
            key={`activityItemId-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].activityItemId`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].activityItemId : '',
              rules: [{ required: true, message: '请填写礼包 ID!' }]
            })(
              <Input disabled placeholder='填写礼包 ID' style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.description)} #${key}`}
            key={`description-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].description`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].description : null,
              rules: [{ required: true, message: '请填写描述!' }]
            })(
              <Input disabled={check} placeholder='填写描述' style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.clientValue)}(${intl.formatMessage(message.diamond)}) #${key}`}
            key={`clientValue-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].clientValue`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].clientValue : null,
              rules: [{ required: true, message: '请填写客户端显示值!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={check}
                placeholder='填写客户端显示值'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.price)}(${intl.formatMessage(message.diamond)}) #${key}`}
            key={`coin-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].coin`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].coin : null,
              rules: [{ required: true, message: '请填写钻石数!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={check}
                placeholder='填写钻石数'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.diamond_system)} #${key}`}
            key={`coinToken-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].coinToken`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].coinToken : null,
              rules: [{ required: true, message: '系统钻石' }]
            })(
              <InputNumber min={0} disabled placeholder='填写系统钻石数量' style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.rmb)} #${key}`}
            key={`rmb-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].rmb`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].rmb : null,
              rules: [{ required: true, message: '人民币' }]
            })(
              <InputNumber min={0} disabled placeholder='填写人民币' style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.vip)} #${key}`}
            key={`vipValue-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].vipValue`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].vipValue : null,
              rules: [{ required: true, message: 'VIP 成长值' }]
            })(
              <InputNumber min={0} disabled placeholder='填写 VIP 成长值' style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.target)} #${key}`}
            key={`targetValue-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].targetValue`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].targetValue : null,
              rules: [{ required: true, message: '目标值' }]
            })(
              <InputNumber min={0} disabled placeholder='填写目标值' style={{ width: '100%' }} />
            )}
          </FormItem>
          {
            rewardKeys[key].map((k, idx) => {
              let rewardList = activityItems.length && key <= activityItems.length ? activityItems[key - 1].rewardList : []
              let reward = rewardList.length ? rewardList[k - 1] : {}
              return (
                <FormItem
                  {...(idx === 0 ? tail2FormItemLayout : tail2FormItemLayout)}
                  label={idx === 0 ? `${intl.formatMessage(message.item)} #${key}` : ' '}
                  key={`rewardList-${key}-${k}`}
                  colon={idx === 0}
                  required={false}
                >
                  <Col span={12} style={{ marginRight: 8 }}>
                    <FormItem
                      key={`rewardList-item-${key}-${k}`}
                    >
                      {getFieldDecorator(`activityItems[${key}].rewardList[${k}].item`, {
                        initialValue: rewardList.length && k <= rewardList.length ? [reward.type, reward.templateId] : [],
                        rules: [{ type: 'array', required: true, message: '请选择道具!' }]
                      })(
                        <Cascader
                          options={itemOPt}
                          showSearch
                          expandTrigger='hover'
                          disabled={check}
                          placeholder='选择道具'
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={4}>
                    <FormItem
                      key={`rewardList-num-${key}-${k}`}
                    >
                      {getFieldDecorator(`activityItems[${key}].rewardList[${k}].num`, {
                        initialValue: rewardList.length && k <= rewardList.length ? reward.num : null,
                        rules: [{ required: true, message: '请填写数量!' }]
                      })(
                        <InputNumber
                          min={0}
                          formatter={this._numFormat}
                          parser={this._numParse}
                          disabled={check}
                          placeholder={intl.formatMessage(message.count)}
                          style={{ width: '80%', marginRight: 8 }}
                        />
                      )}
                      {
                        !check &&
                        <Icon
                          className='dynamic-delete-button'
                          type='minus-circle-o'
                          disabled={rewardKeys.length === 1}
                          onClick={() => this.handleRewardRemove(key, k)}
                        />
                      }
                    </FormItem>
                  </Col>
                </FormItem>
              )
            })
          }
          {
            !check &&
            <FormItem {...tailFormItemLayout}>
              <Button type='dashed' onClick={() => this.handleRewardAdd(key)} disabled={check}>
                <Icon type='plus' />{intl.formatMessage(message.addItem)}
              </Button>
            </FormItem>
          }
          {
            !check &&
            <FormItem {...tailFormItemLayout}>
              <Button
                type='dashed'
                disabled={itemsKeys.length === 1}
                onClick={() => this.handleItemsRemove(key)}
              >
                <Icon className='dynamic-delete-button' type='minus-circle-o' />{intl.formatMessage(message.delete)}
              </Button>
            </FormItem>
          }
        </div>
      )
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity_type)}
          key='functionId'
        >
          {getFieldDecorator('functionId', {
            initialValue: record.functionId,
            rules: [{ required: true, message: '请填写活动类型!' }]
          })(
            <InputNumber min={0} disabled placeholder='填写活动类型' style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity)}
          key='templateId'
        >
          {getFieldDecorator('templateId', {
            initialValue: record.templateId,
            rules: [{ required: true, message: '请填写活动 ID!' }]
          })(
            <InputNumber min={0} disabled placeholder='填写活动 ID' style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity_name)}
          key='templateName'
        >
          {getFieldDecorator('name', {
            initialValue: record.name,
            rules: [{ required: true, message: '请填写活动名称!' }]
          })(
            <Input disabled={check} placeholder='填写活动名称' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.openCondition)}
          key='openCondition'
        >
          <FormItem
            {...formItem2Layout}
            label={intl.formatMessage(message.description)}
            key='openCondition.desc'
          >
            {getFieldDecorator('openCondition.desc', {
              initialValue: record.openCondition.desc,
              rules: [{ required: true, message: '开启条件 描述!' }]
            })(
              <Input disabled placeholder='填写描述' />
            )}
          </FormItem>
          <div>&nbsp;</div>
          <FormItem
            {...formItem2Layout}
            label={intl.formatMessage(message.type)}
            key='openCondition.type'
          >
            {getFieldDecorator('openCondition.type', {
              initialValue: record.openCondition.type,
              rules: [{ required: true, message: '开启条件 类型!' }]
            })(
              <Input disabled placeholder='填写类型' />
            )}
          </FormItem>
          <div>&nbsp;</div>
          {
            record.openCondition && record.openCondition.type &&
            initials.config.openTypes[record.openCondition.type] === 'after' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.afterday)}
              key='openCondition.params.afterDays'
              style={{ paddingBottom: '32px' }}
            >
              {getFieldDecorator('openCondition.params.afterDays', {
                initialValue: (record.openCondition && record.openCondition.params && record.openCondition.params.afterDays) || null,
                rules: [{ required: true, message: '可见条件 {X}天后开启!' }]
              })(
                <InputNumber disabled={check} placeholder='填写{X}天后开启' style={{ width: '100%' }} />
              )}
            </FormItem>
          }
          {
            record.openCondition && record.openCondition.type &&
            initials.config.openTypes[record.openCondition.type] === 'after' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.lastday)}
              key='openCondition.params.lastDays'
            >
              {getFieldDecorator('openCondition.params.lastDays', {
                initialValue: (record.openCondition && record.openCondition.params && record.openCondition.params.lastDays) || null,
                rules: [{ required: true, message: '可见条件 持续天数!' }]
              })(
                <InputNumber disabled={check} placeholder='填写持续天数' style={{ width: '100%' }} />
              )}
            </FormItem>
          }
          {
            record.openCondition && record.openCondition.type &&
            initials.config.openTypes[record.openCondition.type] === 'fixed' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.startTime)}
              key='openCondition.params.startTime'
              style={{ paddingBottom: '32px' }}
            >
              {getFieldDecorator('openCondition.params.startTime', {
                initialValue: (record.openCondition && record.openCondition.params && record.openCondition.params.startTime) || '',
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
            record.openCondition && record.openCondition.type &&
            initials.config.openTypes[record.openCondition.type] === 'fixed' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.endTime)}
              key='openCondition.params.endTime'
            >
              {getFieldDecorator('openCondition.params.endTime', {
                initialValue: (record.openCondition && record.openCondition.params && record.openCondition.params.endTime) || '',
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
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.clear)}
          key='clearServiceData'
        >
          {getFieldDecorator('clearServiceData', {
            initialValue: record.clearServiceData,
            rules: [{ type: 'boolean', required: true, message: '清除服务数据!' }]
          })(
            <Switch checkedChildren={'YES'} unCheckedChildren={'NO'} defaultChecked={record.clearServiceData} disabled={check} />
          )}
        </FormItem>
        {
          formItems
        }
        {
          !check &&
          <FormItem {...tailFormItemLayout}>
            <Button type='dashed' onClick={this.handleItemsAdd} disabled>
              <Icon type='plus' />{intl.formatMessage(message.add)}
            </Button>
          </FormItem>
        }
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.product)}
          key='productId'
        >
          {getFieldDecorator('products', {
            initialValue: [`${record.productId}`],
            rules: [{ type: 'array', required: true, message: '请选择产品 ID!' }],
            onChange: this.handleProductSelect
          })(
            <Cascader options={productOpt} showSearch disabled placeholder='选择产品 ID' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.server)}
          key='serverIdList'
        >
          {getFieldDecorator('serverIdList', {
            initialValue: record.serverIdList,
            rules: [{ required: true, message: '请选择服务器!' }]
          })(
            <TreeSelect
              treeData={[{
                label: intl.formatMessage(message.all),
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
              searchPlaceholder='选择服务器'
              disabled={check}
            />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} key={Math.random()}>
          {
            location.query.handle === 'update' &&
            <Button type='primary' htmlType='submit' size='large' style={{ marginRight: 32 }}>{intl.formatMessage(message.submit)}</Button>
          }
          <Link to='/sango2/activity/activities/index'>
            <Button size='large'>{intl.formatMessage(message.back)}</Button>
          </Link>
        </FormItem>

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
