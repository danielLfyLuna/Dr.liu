import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { defineMessages } from 'react-intl'
import _ from 'lodash'
import { Form, Cascader, Button, TreeSelect } from 'antd'

const FormItem = Form.Item
const message = defineMessages({
  server: {
    id: 'FORM.SERVERS',
    defaultMessage: '服务器'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})


class BatchModal extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSwitch({
          path: {
            productId: this.props.initials.path.productId
          },
          form: {
            operation: values.operation[0],
            serverList: values.serverList
          }
        })
        this.props.onSubmitting()
      }
    })
  }

  _serverReduce = (options, productId) => {
    return _.reduce(options, (result, option) => {
      if (option.value === productId) {
        result = _.reduce(option.children, (res, opt) => {
          res.push({ value: opt.value, label: opt.label })
          return res
        }, [])
      }
      return result
    }, [])
  }

  render() {
    const { form: { getFieldDecorator }, options, initials, intl } = this.props

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
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 6 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={intl.formatMessage(message.server)}
          key='serverList'
        >
          {getFieldDecorator('serverList', {
            rules: [{ type: 'array', required: true, message: 'required!' }]
          })(
            <TreeSelect
              treeData={options.servers}
              showSearch
              allowClear
              treeDefaultExpandAll={false}
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              showCheckedStrategy={TreeSelect.SHOW_CHILD}
              searchPlaceholder={intl.formatMessage(message.server)}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label={intl.formatMessage(message.action)}>
          {getFieldDecorator('operation', {
            rules: [{ type: 'array', required: false, message: '请选择操作!', whitespace: true }]
          })(
            <Cascader
              options={initials.enum.status}
              showSearch
              expandTrigger='hover'
              placeholder={intl.formatMessage(message.action)}
            />
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

BatchModal.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSwitch: PropTypes.func,
  onSubmitting: PropTypes.func
}

const Batch = Form.create()(BatchModal)

export default Batch
