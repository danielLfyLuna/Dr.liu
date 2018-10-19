import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import { Form, Row, Col, Button, Cascader, Modal, DatePicker, Tooltip, Icon } from 'antd'
import _ from 'lodash'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import Add from './Add'

const { RangePicker } = DatePicker
const message = defineMessages({
  productId: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  channel: {
    id: 'FORM.CHANNEL_INPUT',
    defaultMessage: '请选择渠道'
  },
  switch: {
    id: 'FORM.SWITCH_INPUT',
    defaultMessage: '请选择公告开关状态'
  },
  range: {
    id: 'FORM.DATARANGE_INPUT',
    defaultMessage: '请选择起止日期'
  },
  tip: {
    id: 'NOTIFICATION.TIMERANGE',
    defaultMessage: '空查询条件默认该条件下所有范围内。例: 空日期默认查询所有日期范围内'
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
    curd: PropTypes.object,
    onCreate: PropTypes.func,
    options: PropTypes.array,
    form: PropTypes.object,
    onSearch: PropTypes.func,
    channels: PropTypes.array
    // initialFiler: PropTypes.object
  }
  state = {
    visible: false
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
        let values = {}
        if (!fieldsValue.productId) { fieldsValue.productId = [] }
        if (!fieldsValue.channels) { fieldsValue.channels = [] }
        if (!fieldsValue.status) { fieldsValue.status = [] }
        if (!fieldsValue.times) { fieldsValue.times = [] }

        if (fieldsValue.productId.length > 0) { values.productId = fieldsValue.productId[0] }
        if (fieldsValue.channels.length > 0) { values.channels = fieldsValue.channels[0] }
        if (fieldsValue.status.length > 0) { values.open = fieldsValue.status[0] }
        if (fieldsValue.times.length > 0) {
          values.startTime = fieldsValue.times[0].format('YYYY-MM-DD')
          values.endTime = fieldsValue.times[1].format('YYYY-MM-DD')
        }

        this.props.onSearch(values)
      }
    })
  }

  render() {
    const {form: {getFieldDecorator}, curd, intl} = this.props

    // 产品下拉菜单
    let productsItems = []
    _.map(this.props.options, (val, idx) => {
      productsItems.push({value: val.value, label: `${val.label}(${val.value})`})
    })

    const switchItems = [
      {value: 0, label: '关'},
      {value: 1, label: '开'}

    ]
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
      rules: [{ type: 'array', required: false, message: intl.formatMessage(message.range) }]
      // initialValue: [moment(), moment().subtract({days: -1})]
      // initialValue: [moment('00:00:00', 'HH:mm:ss').subtract({days: 1}), moment('00:00:00', 'HH:mm:ss')]
    }


    return (
      <div>
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          <Row gutter={20}>
            {
              _.has(curd, '60103')
              ?
                <div>
                  <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                    {getFieldDecorator('productId', {
                      rules: [{ required: true, message: intl.formatMessage(message.productId) }]
                    })(
                      <Cascader
                        showSearch
                        options={productsItems}
                        placeholder={intl.formatMessage(message.productId)}
                        expandTrigger='hover'
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                    {getFieldDecorator('channels', {
                      rules: [{ required: false, message: intl.formatMessage(message.channel) }]
                    })(
                      <Cascader
                        showSearch
                        options={this.props.channels}
                        placeholder={intl.formatMessage(message.channel)}
                        expandTrigger='hover'
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 3 }} md={{ span: 6 }}>
                    {getFieldDecorator('status', {
                      rules: [{ required: false, message: intl.formatMessage(message.switch) }]
                    })(
                      <Cascader
                        showSearch
                        options={switchItems}
                        placeholder={intl.formatMessage(message.switch)}
                        expandTrigger='hover'
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                    <div>
                      {getFieldDecorator('times', rangeConfig)(
                        <RangePicker
                          format='YYYY-MM-DD'
                        />
                      )}
                      <Tooltip title={intl.formatMessage(message.tip)}>
                        <Icon type='question-circle-o' style={{marginLeft: 10}} />
                      </Tooltip>
                    </div>
                  </Col>
                </div>
              :
                ''
            }

            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {
                    _.has(curd, '60103')
                    ?
                      <Button type='primary' className='margin-right' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                    :
                      ''
                  }
                </div>
                <div>
                  {
                    _.has(curd, '60101')
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
          <Add
            intl={intl}
            channels={this.props.channels}
            options={productsItems}
            optionsChild={this.props.options}
            onCreate={this.props.onCreate}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

const Filter = Form.create()(NoticesLoginFilter)

export default Filter
