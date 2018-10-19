import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { defineMessages } from 'react-intl'
import { Form, Cascader, Button, TreeSelect } from 'antd'

const FormItem = Form.Item

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS_SENSITIVE',
    defaultMessage: '敏感词来源产品/服务器'
  },
  product_input: {
    id: 'FORM.PRODUCTS/SERVERS_INPUT',
    defaultMessage: '请选择产品/服务器'
  },
  product_target: {
    id: 'FORM.PRODUCT_TARGET',
    defaultMessage: '目标产品'
  },
  product_target_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  server_target: {
    id: 'FORM.SERVER_TARGET',
    defaultMessage: '目标服务器(多选)'
  },
  server_target_input: {
    id: 'FORM.SERVERS_INPUT',
    defaultMessage: '请选择服务器'
  },
  all: {
    id: 'CHOOSE_ALL',
    defaultMessage: '全选'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  },
  reload: {
    id: 'BUTTON.RELOAD',
    defaultMessage: '重置'
  }
})


class SyncForm extends Component {

  static propTypes = {
    intl: PropTypes.object,
    options: PropTypes.array,
    form: PropTypes.object,
    handleSyncCancel: PropTypes.func,
    onSync: PropTypes.func
  }

  state = {
    pro: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, fieldValues) => {
      if (!err) {
        let value = {
          productId: fieldValues.products[0],
          serverId: fieldValues.products[1],
          target: {
            productId: fieldValues.targetPro[0],
            servers: fieldValues.targetSer[0]
          }
        }
        this.props.onSync(value)
        this.props.handleSyncCancel()
      }
    })
  }

  handleReset = () => {
    this.props.form.resetFields()
  }

  handleChange = (e) => {
    this.setState({
      pro: e[0]
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props

    let pros = []
    _.map(this.props.options, (v, i) => {
      pros.push({
        value: v.value,
        label: v.label
      })
    })
    let sers = []
    _.forEach(this.props.options, (v, i) => {
      if (v.value === this.state.pro) {
        sers = v.children
      }
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

    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.product)}
        >
          {getFieldDecorator('products', {
            rules: [{ required: true, message: intl.formatMessage(message.product_input) }]
          })(
            <Cascader
              showSearch
              options={this.props.options}
              placeholder={intl.formatMessage(message.product_input)}
              expandTrigger='hover'
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.product_target)}
        >
          {getFieldDecorator('targetPro', {
            rules: [{ required: true, message: intl.formatMessage(message.product_target_input) }]
          })(
            <Cascader
              showSearch
              options={pros}
              placeholder={intl.formatMessage(message.product_target_input)}
              expandTrigger='hover'
              onChange={this.handleChange}
            />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.server_target)}
        >
          {getFieldDecorator('targetSer', {
            rules: [{ required: true, message: intl.formatMessage(message.server_target_input) }]
          })(
            <TreeSelect
              treeData={[{
                label: intl.formatMessage(message.all),
                value: null,
                key: intl.formatMessage(message.all),
                children: [...sers]
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              searchPlaceholder={intl.formatMessage(message.server_target_input)}
              dropdownStyle={{height: 300}}
            />
          )}
        </FormItem>


        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' >{intl.formatMessage(message.submit)}</Button>
          <Button type='default' onClick={this.handleReset} style={{marginLeft: '10px'}}>{intl.formatMessage(message.reload)}</Button>
        </FormItem>

      </Form>
    )
  }
}

const Sync = Form.create()(SyncForm)

export default Sync
