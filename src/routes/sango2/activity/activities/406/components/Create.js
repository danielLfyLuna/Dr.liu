import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Form, Input, Cascader, Button, InputNumber, TreeSelect } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
const FormItem = Form.Item
moment.locale('zh-cn')

let productOpt = []
let serverOpt = []
let goodOpt = []
let initialValue = {}
let itemsId = 0

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
    initialValue = this._activityReducer(activities.templates, Number(location.query.templateId))
    itemsId = 0
    this._fieldSet(initialValue.moneyTreeTemplates)
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

  _fieldSet = (moneyTreeTemplates) => {
    const { form } = this.props
    const itemsKeys = form.getFieldValue('itemsKeys')
    if (moneyTreeTemplates && !itemsKeys.length) {
      moneyTreeTemplates.map((option, index) => {
        itemsId++
        itemsKeys.push(itemsId)
        form.setFieldsValue({
          itemsKeys: itemsKeys
        })
      })
    }
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, location, products, goods } = this.props
    const initials = this.state.initials
    const detail = location.query.handle === 'preview'
    const moneyTreeTemplates = initialValue.moneyTreeTemplates || []
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

    const itemsKeys = getFieldValue('itemsKeys')

    const formItems = itemsKeys.map((key, index) => {
      return (
        <div key={`moneyTreeTemplates-${key}`}>
          <FormItem
            {...formItemLayout}
            label={`基础投入 #${key}`}
            key={`baseCostCoin-${key}`}
          >
            {getFieldDecorator(`moneyTreeTemplates[${key}].baseCostCoin`, {
              initialValue: moneyTreeTemplates.length && key <= moneyTreeTemplates.length ? moneyTreeTemplates[key - 1].baseCostCoin : null,
              rules: [{ required: true, message: '请填写基础投入!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='填写基础投入'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`最小产出值 #${key}`}
            key={`minShowProduce-${key}`}
          >
            {getFieldDecorator(`moneyTreeTemplates[${key}].minShowProduce`, {
              initialValue: moneyTreeTemplates.length && key <= moneyTreeTemplates.length ? moneyTreeTemplates[key - 1].minShowProduce : null,
              rules: [{ required: true, message: '请填写最小产出!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='填写最小产出'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`最大产出值 #${key}`}
            key={`maxShowProduce-${key}`}
          >
            {getFieldDecorator(`moneyTreeTemplates[${key}].maxShowProduce`, {
              initialValue: moneyTreeTemplates.length && key <= moneyTreeTemplates.length ? moneyTreeTemplates[key - 1].maxShowProduce : null,
              rules: [{ required: true, message: '请填写最大产出!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='填写最大产出'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={`VIP 等级限制 #${key}`}
            key={`vipLevelLimit-${key}`}
          >
            {getFieldDecorator(`moneyTreeTemplates[${key}].vipLevelLimit`, {
              initialValue: moneyTreeTemplates.length && key <= moneyTreeTemplates.length ? moneyTreeTemplates[key - 1].vipLevelLimit : null,
              rules: [{ required: true, message: '请填写 VIP 等级限制!' }]
            })(
              <InputNumber
                min={0}
                formatter={this._numFormat}
                parser={this._numParse}
                disabled={detail}
                placeholder='填写 VIP 等级限制'
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
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
