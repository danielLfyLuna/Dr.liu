import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Cascader, Switch, Tooltip, Icon, TreeSelect, Input, Button } from 'antd'
import { intlShape, defineMessages } from 'react-intl'
import _ from 'lodash'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


const FormItem = Form.Item
const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  serverSelect: {
    id: 'FORM.SERVERTYPE',
    defaultMessage: '服务器选择方式'
  },
  duoxuan: {
    id: 'CHOOSE_MUL',
    defaultMessage: '多选'
  },
  qujian: {
    id: 'CHOOSE_QUJIAN',
    defaultMessage: '区间'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  all: {
    id: 'CHOOSE_ALL',
    defaultMessage: '全选'
  },
  server_input: {
    id: 'FORM.SERVERS_INPUT',
    defaultMessage: '请选择服务器'
  },
  details_lianxu: {
    id: 'OPENCONDITION_PS_1',
    defaultMessage: '连续区间用 (-) 分隔.'
  },
  details_duoduan: {
    id: 'OPENCONDITION_PS_2',
    defaultMessage: '多段区间用 (,) 分割.'
  },
  qujian_input: {
    id: 'FORM.SERVERIDS_INPUT',
    defaultMessage: '输入区间数值'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reset: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  }
})


class NoticesPage extends Component {

  static propTypes = {
    intl: intlShape,
    login: PropTypes.object.isRequired,
    // mergeNotice: PropTypes.object,
    fetchRechargeReset: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    products: PropTypes.object.isRequired,
    form: PropTypes.object
  }

  state = {
    switch: 1,
    sers: []
  }

  onSearch = (fieldsValue) => {
    this.props.fetchRechargeReset(fieldsValue)
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        let values = {}
        values.productId = fieldValues.productId[0]
        fieldValues.switch ? (values.serverIdList = fieldValues.servers) : (values.serverIds = fieldValues.serverBlock)
        this.onSearch(values)
      }
    })
  }

  onSwitch = (e) => {
    this.setState({
      switch: (e ? 1 : 2)
    })
  }

  onChange = (e) => {
    _.forEach(this.props.products.options, (v, k) => {
      v.value === e[0] &&
      this.setState({
        sers: v.children
      })
    })
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {login: {curd}, intl} = this.props

    let options = []
    let proOptions = []
    if (this.props.products.options) {
      options = this.props.products.options
    }
    _.map(options, (v, k) => {
      proOptions.push({
        value: v.value,
        label: v.label
      })
    })

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }

    // const itemsLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 }
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 18 }
    //   }
    // }
    //
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0
    //     },
    //     sm: {
    //       span: 14,
    //       offset: 6
    //     }
    //   }
    // }

    return (
      <Card style={{marginBottom: 6}}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label={intl.formatMessage(message.product)} {...formItemLayout}>
            {getFieldDecorator('productId', {
              rules: [{ required: true, message: intl.formatMessage(message.product_input) }]
            })(
              <Cascader
                showSearch
                options={proOptions}
                placeholder={intl.formatMessage(message.product_input)}
                expandTrigger='hover'
                onChange={e => this.onChange(e)}
              />
            )}
          </FormItem>

          <FormItem label={intl.formatMessage(message.serverSelect)} {...formItemLayout}>
            {getFieldDecorator('switch', {
              initialValue: this.state.switch === 1,
              valuePropName: 'checked'
            })(
              <Switch checkedChildren={intl.formatMessage(message.duoxuan)} unCheckedChildren={intl.formatMessage(message.qujian)} onChange={this.onSwitch} />
            )}
          </FormItem>

          {
            this.state.switch === 1 ?
              <FormItem {...formItemLayout} label={intl.formatMessage(message.server)}>
                { getFieldDecorator('servers', {
                  rules: [{ required: true, message: intl.formatMessage(message.server_input) }]
                })(
                  <TreeSelect
                    treeData={[{
                      label: intl.formatMessage(message.all),
                      value: null,
                      key: intl.formatMessage(message.all),
                      children: this.state.sers
                    }]}
                    showSearch
                    allowClear
                    treeDefaultExpandAll
                    multiple
                    treeCheckable
                    treeNodeFilterProp='label'
                    showCheckedStrategy={TreeSelect.SHOW_CHILD}
                    searchPlaceholder={intl.formatMessage(message.server_input)}
                    dropdownStyle={{height: 300}}
                  />
                )}
              </FormItem>
            :
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    {intl.formatMessage(message.server)}&nbsp;
                    <Tooltip
                      title={
                        <div>{intl.formatMessage(message.details_lianxu)} <i style={{color: '#f11738'}}>e.g：app_001-app_100</i><p>{intl.formatMessage(message.details_duoduan)} <i style={{color: '#f11738'}}>e.g：app_001-app_002,app_100-app_102</i></p></div>
                      }
                    >
                      <Icon type='question-circle-o' />
                    </Tooltip>
                  </span>
                )}
              >
                {getFieldDecorator('serverBlock', {
                  rules: [
                    { required: true, whitespace: true, message: intl.formatMessage(message.qujian_input) }
                  ]
                })(
                  <Input type='textarea' placeholder={intl.formatMessage(message.qujian_input)} autosize={{ minRows: 2, maxRows: 8 }} />
                )}
              </FormItem>
          }

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {
                _.has(curd, '40301') &&
                <Button type='primary' className='margin-right' htmlType='submit'>{intl.formatMessage(message.submit)}</Button>
              }
              <Button onClick={this.handleReset} style={{marginLeft: '20px'}}>{intl.formatMessage(message.reset)}</Button>
            </div>
          </div>
        </Form>
      </Card>
    )
  }

}

const Index = Form.create()(NoticesPage)

export default Index
