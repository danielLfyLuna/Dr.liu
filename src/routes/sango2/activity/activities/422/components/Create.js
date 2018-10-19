import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Form, Input, Cascader, Row, Col, Button, InputNumber, TreeSelect } from 'antd'
import _ from 'lodash'
const FormItem = Form.Item
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

let productOpt = []
let serverOpt = []
let itemsOpt = []
let goodOpt = []
let initialValue = {}
let itemsId = 0
let discountId = [0]

class CreateForm extends Component {
  state = {
    initials: {
      products: {
        productId: ''
      },
      conf: {
        goodTypes: { 'item': 0, 'skill': 4, 'soldier': 5 }
      },
      map: {
        goodTypes: { 0: '道具', 4: '技能', 5: '武将' }
      },
      enum: {
      }
    }
  }

  componentWillMount() {
    const { activities, location, form } = this.props
    this.props.fetchProductsMap()
    this.props.fetchGoodsMap({ productId: location.query.productId })
    form.getFieldDecorator('itemsKeys', { initialValue: [] })
    form.getFieldDecorator('discountKeys', { initialValue: [[]] })
    initialValue = this._activityReducer(activities.templates, Number(location.query.templateId))
    itemsId = 0
    discountId = [0]
    this._fieldSet(initialValue.purchaseItemTemplates)
    this.setState({
      initials: {
        ...this.state.initials,
        products: {
          productId: location.query.productId
        }
      }
    })
  }

  _activityReducer = (options, templateId) => {
    return _.reduce(options, (result, option) => {
      if (option.templateId === templateId) {
        result = option
      }
      return result
    }, {})
  }

