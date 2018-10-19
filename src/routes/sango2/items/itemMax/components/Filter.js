import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Modal } from 'antd'
import _ from 'lodash'


import Upload from './Upload'

class TradeFilter extends Component {
  state = {
    visible: false
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch()
      }
    })
  }

  handleClick = () => {
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
    return (
      <div style={{ marginBottom: 12 }}>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={10}>
            <Col className='gutter-row' span={10}>
              {
                _.has(this.props.login.curd, '120301') &&
                <Button type='primary' onClick={this.handleSearch}>查询</Button>
              }
              {
                _.has(this.props.login.curd, '120302') &&
                <Button style={{marginLeft: '8px'}} onClick={this.handleClick}>上传</Button>
              }
            </Col>
          </Row>
        </Form>
        <Modal
          title='上传Excel'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
          width={650}
          destroyOnClose
        >
          <Upload
            handleCancel={this.handleCancel}
            onUpload={this.props.onUpload}
          />
        </Modal>
      </div>
    )
  }
}

TradeFilter.propTypes = {
  login: PropTypes.object,
  form: PropTypes.object,
  onSearch: PropTypes.func,
  onUpload: PropTypes.func
}

const Filter = Form.create()(TradeFilter)

export default Filter
