import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Modal, Select } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'
import ServerModal from '../containers/ModalContainer'
import BatchModal from './Batch'
import {CentraProductCascader, changeCentraCascaderProductId} from '../../form/CentraProductCascader'

const Option = Select.Option
const message = defineMessages({
  zhengchang: {
    id: 'STATUS.NORMAL',
    defaultMessage: '正常'
  },
  weihu: {
    id: 'STATUS.SERVER.MAINTENANCE',
    defaultMessage: '维护'
  },
  bukeyong: {
    id: 'STATUS.CELLSTATUS.2',
    defaultMessage: '不可用'
  },
  chuzhi: {
    id: 'STATUS.CELLSTATUS.3',
    defaultMessage: '初置阶段'
  },
  wancheng: {
    id: 'STATUS.CELLSTATUS.4',
    defaultMessage: '部署完成'
  },
  ceshi: {
    id: 'STATUS.CELLSTATUS.5',
    defaultMessage: '测试'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  add: {
    id: 'BUTTON.ADD',
    defaultMessage: '新建'
  },
  main: {
    id: 'BUTTON.MAINTENANCE',
    defaultMessage: '批量维护'
  },
  status_input: {
    id: 'FORM.STATUS_OPEN_INPUT',
    defaultMessage: '请选择开服状态(空选查询全部状态)'
  }
})


class ServerFilter extends Component {
  state = {
    currentItem: {},
    modalType: 'create',
    visible: false,
    batchVisible: false,
    serverStatus: { 1: this.props.intl.formatMessage(message.zhengchang), 2: this.props.intl.formatMessage(message.weihu), 3: this.props.intl.formatMessage(message.bukeyong), 4: this.props.intl.formatMessage(message.chuzhi), 5: this.props.intl.formatMessage(message.wancheng), 6: this.props.intl.formatMessage(message.ceshi) }
  }

  handleCreateServer = () => {
    this.setState({
      visible: true
    })
  }

  handleBatchServer = () => {
    this.setState({
      batchVisible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleBatchCancel = (e) => {
    this.setState({
      batchVisible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = {
          productId: values.products ? Number(values.products[0]) : this.props.initials.path.productId
        }
        if (values.status) {
          fields.status = values.status
        }
        changeCentraCascaderProductId(fields.productId)
        this.props.onSearch(fields)
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  render() {
    const { form: { getFieldDecorator }, options, initials, curd, intl } = this.props

    const selectOptions = _.map(this.state.serverStatus, (val, key) => {
      return (
        <Option value={key} key={key}>{val}</Option>
      )
    })

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            {
              _.has(curd, '20303')
              ?
                <div>
                  <Col className='gutter-row' span={5}>
                    <CentraProductCascader getFieldDecorator={getFieldDecorator} options={options.products} />
                  </Col>
                  <Col className='gutter-row' span={5}>
                    <div style={{ display: 'inline-block', width: '85%' }}>
                      {getFieldDecorator('status', {
                        rules: [{ required: false, message: intl.formatMessage(message.status_input) }]
                      })(
                        <Select
                          placeholder={intl.formatMessage(message.status_input)}
                          showSearch
                          allowClear
                        >
                          {selectOptions}
                        </Select>
                      )}
                    </div>
                  </Col>
                  <Col className='gutter-row' span={2}>
                    <Button type='primary' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                  </Col>
                </div>
              :
                ''
            }

            {
              _.has(curd, '20301')
              ?
                <Col className='gutter-row' span={2}>
                  <Button type='ghost' onClick={this.handleCreateServer}>{intl.formatMessage(message.add)}</Button>
                </Col>
              :
                ''
            }

            {
              _.has(curd, '20304')
              ?
                <Col className='gutter-row' span={2}>
                  <Button type='ghost' onClick={this.handleBatchServer}>{intl.formatMessage(message.main)}</Button>
                </Col>
              :
                ''
            }
          </Row>
        </Form>

        <Modal
          width={1000}
          maskClosable={false}
          key={Math.random()}
          title={intl.formatMessage(message.add)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <ServerModal
            intl={intl}
            options={options}
            initials={initials}
            data={this.props.data}
            onCreate={this.props.onCreate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
            onRender={this.props.onRender}
          />
        </Modal>

        <Modal
          width={1000}
          maskClosable={false}
          key={Math.random()}
          title={intl.formatMessage(message.main)}
          visible={this.state.batchVisible}
          onCancel={this.handleBatchCancel}
          footer={null}
        >
          <BatchModal
            intl={intl}
            options={options}
            initials={initials}
            onSwitch={this.props.onSwitch}
            onSubmitting={this.handleBatchCancel}
          />
        </Modal>
      </div>
    )
  }
}

ServerFilter.propTypes = {
  intl: PropTypes.object,
  curd: PropTypes.object,
  data: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.object,
  initials: PropTypes.object,
  onCreate: PropTypes.func,
  onSearch: PropTypes.func,
  onSwitch: PropTypes.func,
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
      },
      status: {
        ...props.status
      }
    }
  },
  onValuesChange(_, values) {
  }
})(ServerFilter)

export default Filter
