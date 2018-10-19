import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Button, Input, Modal, Cascader, Icon, DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import ExportMenuContainer from '../containers/ExportMenuContainer'


export class LogActionsFilter extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    options: PropTypes.array,
    form: PropTypes.object,
    initial: PropTypes.object,
    action: PropTypes.object,
    onSearch: PropTypes.func,
    onRender: PropTypes.func,
    fetchConsumeSources: PropTypes.func.isRequired,
    fetchOperationType: PropTypes.func.isRequired,
    fetchProduceSources: PropTypes.func.isRequired
  }

  state = {
    visible: false
  }

  handleExportLogActions = () => {
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
        if (!fieldsValue.produceSourcesList) {
          fieldsValue.produceSourcesList = ['']
        }
        if (!fieldsValue.consumeSourcesList) {
          fieldsValue.consumeSourcesList = ['']
        }
        if (!fieldsValue.operationSourcesList) {
          fieldsValue.operationSourcesList = ['']
        }
        fieldsValue.startTime = fieldsValue.startTime.format('YYYY-MM-DD')
        this.props.onSearch(fieldsValue)
      }
    })
  }

  componentDidMount() {
    this.props.fetchConsumeSources()
    this.props.fetchOperationType()
    this.props.fetchProduceSources()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const {curd} = this.props

    let produceSourcesLists = []
    for (let key in this.props.action.produceSources) {
      produceSourcesLists.push({value: this.props.action.produceSources[key], label: `${key}(${this.props.action.produceSources[key]})`})
    }
    let consumeSourcesLists = []
    for (let key in this.props.action.consumeSources) {
      consumeSourcesLists.push({value: this.props.action.consumeSources[key], label: `${key}(${this.props.action.consumeSources[key]})`})
    }
    let operationTypesLists = []
    for (let key in this.props.action.operationType) {
      operationTypesLists.push({value: this.props.action.operationType[key], label: `${key}(${this.props.action.operationType[key]})`})
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

    return (
      <div>
        <Form onSubmit={this.handleSearch} >
          <Row gutter={20}>
            {
              _.has(curd, '150401')
              ?
                <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
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
              _.has(curd, '150401')
              ?
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
                  {getFieldDecorator('startTime', {
                    rules: [{ type: 'object', required: true, message: '请选择日期' }]
                  })(
                    <DatePicker placeholder='请选择日期(必选)' />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150401')
              ?
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
                  {getFieldDecorator('nickname', {
                    rules: [{ required: true, message: '请输入玩家昵称' }],
                    initialValue: ''
                  })(
                    <Input placeholder='玩家昵称(必填)' />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150401')
              ?
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
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
            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  _.has(curd, '150401')
                  ?
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit'><Icon type='search' />查询</Button>
                    </div>
                  :
                    ''
                }
                {
                  _.has(curd, '150402')
                  ?
                    <div>
                      <Button type='ghost' onClick={this.handleExportLogActions}><Icon type='edit' />导出</Button>
                    </div>
                  :
                    ''
                }
              </div>
            </Col>
          </Row>
          {
            _.has(curd, '150401')
            ?
              <Row gutter={12}>
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                  {getFieldDecorator('produceSourcesList', {
                    rules: [{ required: false, message: '请输入生产来源' }]
                  })(
                    <Cascader
                      style={{ width: '100%' }}
                      options={produceSourcesLists}
                      placeholder='生产来源'
                      showSearch
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                  {getFieldDecorator('consumeSourcesList', {
                    rules: [{ required: false, message: '请输入消耗来源' }]
                  })(
                    <Cascader
                      style={{ width: '100%' }}
                      options={consumeSourcesLists}
                      placeholder='消耗来源'
                      showSearch
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                  {getFieldDecorator('operationSourcesList', {
                    rules: [{ required: false, message: '请输入操作来源' }]
                  })(
                    <Cascader
                      style={{ width: '100%' }}
                      options={operationTypesLists}
                      placeholder='操作来源'
                      showSearch
                    />
                  )}
                </Col>
              </Row>
            :
              ''
          }
        </Form>

        <Modal
          width={900}
          key={Math.random()}
          title='导出行为'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ExportMenuContainer
            options={this.props.options}
            onSubmit={this.props.onSubmit}
            onCreate={this.handleOk}
            onRender={this.props.onRender}
          />
        </Modal>
      </div>
    )
  }
}

const Filter = Form.create()(LogActionsFilter)

export default Filter
