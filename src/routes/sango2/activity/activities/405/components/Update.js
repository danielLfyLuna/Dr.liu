import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { Form, Input, Cascader, Button, InputNumber, TreeSelect, Switch, DatePicker } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const FormItem = Form.Item


let productOpt = []
let serverOpt = []
let itemOPt = []
let rewardList = []
const message = defineMessages({
  activityId: {
    id: 'FORM.GIFT_ID',
    defaultMessage: '礼包ID'
  },
  description: {
    id: 'FORM.DESCRIPTION',
    defaultMessage: '描述'
  },
  clientValue: {
    id: 'FORM.CLIENTVALUE',
    defaultMessage: '客户端显示值'
  },
  target: {
    id: 'FORM.TARGETVALUE',
    defaultMessage: '目标值'
  },
  complete: {
    id: 'FORM.COMPLETECONDITION',
    defaultMessage: '完成条件'
  },
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  activity_type: {
    id: 'FORM.ACTIVITY_TYPE',
    defaultMessage: '活动类型'
  },
  activity: {
    id: 'FORM.ACTIVITY_ID',
    defaultMessage: '活动ID'
  },
  activity_name: {
    id: 'FORM.ACTIVITY_NAME',
    defaultMessage: '活动名称'
  },
  openCondition: {
    id: 'FORM.OPENCONDITION',
    defaultMessage: '开启条件'
  },
  type: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
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
      result.push({ value: key, label: `${option}(${key})` })
      return result
    }, [])
  }

  _numFormat = (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  _numParse = (value) => value.toString().replace(/\$\s?|(,*)/g, '')

  handleProductSelect = (product) => {
    serverOpt = this._serverReduce(this.props.products.options, product[0])
    this.props.itemsActionCreator(product)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      let detail = this._activityReducer(this.props.activities.list, Number(this.props.location.query.templateId))
      let data = {}
      data.activityItems = _.reduce(values.activityItems, (result, option, index) => {
        let obj = {}
        obj.activityItemId = option.activityItemId
        obj.description = option.description
        obj.clientValue = option.clientValue
        obj.targetValue = option.targetValue
        obj.completeConditionIds = detail.activityItems[index].completeConditionIds
        obj.rewardList = _.reduce(option.rewardList, (res, opt) => {
          res.push({
            num: opt.num,
            templateId: opt.templateId.length ? Number(opt.templateId[0]) : opt.templateId
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
          afterDays: values.openCondition.params.afterDays,
          lastDays: values.openCondition.params.lastDays
        }
      }
      data.clearServiceData = values.clearServiceData
      data.productId = values.products[0]
      data.serverIdList = values.serverIdList
      data.serverId = this.props.location.query.serverId
      if (!err) {
        if (this.props.location.query.handle === 'update') {
          console.log(data)
          this.props.updateActivity(data)
        }
      }
    })
  }

  // uuid = 0
  //
  // handleItemRemove(k) {
  //   const { form } = this.props
  //   const keys = form.getFieldValue('keys')
  //   if (keys.length === 1) {
  //     return
  //   }
  //
  //   form.setFieldsValue({
  //     keys: keys.filter(key => key !== k)
  //   })
  // }
  //
  // handleItemAdd = () => {
  //   uuid++
  //   const { form } = this.props
  //   const keys = form.getFieldValue('keys')
  //   const nextKeys = keys.concat(uuid)
  //   form.setFieldsValue({
  //     keys: nextKeys
  //   })
  // }


  render() {

    const {
      form: { getFieldDecorator },
      location,
      activities,
      products,
      items,
      intl
    } = this.props
    const initials = this.state.initials
    const check = location.query.handle === 'detail'
    const detail = this._activityReducer(activities.list, Number(location.query.templateId))
    const activityItems = detail.activityItems || []
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


    // 表单循环
    const formActivityItems = activityItems.map((option, index) => {
      rewardList = option.rewardList || []
      return (
        <div>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.activityId)} #${index + 1}`}
            key={index + 1}
          >
            { getFieldDecorator(`activityItems[${index}].activityItemId`, {
              rules: [{ required: true, message: '请输入礼包ID' }],
              initialValue: option.activityItemId
            })(
              <Input disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.clientValue)} #${index + 1}`}
            key={index + 2}
            hasFeedback
          >
            { getFieldDecorator(`activityItems[${index}].clientValue`, {
              rules: [{ required: true, message: '请输入客户端显示值' }],
              initialValue: option.clientValue
            })(
              <Input disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.target)} #${index + 1}`}
            key={index + 3}
            hasFeedback
          >
            { getFieldDecorator(`activityItems[${index}].targetValue`, {
              rules: [{ required: true, message: '请输入目标值' }],
              initialValue: option.targetValue
            })(
              <Input disabled={check} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.description)} #${index + 1}`}
            key={index + 4}
          >
            { getFieldDecorator(`activityItems[${index}].description`, {
              rules: [{ required: true, message: '请输入描述' }],
              initialValue: option.description
            })(
              <Input disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={`${intl.formatMessage(message.complete)} #${index + 1}`}
            key={index + 5}
          >
            { getFieldDecorator(`activityItems[${index}].completeConditionIds`, {
              rules: [{ required: true, message: '请输入完成条件' }],
              initialValue: option.completeConditionIds.length > 0 ? option.completeConditionIds[0] : option.completeConditionIds
            })(
              <Input disabled style={{ width: '100%' }} />
            )}
          </FormItem>
          {
            rewardList.map((opt, idx) => {
              return (
                <div>
                  <FormItem
                    {...(idx === 0 ? tail2FormItemLayout : tailFormItemLayout)}
                    label={idx === 0 ? intl.formatMessage(message.item) : ''}
                    required={false}
                    key={idx + 1000}
                    hasFeedback
                  >
                    {getFieldDecorator(`activityItems[${index}].rewardList[${idx}].templateId`, {
                      initialValue: [`${opt.templateId}`],
                      rules: [{
                        required: true,
                        message: '请选择道具'
                      }]
                    })(
                      <Cascader options={itemOPt} showSearch disabled={check} style={{ width: '30%', marginRight: 8 }} />
                    )}
                    {getFieldDecorator(`activityItems[${index}].rewardList[${idx}].num`, {
                      initialValue: opt.num,
                      rules: [{
                        required: true,
                        message: '请填写数量'
                      }]
                    })(
                      <InputNumber
                        formatter={this._numFormat}
                        parser={this._numParse}
                        placeholder={intl.formatMessage(message.count)}
                        disabled={check}
                        min={0}
                        style={{ width: '20%', marginRight: 8 }} />
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
            rules: [{ required: true, message: '请填写活动类型' }]
          })(
            <InputNumber disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity)}
        >
          {getFieldDecorator('templateId', {
            initialValue: detail.templateId,
            rules: [{ required: true, message: '请填写活动 ID' }]
          })(
            <InputNumber disabled style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.activity_name)}
          hasFeedback
        >
          {getFieldDecorator('name', {
            initialValue: detail.name,
            rules: [{ required: true, message: '请填写活动名称' }]
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
            rules: [{ type: 'boolean', required: true, message: '请选择是否清除服务数据' }]
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
          check &&
          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.startTime)}
          >
            {getFieldDecorator('startTime', {
              initialValue: detail.startTime,
              rules: [{ required: true, message: '请填写开启时间' }]
            })(
              <Input disabled />
            )}
          </FormItem>
        }
        {
          check &&
          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.endTime)}
          >
            {getFieldDecorator('endTime', {
              initialValue: detail.endTime,
              rules: [{ required: true, message: '请填写结束时间' }]
            })(
              <Input disabled />
            )}
          </FormItem>
        }
        {
          formActivityItems
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
          hasFeedback
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
  products: PropTypes.object,
  items: PropTypes.object,
  location: PropTypes.object,
  activities: PropTypes.object,
  updateActivity: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  itemsActionCreator: PropTypes.func
}

const Update = Form.create()(UpdateForm)

export default Update
