import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Row, Col, Button, DatePicker, Icon } from 'antd'
const FormItem = Form.Item
import { intlShape, defineMessages } from 'react-intl'
const { RangePicker } = DatePicker
import moment from 'moment'
import _ from 'lodash'

let rewardId = 0
let itemOPt = []

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  giftid: {
    id: 'FORM.GIFT_ID',
    defaultMessage: '礼包ID'
  },
  giftid_input: {
    id: 'FORM.GIFTID_INPUT',
    defaultMessage: '请填写礼包ID'
  },
  gift_name: {
    id: 'FORM.GIFT_NAME',
    defaultMessage: '礼包名称'
  },
  gift_name_input: {
    id: 'FORM.GIFT_NAME_INPUT',
    defaultMessage: '请填写礼包名称'
  },
  cdkey_type: {
    id: 'FORM.CDKEY_TYPE',
    defaultMessage: '兑换码类型'
  },
  cdkey_type_input: {
    id: 'FORM.CDKEY_TYPE_INPUT',
    defaultMessage: '请选择兑换码类型'
  },
  time: {
    id: 'FORM.STARTTIME&ENDTIME',
    defaultMessage: '开始时间 & 结束时间'
  },
  time_input: {
    id: 'FORM.STARTTIME&ENDTIME_INPUT',
    defaultMessage: '请选择开始时间和结束时间'
  },
  startTime: {
    id: 'FORM.STARTTIME_INPUT',
    defaultMessage: '请选择开始时间'
  },
  endTime: {
    id: 'FORM.ENDTIME_INPUT',
    defaultMessage: '请选择结束时间'
  },
  add_reward: {
    id: 'FORM.REWARDS_ADD',
    defaultMessage: '添加奖励'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  item_input: {
    id: 'FORM.ITEM_INPUT',
    defaultMessage: '请选择道具'
  },
  goodcount_input: {
    id: 'FORM.GOODCOUNT_INPUT',
    defaultMessage: '请输入物品数量'
  },
  warning: {
    id: 'NOTIFICATION.COUNT_WARNING',
    defaultMessage: '数量必须为整数'
  }
})


class CDKeyModal extends Component {
  state = {
    currentItem: {},
    modalType: '',
    select: true
  }

