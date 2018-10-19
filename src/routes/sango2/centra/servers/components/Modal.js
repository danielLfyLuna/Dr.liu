import React, { Component } from 'react'
import { defineMessages } from 'react-intl'
import PropTypes from 'prop-types'
import _ from 'lodash'
import openNotificationWithIcon from '../../../../../components/notification'
import { Form, Input, Cascader, Button, Switch } from 'antd'

const FormItem = Form.Item
const message = defineMessages({
  ps1: {
    id: 'TIPS.NO_CELL',
    defaultMessage: '没有可用节点'
  },
  ps2: {
    id: 'TIPS.NO_CELL.PS',
    defaultMessage: '当前所选产品下没有可用节点，请重新选择其他产品和节点！'
  },
  zhengchang: {
    id: 'STATUS.NORMAL',
    defaultMessage: '正常'
  },
  weihu: {
    id: 'STATUS.SERVER.MAINTENANCE',
    defaultMessage: '维护'
  },
  bukeyong: {
    id: 'STATUS.CELLSTATUS.2',
    defaultMessage: '不可用'
  },
  hot1: {
    id: 'STATUS.HOTTYPE.1',
    defaultMessage: '新服'
  },
  hot2: {
    id: 'STATUS.HOTTYPE.2',
    defaultMessage: '满'
  },
  hot3: {
    id: 'STATUS.HOTTYPE.3',
    defaultMessage: '爆满'
  },
  recommend1: {
    id: 'STATUS.RECOMMENDTYPE.1',
    defaultMessage: '不推荐'
  },
  recommend2: {
    id: 'STATUS.RECOMMENDTYPE.2',
    defaultMessage: '推荐'
  },
  open: {
    id: 'BUTTON.OPEN',
    defaultMessage: '开启'
  },
  close: {
    id: 'BUTTON.OFF',
    defaultMessage: '关闭'
  },

  products: {
    id: 'FORM.PRODUCTS/SERVERS',
    defaultMessage: '产品与服务器'
  },
  serverId: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  serverName: {
    id: 'TABLE.SERVERNAME',
    defaultMessage: '服务器名称'
  },
  group: {
    id: 'TABLE.GROUP',
    defaultMessage: '分组'
  },
  recommend: {
    id: 'TABLE.RECOMMEND',
    defaultMessage: '是否推荐'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  status_input: {
    id: 'TABLE.SERVER_STATUS_INPUT',
    defaultMessage: '选择服务器状态'
  },
  boom: {
    id: 'TABLE.BOOM',
    defaultMessage: '火爆程度'
  },
  charge: {
    id: 'TABLE.CHARGE_STATUS',
    defaultMessage: '充值开启'
  },
  rely_pro: {
    id: 'TABLE.PRODUCT_RELY',
    defaultMessage: '依赖产品'
  },
  rely_cell: {
    id: 'TABLE.CELL_RELY',
    defaultMessage: '依赖节点'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})


class ServerModal extends Component {
  state = {
    productId: '',
    cellType: '',
    serverPort: '',
    currentItem: {},
    modalType: ''
  }

  componentWillMount() {
    this.props.fetchCellsMap()
    this.props.fetchProductsMap()

    const { currentItem, modalType } = this.props.onModalLoad()
    this.props.onRender({ renderState: false })

    this.setState({
      productId: currentItem ? currentItem.productId : this.props.options.products[0].value,
      currentItem: modalType === 'create' ? {} : currentItem,
      modalType: modalType
    })
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: true })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        let data = {
          declaredPro: values.declares[0],
          declaredCell: values.declares[1],
          serverName: values.serverName,
          group: values.groups[0],
          hot: values.hot[0],
          recommend: values.recommend[0],
          purchaseOpen: values.purchaseOpen
        }
        if (values.products) {
          data = {
            ...data,
            productId: values.products[0],
            serverId: values.products[1],
            status: values.status[0]
          }
        } else {
          data = {
            ...data,
            productId: values.productId[0],
            serverId: values.serverId
          }
        }

        if (data.declaredCell === '') {
          openNotificationWithIcon('warning', `(${data.productId})--${this.props.intl.formatMessage(message.ps1)}`)
          return
        }
        console.log(data)
        // if (true) return

        if (this.state.modalType === 'create') {
          this.props.onCreate(data)
        } else {
          this.props.onUpdate(data)
        }
        this.props.onSubmitting()
      }
    })
  }

  _cellReduce = (cells, products) => {
    return _.reduce(products, (result, option) => {
      let arr = []
      arr = _.reduce(cells[Number(option.value)], (res, opt) => {
        res.push({ value: opt, label: opt })
        return res
      }, [])
      result.push({
        value: option.value,
        label: option.label,
        children: arr.length ? arr : [{ value: '', label: this.props.intl.formatMessage(message.ps1) }]
      })
      return result
    }, [])
  }

  render() {
    const { form: { getFieldDecorator }, options, server, products, intl } = this.props
    const check = this.state.modalType !== 'create'
    const item = this.state.currentItem
    let productsOpt = []
    productsOpt = products.options
    let declareOpt = []
    if (!declareOpt.length) {
      declareOpt = this._cellReduce(server.cells, options.products)
    }

    let hotTypes = [
      { label: intl.formatMessage(message.hot1), value: 1 },
      { label: intl.formatMessage(message.hot2), value: 2 },
      { label: intl.formatMessage(message.hot3), value: 3 }
    ]
    let recommendTypes = [
      { label: intl.formatMessage(message.recommend1), value: 1 },
      { label: intl.formatMessage(message.recommend2), value: 2 }
    ]
    let serverStatus = [
      { label: intl.formatMessage(message.zhengchang), value: 1 },
      { label: intl.formatMessage(message.weihu), value: 2 },
      { label: intl.formatMessage(message.bukeyong), value: 3 }
    ]
    
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
        sm: { span: 14, offset: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        {
          check &&
          <FormItem {...formItemLayout} label={intl.formatMessage(message.products)}>
            {getFieldDecorator('products', {
              initialValue: item.productId ? [`${item.productId}`, `${item.serverId}`] : [],
              rules: [{ type: 'array', required: true, message: 'required!' }]
            })(
              <Cascader
                options={productsOpt}
                showSearch
                expandTrigger='hover'
                disabled={check}
                placeholder={intl.formatMessage(message.products)}
              />
            )}
          </FormItem>
        }
        <FormItem {...formItemLayout} label={`${intl.formatMessage(message.rely_pro)}/${intl.formatMessage(message.rely_cell)}`}>
          {getFieldDecorator('declares', {
            initialValue: item.declaredPro ? [`${item.declaredPro}`, `${item.declaredCell}`] : [],
            rules: [{ type: 'array', required: true, message: 'required!' }]
          })(
            <Cascader
              options={declareOpt}
              showSearch
              expandTrigger='hover'
              placeholder={`${intl.formatMessage(message.rely_pro)}/${intl.formatMessage(message.rely_cell)}`}
            />
          )}
        </FormItem>
        {
          !check &&
          <div>
            <FormItem {...formItemLayout} label={intl.formatMessage(message.productId)}>
              {getFieldDecorator('productId', {
                initialValue: [],
                rules: [{ type: 'array', required: true, message: 'required!' }]
              })(
                <Cascader
                  options={productsOpt.map(o => ({ label: o.label, value: o.value }))}
                  showSearch
                  expandTrigger='hover'
                  placeholder={intl.formatMessage(message.productId)}
                />
              )
              }
            </FormItem>
            <FormItem {...formItemLayout} label={intl.formatMessage(message.serverId)}>
              {getFieldDecorator('serverId', {
                initialValue: '',
                rules: [{ required: true, message: 'required!' }]
              })(
                <Input placeholder={intl.formatMessage(message.serverId)} />
              )
              }
            </FormItem>
          </div>
        }
        <FormItem {...formItemLayout} label={intl.formatMessage(message.serverName)}>
          {getFieldDecorator('serverName', {
            initialValue: item.serverName || '',
            rules: [{ required: true, message: 'required!' }]
          })(
            <Input placeholder={intl.formatMessage(message.serverName)} />
          )
          }
        </FormItem>

        <FormItem {...formItemLayout} label={intl.formatMessage(message.group)}>
          {getFieldDecorator('groups', {
            initialValue: item.group ? [item.group] : [],
            rules: [{ type: 'array', required: true, message: '请选择分组!' }]
          })(
            <Cascader
              options={options.groups}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.group)}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={intl.formatMessage(message.boom)}>
          {getFieldDecorator('hot', {
            initialValue: item.hot ? [item.hot] : [],
            rules: [{ type: 'array', required: true, message: '请选择火爆程度!' }]
          })(
            <Cascader
              options={hotTypes}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.boom)}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={intl.formatMessage(message.recommend)}>
          {getFieldDecorator('recommend', {
            initialValue: item.recommend ? [item.recommend] : [],
            rules: [{ type: 'array', required: true, message: '请选择是否推荐!' }]
          })(
            <Cascader
              options={recommendTypes}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.recommend)}
            />
          )}
        </FormItem>
        {
          check &&
          <FormItem {...formItemLayout} label={intl.formatMessage(message.status)}>
            {getFieldDecorator('status', {
              initialValue: item.status ? [item.status] : [],
              rules: [{ type: 'array', required: true, message: intl.formatMessage(message.status) }]
            })(
              <Cascader
                options={serverStatus}
                showSearch
                expandTrigger='hover'
                placeholder={intl.formatMessage(message.status)}
              />
            )}
          </FormItem>
        }
        <FormItem {...formItemLayout} label={intl.formatMessage(message.charge)}>
          {getFieldDecorator('purchaseOpen', {
            initialValue: item.purchaseOpen || false,
            rules: [{ type: 'boolean', required: true, message: '请选择充值开启!' }]
          })(
            <Switch checkedChildren={intl.formatMessage(message.open)} unCheckedChildren={intl.formatMessage(message.close)} defaultChecked={item.purchaseOpen} />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

ServerModal.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  products: PropTypes.object,
  server: PropTypes.object,
  onModalLoad: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onSubmitting: PropTypes.func,
  fetchCellsMap: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  onRender: PropTypes.func
}

const Modal = Form.create()(ServerModal)

export default Modal
