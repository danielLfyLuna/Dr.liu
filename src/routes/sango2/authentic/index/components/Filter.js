import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Modal } from 'antd'
import { defineMessages } from 'react-intl'

import CreateModal from './Modal'

const message = defineMessages({
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
    select: true,
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

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { options, intl } = this.props

    return (
      <div>
        <Form layout='inline'>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              options.authorize.includes(140103) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' onClick={this.props.onGet}>{intl.formatMessage(message.get)}</Button>
              </Col>
            }
            {
              options.authorize.includes(140101) &&
              <Col className='gutter-row' span={2}>
                <Button onClick={this.handleCreate}>{intl.formatMessage(message.ip_add)}</Button>
              </Col>
            }
          </Row>
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title={intl.formatMessage(message.ip_add)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <CreateModal
            intl={this.props.intl}
            onCreate={this.props.onCreate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

AuthenticFilter.propTypes = {
  intl: PropTypes.object,
  options: PropTypes.object,
  onCreate: PropTypes.func,
  onGet: PropTypes.func
}

AuthenticFilter.contextTypes = {
  router: PropTypes.object
}

const Filter = Form.create()(AuthenticFilter)

export default Filter
