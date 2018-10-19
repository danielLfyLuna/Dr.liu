import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Cascader, InputNumber, Input, Table, Card, Modal } from 'antd'
import _ from 'lodash'
import { Link } from 'react-router'
import { intlShape, defineMessages } from 'react-intl'

import PlayersModal from './Modal'

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
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  playerId: {
    id: 'FORM.PLAYERID',
    defaultMessage: '玩家ID'
  },
  platformId: {
    id: 'FORM.PLATFORMID',
    defaultMessage: '平台ID'
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
  ps2: {
    id: 'PERSON_PS',
    defaultMessage: '玩家信息格式为'
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
    checkOwnMail: PropTypes.func,
    updateOwnEmailPlayer: PropTypes.func,
    sendOwnMail: PropTypes.func,
    ownMailDetail: PropTypes.object
  }

  constructor(props) {
    super(props)
    const intl = this.props.intl
    this.columns = [{
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
      }, {
      title: intl.formatMessage(message.action),
      key: 'action',
      render: (text, record) => {
        const { curd } = this.props.login

        return (
          _.has(curd, '50307') ?
            <Button onClick={e => this.handleOk(record)}>
              {intl.formatMessage(message.receiver_update)}
            </Button>
          :
            ''
        )
      }
    }]
  }

  state = {
    visible: false,
    record: {},
    options: []
  }

  handleOk = (value) => {
    this.setState({
      visible: true,
      record: value
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    this.props.fetchGoodsMap({productId: '_'})
    this.props.checkOwnMail(this.props.location.query.id)
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
        let id = this.props.ownMailDetail.check.sango2Mails.id
        this.props.sendOwnMail(id)
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props
    const { curd } = this.props.login

    const { check } = this.props.ownMailDetail

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

    let goods = []
    if (this.props.goods.options[0]) {
      _.map(this.props.goods.options[0], (value, key) => {
        goods.push(
          {value: key, label: `${value}(${key})`}
        )
      })
    }

    // 处理状态数据显示格式
    let statusItem = ''
    if (check.sango2Mails && check.sango2Mails.status === 0) { statusItem = intl.formatMessage(message.mail0) }
    if (check.sango2Mails && check.sango2Mails.status === 1) { statusItem = intl.formatMessage(message.mail1) }
    if (check.sango2Mails && check.sango2Mails.status === 2) { statusItem = intl.formatMessage(message.mail2) }
    if (check.sango2Mails && check.sango2Mails.status === 3) { statusItem = intl.formatMessage(message.mail3) }
    if (check.sango2Mails && check.sango2Mails.status === 4) { statusItem = intl.formatMessage(message.mail4) }
    if (check.sango2Mails && check.sango2Mails.status === 5) { statusItem = intl.formatMessage(message.mail5) }

    let userTypeOptions = ''
    if (check.sango2Mails && check.sango2Mails.receiverType === 1) { userTypeOptions = intl.formatMessage(message.nickname) }
    if (check.sango2Mails && check.sango2Mails.receiverType === 2) { userTypeOptions = intl.formatMessage(message.playerId) }
    if (check.sango2Mails && check.sango2Mails.receiverType === 3) { userTypeOptions = intl.formatMessage(message.platformId) }

    let productIdOpt = ''
    if (check.sango2Mails && check.sango2Mails.productId) { productIdOpt = check.sango2Mails.productId }

    let serverIdOpt = ''
    if (check.sango2Mails && check.sango2Mails.serverIds) { serverIdOpt = check.sango2Mails.serverIds }

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
              label={intl.formatMessage(message.products_servers)}
            >
              {getFieldDecorator('products', {
                initialValue: check.sango2Mails ? [check.sango2Mails.productId, check.sango2Mails.serverIds] : ['', '']
              })(
                <Cascader
                  disabled
                  options={options}
                />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.type)}
            >
              {getFieldDecorator('receiverType', {
                initialValue: userTypeOptions
              })(
                <Input disabled />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={intl.formatMessage(message.receiver)}
            >
              {getFieldDecorator('receivers', {
                initialValue: check.sango2Mails ? check.sango2Mails.receivers : ''
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
          title={
            <div>
              {intl.formatMessage(message.ps1)}，{intl.formatMessage(message.product)}: <i style={{color: '#d50b10'}}>{productIdOpt}</i>&nbsp;&nbsp;{intl.formatMessage(message.server)}: <i style={{color: '#d50b10'}}>{serverIdOpt}</i>,&nbsp;&nbsp;{intl.formatMessage(message.ps2)}: <i style={{color: '#d61'}}>{userTypeOptions}</i>
            </div>
          }
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
            _.has(curd, '50306') &&
            <Button type='primary' onClick={this.handleSearch} style={{marginRight: '20px'}}>{intl.formatMessage(message.send)}</Button>
          }

          <Button type='primary'>
            <Link to='/sango2/mail/ownMail/index'>{intl.formatMessage(message.back)}</Link>
          </Button>
          <Modal
            width={1000}
            maskClosable={false}
            key={Math.random()}
            title={intl.formatMessage(message.update)}
            visible={this.state.visible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <PlayersModal
              intl={this.props.intl}
              handleCancel={this.handleCancel}
              data={this.state.record}
              updateOwnEmailPlayer={this.props.updateOwnEmailPlayer}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}

const Details = Form.create()(DetailsForm)
export default Details
