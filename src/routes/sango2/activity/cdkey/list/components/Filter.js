import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Cascader, Button, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import ModalContainer from '../containers/ModalContainer'

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS_INPUT',
    defaultMessage: '请选择产品'
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


class CDKeyFilter extends Component {
  state = {
    currentItem: {},
    modalType: 'create',
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.productId = values.products ? Number(values.products[0]) : this.props.initials.products.productId
        this.props.onSearch({
          path: {
            productId: values.productId
          },
          handle: 'SEARCH'
        })
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { form: { getFieldDecorator }, options, initials, intl } = this.props
    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={16} style={{ marginBottom: 6 }}>
            {
              options.authorize.includes(30103) &&
              <Col className='gutter-row' span={5}>
                {getFieldDecorator('products', {
                  initialValue: initials.products.productId ? [`${initials.products.productId}`] : [],
                  rules: [{ type: 'array', required: true, message: intl.formatMessage(message.product) }]
                })(
                  <Cascader
                    options={options.products}
                    showSearch
                    expandTrigger='hover'
                    placeholder={intl.formatMessage(message.product)}
                  />
                )}
              </Col>
            }
            {
              options.authorize.includes(30103) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
              </Col>
            }
            {
              options.authorize.includes(30101) &&
              <Col className='gutter-row' span={2}>
                <Button type='ghost' onClick={this.handleCreate}>{intl.formatMessage(message.add)}</Button>
              </Col>
            }
          </Row>
        </Form>

        <Modal
          width={800}
          key={Math.random()}
          title={intl.formatMessage(message.add)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ModalContainer
            options={options}
            initials={initials}
            onRender={this.props.onRender}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

CDKeyFilter.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func,
  onRender: PropTypes.func
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: {
        ...props.products
      }
    }
  },
  onValuesChange(_, values) {
  }
})(CDKeyFilter)

export default Filter
