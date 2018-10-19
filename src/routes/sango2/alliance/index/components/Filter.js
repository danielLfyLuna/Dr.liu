import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Row, Col, Cascader, Button } from 'antd'

import AllianceModal from './Modal'


class AllianceFilter extends Component {
  state = {
    select: true,
    visible: false
  }

  handleProductSelect = (products) => {
    if (products.length) {
      this.setState({
        select: false
      })
    } else {
      this.setState({
        select: true
      })
    }
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch({
          path: {
            productId: values.products[0],
            serverId: values.products[1]
          },
          handle: 'SEARCH'
        })
      }
    })
  }

  handleExport = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { form: { getFieldDecorator }, options, initials } = this.props
    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              options.authorize.includes(130101) &&
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('products', {
                  initialValue: initials.products.productId ? [initials.products.productId, initials.products.serverId] : [],
                  rules: [{ type: 'array', required: true, message: '请选择产品/服务器!' }]
                })(
                  <Cascader
                    options={options.products.list}
                    showSearch
                    onChange={this.handleProductSelect}
                    placeholder='请选择产品/服务器'
                    expandTrigger='hover'
                  />
                )}
              </Col>
            }
            {
              options.authorize.includes(130101) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'>查询</Button>
              </Col>
            }
            {
              options.authorize.includes(130104) &&
              <Col className='gutter-row' span={2}>
                <Button onClick={this.handleExport}>导出</Button>
              </Col>
            }
          </Row>
        </Form>
        <Modal
          width={900}
          key={Math.random()}
          title='导出联盟列表'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <AllianceModal
            options={this.props.options}
            onExport={this.props.onExport}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

AllianceFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onSearch: PropTypes.func,
  onExport: PropTypes.func
}

const Filter = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      products: props.products
    }
  },
  onValuesChange(_, values) {
  }
})(AllianceFilter)

export default Filter
