import React, {Component} from 'react'
import { defineMessages } from 'react-intl'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Form, Input, Button, Select, TreeSelect, Switch, Icon, InputNumber } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

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
  version: {
    id: 'TABLE.APPVERSION',
    defaultMessage: '版本号'
  },
  version_input: {
    id: 'TABLE.APPVERSION_INPUT',
    defaultMessage: '请填写有效版本号! 例:1.1.1'
  },
  title: {
    id: 'TABLE.TITLE',
    defaultMessage: '标题'
  },
  title_input: {
    id: 'TABLE.TITLE_INPUT',
    defaultMessage: '请填写标题'
  },
  content: {
    id: 'TABLE.CONTENT',
    defaultMessage: '内容'
  },
  content_input: {
    id: 'TABLE.CONTENT_INPUT',
    defaultMessage: '请填写内容'
  },
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  open: {
    id: 'BUTTON.OPEN',
    defaultMessage: '开启'
  },
  off: {
    id: 'BUTTON.OFF',
    defaultMessage: '关闭'
  },
  add_item: {
    id: 'BUTTON.ITEM_ADD',
    defaultMessage: '添加道具'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reload: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  },
  item: {
    id: 'TABLE.ITEM',
    defaultMessage: '道具'
  },
  item_input: {
    id: 'FORM.ITEM_INPUT',
    defaultMessage: '请选择道具'
  },
  count: {
    id: 'FORM.COUNT',
    defaultMessage: '数量'
  },
  count_input: {
    id: 'FORM.GOODCOUNT_INPUT',
    defaultMessage: '请输入物品数量'
  },
  notFound: {
    id: 'TIP.ITEM_NOTFOUND',
    defaultMessage: '无道具,请选择产品'
  }
})


class NoticesUpdateModal extends Component {

  static propTypes = {
    intl: PropTypes.object,
    form: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    // login: PropTypes.object.isRequired,
    options: PropTypes.array,
    onSubmitting: PropTypes.func.isRequired,
    itemsActionCreator: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    updateUpdateNotice: PropTypes.func.isRequired,
    addUpdateNotice: PropTypes.func.isRequired,
    onModalLoad: PropTypes.func.isRequired
  }

  state = {
    productId: '',
    currentItem: {},
    modalType: ''
  }

  products = []

  initialKey = []
  initialValue = []
  initialObj = {}
  uuid = this.initialKey.length

  handelItemRemove = (k) => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 0) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  handleItemAdd = () => {
    this.uuid++
    const { form } = this.props
    // 获取一个输入控件的值
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(this.uuid)
    // can use data-binding to set
    // important! 设置一组输入控件的值
    form.setFieldsValue({
      keys: nextKeys
    })
  }

  componentWillMount() {
    const { currentItem, modalType } = this.props.onModalLoad()
    const options = this.props.options
    console.log(options)
    _.map(options, (value, index) => {
      this.products.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })
    this.setState({
      productId: currentItem ? currentItem.productId : options[0].value,
      currentItem: modalType === 'create' ? {} : currentItem,
      modalType: modalType
    })
    currentItem.productId && this.props.itemsActionCreator(currentItem.productId)
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleProductSelect = (productId) => {
    this.props.itemsActionCreator(productId)
    this.setState({
      productId: productId
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.modalType === 'create') {
          this.props.addUpdateNotice(values)
        } else {
          this.props.updateUpdateNotice(values)// 真实触发 Module action PUT 请求
          this.props.onUpdate(values)// 更新表格动效
        }
        this.props.onSubmitting()
      }
    })
  }


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { intl } = this.props
    const disabled = this.state.modalType !== 'create'

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

    // 道具下拉
    let items = []
    _.map(this.props.item.data, (value, key) => {
      items.push(
        <Option key={key} value={key}>{key + '(' + value + ')'}</Option>
      )
    })

    // 用于和表单进行双向绑定
    // 创建keys 的 names
    this.state.currentItem.rewards && this.state.currentItem.rewards.map((k, index) => {
      if (!this.initialKey.includes(index)) {
        this.initialKey.push(index)
        this.initialValue.push(k)
        this.uuid++
      }
    })

    getFieldDecorator('keys', { initialValue: this.initialKey.length > 0 ? this.initialKey : [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : tailFormItemLayout)}
          label={index === 0 ? intl.formatMessage(message.item) : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`item-${k}`, {
            initialValue: this.initialValue.length > 0 && this.initialValue[k] ? this.initialValue[k].itemId : intl.formatMessage(message.item_input),
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: intl.formatMessage(message.item_input)
            }]
          })(
            <Select
              showSearch
              filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              placeholder={intl.formatMessage(message.item)}
              notFoundContent={intl.formatMessage(message.notFound)}
              style={{ width: '40%', marginRight: 8 }}>
              {items}
            </Select>
          )}
          {getFieldDecorator(`number-${k}`, {
            initialValue: this.initialValue.length > 0 && this.initialValue[k] ? this.initialValue[k].num : 1,
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: intl.formatMessage(message.count_input)
            }]
          })(
            <InputNumber placeholder={intl.formatMessage(message.count)} style={{ width: '20%', marginRight: 8 }} />
          )}
          <Icon
            className='dynamic-delete-button'
            type='minus-circle-o'
            disabled={keys.length === 1}
            onClick={() => this.handelItemRemove(k)}
          />
        </FormItem>
      )
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        {getFieldDecorator('id', {
          initialValue: this.state.currentItem.id
        })(
          <Input type='hidden' />
        )}
        <FormItem label={intl.formatMessage(message.title)}>
          {getFieldDecorator('title', {
            initialValue: this.state.currentItem.title,
            rules: [{ required: true, message: intl.formatMessage(message.title_input) }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label={intl.formatMessage(message.version)}>
          {getFieldDecorator('appversion', {
            initialValue: this.state.currentItem.appversion,
            rules: [
              { required: true, pattern: /\d{1,2}.\d{1,2}.\d{1,3}$/i, message: intl.formatMessage(message.version_input) }
            ]
          })(
            <Input disabled={disabled} />
          )}
        </FormItem>
        {
          this.state.modalType === 'update' &&
          <FormItem label={intl.formatMessage(message.status)}>
            {getFieldDecorator('open', {
              initialValue: this.state.currentItem.open
            })(
              <Switch checkedChildren={intl.formatMessage(message.open)} unCheckedChildren={intl.formatMessage(message.off)} defaultChecked={!!this.state.currentItem.open} />
            )}
          </FormItem>
        }
        <FormItem label={intl.formatMessage(message.content)}>
          {getFieldDecorator('content', {
            initialValue: this.state.currentItem.content,
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
            initialValue: this.state.productId,
            rules: [
              { required: true, message: intl.formatMessage(message.product_input) }
            ]
          })(
            <Select onChange={this.handleProductSelect} disabled={disabled}>
              {this.products}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.server)}
          hasFeedback
        >
          {getFieldDecorator('serverIds', {
            initialValue: this.state.currentItem.serverIds,
            rules: [{ required: true, message: intl.formatMessage(message.server_input) }]
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
        {formItems}
        <FormItem {...tailFormItemLayout}>
          <Button type='dashed' onClick={this.handleItemAdd} style={{ width: '60%' }}>
            <Icon type='plus' /> {intl.formatMessage(message.add_item)}
          </Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
          <Button type='ghost' htmlType='button' onClick={this.handleReset}>{intl.formatMessage(message.reload)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const Modal = Form.create()(NoticesUpdateModal)

export default Modal
