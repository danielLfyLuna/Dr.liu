import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Transfer, Select, Switch, Input, Row, Col, Icon, Button, DatePicker } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import openNotificationWithIcon from '../../../../../../../components/notification'

const { Option } = Select

class List extends Component {
  state = {
    targetKeys: [],
    isSwitch: 'input'
  }

  constructor(props) {
    super(props)
    this.initialNum = 0
    this.initialList = []
    this.dataSource = []
  }

  componentWillUpdate(nextProps) {
    let dataSource = []
    _.map(nextProps.options.allTemplates.templates, (v, i) => {
      dataSource.push({
        key: v.templateId,
        name: v.name,
        title: `${v.name}(${v.templateId})`,
        description: `${v.name}(${v.templateId}),类型:${v.functionId},操作人:${v.adminUserName}`
      })
    })
    this.dataSource = dataSource
  }

  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({
      targetKeys: targetKeys
    })
  }

  handleReload = () => {
    this.setState({
      targetKeys: []
    })
  }

  renderFooter = () => {
    return (
      <Button
        size='small'
        style={{ float: 'right', margin: 5 }}
        onClick={this.handleReload}
      >
        重置
      </Button>
    )
  }

  handleSwitch = (value) => {
    if (value) {
      this.initialNum = 0
      this.initialList = []
      this.props.form.setFieldsValue({
        keys: this.initialList
      })
    }
    this.setState({
      isSwitch: value ? 'select' : 'input'
    })
  }

  add = () => {
    this.initialNum++
    this.initialList.push(this.initialNum)
    this.props.form.setFieldsValue({
      keys: this.initialList
    })
  }

  remove = (k) => {
    this.initialList = this.initialList.filter(key => key !== k)
    if (!this.initialList.length) { this.initialNum = 0 }
    this.props.form.setFieldsValue({
      keys: this.initialList
    })
  }

  handleReloadForm = () => {
    this.initialNum = 0
    this.initialList = []
    this.props.form.resetFields()
    // this.props.form.setFieldsValue({
    //   keys: this.initialList
    // })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!this.state.targetKeys.length) {
        openNotificationWithIcon('warning', '请先选择活动', '请先查询活动列表，然后从左侧选择活动然后移动到到右侧')
        return
      }
      if (!values.switch && !values.keys.length) {
        openNotificationWithIcon('warning', '请选择产品服务器', '请选择产品并填写服务器区间')
        return
      }
      if (!err) {
        let objs = []
        this.state.targetKeys.map((val, idx) => {
          if (!values.switch) {
            values.keys.map((v, i) => {
              let names = ''
              _.map(this.dataSource, (v, i) => {
              if (v.key === val) names = v.name
              })
              let obj = {
                templateId: val,
                name: names,
                startTime: values.startTime.format('YYYY-MM-DD HH:mm:ss'),
                endTime: values.endTime.format('YYYY-MM-DD HH:mm:ss'),
                productId: values[`product-${v}`],
                serverIds: values[`server-${v}`]
              }
              objs.push(obj)
            })
          } else {
            if (values.products.length) {
              let names = ''
              _.map(this.dataSource, (v, i) => {
              if (v.key === val) names = v.name
              })
              values.products.map((v, i) => {
                let obj = {
                  templateId: val,
                  name: names,
                  startTime: values.startTime.format('YYYY-MM-DD HH:mm:ss'),
                  endTime: values.endTime.format('YYYY-MM-DD HH:mm:ss'),
                  productId: v,
                  serverIds: '*'
                }
                objs.push(obj)
              })
            }
          }
        })
        this.props.onSend(objs)
      }
    })
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue } } = this.props
    let prosNotAll = []
    _.map(this.props.options.products.options, (v, i) => {
      prosNotAll.push(<Option key={v.value} value={v.value}>{v.label}</Option>)
    })

    getFieldDecorator('keys', { initialValue: this.initialList })
    const keys = getFieldValue('keys')
    const proItems = keys.map((k, i) => {
      return (
        <div key={`form-${k}`} style={{ marginBottom: 15 }}>
          <Row key={k} gutter={8} type='flex' justify='space-between' align='middle'>
            <Col>{`产品&服务器${k}:`}</Col>
            <Col>
              {getFieldDecorator(`product-${k}`, {
                rules: [{
                  required: true,
                  message: '请选择产品'
                }]
              })(
                <Select
                  allowClear
                  style={{ width: 200 }}
                  placeholder={`请选择产品-${k}组`}
                  optionFilterProp='children'
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {prosNotAll}
                </Select>
              )}
            </Col>
            <Col>
              {getFieldDecorator(`server-${k}`, {
                rules: [{
                  required: true,
                  message: '请选择服务器'
                }]
              })(
                <Input.TextArea
                  placeholder={`请输入服务器区间-${k}组`}
                  autosize={{minRows: 1}}
                />
              )}
            </Col>
            <Col>
              <Icon
                className='dynamic-delete-button'
                type='minus-circle-o'
                onClick={() => this.remove(k)}
              />
            </Col>
          </Row>
        </div>
      )
    })

    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              alignContent: 'space-between'
            }}
          >
            <div style={{ marginRight: 20 }}>
              <Transfer
                dataSource={this.dataSource}
                showSearch
                listStyle={{
                  height: 400,
                  width: 230
                }}
                notFoundContent={this.props.options.allTemplates.fetching ? '数据正在加载,请稍后' : '数据为空,请查询活动'}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => item.title}
                footer={this.renderFooter}
              />
            </div>
            <div>
              <Form.Item>
                {getFieldDecorator('switch', {
                  valuePropName: 'checked',
                  initialValue: this.state.isSwitch === 'select'
                })(
                  <Switch checkedChildren='全选' unCheckedChildren='区间' onChange={this.handleSwitch} />
                )}
              </Form.Item>
              {
                this.state.isSwitch === 'select' &&
                <Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {getFieldDecorator('products', {
                      rules: [{
                        required: true,
                        message: '请选择产品'
                      }]
                    })(
                      <Select
                        allowClear
                        mode='multiple'
                        style={{ width: 200 }}
                        placeholder='请选择产品'
                        optionFilterProp='children'
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {prosNotAll}
                      </Select>
                    )}
                  </div>
                </Form.Item>
              }
              {
                this.state.isSwitch === 'input' ? proItems : ''
              }
              {
                this.state.isSwitch === 'input' &&
                <Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button type='dashed' onClick={this.add}>
                      <Icon type='plus' />添加产品/服务器
                    </Button>
                  </div>
                </Form.Item>
              }
              <Form.Item label='开始时间'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {getFieldDecorator('startTime', {
                    rules: [{
                      required: true
                    }]
                  })(
                    <DatePicker
                      showTime={{ defaultValue: moment('05:00:00', 'HH:mm:ss') }}
                      format='YYYY-MM-DD HH:mm:ss'
                      style={{ minWidth: 200 }}
                    />
                  )}
                </div>
              </Form.Item>
              <Form.Item label='结束时间'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* {getFieldDecorator('time', {
                    rules: [{
                      required: true
                    }]
                  })(
                    <RangePicker
                      showTime={{ defaultValue: [moment('05:00:00', 'HH:mm:ss'), moment('05:00:00', 'HH:mm:ss')] }}
                      format='YYYY-MM-DD HH:mm:ss'
                      style={{ minWidth: 350 }}
                    />
                  )} */}
                  {getFieldDecorator('endTime', {
                    rules: [{
                      required: true
                    }]
                  })(
                    <DatePicker
                      showTime={{ defaultValue: moment('05:00:00', 'HH:mm:ss') }}
                      format='YYYY-MM-DD HH:mm:ss'
                      style={{ minWidth: 200 }}
                    />
                  )}
                </div>
              </Form.Item>
              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button icon='search' type='primary' htmlType='submit'>提交</Button>
                  {
                    this.state.isSwitch === 'input' &&
                    <Button icon='reload' onClick={this.handleReloadForm} style={{ marginLeft: 10 }}>重置</Button>
                  }
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

List.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onSend: PropTypes.func
}

List.contextTypes = {
  router: PropTypes.object
}

const Lists = Form.create()(List)
export default Lists
