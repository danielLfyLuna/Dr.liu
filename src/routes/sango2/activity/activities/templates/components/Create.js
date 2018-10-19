import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Cascader, Button, DatePicker, Input, InputNumber, TreeSelect, Tooltip, Switch, Icon } from 'antd'
import _ from 'lodash'
import { defineMessages } from 'react-intl'
import moment from 'moment'
import 'moment/locale/zh-cn'
const FormItem = Form.Item
moment.locale('zh-cn')

let productOpt = []
let serverOpt = []
let goodOpt = []
const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  serverType: {
    id: 'FORM.SERVERTYPE',
    defaultMessage: '服务器选择方式'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  server_input: {
    id: 'FORM.SERVERS_INPUT',
    defaultMessage: '请选择服务器'
  },
  serverIds_input: {
    id: 'FORM.SERVERIDS_INPUT',
    defaultMessage: '输入区间数值'
  },
  type: {
    id: 'FORM.ACTIVITY_TYPE',
    defaultMessage: '活动类型'
  },
  templateId: {
    id: 'FORM.TEMPLATEID',
    defaultMessage: '模板 ID'
  },
  name: {
    id: 'TABLE.NAME',
    defaultMessage: '名称'
  },
  openCondition: {
    id: 'FORM.OPENCONDITION',
    defaultMessage: '开启条件'
  },
  startTime: {
    id: 'TABLE.STARTTIME',
    defaultMessage: '开始时间'
  },
  endTime: {
    id: 'TABLE.ENDTIME',
    defaultMessage: '结束时间'
  },
  afterDays: {
    id: 'STATUS.OPENCONDITION.1.AFTERDAY',
    defaultMessage: '{X}天后开启'
  },
  lastDays: {
    id: 'STATUS.OPENCONDITION.1.LASTDAY',
    defaultMessage: '持续天数'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  mul: {
    id: 'CHOOSE_MUL',
    defaultMessage: '多选'
  },
  all: {
    id: 'CHOOSE_QUJIAN',
    defaultMessage: '全选'
  },
  qujian: {
    id: 'CHOOSE_ALL',
    defaultMessage: '区间'
  },
  ps1: {
    id: 'OPENCONDITION_PS_1',
    defaultMessage: '连续区间用 (-) 分隔.'
  },
  ps2: {
    id: 'OPENCONDITION_PS_2',
    defaultMessage: '多段区间用 (,) 分割.'
  }
})

class CreateForm extends Component {
  state = {
    modal: {
      currentItem: {},
      modalType: ''
    },
    config: {
      openCondition: 1001,
      productId: ''
    },
    switch: 1
  }

  componentWillMount() {
    const { initials } = this.props
    const { currentItem, modalType } = this.props.onModalLoad()

    this.setState({
      modal: {
        currentItem,
        modalType
      },
      config: {
        ...this.state.config,
        productId: initials.products.productId
      }
    })
  }

