import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { defineMessages } from 'react-intl'
import { Form, Row, Col, Button, Cascader, Modal, DatePicker, Select } from 'antd'
import moment from 'moment'

import NoticesLoginModal from './Modal'

const RangePicker = DatePicker.RangePicker
const message = defineMessages({
  notice_all: {
    id: 'NOTICE.TYPE.ALL',
    defaultMessage: '所有'
  },
  notice_1: {
    id: 'NOTICE.TYPE.ALL',
    defaultMessage: '定时公告'
  },
  notice_100: {
    id: 'NOTICE.TYPE.ALL',
    defaultMessage: '跑马灯公告'
  },
  products: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  range: {
    id: 'FORM.DATARANGE_INPUT',
    defaultMessage: '请选择起止日期'
  },
  type: {
    id: 'FORM.TYPE_NOTICE_INPUT',
    defaultMessage: '请选择类型'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  new: {
    id: 'BUTTON.ADD',
    defaultMessage: '新建'
  }
})


export class NoticesLoginFilter extends Component {

  static propTypes = {
    intl: PropTypes.object,
    curd: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    initialFiler: PropTypes.object
  }

  state = {
    visible: false,
    enum: {
      noticeTypes: [
        { label: this.props.intl.formatMessage(message.notice_all), value: '' },
        { label: this.props.intl.formatMessage(message.notice_1), value: 1 },
        { label: this.props.intl.formatMessage(message.notice_100), value: 100 }
      ]
    }
  }

  noticeTypes = []

  componentWillMount() {
    _.map(this.state.enum.noticeTypes, (value, index) => {
      this.noticeTypes.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })
  }

  handleAddNotice = () => {
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
        this.props.onSearch(fieldsValue)
      }
    })
  }

  render() {
    const { form: {getFieldDecorator}, initialFiler, curd, intl } = this.props
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
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          <Row gutter={20}>
            {
              _.has(curd, '60202')
              ?
                <div>
                  <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                    {getFieldDecorator('products', {
                      initialValue: initialFiler.value ? [this.props.initialFiler.value[0], this.props.initialFiler.value[1]] : [],
                      rules: [{ required: true, message: intl.formatMessage(message.products) }]
                    })(
                      <Cascader
                        showSearch
                        options={this.props.options}
                        placeholder={intl.formatMessage(message.products)}
                        expandTrigger='hover'
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                    {getFieldDecorator('range-time-picker', {
                      rules: [{ type: 'array', required: true, message: intl.formatMessage(message.range) }],
                      initialValue: [moment('00:00:00', 'HH:mm:ss').subtract({days: 1}), moment('00:00:00', 'HH:mm:ss')]
                    })(
                      <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 3 }} md={{ span: 6 }}>
                    {getFieldDecorator('noticeType', {
                      initialValue: ''
                    })(
                      <Select placeholder={intl.formatMessage(message.type)}>
                        {this.noticeTypes}
                      </Select>
                    )}
                  </Col>
                </div>
              :
                ''
            }

            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {
                    _.has(curd, '60202')
                    ?
                      <Button type='primary' className='margin-right' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                    :
                      ''
                  }
                </div>
                <div>
                  {
                    _.has(curd, '60201')
                    ?
                      <Button type='ghost' onClick={this.handleAddNotice}>{intl.formatMessage(message.new)}</Button>
                    :
                      ''
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title={intl.formatMessage(message.new)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <NoticesLoginModal
            intl={intl}
            options={this.props.options}
            onCreate={this.props.onCreate}
            onSubmitting={this.handleCancel}
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
      'range-time-picker': {
        ...props['range-time-picker']
      },
      'products': {
        ...props.products
      },
      'noticeType': {
        ...props.noticeType
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {
    console.log('Form.create.onValuesChange', values)
  }
})(NoticesLoginFilter)

export default Filter
