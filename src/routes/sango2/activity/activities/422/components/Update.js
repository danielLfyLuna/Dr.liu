import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { Form, Input, Cascader, Button, InputNumber, TreeSelect, Switch, DatePicker } from 'antd'
import _ from 'lodash'
const FormItem = Form.Item
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

let productOpt = []
let serverOpt = []
let itemOPt = []
let discounts = []
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

// let itemTypes = [
//   { label: '道具', value: 0 },
//   { label: '技能', value: 4 },
//   { label: '武将', value: 5 }
// ]

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
    this.props.fetchProductsMap()
    this.props.itemsActionCreator([this.props.location.query.productId])
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

  _itemReduce = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: key, label: `${key}(${option})` })
      return result
    }, [])
  }

  handleProductSelect = (product) => {
    serverOpt = this._serverReduce(this.props.products.options, product[0])
    this.props.itemsActionCreator(product)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      let data = {}
      data.templateId = values.templateId
      data.functionId = values.functionId
      data.name = values.name
      data.clearServiceData = values.clearServiceData
      data.openCondition = {
        desc: values.openCondition.desc,
        type: values.openCondition.type,
        params: {
          afterDays: values.openCondition.params.afterDays,
          lastDays: values.openCondition.params.lastDays
        }
      }
      data.productId = values.products[0]
      data.serverIdList = values.serverIdList
      data.serverId = this.props.location.query.serverId
      data.purchaseItemTemplates = _.reduce(values.purchaseItemTemplates, (result, option, index) => {
        let obj = {}
        obj.count = option.count
        obj.currencyId = option.currencyId
        obj.limitCount = option.limitCount
        obj.originPrice = option.originPrice
        obj.templateId = option.templateId
        obj.activityId = option.activityId
        obj.itemId = Number(option.itemId[0])
        obj.discounts = _.reduce(option.discounts, (res, opt, index) => {
          res.push({
            count: opt.count,
            discount: opt.discount
          })
          return res
        }, [])
        result.push(obj)
        return result
      }, [])
      console.log(data)
      if (!err) {
        if (this.props.location.query.handle === 'update') {
          this.props.updateGroupBuy(data)
        }
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, location, activities, products, items, intl } = this.props
    const check = location.query.handle === 'detail'
    const initials = this.state.initials
    const detail = this._activityReducer(activities.list, Number(location.query.templateId))
    const purchaseItemTemplates = detail.purchaseItemTemplates || []
    if (productOpt.length == 0) {
      productOpt = this._productReduce(products.options)
    }
    if (serverOpt.length == 0) {
      serverOpt = this._serverReduce(products.options, detail.productId)
    }
    itemOPt = this._itemReduce(items)

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

    const conditionsLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
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

    // 表单循环
    const formPurchaseItemTemplates = purchaseItemTemplates.map((option, index) => {
      discounts = option.discounts || []
      return (
        <div>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.activityId)} #${index + 1}`}
            key={index + 1}
          >
            { getFieldDecorator(`purchaseItemTemplates[${index}].templateId`, {
              rules: [{ required: true, message: '请输入礼包ID' }],
              initialValue: option.templateId
            })(
              <Input disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.activity)} #${index + 1}`}
            key={index + 2}
          >
            { getFieldDecorator(`purchaseItemTemplates[${index}].activityId`, {
              rules: [{ required: true, message: '请输入活动ID' }],
              initialValue: option.activityId
            })(
              <Input disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.currency)} #${index + 1}`}
            key={index + 3}
          >
            { getFieldDecorator(`purchaseItemTemplates[${index}].currencyId`, {
              rules: [{ required: true, message: '请输入货币类型' }],
              initialValue: option.currencyId
            })(
              <Input disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.count)} #${index + 1}`}
            key={index + 4}
          >
            { getFieldDecorator(`purchaseItemTemplates[${index}].count`, {
              rules: [{ required: true, message: '请输入数量' }],
              initialValue: option.count
            })(
              <InputNumber min={0} disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.purchase)} #${index + 1}`}
            key={index + 5}
          >
            { getFieldDecorator(`purchaseItemTemplates[${index}].limitCount`, {
              rules: [{ required: true, message: '请输入每日购买数量' }],
              initialValue: option.limitCount
            })(
              <InputNumber min={0} disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.price_origin)} #${index + 1}`}
            key={index + 6}
          >
            { getFieldDecorator(`purchaseItemTemplates[${index}].originPrice`, {
              rules: [{ required: true, message: '请输入原始价格' }],
              initialValue: option.originPrice
            })(
              <Input disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.item_id)} #${index + 1}`}
            key={index + 7}
          >
            { getFieldDecorator(`purchaseItemTemplates[${index}].itemId`, {
              rules: [{ required: true, message: '请输入道具ID' }],
              initialValue: [`${option.itemId}`]
            })(
              <Cascader
                options={itemOPt}
                showSearch
                disabled={check}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          {
            check &&
            <FormItem
              {...formItemLayout}
              label={`${intl.formatMessage(message.item_name)} #${index + 1}`}
              key={index + 8}
            >
              { getFieldDecorator(`purchaseItemTemplates[${index}].itemName`, {
                rules: [{ required: true, message: '请输入道具名称' }],
                initialValue: option.itemName
              })(
                <Input disabled={check} style={{ width: '100%' }} />
              )}
            </FormItem>
          }
          {
            discounts.map((opt, idx) => {
              return (
                <div>
                  <FormItem
                    {...(idx === 0 ? tail2FormItemLayout : tailFormItemLayout)}
                    label={idx === 0 ? `${intl.formatMessage(message.people)}/${intl.formatMessage(message.discount)}` : ''}
                    required={false}
                    key={idx + 1000}
                  >
                    {getFieldDecorator(`purchaseItemTemplates[${index}].discounts[${idx}].count`, {
                      initialValue: opt.count,
                      rules: [{
                        required: true,
                        message: '请输入购买人数'
                      }]
                    })(
                      <InputNumber placeholder={intl.formatMessage(message.people)} min={0} disabled={check} style={{ width: '20%', marginRight: 8 }} />
                    )}
                    {getFieldDecorator(`purchaseItemTemplates[${index}].discounts[${idx}].discount`, {
                      initialValue: opt.discount,
                      rules: [{
                        required: true,
                        message: '请输入折扣'
                      }]
                    })(
                      <InputNumber placeholder={intl.formatMessage(message.discount)} disabled={check} style={{ width: '20%', marginRight: 8 }} />
                    )}

                  </FormItem>
                </div>
              )
            })
          }
        </div>
      )
    })
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity_type)}
        >
          {getFieldDecorator('functionId', {
            initialValue: detail.functionId,
            rules: [{ required: true, message: '活动类型' }]
          })(
            <Input disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity)}
        >
          {getFieldDecorator('templateId', {
            initialValue: detail.templateId,
            rules: [{ required: true, message: '活动 ID!' }]
          })(
            <Input disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity_name)}
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
          label={intl.formatMessage(message.openCondition)}
          key='openCondition'
        >
          <FormItem
            {...conditionsLayout}
            label={intl.formatMessage(message.description)}
            key='openCondition.desc'
          >
            {getFieldDecorator('openCondition.desc', {
              initialValue: detail.openCondition.desc,
              rules: [{ required: true, message: '请填写开启条件--描述' }]
            })(
              <Input disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...conditionsLayout}
            label={intl.formatMessage(message.type)}
            key='openCondition.type'
          >
            {getFieldDecorator('openCondition.type', {
              initialValue: detail.openCondition.type,
              rules: [{ required: true, message: '请填写开启条件--类型' }]
            })(
              <Input disabled />
            )}
          </FormItem>
          <div>&nbsp;</div>
          {
            detail.openCondition && detail.openCondition.type &&
            initials.config.openTypes[detail.openCondition.type] === 'after' &&
            <FormItem
              {...conditionsLayout}
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
              {...conditionsLayout}
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
              {...conditionsLayout}
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
              {...conditionsLayout}
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
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.clear)}
        >
          {getFieldDecorator('clearServiceData', {
            initialValue: detail.clearServiceData,
            rules: [{ type: 'boolean', required: true, message: '清除服务数据!' }]
          })(
            <Switch
              checkedChildren={'YES'}
              unCheckedChildren={'NO'}
              defaultChecked={detail.clearServiceData}
              disabled={check}
            />
          )}
        </FormItem>
        {
          formPurchaseItemTemplates
        }
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.product)}
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
          label={intl.formatMessage(message.server)}
        >
          {getFieldDecorator('serverIdList', {
            initialValue: detail.serverIdList,
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
              searchPlaceholder='请选择服务器'
              disabled={check}
            />
          )}
        </FormItem>
        {
          location.query.handle === 'update' &&
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit' size='large'>{intl.formatMessage(message.submit)}</Button>
          </FormItem>
        }
      </Form>
    )
  }
}

UpdateForm.propTypes = {
  intl: intlShape,
  form: PropTypes.object,
  items: PropTypes.object,
  products: PropTypes.object,
  location: PropTypes.object,
  activities: PropTypes.object,
  updateGroupBuy: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  itemsActionCreator: PropTypes.func
}

const Update = Form.create()(UpdateForm)

export default Update