  componentWillUnmount() {
    this.props.onClear()
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

  handleSubmit = (e) => {
    e.preventDefault()
    const { initials } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {}
        data.templateId = Number(values.templateId)
        data.functionId = Number(values.functionId)
        if (initials.conf.openTypes[values.openCondition.openTypes[0]] === 'fixed') {
          data.openCondition = {
            type: values.openCondition.openTypes[0],
            params: {
              startTime: values.openCondition.params.startTime.format('YYYY-MM-DD HH:00:00'),
              endTime: values.openCondition.params.endTime.format('YYYY-MM-DD HH:00:00')
            }
          }
        } else if (initials.conf.openTypes[values.openCondition.openTypes[0]] === 'after') {
          data.openCondition = {
            type: values.openCondition.openTypes[0],
            params: values.openCondition.params
          }
        }
        data.productId = values.products[0]
        values.serverType ? (data.serverIdList = values.serverIdList) : (data.serverIds = values.serverIds)
        let posts = {
          form: data,
          path: {
            productId: initials.products.productId,
            serverId: initials.products.serverId
          }
        }

        if (this.state.modal.modalType === 'template') {
          this.props.onCreate(posts)
        }
        this.props.onSubmitting()
      }
    })
  }

  handleChange = (value, selectedOptions) => {
    this.setState({
      config: {
        ...this.state.config,
        openCondition: value[0]
      }
    })
  }

  handleProductChange = (value) => {
    this.setState({
      config: {
        ...this.state.config,
        productId: value[0]
      }
    })
  }

  onServerTypeSwitch = (checked) => {
    this.setState({
      switch: checked ? 1 : 2
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, initials, intl } = this.props
    const initialValue = this.state.modal.currentItem
    const config = this.state.config
    if (productOpt.length == 0) {
      productOpt = options.products.list
    }
    serverOpt = this._serverReduce(options.products.options, config.productId)
    if (goodOpt.length === 0) {
      goodOpt = options.goods.list
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const formItem2Layout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    const tailFormItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.product)}
          key='productId'
        >
          {getFieldDecorator('products', {
            initialValue: [initialValue.productId],
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.product_input) }]
          })(
            <Cascader
              options={productOpt}
              showSearch
              onChange={this.handleProductChange}
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.product)}
            />
            )}
        </FormItem>


        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.serverType)}
        >
          {getFieldDecorator('serverType', {
            initialValue: this.state.switch === 1,
            valuePropName: 'checked'
          })(
            <Switch onChange={this.onServerTypeSwitch} checkedChildren={intl.formatMessage(message.mul)} unCheckedChildren={intl.formatMessage(message.qujian)} />
            )}
        </FormItem>

        {
          this.state.switch === 1 ?
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.server)}
              key='serverIdList'
            >
              {getFieldDecorator('serverIdList', {
                initialValue: initialValue.serverIdList || [],
                rules: [{ type: 'array', required: true, message: intl.formatMessage(message.server_input) }]
              })(
                <TreeSelect
                  treeData={[{
                    label: intl.formatMessage(message.all),
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
                  searchPlaceholder={intl.formatMessage(message.server_input)}
                  dropdownStyle={{
                    height: '30rem',
                    overflowY: 'auto'
                  }}
                />
                )}
            </FormItem>
            :
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  {intl.formatMessage(message.server_input)}&nbsp;
                  <Tooltip
                    title={
                      <div>{intl.formatMessage(message.ps1)} <i style={{ color: '#f11738' }}>e.g：app_001-app_100</i><p>{intl.formatMessage(message.ps2)} <i style={{ color: '#f11738' }}>e.g：app_001-app_002,app_100-app_102</i></p></div>
                    }
                  >
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('serverIds', {
                rules: [{ required: true, message: intl.formatMessage(message.serverIds_input), whitespace: true }]
              })(
                <Input type='textarea' placeholder={intl.formatMessage(message.serverIds_input)} autosize={{ minRows: 3, maxRows: 8 }} />
                )}
            </FormItem>
        }
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.type)}
          key='functionId'
        >
          {getFieldDecorator('functionId', {
            initialValue: initialValue.functionId,
            rules: [{ required: true, message: intl.formatMessage(message.type) }]
          })(
            <InputNumber min={0} disabled placeholder={intl.formatMessage(message.type)} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.templateId)}
          key='templateId'
        >
          {getFieldDecorator('templateId', {
            initialValue: initialValue.templateId,
            rules: [{ required: true, message: intl.formatMessage(message.templateId) }]
          })(
            <InputNumber min={0} disabled placeholder={intl.formatMessage(message.templateId)} style={{ width: '100%' }} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.name)}
          key='name'
        >
          {getFieldDecorator('name', {
            initialValue: initialValue.name,
            rules: [{ required: true, message: intl.formatMessage(message.name) }]
          })(
            <Input disabled placeholder={intl.formatMessage(message.name)} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.openCondition)}
          key='openCondition'
        >
          {getFieldDecorator('openCondition.openTypes', {
            initialValue: [config.openCondition],
            rules: [{ type: 'array', required: true, message: intl.formatMessage(message.openCondition) }]
          })(
            <Cascader
              options={initials.enum.openTypes}
              showSearch
              onChange={this.handleChange}
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.openCondition)}
            />
          )}
          {
            initials.conf.openTypes[config.openCondition] === 'fixed' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.startTime)}
              key='openCondition.params.startTime'
              style={{ paddingTop: '16px' }}
            >
              {getFieldDecorator('openCondition.params.startTime', {
                rules: [{ required: true, message: intl.formatMessage(message.startTime) }]
              })(
                <DatePicker
                  showTime={{ defaultValue: moment('05:00:00', 'HH:00:00') }}
                  format='YYYY-MM-DD HH:00:00'
                  placeholder={intl.formatMessage(message.startTime)}
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
          }
          {
            initials.conf.openTypes[config.openCondition] === 'fixed' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.endTime)}
              key='openCondition.params.endTime'
              style={{ paddingTop: '32px' }}
            >
              {getFieldDecorator('openCondition.params.endTime', {
                rules: [{ required: true, message: intl.formatMessage(message.endTime) }]
              })(
                <DatePicker
                  showTime={{ defaultValue: moment('05:00:00', 'HH:00:00') }}
                  format='YYYY-MM-DD HH:00:00'
                  placeholder={intl.formatMessage(message.endTime)}
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
          }
          {
            initials.conf.openTypes[config.openCondition] === 'after' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.afterDays)}
              key='openCondition.params.afterDays'
              style={{ padding: '16px 0px' }}
            >
              {getFieldDecorator('openCondition.params.afterDays', {
                rules: [{ required: true, message: intl.formatMessage(message.afterDays) }]
              })(
                <InputNumber min={0} placeholder={intl.formatMessage(message.afterDays)} style={{ width: '100%' }} />
              )}
            </FormItem>
          }
          {
            initials.conf.openTypes[config.openCondition] === 'after' &&
            <FormItem
              {...formItem2Layout}
              label={intl.formatMessage(message.lastDays)}
              key='openCondition.params.lastDays'
              style={{ padding: '16px 0px' }}
            >
              {getFieldDecorator('openCondition.params.lastDays', {
                rules: [{ required: true, message: intl.formatMessage(message.lastDays) }]
              })(
                <InputNumber min={0} placeholder={intl.formatMessage(message.lastDays)} style={{ width: '100%' }} />
              )}
            </FormItem>
          }
        </FormItem>

        <FormItem {...tailFormItemLayout} key={Math.random()}>
          <Button type='primary' htmlType='submit' size='large' style={{ marginRight: 32 }}>{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

CreateForm.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onCreate: PropTypes.func,
  onClear: PropTypes.func,
  onModalLoad: PropTypes.func,
  onSubmitting: PropTypes.func
}

CreateForm.contextTypes = {
  router: PropTypes.object
}

const Create = Form.create()(CreateForm)

export default Create
