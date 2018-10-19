import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import { Form, Button, Cascader, Row, Col } from 'antd'

class TradeFilter extends Component {
  static propTypes = {
    data: PropTypes.object,
    form: PropTypes.object,
    onSearch: PropTypes.func
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch({
          productId: values.products[0],
          serverId: values.products[1]
        })
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, data } = this.props

    return (
      <div style={{ marginBottom: 12 }}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={10}>
            <Col className='gutter-row' span={6}>
              {getFieldDecorator('products', {
                rules: [{ type: 'array', required: true, message: '请选择产品/服务器!' }]
              })(
                <Cascader
                  options={data.products}
                  showSearch
                  expandTrigger='hover'
                  placeholder='请选择产品/服务器(必选)'
                  style={{ width: '100%' }}
                />
              )}
            </Col>

            <Col className='gutter-row' span={6}>
              <Button type='primary' htmlType='submit'>查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const Filter = Form.create()(TradeFilter)

export default Filter
