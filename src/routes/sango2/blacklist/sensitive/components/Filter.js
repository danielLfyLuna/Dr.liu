import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Cascader, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'

import Add from './Add'
import Sync from './Sync'

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品与服务器(必选)'
  },
  sync: {
    id: 'BUTTON.SYNC',
    defaultMessage: '同步'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  add: {
    id: 'BUTTON.ADD',
    defaultMessage: '新建'
  }
})


class SENFilter extends Component {

  static propTypes = {
    intl: PropTypes.object,
    form: PropTypes.object,
    curd: PropTypes.object,
    onSearch: PropTypes.func,
    onAdd: PropTypes.func,
    onSync: PropTypes.func,
    options: PropTypes.array
  }

  state = {
    visible: false,
    syncVis: false
  }

  handleVisible = (e) => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleSyncVis = (e) => {
    this.setState({
      syncVis: true
    })
  }

  handleSyncCancel = (e) => {
    this.setState({
      syncVis: false
    })
  }


  handleReset = () => {
    this.props.form.resetFields()
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let value = {
          productId: fieldsValue.products[0],
          serverId: fieldsValue.products[1]
        }
        this.props.onSearch(value)
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, curd, intl } = this.props

    const ColProps = {
      xs: 24,
      sm: 8,
      style: {
        marginBottom: 6
      }
    }
    const TwoColProps = {
      ...ColProps,
      xl: 96
    }

    return (
      <div>
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          {
            _.has(curd, '80401')
            ?
              <Row gutter={20}>
                <Col {...ColProps} >
                  {getFieldDecorator('products', {
                    rules: [{ required: true, message: intl.formatMessage(message.product) }]
                  })(
                    <Cascader
                      showSearch
                      options={this.props.options}
                      placeholder={intl.formatMessage(message.product)}
                      expandTrigger='hover'
                      popupClassName='cascaderMenu'
                    />
                  )}
                </Col>
              </Row>
            :
              ''
          }
          <Row gutter={20}>
            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  _.has(curd, '80401')
                  ?
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                    </div>
                  :
                    ''
                }
                {
                  _.has(curd, '80402')
                  ?
                    <div>
                      <Button type='danger' onClick={this.handleVisible} style={{marginLeft: '20px'}}>{intl.formatMessage(message.add)}</Button>
                    </div>
                  :
                    ''
                }
                {
                  _.has(curd, '80403')
                  ?
                    <div>
                      <Button type='danger' onClick={this.handleSyncVis} style={{marginLeft: '20px'}}>{intl.formatMessage(message.sync)}</Button>
                    </div>
                  :
                    ''
                }
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={1000}
          wrapClassName='ModalLongName'
          maskClosable={false}
          title={intl.formatMessage(message.add)}
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <Add
            intl={intl}
            handleCancel={this.handleCancel}
            options={this.props.options}
            onAdd={this.props.onAdd}
          />
        </Modal>

        <Modal
          width={1000}
          wrapClassName='ModalLongName'
          maskClosable={false}
          title={intl.formatMessage(message.sync)}
          footer={null}
          visible={this.state.syncVis}
          onCancel={this.handleSyncCancel}
        >
          <Sync
            intl={intl}
            handleSyncCancel={this.handleSyncCancel}
            options={this.props.options}
            onSync={this.props.onSync}
          />
        </Modal>
      </div>
    )
  }
}

const Filter = Form.create()(SENFilter)

export default Filter
