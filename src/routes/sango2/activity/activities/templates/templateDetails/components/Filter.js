import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Form, Row, Col, Input, DatePicker, Button, Tooltip, Icon, Modal } from 'antd'

const { RangePicker } = DatePicker


class TemplateFilter extends Component {

  state = {
    visible: false,
    time: ''
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let val = {
          productId: '_',
          serverId: '_',
          params: {
            startTime: values.time[0].format('YYYY-MM-DD HH:mm:ss'),
            endTime: values.time[1].format('YYYY-MM-DD HH:mm:ss'),
            templateId: values.templateId ? values.templateId : 0
          }
        }
        this.props.onSearch(val)
      }
    })
  }

  handleVisible = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    this.props.onSync({
      productId: '_',
      serverId: '_',
      params: {
        syncTime: this.state.time,
        groupIdList: this.props.options.keys
      }
    })
    this.setState({
      visible: false
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  change = (v) => {
    this.setState({
      time: v ? v.format('YYYY-MM-DD HH:mm:ss') : ''
    })
  }

  render() {
    const { form: { getFieldDecorator }, options } = this.props

    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row gutter={2} style={{ marginBottom: 6 }}>
            <Col className='gutter-row' span={7}>
              {getFieldDecorator('time', {
                rules: [{
                  required: true
                }]
              })(
                <RangePicker
                  showTime={{ defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')] }}
                  format='YYYY-MM-DD HH:mm:ss'
                />
              )}
            </Col>
            <Col className='gutter-row' span={6}>
              {getFieldDecorator('templateId', {
                rules: [{
                  required: false
                }]
              })(
                <Input
                  placeholder='请输入模板ID'
                />
              )}
            </Col>
            {
              options.authorize.includes(90112) &&
              <Col className='gutter-row' span={4}>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ marginLeft: 16 }}
                >
                  查询
                </Button>
              </Col>
            }
            {
              options.authorize.includes(90114) &&
              <Col className='gutter-row' span={4}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                  }}
                >
                  <Button
                    onClick={this.handleVisible}
                    type='danger'
                    disabled={!options.keys.length}
                    style={{ marginRight: 5 }}
                  >
                    同步
                  </Button>
                  <Tooltip title='请先选择您想要同步的活动，然后点击同步按钮' >
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </div>
              </Col>
            }
          </Row>
        </Form>
        <Modal
          title='确认要同步这些活动吗?'
          visible={this.state.visible}
          maskClosable={false}
          destroyOnClose
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            options.keys.length && <p>共 {options.keys.length} 条:</p>
          }
          <div style={{
            maxHeight: '200px',
            overflow: 'scroll'
          }}>
            {
              options.keys.map((v, i) => {
                return <p key={i}>{v}</p>
              })
            }
          </div>
          <div style={{
            background: '#e8e8e8',
            display: 'block',
            height: '1px',
            width: '100%',
            margin: '10px 0',
            clear: 'both',
            verticalAlign: 'middle'
          }} />
          <div style={{ textAlign: 'center', marginTop: '5px' }}>
            定时开启时间:&nbsp;&nbsp;
            <DatePicker
              showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
              format='YYYY-MM-DD HH:mm:ss'
              placeholder='空选立即生效'
              onChange={this.change}
            />
          </div>
        </Modal>
      </div>
    )
  }
}

TemplateFilter.propTypes = {
  form: PropTypes.object,
  options: PropTypes.object,
  onSearch: PropTypes.func,
  onSync: PropTypes.func
}

const Filter = Form.create()(TemplateFilter)

export default Filter
