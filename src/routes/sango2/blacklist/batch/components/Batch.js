/* global SANGO2_API_HOST */
import axios from 'axios'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Button, Modal, Card, Table } from 'antd'
import { intlShape, defineMessages } from 'react-intl'
import _ from 'lodash'
import { Link } from 'react-router'

import openNotificationWithIcon from '../../../../../components/notification'
import Files from './Files'

const FormItem = Form.Item

const message = defineMessages({
  forbid_1: {
    id: 'STATUS.TYPE.FORBID.1',
    defaultMessage: '禁言'
  },
  forbid_2: {
    id: 'STATUS.TYPE.FORBID.2',
    defaultMessage: '禁用拍卖行'
  },
  forbid_3: {
    id: 'STATUS.TYPE.FORBID.3',
    defaultMessage: '封号'
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
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  serverId: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  playerId: {
    id: 'TABLE.PLAYERID',
    defaultMessage: '玩家ID'
  },
  info: {
    id: 'TABLE.INFO',
    defaultMessage: '信息'
  },
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  reason: {
    id: 'FORM.BAN_REASON',
    defaultMessage: '禁言原因'
  },
  reason_input: {
    id: 'FORM.BAN_REASON_INPUT',
    defaultMessage: '请输入禁言原因'
  },
  time: {
    id: 'FORM.BAN_TIME',
    defaultMessage: '禁言时长'
  },
  time_input: {
    id: 'FORM.BAN_TIME_INPUT',
    defaultMessage: '请输入禁言时长'
  },
  unit: {
    id: 'FORM.TIMEUNIT',
    defaultMessage: '时间单位'
  },
  unit_input: {
    id: 'FORM.TIMEUNIT_INPUT',
    defaultMessage: '请选择时间单位'
  },
  type: {
    id: 'FORM.BANTYPE',
    defaultMessage: '禁言类型'
  },
  type_input: {
    id: 'FORM.BANTYPE_INPUT',
    defaultMessage: '请选择禁言类型'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  back: {
    id: 'BUTTON.BACK',
    defaultMessage: '返回'
  },
  ban: {
    id: 'APP.BLACKLIST.FORBID',
    defaultMessage: '禁言封号'
  }
})


class ForbidModal extends Component {

  state = {
    visible: false,
    resVisible: false,
    dataSource: [],
    items: {
      productId: '',
      uuid: ''
    },
    timeUnits: [
      { label: this.props.intl.formatMessage(message.sec), value: 1 },
      { label: this.props.intl.formatMessage(message.min), value: 2 },
      { label: this.props.intl.formatMessage(message.hour), value: 3 },
      { label: this.props.intl.formatMessage(message.day), value: 4 },
      { label: this.props.intl.formatMessage(message.forever), value: 5 }
    ],
    forbidTypes: [
      { label: this.props.intl.formatMessage(message.forbid_1), value: 1 },
      { label: this.props.intl.formatMessage(message.forbid_2), value: 2 },
      { label: this.props.intl.formatMessage(message.forbid_3), value: 3 }
    ]
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: this.props.intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      },
      {
        title: this.props.intl.formatMessage(message.serverId),
        dataIndex: 'serverId',
        key: 'serverId'
      },
      {
        title: this.props.intl.formatMessage(message.playerId),
        dataIndex: 'playerId',
        key: 'playerId'
      },
      {
        title: this.props.intl.formatMessage(message.info),
        dataIndex: 'message',
        key: 'message'
      }
    ]
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let v = {
          productId: values.productId[0],
          items: {
            reason: values.reason,
            interval: values.interval,
            intervalUnit: values.intervalUnit[0],
            forbidType: values.forbidType[0]
          }
        }
        let url = `${SANGO2_API_HOST}/products/${v.productId}/servers/batch/blackconfig`
        axios({
          method: 'POST',
          data: v.items,
          url: url,
          headers: {
            'adminUserId': JSON.parse(sessionStorage.getItem('sango2')).userId,
            'Authorization': `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}`
          }
        }).then(response => {
          this.handleVisible(v.productId, response.data.bConfig.uuid)
        }).catch(error => {
          if (error.response) {
            openNotificationWithIcon('error', error.response.status, error.response.data.tips)
          } else {
            console.log('Error', error.message)
          }
        })
      }
    })
  }

  handleVisible = (a, b) => {
    this.setState({
      visible: true,
      items: {
        productId: a,
        uuid: b
      }
    })
  }

  handleCancels = () => {
    this.setState({
      visible: false,
      items: {
        productId: '',
        uuid: ''
      }
    })
  }

  handleRes = (e) => {
    this.setState({
      resVisible: true,
      dataSource: e
    })
  }

  handleResCancel = () => {
    this.setState({
      resVisible: false
    })
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  render() {
    const { form: { getFieldDecorator }, login: { curd }, intl } = this.props

    const options = []
    _.map(this.props.products.options, (v, i) => {
      options.push({
        label: v.label,
        value: v.value
      })
    })

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

    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 8 }
      }
    }

    const that = this

    let formProps = {
      name: 'file',
      action: `${SANGO2_API_HOST}/products/${this.state.items.productId}/servers/batch/blacklist/${this.state.items.uuid}`,
      headers: { adminUserId: JSON.parse(sessionStorage.getItem('sango2')).userId,
                Authorization: `bearer ${JSON.parse(sessionStorage.getItem('sango2')).token}` },
      onChange(info) {
        if (info.file.status === 'done') {
          that.handleCancels()
          that.handleRes(info.file.response.result)
          openNotificationWithIcon('success', 'upload successful')
        } else if (info.file.status === 'error') {
          openNotificationWithIcon('error', 'fail to upload')
        }
      }
    }

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.product)}
          >
            {getFieldDecorator('productId', {
              rules: [{ required: true, message: intl.formatMessage(message.product_input) }]
            })(
              <Cascader
                options={options}
                showSearch
                expandTrigger='hover'
                placeholder={intl.formatMessage(message.product_input)}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.reason)}
          >
            {getFieldDecorator('reason', {
              rules: [{ required: true, message: intl.formatMessage(message.reason_input), whitespace: true }]
            })(
              <Input type='textarea' placeholder={intl.formatMessage(message.reason_input)} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.time)}
          >
            {getFieldDecorator('interval', {
              rules: [{ required: false, message: intl.formatMessage(message.time_input) }]
            })(
              <InputNumber min={0} placeholder={intl.formatMessage(message.time_input)} style={{ width: '100%' }} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.unit)}
          >
            {getFieldDecorator('intervalUnit', {
              rules: [{ type: 'array', required: true, message: intl.formatMessage(message.unit_input) }]
            })(
              <Cascader
                options={this.state.timeUnits}
                showSearch
                expandTrigger='hover'
                placeholder={intl.formatMessage(message.unit_input)}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={intl.formatMessage(message.type)}
          >
            {getFieldDecorator('forbidType', {
              rules: [{ type: 'array', required: true, message: intl.formatMessage(message.type_input) }]
            })(
              <Cascader
                options={this.state.forbidTypes}
                showSearch
                expandTrigger='hover'
                placeholder={intl.formatMessage(message.type_input)}
              />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            {
              _.has(curd, '80203') ?
                <Button type='primary' htmlType='submit' icon='arrow-up'>{intl.formatMessage(message.submit)}</Button>
              :
                ''
            }
            <Link to={{ pathname: '/sango2/blacklist/forbid' }} style={{marginLeft: 20}}>
              <Button type='danger' size='large' icon='enter'>{intl.formatMessage(message.back)}</Button>
            </Link>
          </FormItem>
        </Form>
        <Modal
          width={800}
          key={Math.random()}
          title={`${intl.formatMessage(message.ban)}(upload the EXCEL)`}
          visible={this.state.visible}
          onCancel={this.handleCancels}
          footer={null}
          maskClosable={false}
        >
          <Files
            intl={intl}
            formProps={formProps}
            login={this.props.login}
          />
        </Modal>
        <Modal
          width={800}
          key={Math.random()}
          title={intl.formatMessage(message.ban)}
          visible={this.state.resVisible}
          onCancel={this.handleResCancel}
          footer={null}
          maskClosable={false}
        >
          <Table
            dataSource={this.state.dataSource}
            columns={this.columns}
            pagination={{
              showSizeChanger: true,
              defaultPageSize: 50,
              pageSizeOptions: ['20', '50', '100', '200', '500']
            }}
            bordered
          />
        </Modal>
      </Card>
    )
  }
}

ForbidModal.propTypes = {
  intl: intlShape,
  login: PropTypes.object,
  form: PropTypes.object,
  products: PropTypes.object,
  fetchProductsMap: PropTypes.func
  // router: PropTypes.object
}

const Batch = Form.create()(ForbidModal)

export default Batch
