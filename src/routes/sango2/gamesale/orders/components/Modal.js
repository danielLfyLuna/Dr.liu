import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Cascader, Button, Col, Icon, InputNumber } from 'antd'
const FormItem = Form.Item
import _ from 'lodash'

let record = {}
let itemsId = 0
let rewardId = [0]

class OrdersModal extends Component {
  state = {
    currentIds: [],
    currentItems: [],
    modalType: '',
    select: true
  }

  componentWillMount() {
    const { currentIds, currentItems, modalType } = this.props.onModalLoad()

    record.activityItems = currentItems
    this.props.form.getFieldDecorator('itemsKeys', { initialValue: [] })
    this.props.form.getFieldDecorator('rewardKeys', { initialValue: [[]] })
    itemsId = 0
    rewardId = [0]
    this._fieldSet(record.activityItems)

    this.setState({
      currentIds: currentIds,
      currentItems: currentItems,
      modalType: modalType
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { initials } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        let data = {}
        data.activityItems = _.reduce(values.activityItems.filter(opt => opt), (result, option, index) => {
          let obj = {}
          obj.orderId = option.orderId
          obj.rewardItems = _.reduce(option.rewardItems.filter(opt => opt), (res, opt) => {
            res.push({
              itemId: opt.item[0],
              count: opt.count
            })
            return res
          }, [])
          result.push(obj)
          return result
        }, [])

        this.props.onTakeOrders({
          form: data.activityItems,
          path: { ...initials.products }
        })
        this.props.onSubmitting()
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
        itemsKeys.push(itemsId)
        form.setFieldsValue({
          itemsKeys: itemsKeys,
          rewardKeys: rewardKeys
        })
      })
    }
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, options } = this.props

    const activityItems = record.activityItems || []

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    }

    const tail2FormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }

    const itemsKeys = getFieldValue('itemsKeys')
    const rewardKeys = getFieldValue('rewardKeys')

    const formItems = itemsKeys.map((key, index) => {
      return (
        <div key={`activityItems-${key}`}>
          <FormItem
            {...formItemLayout}
            label={`订单 ID #${key}`}
            key={`orderId-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].orderId`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].orderId : '',
              rules: [{ required: true, message: '请填写订单 ID!' }]
            })(
              <Input disabled placeholder='填写订单 ID' />
            )}
          </FormItem>
          {
            rewardKeys[key].map((k, idx) => {
              return (
                <FormItem
                  {...(idx === 0 ? tail2FormItemLayout : tail2FormItemLayout)}
                  label={idx === 0 ? `道具列表 #${key}` : ' '}
                  key={`rewardItems-${key}-${k}`}
                  colon={idx === 0}
                  required={false}
                >
                  <Col span={15} style={{ marginRight: 8 }}>
                    <FormItem
                      key={`rewardItems-item-${key}-${k}`}
                    >
                      {getFieldDecorator(`activityItems[${key}].rewardItems[${k}].item`, {
                        rules: [{ type: 'array', required: true, message: '请选择道具!' }]
                      })(
                        <Cascader
                          options={options.goods.list}
                          showSearch
                          expandTrigger='hover'
                          placeholder='选择道具'
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      key={`rewardItems-count-${key}-${k}`}
                    >
                      {getFieldDecorator(`activityItems[${key}].rewardItems[${k}].count`, {
                        rules: [{ required: true, message: '请填写数量!' }]
                      })(
                        <InputNumber
                          min={0}
                          formatter={this._numFormat}
                          parser={this._numParse}
                          placeholder='填写数量'
                          style={{ width: '80%', marginRight: 8 }}
                        />
                      )}
                      <Icon
                        className='dynamic-delete-button'
                        type='minus-circle-o'
                        disabled={rewardKeys.length === 1}
                        onClick={() => this.handleRewardRemove(key, k)}
                      />
                    </FormItem>
                  </Col>
                </FormItem>
              )
            })
          }
          <FormItem {...tailFormItemLayout}>
            <Button type='dashed' onClick={() => this.handleRewardAdd(key)}>
              <Icon type='plus' />添加道具
            </Button>
          </FormItem>
        </div>
      )
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        {
          formItems
        }
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>提交</Button>
        </FormItem>
      </Form>
    )
  }
}

OrdersModal.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onTakeOrders: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Modal = Form.create()(OrdersModal)

export default Modal
