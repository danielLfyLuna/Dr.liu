import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Cascader, Row, Col, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'

import Update from './Update'

const message = defineMessages({
  product_input: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  update: {
    id: 'BUTTON.UPDATE',
    defaultMessage: '修改'
  }
})


class MainFilter extends Component {

  static propTypes = {
    intl: PropTypes.object,
    options: PropTypes.array,
    curd: PropTypes.object,
    form: PropTypes.object,
    onSearch: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    visible: false
  }

  handleUpdate = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        console.log(fieldsValue)
        this.props.onSearch(fieldsValue.productId[0])
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, curd, intl } = this.props

    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }

    // 产品，服务器下拉
    let productsOptions = []
    _.map(this.props.options, (val, idx) => {
      productsOptions.push({
        value: val.value,
        label: val.label
      })
    })

    return (
      <div>
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          <Row gutter={20}>
            <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
              {getFieldDecorator('productId', {
                rules: [{ required: true, message: intl.formatMessage(message.product_input) }]
              })(
                <Cascader
                  showSearch
                  options={productsOptions}
                  placeholder={intl.formatMessage(message.product_input)}
                />
              )}
            </Col>
            {
              _.has(curd, '60501') ?
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
                  <Button type='primary' onClick={this.onSearch} className='margin-right' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                </Col>
              :
                ''
            }

            {
              _.has(curd, '60502') ?
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 4 }}>
                  <Button type='ghost' onClick={this.handleUpdate}>{intl.formatMessage(message.update)}</Button>
                </Col>
              :
                ''
            }



          </Row>
        </Form>
        <Modal
          width={1000}
          maskClosable={false}
          title={intl.formatMessage(message.update)}
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <Update
            intl={intl}
            options={this.props.options}
            handleCancel={this.handleCancel}
            onUpdate={this.props.onUpdate}
          />
        </Modal>
      </div>
    )
  }

}

const Filter = Form.create()(MainFilter)

export default Filter
