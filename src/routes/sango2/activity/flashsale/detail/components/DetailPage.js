import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import {Card, Row, Col, Form, Input, DatePicker, TimePicker, InputNumber, Select, TreeSelect, Cascader, Button, Tooltip, Icon} from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import {handleUpdateTimeMap} from '../modules/Mapping'

class DetailPage extends Component {
  static propTypes = {
    // location: PropTypes.object.isRequired,
    item: PropTypes.object,
    login: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    detail: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    fetchDetail: PropTypes.func.isRequired,
    updateFlashSale: PropTypes.func.isRequired,
    itemsActionCreator: PropTypes.func.isRequired
  }

  state = {

  }

  formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }
  formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 }
  }
  formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 24, offset: 0 }
  }

  redirect = (e) => {
    e.preventDefault()
    this.props.router.push({
      pathname: '/sango2/activity/flashsale/index',
      query: { deom: true },
      state: { deom: true }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = this.props.detail.data
    const params = this.props.location.query
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.updateFlashSale(values, data, params)
      }
    })
  }

  componentWillMount() {

    const params = this.props.location.query
    this.props.fetchDetail(params)
    this.props.itemsActionCreator(params.product)
  }

  componentDidMount() {
    // const params = this.props.location.query
    // _.defer(this.props.fetchDetail, params)
  }

  _itemReduce = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: _.toNumber(key), label: `${option}(${key})` })
      return result
    }, [])
  }

  render() {
    const params = this.props.location.query
    const data = this.props.detail.data
    const item = this.props.item.data
    const options = this.props.login.admin.data.options
    // console.log(data, item, options, params)

    const { getFieldDecorator } = this.props.form
    let disableds = false
    if (params.type === 'detail') {
      disableds = true
    }

    // 道具下拉
    let items = []
    _.forEach(item, (value, key) => {
      items.push(
        <Option title={value} key={key} value={key}>{value} - {key}</Option>
      )
    })
    let itemOPt = this._itemReduce(item)

    // 优先展示道具
    let fixList = []
    _.forEach(data.fixList, (value, index) => {
      fixList.push(
        <Row gutter={16} key={'fixList-' + index}>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='道具 ID'
            >
              {getFieldDecorator('sale-item-' + value.saleId, {
                initialValue: [value.itemId]
              })(
                <Cascader
                  showSearch
                  disabled={disableds}
                  options={itemOPt}
                />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='道具数量'
            >
              {getFieldDecorator('sale-itemNum-' + value.saleId, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: value.itemNum,
                rules: [{
                  required: true,
                  message: '必须是有效正整数！'
                }]
              })(
                <InputNumber min={0} disabled={disableds} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='原价(钻)'
            >
              {getFieldDecorator('sale-price-' + value.saleId, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: value.price,
                rules: [{
                  required: true,
                  message: '必须是有效正整数！'
                }]
              })(
                <InputNumber min={0} disabled={disableds} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='售价(钻)'
            >
              {getFieldDecorator('sale-realPrice-' + value.saleId, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: value.realPrice,
                rules: [{
                  required: true,
                  message: '必须是有效正整数！'
                }]
              })(
                <InputNumber min={0} disabled={disableds} />
              )}
            </FormItem>
          </Col>
        </Row>
      )
    })

    // 随机道具
    let saleList = []
    _.forEach(data.saleList, (value, index) => {
      saleList.push(
        <Row gutter={16} key={'saleList-' + index}>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='道具 ID'
            >
              {getFieldDecorator('sale-item-' + value.saleId, {
                initialValue: [value.itemId]
              })(
                <Cascader
                  showSearch
                  disabled={disableds}
                  options={itemOPt}
                />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='道具数量'
            >
              {getFieldDecorator('sale-itemNum-' + value.saleId, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: value.itemNum,
                rules: [{
                  required: true,
                  message: '必须是有效正整数！'
                }]
              })(
                <InputNumber min={0} disabled={disableds} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='原价(钻)'
            >
              {getFieldDecorator('sale-price-' + value.saleId, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: value.price,
                rules: [{
                  required: true,
                  message: '必须是有效正整数！'
                }]
              })(
                <InputNumber min={0} disabled={disableds} />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              {...this.formItemLayout}
              label='售价(钻)'
            >
              {getFieldDecorator('sale-realPrice-' + value.saleId, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: value.realPrice,
                rules: [{
                  required: true,
                  message: '必须是有效正整数！'
                }]
              })(
                <InputNumber min={0} disabled={disableds} />
              )}
            </FormItem>
          </Col>
        </Row>
      )
    })

    // 下拉产品-初始化
    let products = []
    _.forEach(options, (value, index) => {
      // 建立initialValue的索引下标
      value.index = index
      products.push(
        <Option key={index} value={value.value}>{value.label}</Option>
      )
    })

    let indexProduct = _.find(options, function(o) { return o.value == params.product })

    console.log(indexProduct)

    // 下拉服务-初始化
    let treeData = []
    _.forEach(options[indexProduct.index].children, (value, index) => {
      treeData.push({
        label: value.label,
        value: value.value,
        key: value.value
      })
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        {/* <Card title='json string' style={{marginBottom: 6}}>
          <pre className="language-bash">
            {JSON.stringify(data, null, 2)}
          </pre>
        </Card> */}
        <Card title='产品与服务' style={{marginBottom: 6}}>
          <FormItem
            {...this.formLayout}
            label='选择产品'
          >
            {getFieldDecorator('productName', {
              initialValue: options[indexProduct.index].label
            })(
              <Select
                disabled
              >
                {products}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...this.formLayout}
            label='选择服务器'
          >
            {getFieldDecorator('servers', {
              initialValue: data.serverIdList,
              rules: [
                { required: true, message: '必须要选择产品才能匹配道具!' }
              ]
            })(
              <TreeSelect
                disabled={disableds}
                treeData={[{
                  label: '全选',
                  value: null,
                  key: '全选',
                  children: [...treeData]
                }]}
                showSearch
                allowClear
                treeDefaultExpandAll
                multiple
                treeCheckable
                treeNodeFilterProp='label'
                dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
                showCheckedStrategy={TreeSelect.SHOW_ALL}
                searchPlaceholder='多选服务器'
              />
            )}
          </FormItem>
        </Card>

        <Card title='热卖详情' style={{marginBottom: 6}}>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='ID'
              >
                {getFieldDecorator('id', {
                  initialValue: data.id
                })(
                  <Input disabled />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='刷新间隔(分钟)'
              >
                {getFieldDecorator('freshInterval', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: handleUpdateTimeMap(data.freshInterval),
                  rules: [{
                    required: true,
                    message: '必须是有效正整数！'
                  }]
                })(
                  <InputNumber min={1} max={60} disabled={disableds} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label={(
                  <span>
                    状态&nbsp;
                    <Tooltip title='1:等待 2:进行中 3:结束 5:下线'>
                      <Icon type='question-circle-o' />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('state', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: data.state
                })(
                  <Input disabled placeholder='unavailable choice' />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='开始时间'
              >
                {getFieldDecorator('startTime', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: moment(data.startTime),
                  rules: [{
                    required: true,
                    message: '请选取开始时间'
                  }]
                })(
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder='Select Time'
                    disabled={disableds}
                  />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='结束时间'
              >
                {getFieldDecorator('endTime', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: moment(data.endTime),
                  rules: [{
                    required: true,
                    message: '请选取结束时间'
                  }]
                })(
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder='Select Time'
                    disabled={disableds}
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='每日刷新开始'
              >
                {getFieldDecorator('dayStartTime', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: moment(data.dayStartTime, 'HH:mm:ss'),
                  rules: [{
                    required: true,
                    message: '请选取开始时间'
                  }]
                })(
                  <TimePicker format='HH' disabled={disableds} />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='每日刷新结束'
              >
                {getFieldDecorator('dayEndTime', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: moment(data.dayEndTime, 'HH:mm:ss'),
                  rules: [{
                    required: true,
                    message: '请选取结束时间'
                  }]
                })(
                  <TimePicker format='HH' disabled={disableds} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='售卖时间'
              >
                {getFieldDecorator('saleTime', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: data.saleTime,
                  rules: [{
                    required: true,
                    message: '描述必填'
                  }]
                })(
                  <Input disabled={disableds} placeholder='unavailable choice' />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...this.formLayout}
                label='刷新规则'
              >
                {getFieldDecorator('saleRule', {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue: data.saleRule,
                  rules: [{
                    required: true,
                    message: '规则必填'
                  }]
                })(
                  <Input disabled={disableds} placeholder='unavailable choice' />
                )}
              </FormItem>
            </Col>
          </Row>
        </Card>

        <Card title='优先展示道具' style={{marginBottom: 6}}>
          {fixList}
        </Card>

        <Card title='随机道具' style={{marginBottom: 6}}>
          {saleList}
          {
            disableds
            ?
              <Row>
                <Col span={24}>
                  <FormItem {...this.formTailLayout}>
                    <Button onClick={this.redirect} type='primary' >返回</Button>
                  </FormItem>
                </Col>
              </Row>
            :
              <Row>
                <Col span={24}>
                  <FormItem {...this.formTailLayout}>
                    <Button onClick={this.redirect} type='primary' >返回</Button>
                    <Button type='primary' htmlType='submit' >提交表单</Button>
                  </FormItem>
                </Col>
              </Row>
          }
        </Card>
      </Form>
    )
  }
}

const WrappedDynamicRule = Form.create()(DetailPage)
export default WrappedDynamicRule
