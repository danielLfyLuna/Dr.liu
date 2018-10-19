import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Modal } from 'antd'

import ManagerModal from './Modal'

class ManagerFilter extends Component {
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
        this.props.onSearch({
          handle: 'SEARCH'
        })
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { options } = this.props

    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={10} style={{ marginBottom: 8 }}>
            {
              options.authorize.includes(160402) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit' style={{ marginLeft: 16 }}>查询</Button>
              </Col>
            }
            {
              options.authorize.includes(160401) &&
              <Col className='gutter-row' span={2}>
                <Button type='ghost' onClick={this.handleCreate}>添加 GS 管理</Button>
              </Col>
            }
          </Row>
        </Form>
        {/* <Row gutter={20} style={{ marginBottom: 6 }}>
          <Col className='gutter-row' span={2}>
            <Button type='ghost' onClick={this.handleCreate}>添加 GS 管理</Button>
          </Col>
        </Row> */}

        <Modal
          width={700}
          key={Math.random()}
          title='添加 GS 管理'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ManagerModal
            options={this.props.options}
            initials={this.props.initials}
            onCreate={this.props.onCreate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

ManagerFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onCreate: PropTypes.func,
  onSearch: PropTypes.func
}

const Filter = Form.create()(ManagerFilter)

export default Filter