  componentWillMount() {
    this.props.onRender({ renderState: false })
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      currentItem: modalType === 'create' ? {} : currentItem,
      modalType: modalType
    })
    if (modalType === 'update' || modalType === 'copy') {
      this.props.itemsActionCreator([currentItem.productId])
      rewardId += currentItem.activityRewards.length
      this.setState({
        select: false
      })
    }
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: true })
  }

  handleProductSelect = (products) => {
    if (products.length) {
      this.props.itemsActionCreator(products)
      this.setState({
        select: false
      })
    } else {
      this.setState({
        select: true
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        data.activityRewards = _.reduce(values.activityRewards.filter(opt => opt), (result, option, index) => {
          result.push({
            itemId: option.itemId[0],
            count: option.count
          })
          return result
        }, [])
        if (values.activityId) {
          data.activityId = values.activityId
        }
        data.title = values.title
        data.type = values.types[0]
        data.productId = values.products[0]
        data.beginDate = values.times[0].format('YYYY-MM-DD HH:mm:ss')
        data.endDate = values.times[1].format('YYYY-MM-DD HH:mm:ss')

        let posts = {
          form: data,
          path: {
            productId: data.productId
          }
        }

        if (this.state.modalType === 'update') {
          this.props.onUpdate(posts)
        } else {
          this.props.createCDKey(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  handleRewardAdd = () => {
    rewardId++
    const { form } = this.props
    const rewardKeys = form.getFieldValue('rewardKeys')
    const nextKeys = rewardKeys.concat(rewardId)
    form.setFieldsValue({
      rewardKeys: nextKeys
    })
  }

  handleRewardRemove = (k) => {
    const { form } = this.props
    const rewardKeys = form.getFieldValue('rewardKeys')
    if (rewardKeys.length === 1) {
      return
    }
    form.setFieldsValue({
      rewardKeys: rewardKeys.filter(key => key !== k)
    })
  }

  _itemsReduce = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: Number(key), label: `${option}(${key})` })
      return result
    }, [])
  }

  _numFormat = (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  _numParse = (value) => value.toString().replace(/\$\s?|(,*)/g, '')

  render() {
    const {
      getFieldDecorator,
      getFieldValue
    } = this.props.form

    const { items, intl } = this.props
    itemOPt = this._itemsReduce(items)

    const detail = this.state.currentItem
    const check = this.state.modalType === 'update'

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 8 }
      }
    }

    const tail1FormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 15, offset: 8 }
      }
    }

    const tail2FormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      }
    }

    const tail3FormItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      }
    }

    getFieldDecorator('rewardKeys', { initialValue: [] })

    const rewardKeys = getFieldValue('rewardKeys')
    if (detail.activityRewards && !rewardKeys.length) {
      detail.activityRewards.map((k, i) => {
        return rewardKeys.push(i + 1)
      })
    }

    const formRewards = rewardKeys.map((key, index) => {
      return (
        <Row key={`activityRewards-${key}`}>
          <Col span={12} offset={4}>
            <FormItem
              {...(index === 0 ? tail2FormItemLayout : tail1FormItemLayout)}
              label={index === 0 ? intl.formatMessage(message.item) : ''}
              key={`activityRewards-itemId-${key}`}
            >
              {getFieldDecorator(`activityRewards[${key}].itemId`, {
                initialValue: detail.activityRewards && key <= detail.activityRewards.length ? [detail.activityRewards[key - 1].itemId] : [],
                rules: [{type: 'array', required: true, message: intl.formatMessage(message.item_input)}]
              })(
                <Cascader
                  options={itemOPt}
                  expandTrigger='hover'
                  showSearch
                  placeholder={intl.formatMessage(message.item_input)}
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              {...tail3FormItemLayout}
              key={`activityRewards-count-${key}`}
            >
              {getFieldDecorator(`activityRewards[${key}].count`, {
                initialValue: detail.activityRewards && key <= detail.activityRewards.length ? detail.activityRewards[key - 1].count : null,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {required: true, message: intl.formatMessage(message.goodcount_input)},
                  {pattern: /^\d+$/, message: intl.formatMessage(message.warning)}
                ]
              })(
                <InputNumber
                  min={0}
                  placeholder={intl.formatMessage(message.goodcount_input)}
                  style={{ width: '70%' }}
                />
              )}
              <Icon
                className='dynamic-delete-button'
                type='minus-circle-o'
                disabled={rewardKeys.length === 1}
                onClick={() => this.handleRewardRemove(key)}
              />
            </FormItem>
          </Col>
        </Row>
      )
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.product)}
        >
          {getFieldDecorator('products', {
            initialValue: detail.productId ? [`${detail.productId}`] : [],
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.product_input) }],
            onChange: this.handleProductSelect
          })(
            <Cascader
              options={this.props.options.productIds}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.product_input)}
              disabled={check}
            />
          )}
        </FormItem>
        {
          check &&
          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.giftid)}
          >
            {getFieldDecorator('activityId', {
              initialValue: detail.activityId ? detail.activityId : '',
              rules: [{ required: true, message: intl.formatMessage(message.giftid_input), whitespace: true }]
            })(
              <Input placeholder={intl.formatMessage(message.giftid_input)} disabled={check} />
            )}
          </FormItem>
        }
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.gift_name)}
        >
          {getFieldDecorator('title', {
            initialValue: detail.title ? detail.title : '',
            rules: [{ required: true, message: intl.formatMessage(message.gift_name_input), whitespace: true }]
          })(
            <Input placeholder={intl.formatMessage(message.gift_name_input)} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.cdkey_type)}
        >
          {getFieldDecorator('types', {
            initialValue: detail.type ? [detail.type] : [],
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.cdkey_type_input) }]
          })(
            <Cascader
              options={this.props.initials.enum.cdkeyTypes}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.cdkey_type_input)}
              disabled={check}
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.time)}
        >
          {getFieldDecorator('times', {
            initialValue: detail.beginDate ? [moment(detail.beginDate), moment(detail.endDate)] : [],
            rules: [{ required: true, message: intl.formatMessage(message.time_input) }]
          })(
            <RangePicker
              showTime
              format='YYYY-MM-DD HH:mm:ss'
              placeholder={[intl.formatMessage(message.startTime), intl.formatMessage(message.endTime)]}
              style={{ width: '100%' }}
            />
          )}
        </FormItem>
        {
          formRewards
        }
        <FormItem {...tailFormItemLayout}>
          <Button type='dashed' onClick={this.handleRewardAdd} disabled={this.state.select}>
            <Icon type='plus' />{intl.formatMessage(message.add_reward)}
          </Button>
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

CDKeyModal.propTypes = {
  intl: intlShape,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  items: PropTypes.object,
  onModalLoad: PropTypes.func,
  onRender: PropTypes.func,
  onSubmitting: PropTypes.func,
  onUpdate: PropTypes.func,
  createCDKey: PropTypes.func,
  itemsActionCreator: PropTypes.func
}

const Modal = Form.create()(CDKeyModal)

export default Modal
