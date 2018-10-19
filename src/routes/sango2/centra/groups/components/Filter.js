import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Modal } from 'antd'
import _ from 'lodash'
import GroupModal from './Modal'

class GroupFilter extends Component {
  state = {
    currentItem: {},
    modalType: 'create',
    visible: false
  }

  handleCreateGroup = () => {
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
        this.props.onSearch()
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    const {curd} = this.props
    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              _.has(curd, '20403')
              ?
                <Col className='gutter-row' span={2}>
                  <Button type='primary' htmlType='submit'>查询</Button>
                </Col>
              :
                ''
            }

            {
              _.has(curd, '20401')
              ?
                <Col className='gutter-row' span={2}>
                  <Button type='ghost' onClick={this.handleCreateGroup}>添加</Button>
                </Col>
              :
                ''
            }
          </Row>
        </Form>

        <Modal
          width={1000}
          key={Math.random()}
          title='添加分组'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <GroupModal
            onModalLoad={this.onModalLoad}
            onCreate={this.props.onCreate}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

GroupFilter.propTypes = {
  curd: PropTypes.object.isRequired,
  form: PropTypes.object,
  onCreate: PropTypes.func,
  onSearch: PropTypes.func
}

const Filter = Form.create()(GroupFilter)

export default Filter
