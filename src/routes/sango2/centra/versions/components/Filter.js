import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Modal } from 'antd'
import _ from 'lodash'
import VersionModal from './Modal'
import {CentraProductCascader, changeCentraCascaderProductId} from '../../form/CentraProductCascader'

class VersionFilter extends Component {
  state = {
    currentItem: {},
    modalType: 'create',
    visible: false
  }

  handleCreateVersion = () => {
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
    const { form: { getFieldDecorator }, options, initials, curd } = this.props
    console.log(options)
    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              _.has(curd, '20503') &&
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
              _.has(curd, '20501') &&
              <Col className='gutter-row' span={2}>
                <Button type='ghost' onClick={this.handleCreateVersion}>添加</Button>
              </Col>
            }
          </Row>
        </Form>

        <Modal
          width={1000}
          key={Math.random()}
          title='添加版本'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <VersionModal
            options={options}
            initials={initials}
            data={this.props.data}
            maps={this.props.maps}
            onCreate={this.props.onCreate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
          />
        </Modal>
      </div>
    )
  }
}

VersionFilter.propTypes = {
  curd: PropTypes.object.isRequired,
  form: PropTypes.object,
  options: PropTypes.array,
  initials: PropTypes.object,
  data: PropTypes.object,
  maps: PropTypes.array,
  onCreate: PropTypes.func,
  onSearch: PropTypes.func
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
})(VersionFilter)

export default Filter
