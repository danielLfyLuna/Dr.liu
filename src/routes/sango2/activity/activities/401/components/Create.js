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
let goodOpt = []
let initialValue = {}
let itemsId = 0
let rewardId = [0]

class CreateForm extends Component {
  state = {
    initials: {
      products: {
        productId: ''
      },
      conf: {
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
    form.getFieldDecorator('rewardKeys', { initialValue: [[]] })
    initialValue = this._activityReducer(activities.templates, Number(location.query.templateId))
    itemsId = 0
    rewardId = [0]
    this._fieldSet(initialValue.activityItems)
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
    const { form: { getFieldDecorator, getFieldValue }, location, products, goods } = this.props
    const initials = this.state.initials
    const detail = location.query.handle === 'preview'
    const activityItems = initialValue.activityItems || []
    if (productOpt.length == 0) {
      productOpt = this._productReduce(products.options)
    }
    serverOpt = this._serverReduce(products.options, initials.products.productId)
    if (goodOpt.length === 0) {
      goodOpt = this._goodReduce(goods.options, initials.map.goodTypes)
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
        sm: { span: 17, offset: 6 }
      }
    }

    const tail2FormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      }
    }

    const tail3FormItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    }

    const itemsKeys = getFieldValue('itemsKeys')
    const rewardKeys = getFieldValue('rewardKeys')

    const formItems = itemsKeys.map((key, index) => {
      return (
        <div key={`activityItems-${key}`}>
          <FormItem
            {...formItemLayout}
            label={`描述 #${key}`}
            key={`description-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].description`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].description : null,
              rules: [{ required: true, message: '请填写描述!' }]
            })(
              <Input disabled={detail} placeholder='填写描述' style={{ width: '100%' }} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`价格(钻石) #${key}`}
            key={`coin-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].coin`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].coin : null,
              rules: [{ required: true, message: '请填写价格!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='填写价格'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`客户端显示价格(钻石) #${key}`}
            key={`clientValue-${key}`}
          >
            {getFieldDecorator(`activityItems[${key}].clientValue`, {
              initialValue: activityItems.length && key <= activityItems.length ? activityItems[key - 1].clientValue : null,
              rules: [{ required: true, message: '请填写客户端显示价格!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='填写客户端显示价格'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          {
            rewardKeys[key].map((k, idx) => {
              let rewardList = activityItems.length && key <= activityItems.length ? activityItems[key - 1].rewardList : []
              let reward = rewardList.length ? rewardList[k - 1] : {}
              return (
                <Row key={`rewardList-${key}-${k}`}>
                  <Col span={8} offset={2}>
                    <FormItem
                      {...(idx === 0 ? tail2FormItemLayout : tail1FormItemLayout)}
                      label={idx === 0 ? `道具列表 #${key}` : ''}
                      key={`rewardList-goods-${key}-${k}`}
                    >
                      {getFieldDecorator(`activityItems[${key}].rewardList[${k}].goods`, {
                        initialValue: rewardList.length && k <= rewardList.length ? [reward.type, reward.templateId] : [],
                        rules: [{type: 'array', required: true, message: '请选择类型/道具'}]
                      })(
                        <Cascader
                          options={goodOpt}
                          showSearch
                          disabled={detail}
                          expandTrigger='hover'
                          placeholder='请选择类型/道具'
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={6}>
                    <FormItem
                      {...tail3FormItemLayout}
                      key={`rewardList-num-${key}-${k}`}
                    >
                      {getFieldDecorator(`activityItems[${key}].rewardList[${k}].num`, {
                        initialValue: rewardList.length && k <= rewardList.length ? reward.num : null,
                        validateTrigger: ['onChange'],
                        rules: [
                          {required: true, message: '请填写数量!'}
                        ]
                      })(
                        <InputNumber
                          min={0}
                          formatter={this._numFormat}
                          parser={this._numParse}
                          disabled={detail}
                          placeholder='请填写数量'
                          style={{ width: '80%' }}
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
            rules: [{ required: true, message: '请填写活动类型!' }]
          })(
            <InputNumber min={0} disabled placeholder='填写活动类型' style={{ width: '100%' }} />
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
          false &&
          <FormItem
            {...formItemLayout}
            label='活动名称'
            key='templateName'
          >
            {getFieldDecorator('name', {
              initialValue: initialValue.name || null,
              rules: [{ required: true, message: '请填写活动名称!' }]
            })(
              <Input placeholder='填写活动名称' />
            )}
          </FormItem>
        }
        {
          detail &&
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
              showSearch
              disabled={detail}
              expandTrigger='hover'
              placeholder='选择产品 ID'
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
