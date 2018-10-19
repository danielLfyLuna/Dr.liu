import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, DatePicker, Icon, Modal } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import Modals from './Modal'

const RangePicker = DatePicker.RangePicker
const ButtonGroup = Button.Group

class RechargeFilter extends Component {
  state = {
    visible: false
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSearch({
          startTime: values.time[0].format('YYYY-MM-DD HH:mm:ss'),
          endTime: values.time[1].format('YYYY-MM-DD HH:mm:ss')
        })
      }
    })
  }

  handleVisible = () => {
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
    const { form: { getFieldDecorator }, login: { curd } } = this.props
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择起止时间!' }],
      initialValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss').subtract({days: -1})]
    }

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={16} style={{ marginBottom: 6 }}>
            <Col className='gutter-row' span={6}>
              {getFieldDecorator('time', rangeConfig)(
                <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
              )}
            </Col>
            <Col className='gutter-row' span={6}>
              <ButtonGroup>
                {
                  _.has(curd, '40401') && <Button type='primary' htmlType='submit'><Icon type='search' />查询</Button>
                }
                {
                  _.has(curd, '40402') && <Button type='primary' onClick={this.handleVisible}><Icon type='download' />导出</Button>
                }
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
        <Modal
          width={800}
          key={Math.random()}
          title='导出充值日志'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <Modals
            handleCancel={this.handleCancel}
            onExport={this.props.onExport}
          />
        </Modal>
      </div>
    )
  }
}

RechargeFilter.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  onSearch: PropTypes.func,
  onExport: PropTypes.func
}

const Filter = Form.create()(RechargeFilter)

export default Filter
