import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Button, Row, Col } from 'antd'

class TradeFilter extends Component {
  static propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    onSearch: PropTypes.func
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch('_')
      }
    })
  }

  render() {

    return (
      <div style={{ marginBottom: 12 }}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={10}>
            <Col className='gutter-row' span={6}>
              {
                _.has(this.props.login.curd, '50601') &&
                <Button type='primary' htmlType='submit'>查询</Button>
              }
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const Filter = Form.create()(TradeFilter)

export default Filter
