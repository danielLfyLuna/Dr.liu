import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Input, Modal, Cascader, Icon, DatePicker } from 'antd'
import moment from 'moment'
import _ from 'lodash'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import ExportContainer from '../containers/ExportContainer'

const RangePicker = DatePicker.RangePicker

class LogOperationsFilter extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    onRender: PropTypes.func,
    onSubmit: PropTypes.func,
    operation: PropTypes.object,
    initial: PropTypes.object,
    options: PropTypes.array,
    form: PropTypes.object,
    onSearch: PropTypes.func,
    operationSources: PropTypes.func
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
      'operationSourcesList': {
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

  handleExportLogOperations = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        // fieldsValue.showTime = fieldsValue.showTime.format('YYYY-MM-DD HH:mm:ss')
        this.props.onSearch(fieldsValue)
      }
    })
  }

  componentDidMount() {
    this.props.operationSources()
    // 消耗来源
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { curd } = this.props

    let operationSourcesLists = []
    for (let key in this.props.operation.operationSources) {
      operationSourcesLists.push({value: this.props.operation.operationSources[key], label: `${key}(${this.props.operation.operationSources[key]})`})
    }

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
      rules: [{ type: 'array', required: true, message: '请选择起止时间!' }],
      initialValue: [moment(new Date(), 'YYYY-MM-DD HH:mm:ss'), moment()]
    }

    return (
      <div>
        <Form onSubmit={this.handleSearch} >
          <Row gutter={10}>
            {
              _.has(curd, '150101')
              ?
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
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
              _.has(curd, '150101')
              ?
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 6 }}>
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
              _.has(curd, '150101')
              ?
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 6 }}>
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
              _.has(curd, '150101')
              ?
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                  {getFieldDecorator('operationSourcesList', {
                    rules: [{ required: false, message: '请输入操作来源' }]
                  })(
                    <Cascader
                      style={{ width: '100%' }}
                      options={operationSourcesLists}
                      placeholder='操作来源'
                      showSearch
                    />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150101')
              ?
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                  {getFieldDecorator('range-time-picker', rangeConfig)(
                    <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                  )}
                </Col>
              :
                ''
            }

            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  _.has(curd, '150101')
                  ?
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit'><Icon type='search' />查询</Button>
                    </div>
                  :
                    ''
                }
                {
                  _.has(curd, '150102')
                  ?
                    <div>
                      <Button type='ghost' onClick={this.handleExportLogOperations}><Icon type='edit' />导出</Button>
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
          title='导出行为'
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
            operation={this.props.operation}
            onCreate={this.handleOk}
            onRender={this.props.onRender}
            onSubmit={this.props.onSubmit}
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
      'operationSourcesList': {
        ...props.operationSourcesList
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {
    console.log('Form.create.onValuesChange', values)
  }
})(LogOperationsFilter)

export default Filter
