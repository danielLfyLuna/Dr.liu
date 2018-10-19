import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { Form, Button, Cascader, InputNumber, Input, Row, Col, Modal, DatePicker, Tooltip, Icon } from 'antd'

// import openNotificationWithIcon from '../../../../../components/notification'
import Exports from './Export'


const { RangePicker } = DatePicker
const ButtonGroup = Button.Group

class TradeFilter extends Component {
  state = {
    select: 0,
    visible: false,
    products: null
  }

  handleProductSelect = (products) => {
    // this.setState({
    //   products: products
    // })
    if (products && products.length) {
      this.props.onSearch({
        products: {
          productId: products[0],
          serverId: products[1]
        },
        handle: 'GET_GOODS'
      })
    }
  }

  handleFilterSelect = (select) => {
    this.setState({
      select: select[0]
    })
  }

  // handlePush = () => {
  //   if (!this.state.products || this.state.products.length <= 1) {
  //     openNotificationWithIcon('warning', '请先选择产品服务器')
  //     return
  //   }
  // }

  _paramsReduce = (options) => {
    return _.reduce(options, (result, val, key) => {
      result.push(`${key}=${val}`)
      return result
    }, [])
  }

  handleClick = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { initials } = this.props
      if (!err) {
        let obj = {}
        if (values.selectType && values.selectType.length) obj.selectType = values.selectType[0]
        if (values.time && values.time.length > 0) {
          obj.startTime = moment(moment(values.time[0]).format('YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD HH:mm:ss').format('x')
          obj.endTime = moment(moment(values.time[1]).format('YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD HH:mm:ss').format('x')
        }
        if (values.itemIds && values.itemIds.length) obj.itemId = values.itemIds[1]
        if (values.low || values.low === 0) obj.low = values.low
        if (values.high || values.high === 0) obj.high = values.high
        if (values.buyer) obj.buyer = values.buyer
        if (values.seller) obj.seller = values.seller
        if (values.status) obj.status = values.status[0]

        let params = this._paramsReduce(obj)
        this.props.onSearch({
          search: params.length ? params.length > 1 ? params.join('&') : params[0] : '',
          handle: 'GET_TRADES',
          tip: values.products,
          data: obj,
          params: {
            selectType: obj.selectType ? obj.selectType : initials.params.selectType,
            items: {
              type: obj.itemId ? values.itemIds[0] : initials.params.items.type,
              itemId: obj.itemId ? obj.itemId : initials.params.items.itemId
            },
            startTime: obj.startTime,
            endTime: obj.endTime,
            low: obj.low ? obj.low : initials.params.low,
            high: obj.high ? obj.high : initials.params.high,
            buyer: obj.buyer ? obj.buyer : initials.params.buyer,
            seller: obj.seller ? obj.seller : initials.params.seller,
            status: obj.status ? obj.status : initials.params.status
          }
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, initials, login } = this.props

    return (
      <div style={{ marginBottom: 12 }}>
        {
          options.authorize.includes(100101) &&
          <Form onSubmit={this.handleSearch}>
            <Row gutter={10}>
              <Col className='gutter-row' span={6} style={{ marginBottom: 8 }}>
                {getFieldDecorator('products', {
                  initialValue: initials.products.productId ? [initials.products.productId, initials.products.serverId] : [],
                  rules: [{ type: 'array', required: true, message: '请选择产品/服务器以启用道具!' }],
                  onChange: this.handleProductSelect
                })(
                  <Cascader
                    options={options.products}
                    showSearch
                    expandTrigger='hover'
                    placeholder='请选择产品/服务器以启用道具'
                    style={{ width: '100%' }}
                  />
                )}
              </Col>
              <Col className='gutter-row' span={8}>
                {getFieldDecorator('time', {
                  rules: [{ required: false, message: '请选择日期' }]
                })(
                  <RangePicker format='YYYY-MM-DD' />
                )}
                <i style={{ marginLeft: '5px' }}><Tooltip title='时间空选表示查询所有结果'><Icon type='question-circle-o' /></Tooltip></i>
              </Col>
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('selectType', {
                  rules: [{ type: 'array', required: true, message: '请选择筛选条件!' }],
                  initialValue: [0],
                  onChange: this.handleFilterSelect
                })(
                  <Cascader
                    options={initials.enum.selectTypes}
                    showSearch
                    expandTrigger='hover'
                    placeholder='请选择筛选条件'
                  />
                )}
              </Col>
            </Row>

            <Row gutter={10}>
              {
                (this.state.select === initials.conf.select.price ||
                this.state.select === initials.conf.select.num ||
                this.state.select === initials.conf.select.item) &&
                <Col className='gutter-row' span={6}>
                  {getFieldDecorator('itemIds', {
                    rules: [{ type: 'array', required: false, message: '请选择类型/道具!' }]
                  })(
                    <Cascader
                      options={options.goods.list}
                      showSearch
                      expandTrigger='hover'
                      placeholder='请选择类型/道具'
                    />
                  )}
                </Col>
              }
              {
                (this.state.select === initials.conf.select.price ||
                this.state.select === initials.conf.select.num) &&
                <Col className='gutter-row' span={3}>
                  {getFieldDecorator('low', {
                    rules: [{ required: false, message: '请输入最小值!' }]
                  })(
                    <InputNumber placeholder='请输入最小值' min={0} style={{ width: '100%' }} />
                  )}
                </Col>
              }
              {
                (this.state.select === initials.conf.select.price ||
                this.state.select === initials.conf.select.num) &&
                <Col className='gutter-row' span={3}>
                  {getFieldDecorator('high', {
                    rules: [{ required: false, message: '请输入最大值!' }]
                  })(
                    <InputNumber placeholder='请输入最大值' min={0} style={{ width: '100%' }} />
                  )}
                </Col>
              }
              {
                (this.state.select === initials.conf.select.name) &&
                <Col className='gutter-row' span={6}>
                  {getFieldDecorator('buyer', {
                    rules: [{ required: false, message: '请输入买家昵称!' }]
                  })(
                    <Input
                      placeholder='请输入买家昵称'
                    />
                  )}
                </Col>
              }
              {
                (this.state.select === initials.conf.select.name) &&
                <Col className='gutter-row' span={6}>
                  {getFieldDecorator('seller', {
                    rules: [{ required: false, message: '请输入卖家昵称!' }]
                  })(
                    <Input
                      placeholder='请输入卖家昵称'
                    />
                  )}
                </Col>
              }
              {
                this.state.select === initials.conf.select.status &&
                <Col className='gutter-row' span={6}>
                  {getFieldDecorator('status', {
                    rules: [{ required: true, message: '请选择状态!' }]
                  })(
                    <Cascader
                      options={initials.enum.statusState}
                      showSearch
                      expandTrigger='hover'
                      placeholder='请选择状态'
                    />
                  )}
                </Col>
              }
              <Col className='gutter-row' span={6}>
                <ButtonGroup>
                  {
                    _.has(login.curd, '100101') ?
                      <Button type='primary' htmlType='submit' style={{ marginLeft: 16 }}>查询</Button>
                    :
                      null
                  }
                  {
                    _.has(login.curd, '100104') ?
                      <Button type='primary' icon='download' onClick={this.handleClick}>导出</Button>
                    :
                      null
                  }
                  {/* <Button type='primary' icon='reload' onClick={this.handlePush}>手动拉取</Button> */}
                </ButtonGroup>
              </Col>
            </Row>
          </Form>
        }
        <Modal
          title='导出'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
          width={800}
          destroyOnClose
        >
          <Exports
            fetchTradeGoods={this.props.fetchTradeGoods}
            handleCancel={this.handleCancel}
            options={this.props.options}
            tradeGoods={this.props.tradeGoods}
            onExport={this.props.onExport}
            initials={this.props.initials}
          />
        </Modal>
      </div>
    )
  }
}

TradeFilter.propTypes = {
  login: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  tradeGoods: PropTypes.object,
  fetchTradeGoods: PropTypes.func,
  onSearch: PropTypes.func,
  onExport: PropTypes.func
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: {
        ...props.products
      },
      selectType: {
        ...props.selectType
      },
      time: {
        ...props.time
      },
      itemIds: {
        ...props.itemIds
      },
      status: {
        ...props.status
      },
      buyer: {
        ...props.buyer
      },
      seller: {
        ...props.seller
      },
      low: props.low,
      high: props.high
    }
  },
  onValuesChange(_, values) {
  }
})(TradeFilter)

export default Filter
