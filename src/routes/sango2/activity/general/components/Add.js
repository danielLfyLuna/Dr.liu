import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, InputNumber, Input, Select, Cascader, Row, Col, Icon } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item

class Modals extends Component {
  static propTypes = {
    form: PropTypes.object,
    goods: PropTypes.object,
    onAdd: PropTypes.func,
    handleCancel: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.num = 0
    this.array = []
    this.itemNum = {}
    this.itemArray = []
    this.itemValidate = {}
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let target = {
          template: {
            name: values.name,
            templateId: values.templateId
          }
        }

        target.items = _.map(values.keys, (val, ix) => {
          let tar = {
            templateId: values.templateId,
            activityItemId: values[`activityItemId-${val}`],
            clientValue: values[`clientValue-${val}`],
            coin: values[`coin-${val}`],
            description: values[`description-${val}`][0],
            level: values[`level-${val}`]
          }
          let arr = []
          _.map(values[`items-${val}`], (v, i) => {
            const itemid = values[`itemId-${v}`][0]
            const count = values[`count-${v}`]
            const type = 0
            arr.push(`${itemid},${count},${type}`)
          })
          if (arr.length) {
            tar.rewards = arr.join(';')
          }
          return tar
        })

        this.props.onAdd(target)
        this.props.handleCancel()
      }
    })
  }

  remove = (k) => {
    const { form } = this.props
    if (form.getFieldValue('keys').length === 0) { return }
    form.setFieldsValue({ keys: form.getFieldValue('keys').filter(key => key !== k) })
    this.itemValidate[k] = '0'
    if (form.getFieldValue('keys').length === 0) { this.num = 0 }
  }
  add = () => {
    const { form } = this.props
    this.num++
    const nextKeys = form.getFieldValue('keys').concat(this.num)
    form.setFieldsValue({ keys: nextKeys })
  }
  removeItem = (k, ks) => {
    const { form } = this.props
    if (form.getFieldValue(`items-${k}`).length === 0) { return }
    form.setFieldsValue({ [`items-${k}`]: form.getFieldValue(`items-${k}`).filter(key => key !== ks) })
    if (form.getFieldValue(`items-${k}`).length === 0) { this.itemNum[k] = 0 }
  }
  addItem = (k) => {
    let stop = []
    _.map(this.itemValidate, (v, i) => {
      if (v == '1') {
        stop.push(1)
      }
    })
    if (stop.length > 1) { return }

    const { form } = this.props
    if (this.itemNum[k] && this.itemNum[k] !== 0) {
      this.itemNum[k]++
    } else { this.itemNum[k] = 1 }
    const nextKeys = form.getFieldValue(`items-${k}`).concat(this.itemNum[k])
    form.setFieldsValue({ [`items-${k}`]: nextKeys })
  }

  handleSelect = (k, e) => {
    this.itemValidate[k] = Number(e)
    if (!Number(e)) {
      this.itemNum[k] = 0
      this.itemArray = []
      this.props.form.setFieldsValue({ [`items-${k}`]: [] })
    }
  }

  handleConfirmPassword = (k, rule, value, cb) => {
    let stop = []
    _.map(this.itemValidate, (v, i) => {
      if (v == '1') {
        stop.push(1)
      }
    })
    return stop.length > 1 && value == '1' ? cb('重复') : cb()
  }

  render() {
    const { form: { getFieldDecorator, getFieldValue }, goods } = this.props
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    const itemBaseLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }
    const itemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 15 }
      }
    }
    const goodsLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }

    getFieldDecorator('keys', { initialValue: this.array })
    const keys = getFieldValue('keys')
    _.map(getFieldValue('keys'), (v, i) => {
      getFieldDecorator(`items-${v}`, { initialValue: this.itemArray })
    })

    const formItems = keys.map((k, i) => {
      return (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: '#EEEEEE', paddingTop: '12px', marginBottom: '6px', borderRadius: '5px' }}>
          <div>
            <Row key={`row${k}-1`} gutter={8}>
              <Col span='8'>
                <FormItem
                  {...itemBaseLayout}
                  label={`活动itemID-${k}`}
                >
                  {getFieldDecorator(`activityItemId-${k}`, {
                    rules: [{
                      required: true,
                      message: '活动itemID最小输入900,0000',
                      type: 'number',
                      min: 9000000
                    }]
                  })(
                    <InputNumber width='100%' />
                  )}
                </FormItem>
              </Col>
              <Col span='8'>
                <FormItem
                  {...itemBaseLayout}
                  label={`武将等级-${k}`}
                >
                  {getFieldDecorator(`clientValue-${k}`, {
                    rules: [{
                      required: true,
                      message: '请输入武将等级'
                    }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span='8'>
                <FormItem
                  {...itemBaseLayout}
                  label={`武将星级-${k}`}
                >
                  {getFieldDecorator(`coin-${k}`, {
                    rules: [{
                      required: true,
                      message: '请输入武将星级'
                    }]
                  })(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row key={`row${k}-2`}>
              <Col span='24'>
                <FormItem
                  {...itemLayout}
                  label={`武将id-${k}`}
                >
                  {getFieldDecorator(`description-${k}`, {
                    rules: [{
                      required: true,
                      message: '请输入武将id'
                    }]
                  })(
                    <Cascader
                      placeholder='请选择武将'
                      showSearch
                      options={goods[5]}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row key={`row${k}-3`}>
              <Col span='24'>
                <FormItem
                  {...itemLayout}
                  label={`level-${k}`}
                >
                  {getFieldDecorator(`level-${k}`, {
                    rules: [{
                      required: true,
                      message: '必选且所有的level最多只能有一个1',
                      validator: (rule, value, callback) => this.handleConfirmPassword(k, rule, value, callback)
                    }]
                  })(
                    <Select onChange={(e) => this.handleSelect(k, e)} placeholder='请选择level'>
                      <Select.Option value='0'>收集的武将(0)</Select.Option>
                      <Select.Option value='1'>奖励的武将(1)</Select.Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            {
              this.itemValidate[k] == 1 &&
              <Row key={`row${k}-item`} type='flex' justify='center'>
                <div onClick={() => this.addItem(k)} style={{ cursor: 'pointer' }}>
                  添加道具<Icon style={{ fontSize: 18, marginBottom: 16 }} type='plus-square' />
                </div>
              </Row>
            }
            {
              getFieldValue(`items-${k}`).map((ks, ix) => {
                return (
                  <Row key={`row${ks}`} align='middle'>
                    <Col span='14'>
                      <FormItem
                        {...goodsLayout}
                        label={`道具名称-${ks}`}
                      >
                        {getFieldDecorator(`itemId-${ks}`, {
                          rules: [{
                            required: true,
                            message: '请选择道具名称'
                          }]
                        })(
                          <Cascader
                            placeholder='请选择道具'
                            showSearch
                            options={goods[0]}
                          />
                        )}
                      </FormItem>
                    </Col>
                    <Col span='8'>
                      <FormItem
                        labelCol={{
                          xs: { span: 24 },
                          sm: { span: 12 }
                        }}
                        wrapperCol={{
                          xs: { span: 24 },
                          sm: { span: 12 }
                        }}
                        label={`道具数量-${ks}`}
                      >
                        {getFieldDecorator(`count-${ks}`, {
                          rules: [{
                            required: true,
                            message: '请输入道具数量'
                          }]
                        })(
                          <InputNumber min={0} />
                        )}
                      </FormItem>
                    </Col>
                    <Col span='2'>
                      <div style={{ paddingTop: '6px' }}>
                        <Icon type='minus-square' style={{ fontSize: 18, cursor: 'pointer' }} onClick={() => this.removeItem(k, ks)} />
                      </div>
                    </Col>
                  </Row>
                )
              })
            }
          </div>
          <div>
            <Icon type='minus-circle-o' style={{ fontSize: 18, cursor: 'pointer' }} onClick={() => this.remove(k)} />
          </div>
        </div>
      )
    })

    return (
      <div>
        <Form hideRequiredMark onSubmit={this.handleSearch} >
          <FormItem
            {...formItemLayout}
            label='模板ID(最小输入900,0000)'
          >
            {getFieldDecorator('templateId', {
              rules: [{
                required: true,
                message: '请输入模板ID',
                type: 'number',
                min: 9000000
              }]
            })(
              <InputNumber />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='活动名字'
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入活动名字' }]
            })(
              <Input />
            )}
          </FormItem>
          { formItems }
          <FormItem>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button icon='plus-circle-o' onClick={this.add}>添加</Button>
            </div>
          </FormItem>
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form>
      </div>
    )
  }
}

const ModalsF = Form.create()(Modals)

export default ModalsF
