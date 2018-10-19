import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Cascader, DatePicker, Modal } from 'antd'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


class MergeFilter extends Component {

  state = {
    pro: '',
    period: '',
    visible: false
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let val = {
          productId: values.productId[0]
        }
        if (values.times) {
          val.period = values.times.format('YYYY-MM-DD')
        } else {
          val.period = ''
        }

        this.setState({
          pro: val.productId[0],
          period: val.period
        })
        this.props.onSearch(val)
      }
    })
  }

  onVisible = () => {
    if (this.props.headImage.list.length === 0) { return }
    this.setState({
      visible: true
    })
  }

  onUnvisible = () => {
    this.setState({
      visible: false
    })
  }

  onPass = () => {
    this.props.passHeadImage({
      productId: this.state.pro,
      period: this.state.period
    })
    this.onUnvisible()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { options, curd } = this.props
    let proOptions = []
    _.map(options, (v, i) => {
      proOptions.push({
        label: v.label,
        value: v.value
      })
    })

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          <Row gutter={20} style={{ marginBottom: 6 }}>

            <Col className='gutter-row' span={6}>
              {getFieldDecorator('productId', {
                rules: [{ required: true, message: '请选择产品(必选)' }]
              })(
                <Cascader
                  popupClassName='cascaderMenu'
                  showSearch
                  options={proOptions}
                  placeholder='请选择产品(必选)'
                  expandTrigger='hover'
                />
              )}
            </Col>

            <Col className='gutter-row' span={4}>
              {getFieldDecorator('times', {
                rules: [{ required: false, message: '请选择日期(可选)' }]
              })(
                <DatePicker
                  allowClear
                  placeholder='请选择日期(可选)'
                />
              )}
            </Col>
            {
              _.has(curd, 70901) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' htmlType='submit'>查询</Button>
              </Col>
            }
            {
              _.has(curd, 70903) &&
              <Col className='gutter-row' span={2}>
                <Button type='primary' onClick={this.onVisible}>全部通过</Button>
              </Col>
            }
          </Row>
        </Form>
        <Modal
          title='全部通过头像'
          visible={this.state.visible}
          onOk={this.onPass}
          onCancel={this.onUnvisible}
          maskClosable={false}
          closable={false}
        >
          <p>确认全部通过吗？</p>
          <p style={{color: 'red'}}>建议查验完毕所有头像后，再点击“全部通过”，否则这些头像将被清理出缓存，无法再次查看，请谨慎操作。</p>
        </Modal>
      </div>
    )
  }
}

MergeFilter.propTypes = {
  headImage: PropTypes.object,
  options: PropTypes.array,
  form: PropTypes.object,
  curd: PropTypes.object,
  onSearch: PropTypes.func,
  passHeadImage: PropTypes.func
}

const Filter = Form.create()(MergeFilter)

export default Filter
