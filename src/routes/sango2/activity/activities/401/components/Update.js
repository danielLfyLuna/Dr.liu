import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { intlShape, defineMessages } from 'react-intl'
import { Form, Row, Input, Cascader, Button, DatePicker, InputNumber, TreeSelect, Select } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const FormItem = Form.Item
const Option = Select.Option
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
  type: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  activity_type: {
    id: 'FORM.ACTIVITY_TYPE',
    defaultMessage: '活动类型'
  },
  templateId: {
    id: 'FORM.TEMPLATEID',
    defaultMessage: '模板ID'
  },
  activity_name: {
    id: 'FORM.ACTIVITY_NAME',
    defaultMessage: '活动名称'
  },
  clear: {
    id: 'FORM.CLEARSERVICEDATA',
    defaultMessage: '清理业务数据'
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

let productOpt = []
let serverOpt = []
let itemOPt = []
let rewardList = []
const keyObject = new Map()

let uuid = 0
let detail = {}


class UpdateForm extends Component {

  state = {
    initials: {
      config: {
        openCondition: 1001,
        openTypes: { 1001: 'fixed', 1002: 'after' }
      }
    },
    currentActivityItems: {},
    itemTypes: [
      { label: this.props.intl.formatMessage(message.item), value: '0' },
      { label: this.props.intl.formatMessage(message.skill), value: '4' },
      { label: this.props.intl.formatMessage(message.person), value: '5' }
    ]
  }

  componentWillMount() {
    this.props.itemsActionCreator([this.props.location.query.productId])
    this.props.fetchProductsMap()

    const {
      activities,
      products
    } = this.props

    // 查找对应活动
    for (let i = 0; i < activities.list.length ; i++) {
      if (activities.list[i]['functionId'] == 401) {
        detail = activities.list[i]
      }
    }

    serverOpt = this._serverReduce(this.props.products.options, detail.productId)

    // 产品下拉列表
    if (productOpt.length == 0) {
      productOpt = this._productReduce(products.options)
    }
    if (serverOpt.length == 0) {
      serverOpt = this._serverReduce(products.options, detail.productId)
    }

    this.setState({
      currentActivityItems: detail.activityItems
    })
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
      let fieldData = {}

      const key = [...values.keys]
      fieldData.activityItems = []
      for (let v in key) {
        fieldData.activityItems.push(key[v][1])
      }

      fieldData.functionId = values.functionId
      fieldData.name = values.name
      fieldData.templateId = values.templateId
      fieldData.clearServiceData = values.clearServiceData[0]
      fieldData.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss')
      fieldData.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss')
      fieldData.openCondition = {
        type: values.conditionsType,
        params: {
          afterDays: values.afterDays,
          lastDays: values.lastDays
        }}
      fieldData.productId = values.productId
      fieldData.serverIdList = values.serverIdList
      fieldData.serverId = this.props.location.query.serverId
      // console.log(values.name)
      // console.log(values.description)
      // console.log(values.productId)
      // console.log(values.templateId)
      // console.log(values.functionId)
      // console.log(values.activityItemId)
      // console.log(values.afterDays)
      // console.log(values.lastDays)
      // console.log(values.endTime.format('YYYY-MM-DD HH:mm:ss'))
      // console.log(values.startTime.format('YYYY-MM-DD HH:mm:ss'))
      // console.log(values.clearServiceData[0])
      // console.log(values.clientValue)
      // console.log(values.completeConditionIds)
      // console.log(values.conditionsType)
      // console.log(values.serverIdList)
      // console.log(values.targetValue)
      // rewardList = []
      // for (let [, value] of values.keys) {
      //   value.map((v, index) => {
      //     rewardList.push(v)
      //   })
      // }
      // console.log(rewardList)
      if (!err) {
        if (this.props.location.query.handle === 'update') {
          this.props.updateActivity(fieldData)
        }
      }
    })
  }

  handleItemRemove = (k) => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length === 0) {
      return
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  handleItemAdd = (activityItemId) => {
    uuid++
    const { form } = this.props
    const keys = form.getFieldValue(`keys-${activityItemId}`)
    const nextKeys = keys.concat(uuid)
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  render() {

    const {
      form: { getFieldDecorator },
      location,
      items,
      intl
    } = this.props

    const initials = this.state.initials
    const check = location.query.handle === 'update'

    itemOPt = this._itemReduce(items)

    // 表单循环
    const activityItems = detail.activityItems || []

    const activityItem = _.map(activityItems, (itemValue, index) => {
      rewardList = itemValue.rewardList || []
      const completeConditionIds = itemValue.completeConditionIds.join(',')
      keyObject.set(itemValue.activityItemId, itemValue)
      getFieldDecorator('keys', { initialValue: keyObject })
      return (
        <div>
          <Row>
            <FormItem label={`${this.props.intl.formatMessage(message.activityId)} #${index + 1}`}>
              { getFieldDecorator(`activityItemId-${itemValue.activityItemId}`, {
                rules: [{ required: true, message: this.props.intl.formatMessage(message.activityId) }],
                initialValue: itemValue.activityItemId
              })(
                <Input placeholder={this.props.intl.formatMessage(message.activityId)} disabled={!check} />
              )}
            </FormItem>
            <FormItem label={`${this.props.intl.formatMessage(message.clientValue)} #${index + 1}`}>
              { getFieldDecorator('clientValue', {
                rules: [{ required: true, message: this.props.intl.formatMessage(message.clientValue) }],
                initialValue: itemValue.clientValue
              })(
                <Input placeholder={this.props.intl.formatMessage(message.clientValue)} disabled={!check} />
              )}
            </FormItem>
            <FormItem label={`${this.props.intl.formatMessage(message.target)} #${index + 1}`}>
              { getFieldDecorator('targetValue', {
                rules: [{ required: true, message: this.props.intl.formatMessage(message.target) }],
                initialValue: itemValue.targetValue
              })(
                <Input placeholder={this.props.intl.formatMessage(message.target)} disabled={!check} />
              )}
            </FormItem>
            <FormItem label={`${this.props.intl.formatMessage(message.description)} #${index + 1}`}>
              { getFieldDecorator('description', {
                rules: [{ required: true, message: this.props.intl.formatMessage(message.description) }],
                initialValue: itemValue.description
              })(
                <Input placeholder={this.props.intl.formatMessage(message.description)} disabled={!check} />
              )}
            </FormItem>
            <FormItem label={`${this.props.intl.formatMessage(message.complete)} #${index + 1}`}>
              { getFieldDecorator('completeConditionIds', {
                rules: [{ required: true, message: this.props.intl.formatMessage(message.complete) }],
                initialValue: completeConditionIds
              })(
                <Input placeholder={this.props.intl.formatMessage(message.complete)} disabled />
              )}
            </FormItem>
            {
              _.map(rewardList, (rewardValue, index) => {
                return (
                  <div>
                    <FormItem
                      label={index === 0 ? this.props.intl.formatMessage(message.item) : ''}
                      required={false}
                    >
                      { getFieldDecorator(`templateId-${itemValue.activityItemId}-${index}`, {
                        rules: [{ required: true, message: this.props.intl.formatMessage(message.item) }],
                        initialValue: [`${rewardValue.templateId}`]
                      })(
                        <Cascader
                          options={itemOPt}
                          style={{ width: '20%', marginRight: 8 }}
                          placeholder={this.props.intl.formatMessage(message.item)}
                          disabled={!check}
                        />
                      )}
                      { getFieldDecorator(`type-${itemValue.activityItemId}-${index}`, {
                        rules: [{ required: true, message: this.props.intl.formatMessage(message.type) }],
                        initialValue: [`${rewardValue.type}`]
                      })(
                        <Cascader
                          options={this.state.itemTypes}
                          style={{ width: '20%', marginRight: 8 }}
                          placeholder={this.props.intl.formatMessage(message.type)}
                          disabled
                        />
                      )}
                      { getFieldDecorator(`num-${itemValue.activityItemId}-${index}`, {
                        rules: [{ required: true, message: this.props.intl.formatMessage(message.count) }],
                        initialValue: rewardValue.num
                      })(
                        <InputNumber
                          formatter={this._numFormat}
                          parser={this._numParse}
                          placeholder={this.props.intl.formatMessage(message.count)}
                          disabled={!check}
                        />
                      )}
                    </FormItem>
                  </div>
                )
              })
            }
            {/* {
              newFormItems
            }
            {
              check &&
              <FormItem>
                <Button type='dashed' onClick={this.handleItemAdd(itemValue.activityItemId)}>
                  <Icon type='plus' />添加道具
                </Button>
              </FormItem>
            } */}
          </Row>
        </div>
      )
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={this.props.intl.formatMessage(message.activity_type)}>
          { getFieldDecorator('functionId', {
            rules: [{ required: true, message: this.props.intl.formatMessage(message.activity_type) }],
            initialValue: detail.functionId
          })(
            <Input placeholder={this.props.intl.formatMessage(message.activity_type)} disabled />
          )}
        </FormItem>
        <FormItem label={this.props.intl.formatMessage(message.activity_name)}>
          { getFieldDecorator('name', {
            rules: [{ required: true, message: this.props.intl.formatMessage(message.activity_name) }],
            initialValue: detail.name
          })(
            <Input placeholder={this.props.intl.formatMessage(message.activity_name)} disabled={!check}
            />
          )}
        </FormItem>
        <FormItem label={this.props.intl.formatMessage(message.templateId)}>
          { getFieldDecorator('templateId', {
            rules: [{ required: true, message: this.props.intl.formatMessage(message.templateId) }],
            initialValue: detail.templateId
          })(
            <Input placeholder={this.props.intl.formatMessage(message.templateId)} disabled />
          )}
        </FormItem>
        <FormItem label={this.props.intl.formatMessage(message.clear)}>
          { getFieldDecorator('clearServiceData', {
            rules: [{ required: true, message: this.props.intl.formatMessage(message.clear) }],
            initialValue: [`${detail.clearServiceData}`]
          })(
            <Select placeholder={this.props.intl.formatMessage(message.clear)} disabled={!check}>
              <Option key='false' value='false'>NO</Option>
              <Option key='true' value='true'>YES</Option>
            </Select>
          )}
        </FormItem>
        {
          detail.openCondition && detail.openCondition.type &&
          initials.config.openTypes[detail.openCondition.type] === 'fixed' && !check &&
          <FormItem label={this.props.intl.formatMessage(message.startTime)}>
            { getFieldDecorator('startTime', {
              rules: [{ required: true, message: this.props.intl.formatMessage(message.startTime) }],
              initialValue: detail.startTime
            })(
              <Input
                placeholder={this.props.intl.formatMessage(message.startTime)}
                disabled
              />
            )}
          </FormItem>
        }
        {
          detail.openCondition && detail.openCondition.type &&
          initials.config.openTypes[detail.openCondition.type] === 'fixed' && !check &&
          <FormItem label={this.props.intl.formatMessage(message.endTime)}>
            { getFieldDecorator('endTime', {
              rules: [{ required: true, message: this.props.intl.formatMessage(message.endTime) }],
              initialValue: detail.endTime
            })(
              <Input
                placeholder={this.props.intl.formatMessage(message.templateId)}
                disabled
              />
            )}
          </FormItem>
        }
        {
          detail.openCondition && detail.openCondition.type &&
          initials.config.openTypes[detail.openCondition.type] === 'fixed' && check &&
          <FormItem label={this.props.intl.formatMessage(message.startTime)}>
            { getFieldDecorator('startTime', {
              rules: [{ required: true, message: '请输入开始时间' }],
              initialValue: moment(detail.startTime)
            })(
              <DatePicker
                showTime
                placeholder='请输入出现时间'
                format='YYYY-MM-DD HH:mm:ss'
                disabled={!check}
              />
            )}
          </FormItem>
        }
        {
          detail.openCondition && detail.openCondition.type &&
          initials.config.openTypes[detail.openCondition.type] === 'fixed' && check &&
          <FormItem label={this.props.intl.formatMessage(message.endTime)}>
            { getFieldDecorator('endTime', {
              rules: [{ required: true, message: '请输入结束时间' }],
              initialValue: moment(detail.endTime)
            })(
              <DatePicker
                showTime
                placeholder='请输入结束时间'
                format='YYYY-MM-DD HH:mm:ss'
                disabled={!check}
              />
            )}
          </FormItem>
        }
        {
          detail.openCondition && detail.openCondition.type &&
          initials.config.openTypes[detail.openCondition.type] === 'after' &&
          <FormItem
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
        <FormItem label={this.props.intl.formatMessage(message.type)}>
          { getFieldDecorator('conditionsType', {
            rules: [{ required: true, message: '请输入开启类型' }],
            initialValue: detail.openCondition.type
          })(
            <InputNumber placeholder='请输入开启类型' disabled />
          )}
        </FormItem>
        { activityItem }
        <FormItem label={this.props.intl.formatMessage(message.product)}>
          {getFieldDecorator('productId', {
            initialValue: detail.productId,
            rules: [{ required: true, message: '请选择产品ID!', whitespace: true }],
            onChange: this.handleProductSelect
          })(
            <Cascader
              options={productOpt}
              disabled
            />
          )}
        </FormItem>

        <FormItem label={this.props.intl.formatMessage(message.server)}>
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
              disabled={!check}
            />
          )}
        </FormItem>
        {
          check &&
          <FormItem>
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
  items: PropTypes.object,
  location: PropTypes.object,
  activities: PropTypes.object,
  updateActivity: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  itemsActionCreator: PropTypes.func
}

const Update = Form.create()(UpdateForm)

export default Update
