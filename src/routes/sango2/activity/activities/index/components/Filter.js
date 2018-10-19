import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Cascader, Row, Col, Button, Modal } from 'antd'
import { defineMessages } from 'react-intl'

import CreateContainer from '../containers/CreateContainer'

const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS/SERVERS_INPUT',
    defaultMessage: '请选择产品/服务器'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  add: {
    id: 'BUTTON.ACTIVITY_ADD',
    defaultMessage: '添加活动'
  }
})


class ActivitiesFilter extends Component {
  state = {
    visible: false
  }

  handleCreate = () => {
    this.context.router.push('/sango2/activity/activities/templates')
  }

  handleCancel = e => {
    this.setState({
      visible: false
    })
  }

  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.productId = values.products
          ? values.products[0]
          : this.props.initials.products.productId
        values.serverId = values.products
          ? values.products[1]
          : this.props.initials.products.serverId
        this.props.onSearch({
          productId: values.productId,
          serverId: values.serverId,
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
          <Row gutter={2} style={{ marginBottom: 6 }}>
            {options.authorize.includes(90103) && (
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('products', {
                  initialValue: initials.products.productId
                    ? [initials.products.productId, initials.products.serverId]
                    : [],
                  rules: [
                    { type: 'array', required: true, message: intl.formatMessage(message.products) }
                  ]
                })(
                  <Cascader
                    options={options.products.list}
                    showSearch
                    expandTrigger='hover'
                    placeholder={intl.formatMessage(message.products)}
                  />
                )}
              </Col>
            )}
            {options.authorize.includes(90103) && (
              <Col className='gutter-row' span={2}>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ marginLeft: 16 }}
                >
                  {intl.formatMessage(message.get)}
                </Button>
              </Col>
            )}
            {
              (
                options.authorize.includes(90101) ||
                options.authorize.includes(90107) ||
                options.authorize.includes(90110)
              ) &&
              <Col className='gutter-row' span={2}>
                <Button type='ghost' onClick={this.handleCreate}>{intl.formatMessage(message.add)}</Button>
              </Col>
            }
          </Row>
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title={intl.formatMessage(message.add)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <CreateContainer
            options={this.props.options}
            initials={this.props.initials}
            onRender={this.props.onRender}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

ActivitiesFilter.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func,
  onRender: PropTypes.func
}

ActivitiesFilter.contextTypes = {
  router: PropTypes.object
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
  onValuesChange(_, values) {}
})(ActivitiesFilter)

export default Filter
