import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Cascader, Modal } from 'antd'
import _ from 'lodash'
import { defineMessages } from 'react-intl'

import CreateModal from './Modal'

const message = defineMessages({
  pro: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  ip_add: {
    id: 'BUTTON.IP_ADD',
    defaultMessage: '添加 IP 地址'
  }
})


class AuthenticFilter extends Component {
  state = {
    visible: false
  }

  handleCreate = () => {
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
        this.props.onGet({
          productId: fieldsValue.products[0],
          serverId: fieldsValue.products[1]
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, intl } = this.props

    const ColProps = {
      xs: 24,
      sm: 18,
      md: 12,
      xl: 12,
      style: {
        marginBottom: 6
      }
    }

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch} >
          {
            _.has(this.props.curd, '140203')
            ?
              <Row>
                <Col {...ColProps}>
                  {getFieldDecorator('products', {
                    rules: [{ required: true, message: '请选择产品与服务器' }]
                  })(
                    <Cascader
                      style={{ width: '100%' }}
                      options={this.props.options}
                      placeholder={intl.formatMessage(message.pro)}
                      showSearch
                      expandTrigger='hover'
                      popupClassName='cascaderMenu'
                    />
                  )}
                </Col>
              </Row>
            :
              ''
          }

          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              _.has(this.props.curd, '140203')
              ?
                <Col className='gutter-row' span={2}>
                  <Button type='primary' className='margin-right' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                </Col>
              :
                ''
            }
            {
              _.has(this.props.curd, '140201')
              ?
                <Col className='gutter-row' span={2}>
                  <Button onClick={this.handleCreate}>{intl.formatMessage(message.ip_add)}</Button>
                </Col>
              :
                ''
            }
          </Row>
        </Form>

        <Modal
          width={900}
          key={Math.random()}
          title={intl.formatMessage(message.ip_add)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <CreateModal
            intl={this.props.intl}
            options={this.props.options}
            onCreate={this.props.onCreate}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

AuthenticFilter.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  curd: PropTypes.object,
  onCreate: PropTypes.func,
  onGet: PropTypes.func,
  options: PropTypes.array
}

const Filter = Form.create()(AuthenticFilter)

export default Filter
