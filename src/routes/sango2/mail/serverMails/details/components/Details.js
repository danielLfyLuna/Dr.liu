import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Cascader, InputNumber, Input, Card, TreeSelect, Table } from 'antd'
import _ from 'lodash'
import { Link } from 'react-router'
import { intlShape, defineMessages } from 'react-intl'

const FormItem = Form.Item
const message = defineMessages({
  info: {
    id: 'TABLE.PLAYERINFO',
    defaultMessage: '玩家信息'
  },
  rewards_done: {
    id: 'TABLE.REWARDS_DONE',
    defaultMessage: '已得到奖励'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  operateTime: {
    id: 'TABLE.OPERATETIME',
    defaultMessage: '操作时间'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  success_no: {
    id: 'STATUS.SUCCESS_0',
    defaultMessage: '未成功'
  },
  success_yes: {
    id: 'STATUS.SUCCESS_1',
    defaultMessage: '已成功'
  },
  receiver_update: {
    id: 'BUTTON.RECEIVER_UPDATE',
    defaultMessage: '修改收件人'
  },
  mail0: {
    id: 'STATUS.MAIL.0',
    defaultMessage: '未发送'
  },
  mail1: {
    id: 'STATUS.MAIL.1',
    defaultMessage: '发送成功'
  },
  mail2: {
    id: 'STATUS.MAIL.2',
    defaultMessage: '发送失败'
  },
  mail3: {
    id: 'STATUS.MAIL.3',
    defaultMessage: '审核中'
  },
  mail4: {
    id: 'STATUS.MAIL.4',
    defaultMessage: '审核通过'
  },
  mail5: {
    id: 'STATUS.MAIL.5',
    defaultMessage: '审核未通过'
  },
  item: {
    id: 'FORM.ITEM',
    defaultMessage: '道具'
  },
  mailTitle: {
    id: 'FORM.MAILTITLE',
    defaultMessage: '邮件标题'
  },
  mailContext: {
    id: 'FORM.MAILCONTEXT',
    defaultMessage: '邮件内容'
  },
  sender: {
    id: 'FORM.SENDER_MAIL',
    defaultMessage: '(邮件内)发件人'
  },
  products_servers: {
    id: 'FORM.PRODUCTS/SERVERS',
    defaultMessage: '产品与服务器'
  },
  type: {
    id: 'FORM.RECEIVERTYPE',
    defaultMessage: '邮件格式'
  },
  description: {
    id: 'FORM.DESCRIPTION',
    defaultMessage: '描述'
  },
  receiver: {
    id: 'FORM.RECEIVERS',
    defaultMessage: '玩家'
  },
  receiver_alliance: {
    id: 'FORM.REVEIVER_ALLIANCE',
    defaultMessage: '原始收件人(联盟)'
  },
  creator: {
    id: 'FORM.CREATOR',
    defaultMessage: '创建人'
  },
  createTime: {
    id: 'TABLE.CREATETIME',
    defaultMessage: '创建时间'
  },
  back: {
    id: 'BUTTON.BACK',
    defaultMessage: '返回'
  },
  send: {
    id: 'BUTTON.SEND',
    defaultMessage: '发送'
  },
  product: {
    id: 'FORM.PRODUCTS',
    defaultMessage: '产品'
  },
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  ps1: {
    id: 'PERSONINFO_PS',
    defaultMessage: '邮件收件人信息'
  },
  all: {
    id: 'CHOOSE_ALL',
    defaultMessage: '全选'
  },
  channel: {
    id: 'FORM.CHANNEL_OPT',
    defaultMessage: '渠道(可选)'
  },
  update: {
    id: 'BUTTON.UPDATE',
    defaultMessage: '修改'
  }
})


class DetailsForm extends Component {

  static propTypes = {
    intl: intlShape,
    login: PropTypes.object,
    form: PropTypes.object,
    location: PropTypes.object,
    products: PropTypes.object,
    fetchProductsMap: PropTypes.func,
    goods: PropTypes.object,
    fetchGoodsMap: PropTypes.func,
    channel: PropTypes.object,
    fetchChannels: PropTypes.func,
    sendServerMail: PropTypes.func,
    checkServerMail: PropTypes.func,
    serverMailDetail: PropTypes.object
  }

  state = {
    options: []
  }

  constructor(props) {
    super(props)
    const { intl } = this.props
    this.columns = [{
      title: '产品ID',
      dataIndex: 'productId',
      key: 'productId'
    }, {
      title: '服务器ID',
      dataIndex: 'serverId',
      key: 'serverId'
    }, {
      title: intl.formatMessage(message.info),
      dataIndex: 'playerName',
      key: 'playerName'
    }, {
      title: intl.formatMessage(message.rewards_done),
      dataIndex: 'rewards',
      key: 'rewards'
    }, {
      title: intl.formatMessage(message.status),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (record.status === 0) {
          return <div style={{color: '#f90b16'}}>{intl.formatMessage(message.success_no)}</div>
        }
        if (record.status === 1) {
          return <div style={{color: '#16d021'}}>{intl.formatMessage(message.success_yes)}</div>
        }
      }
    }, {
      title: intl.formatMessage(message.operateTime),
      dataIndex: 'operateTime',
      key: 'operateTime'
    }]
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchChannels()
    this.props.fetchGoodsMap({productId: '_'})
    this.props.checkServerMail(this.props.location.query.id)
  }

  componentDidMount() {
    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }
    this.setState({
      options: options
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let id = this.props.serverMailDetail.check.sango2Mails.id
        this.props.sendServerMail(id)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { login: { curd }, intl } = this.props

    const { check } = this.props.serverMailDetail

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 14 }
      }
    }
    const itemsLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      }
    }

    // 获取产品 道具 渠道下拉列表
    let options = []
    if (this.props.products.options) {
      options = this.props.products.options
    }

    let channels = []
    if (this.props.channel) {
      _.map(this.props.channel, (value, key) => {
        channels.push(
          {value: key, label: `${value}(${key})`, key: key}
        )
      })
    }

    let goods = []
    if (this.props.goods.options[0]) {
      _.map(this.props.goods.options[0], (value, key) => {
        goods.push(
          {value: key, label: `${value}(${key})`}
        )
      })
    }

    // 产品，服务器下拉
    let productsOptions = []
    _.map(options, (val, idx) => {
      productsOptions.push({
        value: val.value,
        label: val.label
      })
    })

    // let serverOptions = []
    // if (check.sango2Mails) {
    //   _.map(options, (val, idx) => {
    //     if (val.value === check.sango2Mails.productId) {
    //       serverOptions = val.children
    //     }
    //   })
    // }

    // 处理状态数据显示格式
    let statusItem = ''
    if (check.sango2Mails && check.sango2Mails.status === 0) { statusItem = intl.formatMessage(message.mail0) }
    if (check.sango2Mails && check.sango2Mails.status === 1) { statusItem = intl.formatMessage(message.mail1) }
    if (check.sango2Mails && check.sango2Mails.status === 2) { statusItem = intl.formatMessage(message.mail2) }
    if (check.sango2Mails && check.sango2Mails.status === 3) { statusItem = intl.formatMessage(message.mail3) }
    if (check.sango2Mails && check.sango2Mails.status === 4) { statusItem = intl.formatMessage(message.mail4) }
    if (check.sango2Mails && check.sango2Mails.status === 5) { statusItem = intl.formatMessage(message.mail5) }

    // let serversItem = []
    // if (check.sango2Mails) { serversItem = check.sango2Mails.serverIds.split(',') }

    let channelsItem = []
    if (check.sango2Mails && check.sango2Mails.channels) { channelsItem = check.sango2Mails.channels.split(',') }

    let rewardsItem = check.sango2Mails ? check.sango2Mails.rewards : []
    const formItems = rewardsItem.map((val, idx) => {
      return (
        <Row key={idx}>
          <Col span='12' offset={3}>
            <FormItem
              {...itemsLayout}
              label={`${intl.formatMessage(message.item)}${idx + 1}`}
            >
              {getFieldDecorator(`itemId${idx}`, {
                initialValue: [String(val.itemId)]
              })(
                <Cascader
                  disabled
                  options={goods}
                />
              )}
            </FormItem>
          </Col>
          <Col span='8'>
            <FormItem
              {...itemsLayout}
            >
              {getFieldDecorator(`number${idx}`, {
                initialValue: val.count
              })(
                <InputNumber
                  disabled
                />
              )}
            </FormItem>
          </Col>
        </Row>
      )
    })

    return (
      <div>
        <Card>
          <Form>
            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.product)}
            >
              {getFieldDecorator('productId', {
                initialValue: check.sango2Mails ? [check.sango2Mails.productId] : ['']
              })(
                <Cascader
                  disabled
                  options={options}
                />
              )}
            </FormItem>

            {/* <FormItem
              {...formItemLayout}
              label='服务器'
            >
              {getFieldDecorator('serverId', {
                initialValue: serversItem
              })(
                <TreeSelect
                  treeData={[{
                    label: '全选',
                    value: null,
                    key: '全选',
                    children: serverOptions
                  }]}
                  showSearch
                  allowClear
                  treeDefaultExpandAll
                  multiple
                  treeCheckable
                  treeNodeFilterProp='label'
                  style={{ maxHeight: 100, overflow: 'auto' }}
                  dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  disabled
                />
              )}
            </FormItem> */}

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.server)}
            >
              {getFieldDecorator('serverId', {
                initialValue: check.sango2Mails ? check.sango2Mails.serverIds : ''
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.channel)}
            >
              {getFieldDecorator('channels', {
                rules: [{ required: false, message: '请选择渠道' }],
                initialValue: channelsItem
              })(
                <TreeSelect
                  treeData={[{
                    label: intl.formatMessage(message.all),
                    value: null,
                    key: intl.formatMessage(message.all),
                    children: channels
                  }]}
                  showSearch
                  allowClear
                  treeDefaultExpandAll
                  multiple
                  treeCheckable
                  treeNodeFilterProp='label'
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  style={{ maxHeight: 100, overflow: 'auto' }}
                  dropdownStyle={{ maxHeight: 300 }}
                  disabled
                />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='id'
            >
              {getFieldDecorator('id', {
                initialValue: check.sango2Mails ? check.sango2Mails.id : ''
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.mailTitle)}
            >
              {getFieldDecorator('title', {
                initialValue: check.sango2Mails ? check.sango2Mails.title : ''
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.sender)}
            >
              {getFieldDecorator('senderName', {
                initialValue: check.sango2Mails ? check.sango2Mails.senderName : ''
              })(
                <Input type='textarea' autosize={{ minRows: 2 }} disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.mailContext)}
            >
              {getFieldDecorator('context', {
                initialValue: check.sango2Mails ? check.sango2Mails.context : ''
              })(
                <Input type='textarea' autosize={{ minRows: 2 }} disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.description)}
            >
              {getFieldDecorator('description', {
                initialValue: check.sango2Mails ? check.sango2Mails.description : ''
              })(
                <Input type='textarea' autosize={{ minRows: 2 }} disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.creator)}
            >
              {getFieldDecorator('creator', {
                initialValue: check.sango2Mails ? check.sango2Mails.creator : ''
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.createTime)}
            >
              {getFieldDecorator('createTime', {
                initialValue: check.sango2Mails ? check.sango2Mails.createTime : ''
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.status)}
            >
              {getFieldDecorator('status', {
                initialValue: statusItem
              })(
                <Input disabled />
              )}
            </FormItem>

            { formItems }

          </Form>
        </Card>
        <Card
          title={intl.formatMessage(message.ps1)}
          noHovering
        >
          <Form>
            <Table
              rowKey='index'
              bordered
              dataSource={check.mailPlayers}
              columns={this.columns}
              pagination={{
                showSizeChanger: true,
                defaultPageSize: 50,
                pageSizeOptions: ['20', '50', '100', '200', '500']
              }}
            />
          </Form>
          {
            _.has(curd, '50506') &&
            <Button type='primary' onClick={this.handleSearch} style={{marginRight: '20px'}}>{intl.formatMessage(message.send)}</Button>
          }
          <Button type='primary'>
            <Link to='/sango2/mail/serverMail/index'>{intl.formatMessage(message.back)}</Link>
          </Button>
        </Card>
      </div>
    )
  }
}

const Details = Form.create()(DetailsForm)
export default Details
