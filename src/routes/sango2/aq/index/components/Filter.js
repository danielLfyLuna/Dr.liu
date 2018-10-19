import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Row, Col, Button, Input, Modal} from 'antd'
import {Link} from 'react-router'
import _ from 'lodash'

import Add from './Add'

class AQSwitch extends Component {
  static propTypes = {
    form: PropTypes.object,
    curd: PropTypes.object,
    onSearch: PropTypes.func,
    onAdd: PropTypes.func
  };

  state = {
    visible: false
  };

  handleVisible = e => {
    this.setState({
      visible: true
    })
  };

  handleCancel = e => {
    this.setState({
      visible: false
    })
  };

  handleSearch = e => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        if (!fieldsValue.question) {
          fieldsValue.question = ''
        }
        this.props.onSearch(fieldsValue)
      }
    })
  };

  render() {
    const {form: {getFieldDecorator}, curd} = this.props

    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }
    const TwoColProps = {
      ...ColProps,
      xl: 96
    }
    // const rangeConfig = {
    //   rules: [{ type: 'array', required: false, message: '请选择起止日期' }],
    //   initialValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss').subtract({days: -1})]
    // }

    return (
      <div>
        <Form className='ant-advanced-search-form' onSubmit={this.handleSearch}>
          {_.has(curd, '180101')
            ? <Row gutter={20}>
              <Col {...ColProps} xl={{span: 5}} md={{span: 6}}>
                {getFieldDecorator('question', {
                    rules: [{required: false, message: '请输入问题'}]
                  })(<Input placeholder='请输入问题' />)}
              </Col>
            </Row>
            : ''}
          <Row gutter={20}>
            <Col
              {...TwoColProps}
              xl={{span: 3}}
              md={{span: 24}}
              sm={{span: 24}}
            >
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {_.has(curd, '180101')
                  ? <div>
                    <Button
                      type='primary'
                      className='margin-right'
                      htmlType='submit'
                      >
                        查询
                      </Button>
                  </div>
                  : ''}
                {_.has(curd, '180102')
                  ? <div>
                    <Button
                      type='danger'
                      onClick={this.handleVisible}
                      style={{marginLeft: '5px'}}
                      >
                        新建
                      </Button>
                  </div>
                  : ''}
                {_.has(curd, '180105')
                  ? <div>
                    <Link to={{pathname: '/sango2/answerQuestion/switch'}}>
                      <Button type='danger' style={{marginLeft: '5px'}}>
                          开关
                        </Button>
                    </Link>
                  </div>
                  : ''}
                {/* <div>
                  <Link to={{pathname: '/sango2/answerQuestion/editor'}}>
                    <Button type='danger' style={{marginLeft: '5px'}}>
                      测试
                    </Button>
                  </Link>
                </div> */}
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={1000}
          maskClosable={false}
          title='新建问答'
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <Add handleCancel={this.handleCancel} onAdd={this.props.onAdd} />
        </Modal>
      </div>
    )
  }
}

const Switch = Form.create()(AQSwitch)

export default Switch