  _itemReduce = (options, types) => {
    return _.reduce(options, (result, option) => {
      if (Number(option.value) === types.item) {
        result = option.children
      }
      return result
    }, [])
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

  _fieldSet = (purchaseItems) => {
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    const discountKeys = form.getFieldValue('discountKeys')
    if (purchaseItems && !itemsKeys.length) {
      purchaseItems.map((option, index) => {
        itemsId++
        discountId[itemsId] = 0
        discountKeys.push([])
        if (option.discounts) {
          option.discounts.map((opt, idx) => {
            discountId[itemsId]++
            discountKeys[itemsId].push(discountId[itemsId])
          })
        }
        itemsKeys.push(itemsId)
        form.setFieldsValue({
          itemsKeys: itemsKeys,
          discountKeys: discountKeys
        })
      })
    }
  }


  render() {
    const { form: { getFieldDecorator, getFieldValue }, location, products, goods } = this.props
    const initials = this.state.initials
    const detail = location.query.handle === 'preview'
    const purchaseItems = initialValue.purchaseItemTemplates || []
    if (productOpt.length == 0) {
      productOpt = this._productReduce(products.options)
    }
    if (serverOpt.length == 0) {
      serverOpt = this._serverReduce(products.options, initialValue.productId)
    }
    if (goodOpt.length === 0) {
      goodOpt = this._goodReduce(goods.options, initials.map.goodTypes)
    }
    if (goodOpt.length) {
      itemsOpt = this._itemReduce(goodOpt, initials.conf.goodTypes)
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

    const itemsKeys = getFieldValue('itemsKeys')
    const discountKeys = getFieldValue('discountKeys')

    const formItems = itemsKeys.map((key, index) => {
      return (
        <div key={`purchaseItemTemplates-${key}`}>
          <FormItem
            {...formItemLayout}
            label={`道具 #${key}`}
            key={`goods-${key}`}
          >
            {getFieldDecorator(`purchaseItemTemplates[${key}].goods`, {
              initialValue: purchaseItems.length && key <= purchaseItems.length ? [purchaseItems[key - 1].itemId] : [],
              rules: [{ type: 'array', required: true, message: '请选择道具' }]
            })(
              <Cascader
                options={itemsOpt}
                showSearch
                disabled={detail}
                expandTrigger='hover'
                placeholder='请选择道具'
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`道具数量 #${key}`}
            key={`count-${key}`}
          >
            {getFieldDecorator(`purchaseItemTemplates[${key}].count`, {
              initialValue: purchaseItems.length && key <= purchaseItems.length ? purchaseItems[key - 1].count : null,
              rules: [{ required: true, message: '请填写道具数量' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='请填写道具数量'
                style={{ width: '100%', marginRight: 8 }}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`原价 #${key}`}
            key={`originPrice-${key}`}
          >
            {getFieldDecorator(`purchaseItemTemplates[${key}].originPrice`, {
              initialValue: purchaseItems.length && key <= purchaseItems.length ? purchaseItems[key - 1].originPrice : null,
              rules: [{ required: true, message: '原价' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='请输入原价'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`每人限购次数 #${key}`}
            key={`limitCount-${key}`}
          >
            {getFieldDecorator(`purchaseItemTemplates[${key}].limitCount`, {
              initialValue: purchaseItems.length && key <= purchaseItems.length ? purchaseItems[key - 1].limitCount : null,
              rules: [{ required: true, message: '每人限购次数' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='请输入每人限购次数'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          {
            discountKeys[key].map((k, idx) => {
              let discounts = purchaseItems.length && key <= purchaseItems.length ? purchaseItems[key - 1].discounts : []
              let discount = discounts.length ? discounts[k - 1] : {}
              return (
                <Row key={`discounts-${key}-${k}`}>
                  <Col span={6} offset={2}>
                    <FormItem
                      {...(idx === 0 ? tail2FormItemLayout : tail1FormItemLayout)}
                      label={idx === 0 ? `折扣配置 #${key}` : ''}
                      key={`discounts-count-${key}-${k}`}
                    >
                      {getFieldDecorator(`purchaseItemTemplates[${key}].discounts[${k}].count`, {
                        initialValue: discounts.length && k <= discounts.length ? discount.count : null,
                        rules: [{required: true, message: '请填写购买人数'}]
                      })(
                        <InputNumber
                          min={0}
                          formatter={this._numFormat}
                          parser={this._numParse}
                          disabled={detail}
                          placeholder='请填写购买人数'
                          style={{ width: '100%' }}
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      {...tail3FormItemLayout}
                      key={`discounts-discount-${key}-${k}`}
                    >
                      {getFieldDecorator(`purchaseItemTemplates[${key}].discounts[${k}].discount`, {
                        initialValue: discounts.length && k <= discounts.length ? discount.discount : null,
                        validateTrigger: ['onChange'],
                        rules: [
                          {required: true, message: '请填写折扣比例'}
                        ]
                      })(
                        <InputNumber
                          min={0}
                          formatter={this._numFormat}
                          parser={this._numParse}
                          disabled={detail}
                          placeholder='请填写折扣比例'
                          style={{ width: '90%' }}
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
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
          label='活动类型'
          key='functionId'
        >
          {getFieldDecorator('functionId', {
            initialValue: initialValue.functionId,
            rules: [{ required: true, message: '活动类型' }]
          })(
            <InputNumber min={0} disabled placeholder='活动类型' style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='模板 ID'
          key='templateId'
        >
          {getFieldDecorator('templateId', {
            initialValue: initialValue.templateId,
            rules: [{ required: true, message: '请填写模板 ID!' }]
          })(
            <InputNumber min={0} disabled placeholder='填写模板 ID' style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='名称'
          key='name'
        >
          {getFieldDecorator('name', {
            initialValue: initialValue.name,
            rules: [{ required: true, message: '请填写名称!' }]
          })(
            <Input disabled placeholder='填写名称' />
          )}
        </FormItem>
        {
          formItems
        }

        <FormItem
          {...formItemLayout}
          label='产品ID'
          key='productId'
        >
          {getFieldDecorator('products', {
            initialValue: [initialValue.productId],
            rules: [{ type: 'array', required: true, message: '请选择产品ID!' }]
          })(
            <Cascader
              options={productOpt}
              expandTrigger='hover'
              showSearch
              disabled={detail}
              placeholder='请选择产品ID'
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='选择服务器'
          key='serverIdList'
        >
          {getFieldDecorator('serverIdList', {
            initialValue: initialValue.serverIdList || [],
            rules: [{ type: 'array', required: true, message: '请选择服务器!' }]
          })(
            <TreeSelect
              treeData={[{
                label: '全选',
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
              disabled={detail}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout} key={Math.random()}>
          <Link to='/sango2/activity/activities/templates' data={this.props.activities}>
            <Button size='large'>返回</Button>
          </Link>
        </FormItem>
      </Form>
    )
  }
}

CreateForm.propTypes = {
  form: PropTypes.object,
  products: PropTypes.object,
  goods: PropTypes.object,
  location: PropTypes.object,
  activities: PropTypes.object,
  fetchProductsMap: PropTypes.func,
  fetchGoodsMap: PropTypes.func
}

CreateForm.contextTypes = {
  router: PropTypes.object
}

const Create = Form.create()(CreateForm)

export default Create
