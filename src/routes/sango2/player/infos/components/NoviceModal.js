import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Cascader, Tooltip, Icon } from 'antd'
import { defineMessages } from 'react-intl'

const FormItem = Form.Item
const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  noviceId: {
    id: 'FORM.NOVICEID',
    defaultMessage: '新手步骤'
  },
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  tips: {
    id: 'FORM.NICKNAME_INPUT',
    defaultMessage: '每个玩家昵称之间用英文逗号(,)或回车(ENTER)隔开'
  },
  noviceId_input: {
    id: 'FORM.NOVICEID_INPUT',
    defaultMessage: '请输入跳过的新手步骤'
  },
  submit: {
    id: 'BUTTON.SUBMIT',
    defaultMessage: '提交'
  }
})


class Modal extends Component {

  static propTypes = {
    intl: PropTypes.object,
    form: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onCreate: PropTypes.func.isRequired,
    handleNovice: PropTypes.func.isRequired
  }


  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      let items = {}
      items.products = values.products
      items.list = {
        nicknames: values.nicknames,
        noviceId: values.noviceId
      }
      if (!err) {
        items.list.nicknames = items.list.nicknames.replace(/(\s+)|(\r+)|(\n+)/img, ',')
        // items.list.nicknames = items.list.nicknames.replace(/^(\s+)/img, ',')
        this.props.handleNovice(items)
        this.props.onCreate()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label={intl.formatMessage(message.products)}
        >
          {getFieldDecorator('products', {
            rules: [{ required: true, message: '必填!' }]
          })(
            <Cascader
              placeholder={intl.formatMessage(message.products)}
              options={this.props.options}
              expandTrigger='hover'
              showSearch
            />
          )}
        </FormItem>
        <FormItem
          label={intl.formatMessage(message.noviceId)}
        >
          { getFieldDecorator('noviceId', {
            rules: [{ required: true, message: '请输入跳过的新手步骤' }],
            initialValue: 370
          })(
            <Input
              placeholder={intl.formatMessage(message.noviceId_input)}
            />
          )}
        </FormItem>
        <FormItem
          label={(
            <span>
              {intl.formatMessage(message.nickname)}&nbsp;
              <Tooltip title={intl.formatMessage(message.tips)} placement='right'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
        >
          { getFieldDecorator('nicknames', {
            rules: [{ required: true, message: '请输入玩家昵称' }]
          })(
            <Input
              type='textarea'
              placeholder={intl.formatMessage(message.nickname)}
              autosize={{minRows: 3}}
            />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit'>{intl.formatMessage(message.submit)}</Button>
        </FormItem>
      </Form>
    )
  }
}

const NoviceModal = Form.create()(Modal)

export default NoviceModal
