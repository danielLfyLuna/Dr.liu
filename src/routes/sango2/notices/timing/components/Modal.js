import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Select, TreeSelect, DatePicker, InputNumber } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  server_input: {
    id: 'FORM.SERVERS_INPUT',
    defaultMessage: '请选择服务器'
  },
  all: {
    id: 'CHOOSE_ALL',
    defaultMessage: '全选'
  },
  title: {
    id: 'TABLE.TITLE',
    defaultMessage: '标题'
  },
  title_input: {
    id: 'TABLE.TITLE_INPUT',
    defaultMessage: '请填写标题'
  },
  type: {
    id: 'FORM.TYPE_NOTICE',
    defaultMessage: '公告类型'
  },
  type_input: {
    id: 'FORM.TYPE_NOTICE_INPUT',
    defaultMessage: '请选择类型'
  },
  rangeTime: {
    id: 'FORM.RANGETIME',
    defaultMessage: '起止时间'
  },
  circulation: {
    id: 'FORM.CIRCULATION',
    defaultMessage: '循环模式'
  },
  circulation_time: {
    id: 'FORM.CIRCULATION_TIME',
    defaultMessage: '循环间隔'
  },
  unit: {
    id: 'FORM.TIMEUNIT',
    defaultMessage: '时间单位'
  },
  circulation_count: {
    id: 'FORM.CIRCULATION_COUNT',
    defaultMessage: '循环次数'
  },
  content: {
    id: 'TABLE.CONTENT',
    defaultMessage: '内容'
  },
  content_input: {
    id: 'TABLE.CONTENT_INPUT',
    defaultMessage: '请填写内容'
  },
  add: {
    id: 'BUTTON.ADD_NOTICE',
    defaultMessage: '添加公告'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reload: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  },
  notice_1: {
    id: 'NOTICE.TYPE.1',
    defaultMessage: '定时公告'
  },
  notice_100: {
    id: 'NOTICE.TYPE.100',
    defaultMessage: '跑马灯公告'
  },
  circulation_1: {
    id: 'CIRCULATION.1',
    defaultMessage: '无限循环'
  },
  circulation_2: {
    id: 'CIRCULATION.2',
    defaultMessage: '限定次数'
  },
  circulation_3: {
    id: 'CIRCULATION.3',
    defaultMessage: '限定时间'
  },
  sec: {
    id: 'STATUS.TYPE.TIME.SEC',
    defaultMessage: '秒'
  },
  min: {
    id: 'STATUS.TYPE.TIME.MIN',
    defaultMessage: '分钟'
  },
  hour: {
    id: 'STATUS.TYPE.TIME.HOUR',
    defaultMessage: '小时'
  },
  day: {
    id: 'STATUS.TYPE.TIME.DAY',
    defaultMessage: '天'
  },
  forever: {
    id: 'STATUS.TYPE.TIME.FOREVER',
    defaultMessage: '永久'
  }
})


class NoticesTimingModal extends Component {

  static propTypes = {
    intl: PropTypes.object,
    options: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    onSubmitting: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired
  }

  state = {
    productId: 0,
    enum: {
      noticeTypes: [
        { label: this.props.intl.formatMessage(message.notice_1), value: 1 },
        { label: this.props.intl.formatMessage(message.notice_100), value: 100 }
      ],
      circleTypes: [
        { label: this.props.intl.formatMessage(message.circulation_1), value: 1 },
        { label: this.props.intl.formatMessage(message.circulation_2), value: 2 },
        { label: this.props.intl.formatMessage(message.circulation_3), value: 3 }
      ],
      timeUnits: [
        { label: this.props.intl.formatMessage(message.sec), value: 1 },
        { label: this.props.intl.formatMessage(message.min), value: 2 },
        { label: this.props.intl.formatMessage(message.hour), value: 3 },
        { label: this.props.intl.formatMessage(message.day), value: 4 },
        { label: this.props.intl.formatMessage(message.forever), value: 5 }
      ]
    }
  }

  products = []
  noticeTypes = []
  circleTypes = []
  timeUnits = []

  componentWillMount() {
    _.map(this.props.options, (value, index) => {
      this.products.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })
    _.map(this.state.enum.noticeTypes, (value, index) => {
      this.noticeTypes.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })
    _.map(this.state.enum.circleTypes, (value, index) => {
      this.circleTypes.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })
    _.map(this.state.enum.timeUnits, (value, index) => {
      this.timeUnits.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleProductSelect = (value) => {
    this.setState({
      productId: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onCreate(values)
        this.props.onSubmitting()
      }
    })
  }


  render() {
    const { form: { getFieldDecorator }, intl } = this.props

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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }

    // 服务下拉
    let productsIndex = 0
    let id = this.state.productId || 0
    _.map(this.props.options, (value, index) => {
      if (_.toNumber(id) === _.toNumber(value.value)) {
        productsIndex = index
      }
    })

    let servers = []
    let treeData = []
    _.map(this.props.options[productsIndex].children, (value, index) => {
      servers.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
      treeData.push({
        label: value.label,
        value: value.value,
        key: index
      })
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.title)}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: intl.formatMessage(message.title_input) }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.type)}
        >
          {getFieldDecorator('type', {
            rules: [
              { required: true, message: intl.formatMessage(message.type_input) }
            ]
          })(
            <Select>
              {this.noticeTypes}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.rangeTime)}
        >
          {getFieldDecorator('range-time-picker', {
            rules: [{ type: 'array', required: true, message: 'required' }],
            initialValue: [moment(new Date(), 'YYYY-MM-DD HH:mm:ss'), moment()]
          })(
            <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.circulation)}
        >
          {getFieldDecorator('circleType', {
            rules: [
              { required: true, message: 'required' }
            ]
          })(
            <Select>
              {this.circleTypes}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.circulation_time)}
        >
          {getFieldDecorator('interval', {
            initialValue: 1,
            rules: [{ required: true, message: 'required' }]
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.unit)}
        >
          {getFieldDecorator('intervalUnit', {
            rules: [
              { required: true, message: 'required' }
            ]
          })(
            <Select>
              {this.timeUnits}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.circulation_count)}
        >
          {getFieldDecorator('maxCount', {
            initialValue: 1,
            rules: [{ required: true, message: 'required' }]
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.content)}
        >
          {getFieldDecorator('content', {
            rules: [{ required: true, message: intl.formatMessage(message.content_input) }]
          })(
            <Input type='textarea' rows={10} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.product)}
        >
          {getFieldDecorator('productId', {
            rules: [
              { required: true, message: intl.formatMessage(message.product_input) }
            ]
          })(
            <Select onChange={this.handleProductSelect}>
              {this.products}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.server)}
          hasFeedback
        >
          {getFieldDecorator('serverIdList', {
          })(
            <TreeSelect
              treeData={[{
                label: intl.formatMessage(message.all),
                value: null,
                key: intl.formatMessage(message.all),
                children: [...treeData]
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              searchPlaceholder={intl.formatMessage(message.server_input)}
            />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
          <Button type='ghost' htmlType='button' onClick={this.handleReset}>{intl.formatMessage(message.reload)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const Modal = Form.create()(NoticesTimingModal)

export default Modal
