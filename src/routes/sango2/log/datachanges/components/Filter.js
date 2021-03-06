import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Button, Input, Cascader, Icon, DatePicker, Modal } from 'antd'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import ExportContainer from '../containers/ExportContainer'

const RangePicker = DatePicker.RangePicker

export class LogProducesFilter extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    options: PropTypes.array,
    form: PropTypes.object,
    datachange: PropTypes.object,
    initial: PropTypes.object,
    onSubmit: PropTypes.func,
    onRender: PropTypes.func,
    onSearch: PropTypes.func
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      'range-time-picker': {},
      'products': {},
      'datachangeSourceList': {
        value: []
      }
    },
    visible: false
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  handleExport = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let values = {
          list: {}
        }
        values.products = fieldsValue.products
        values.list.nickname = fieldsValue.nickname
        values.list.playerId = fieldsValue.playerId
        values.list.startTime = fieldsValue['range-time-picker'][0].format('YYYY-MM-DD HH:mm:ss')
        values.list.endTime = fieldsValue['range-time-picker'][1].format('YYYY-MM-DD HH:mm:ss')
        if (fieldsValue.datachangeSourceList.length > 0) { values.list.dataChangeType = fieldsValue.datachangeSourceList[0] }
        values.list.pageSize = 50
        values.list.pageNum = 1
        this.props.onSearch(values)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {datachange} = this.props
    const {curd} = this.props

    let datachangeSourceLists = []
    _.map(datachange.source, (val, idx) => {
      datachangeSourceLists.push({
        value: val,
        label: `${idx}(${val})`
      })
    })

    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }

    const TwoColProps = {
      ...ColProps,
      xl: 96
    }

    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择起止时间' }],
      initialValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss').subtract({days: -1})]
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} >
          <Row gutter={24}>
            {
              _.has(curd, '150601')
              ?
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                  {getFieldDecorator('products', {
                    rules: [{ required: true, message: '请选择产品与服务器(必选)' }],
                    initialValue: this.props.initial.products ? this.props.initial.products : []
                  })(
                    <Cascader
                      style={{ width: '100%' }}
                      options={this.props.options}
                      placeholder='请选择产品与服务器(必选)'
                      showSearch
                      expandTrigger='hover'
                    />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150601')
              ?
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }}>
                  {getFieldDecorator('nickname', {
                    rules: [{ required: false, message: '请输入玩家昵称' }],
                    initialValue: ''
                  })(
                    <Input placeholder='玩家昵称' />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150601')
              ?
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }}>
                  {getFieldDecorator('playerId', {
                    rules: [{ required: false, message: '请输入玩家ID' }],
                    initialValue: ''
                  })(
                    <Input placeholder='玩家ID' />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150601')
              ?
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                  {getFieldDecorator('range-time-picker', rangeConfig)(
                    <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150601')
              ?
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                  {getFieldDecorator('datachangeSourceList', {
                    rules: [{ required: false, message: '请输入变化源' }]
                  })(
                    <Cascader
                      style={{ width: '100%' }}
                      options={datachangeSourceLists}
                      placeholder='变化源'
                      showSearch
                    />
                  )}
                </Col>
              :
                ''
            }
            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  _.has(curd, '150601')
                  ?
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit'><Icon type='search' />查询</Button>
                    </div>
                  :
                    ''
                }
                {
                  _.has(curd, '150602')
                  ?
                    <div>
                      <Button type='ghost' onClick={this.handleExport}><Icon type='edit' />导出</Button>
                    </div>
                  :
                    ''
                }
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={900}
          key={Math.random()}
          title='导出活动变化'
          {...this.state.fields}
          onChange={this.onChange}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ExportContainer
            {...this.state.fields}
            options={this.props.options}
            source={this.props.datachange.source}
            onSubmit={this.props.onSubmit}
            handleCancel={this.handleCancel}
            onRender={this.props.onRender}
          />
        </Modal>
      </div>
    )
  }
}

const Filter = Form.create({
  // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  // 把 props 转为对应的值，可用于把 Redux store 中的值读出 {...this.state.fields}
  mapPropsToFields(props) {
    return {
      nickname: {
        ...props.nickname
      },
      playerId: {
        ...props.playerId
      },
      'range-time-picker': {
        ...props['range-time-picker']
      },
      'products': {
        ...props.products
      },
      'datachangeSourceList': {
        ...props.datachangeSourceList
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {
    console.log('Form.create.onValuesChange', values)
  }
})(LogProducesFilter)

export default Filter
