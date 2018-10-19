import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Icon, Row, Col } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item

class Filter extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    curd: PropTypes.object.isRequired,
    form: PropTypes.object
  }

  _handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSearch(values)
      }
    })
  }


  render() {
    const {getFieldDecorator} = this.props.form
    const {curd} = this.props

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

    return (
      <div>
        <Form onSubmit={this._handleSubmit}>
          {
            _.has(curd, '170101')
            ?
              <Row gutter={10}>
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 6 }}>
                  <FormItem>
                    {getFieldDecorator('nickname', {
                      rules: [{ required: false, message: '请输入昵称' }],
                      initialValue: ''
                    })(
                      <Input placeholder='请输入昵称' />
                    )}
                  </FormItem>
                </Col>
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 6 }}>
                  <FormItem>
                    {getFieldDecorator('playerId', {
                      rules: [{ required: false, message: '请输入玩家ID' }],
                      initialValue: ''
                    })(
                      <Input placeholder='请输入玩家ID' />
                    )}
                  </FormItem>
                </Col>
                <Col {...ColProps} xl={{ span: 3 }} md={{ span: 6 }}>
                  <FormItem>
                    {getFieldDecorator('platformId', {
                      rules: [{ required: false, message: '请输入平台ID' }],
                      initialValue: ''
                    })(
                      <Input placeholder='请输入平台ID' />
                    )}
                  </FormItem>
                </Col>
                <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit'><Icon type='search' />查询</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            :
              ''
          }
        </Form>
      </div>
    )
  }
}

const GlobalPlayer = Form.create()(Filter)
export default GlobalPlayer
