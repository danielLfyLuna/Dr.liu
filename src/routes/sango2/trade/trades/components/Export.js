import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import { Form, Button, Cascader, InputNumber, Input, DatePicker, Row, Col, TreeSelect, Switch, Tooltip, Icon } from 'antd'

const { RangePicker } = DatePicker

class TradeFilter extends Component {
  state = {
    pro: [],
    sev: [],
    select: 0,
    switchValue: true
  }

  componentWillMount() {
    this.props.fetchTradeGoods({ productId: '_' })
    let pro = []
    _.map(this.props.options.productsNotAll, (v, i) => {
      pro.push({value: v.value, label: v.label})
    })
    this.setState({
      pro: pro
    })
  }

  handleFilterSelect = (select) => {
    this.setState({
      select: select[0]
    })
  }

  switchChange = (v) => {
    this.setState({
      switchValue: v
    })
  }

  proChange = (v) => {
    if (v[0]) {
      let sev = []
      _.map(this.props.options.productsNotAll, (val, i) => {
        if (v[0] === val.value) {
          sev = val.children
        }
      })
      this.setState({
        sev: sev
      })
    }
  }

  _goodReduce = (options, types) => {
    let goods = []
    _.reduce(options, (result, option, index) => {
      let gds = []
      _.reduce(option, (res, opt, idx) => {
        res.push({ value: idx, label: `${opt}(${idx})` })
        return res
      }, gds)
      result.push({ value: index, label: types[index], children: gds })
      return result
    }, goods)
    return goods
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let obj = {}
        if (values.selectTypes && values.selectTypes.length) obj.selectType = values.selectTypes[0]
        if (values.itemIds && values.itemIds.length) obj.itemId = values.itemIds[1]
        if (values.low) obj.low = values.low
        if (values.high) obj.high = values.high
        if (values.buyer) obj.buyer = values.buyer
        if (values.seller) obj.seller = values.seller
        if (values.status) obj.status = values.status[0]
        if (values.servers && values.servers.length) {
          obj.servers = values.servers.join(',')
          obj.type = 1
        }
        if (values.serverId) {
          obj.servers = values.serverId
          obj.type = 2
        }
        if (values.time && values.time.length > 0) {
          obj.startTime = moment(moment(values.time[0]).format('YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD HH:mm:ss').format('x')
          obj.endTime = moment(moment(values.time[1]).format('YYYY-MM-DD 00:00:00'), 'YYYY-MM-DD HH:mm:ss').format('x')
        } else {
          obj.startTime = 0
          obj.endTime = 0
        }
        this.props.onExport({
          productId: values.productId[0],
          serverId: '_',
          params: obj
        })
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, initials, tradeGoods } = this.props
    const goods = this._goodReduce(tradeGoods.options, initials.map.goodTypes)

    return (
      <div style={{ marginBottom: 12 }}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={10}>
            <Col className='gutter-row' span={8} style={{ marginBottom: 12 }}>
              {getFieldDecorator('switch', {
                valuePropName: 'checked',
                rules: [{ required: true, message: '选择服务器方式' }],
                initialValue: this.state.switchValue
              })(
                <Switch
                  checkedChildren='多选服务器'
                  unCheckedChildren='区间填写服务器'
                  onChange={this.switchChange}
                />
              )}
            </Col>
            <Col className='gutter-row' span={12}>
              {getFieldDecorator('time', {
                rules: [{ required: false, message: '请选择日期' }]
              })(
                <RangePicker format='YYYY-MM-DD' />
              )}
              <i style={{ marginLeft: '5px' }}><Tooltip title='时间空选表示查询所有结果'><Icon type='question-circle-o' /></Tooltip></i>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col className='gutter-row' span={8} style={{ marginBottom: 12 }}>
              {getFieldDecorator('productId', {
                rules: [{ type: 'array', required: true, message: '请选择产品/服务器以启用道具!' }]
              })(
                <Cascader
                  options={this.state.pro}
                  showSearch
                  expandTrigger='hover'
                  placeholder='请选择产品'
                  style={{ width: '100%' }}
                  onChange={this.proChange}
                />
              )}
            </Col>
            {
              this.state.switchValue ?
                <Col className='gutter-row' span={12} style={{ marginBottom: 12 }}>
                  {getFieldDecorator('servers', {
                    rules: [{ required: true, message: '请选择服务器(必选)!' }]
                  })(
                    <TreeSelect
                      treeData={[{
                        label: '全选',
                        value: null,
                        key: '全选',
                        children: [...this.state.sev]
                      }]}
                      showSearch
                      allowClear
                      multiple
                      treeCheckable
                      treeDefaultExpandAll
                      treeNodeFilterProp='label'
                      showCheckedStrategy={TreeSelect.SHOW_CHILD}
                      searchPlaceholder='服务器(必选)'
                      dropdownStyle={{height: 300}}
                    />
                  )}
                </Col>
              :
                <Col className='gutter-row' span={12} style={{ marginBottom: 12 }}>
                  <div>
                    {getFieldDecorator('serverId', {
                      rules: [
                        { required: true, message: '输入区间数值!' }
                      ]
                    })(
                      <Input type='textarea' placeholder='输入区间数值' autosize={{ minRows: 1, maxRows: 5 }} />
                    )}
                  </div>
                  <span>
                    <Tooltip
                      title={
                        <div>连续区间用 (-) 分隔. <i style={{color: '#f11738'}}>例：app_001-app_100</i><p>多段区间用 (,) 分割. <i style={{color: '#f11738'}}>例：app_001-app_002,app_100-app_102</i></p></div>
                      }
                    >
                      <Icon type='question-circle-o' />
                    </Tooltip>
                  </span>
                </Col>
            }
          </Row>
          <Row gutter={10}>
            <Col className='gutter-row' span={8} style={{ marginBottom: 12 }}>
              {getFieldDecorator('selectTypes', {
                rules: [{ type: 'array', required: true, message: '请选择筛选条件(必选)!' }],
                initialValue: [0],
                onChange: this.handleFilterSelect
              })(
                <Cascader
                  options={initials.enum.selectTypes}
                  showSearch
                  expandTrigger='hover'
                  placeholder='请选择筛选条件(必选)'
                />
              )}
            </Col>
          </Row>
          <Row gutter={10}>
            {
              (this.state.select === initials.conf.select.price ||
              this.state.select === initials.conf.select.num ||
              this.state.select === initials.conf.select.item) &&
              <Col className='gutter-row' span={12}>
                {getFieldDecorator('itemIds', {
                  rules: [{ type: 'array', required: true, message: '请选择类型/道具(必选)!' }]
                })(
                  <Cascader
                    options={goods}
                    showSearch
                    expandTrigger='hover'
                    placeholder='请选择类型/道具(必选)'
                  />
                )}
              </Col>
            }
            {
              (this.state.select === initials.conf.select.price ||
              this.state.select === initials.conf.select.num) &&
              <Col className='gutter-row' span={6}>
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
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('high', {
                  rules: [{ required: false, message: '请输入最大值!' }]
                })(
                  <InputNumber placeholder='请输入最大值' min={0} style={{ width: '100%' }} />
                )}
              </Col>
            }
          </Row>
          <Row gutter={10}>
            {
              (this.state.select === initials.conf.select.name) &&
              <Col className='gutter-row' span={12}>
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
              <Col className='gutter-row' span={12}>
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
          </Row>
          <Row gutter={10}>
            <Col className='gutter-row' span={4}>
              <Button type='primary' htmlType='submit' style={{ marginLeft: 16, marginTop: 10 }}>导出</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

TradeFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  tradeGoods: PropTypes.object,
  initials: PropTypes.object,
  fetchTradeGoods: PropTypes.func,
  handleCancel: PropTypes.func,
  onExport: PropTypes.func
}

const Filter = Form.create()(TradeFilter)

export default Filter
