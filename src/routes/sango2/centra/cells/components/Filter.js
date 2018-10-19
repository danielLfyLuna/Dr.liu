import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Modal } from 'antd'
import _ from 'lodash'
import ModalContainer from '../containers/ModalContainer'
import {CentraProductCascader, changeCentraCascaderProductId} from '../../form/CentraProductCascader'

class CellFilter extends Component {
  state = {
    currentItem: {},
    modalType: 'create',
    visible: false
  }

  handleCreateCell = () => {
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
        values.productId = values.products ? Number(values.products[0]) : this.props.initials.productId
        changeCentraCascaderProductId(values.productId)
        this.props.onSearch({
          productId: values.productId,
          handle: 'SEARCH'
        })
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { form: { getFieldDecorator }, options, curd } = this.props
    console.log(options)
    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              _.has(curd, '20203') &&
              <div>
                <Col className='gutter-row' span={5}>
                  <CentraProductCascader getFieldDecorator={getFieldDecorator} options={options} />
                </Col>
                <Col className='gutter-row' span={2}>
                  <Button type='primary' htmlType='submit'>查询</Button>
                </Col>
              </div>
            }
            {
              _.has(curd, '20201') &&
              <Col className='gutter-row' span={2}>
                <Button type='ghost' onClick={this.handleCreateCell}>添加</Button>
              </Col>
            }
          </Row>
        </Form>

        <Modal
          width={1000}
          key={Math.random()}
          title='添加节点'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ModalContainer
            options={options}
            onRender={this.props.onRender}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

CellFilter.propTypes = {
  curd: PropTypes.object.isRequired,
  form: PropTypes.object,
  options: PropTypes.array,
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
})(CellFilter)

export default Filter
