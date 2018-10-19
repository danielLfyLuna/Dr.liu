import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Cascader, Input, Tooltip, Icon, message } from 'antd'
import _ from 'lodash'

class NicknameFilter extends Component {

  static propTypes = {
    form: PropTypes.object,
    curd: PropTypes.object,
    options: PropTypes.array,
    onSearch: PropTypes.func
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        if ((!fieldsValue.nickname) && (!fieldsValue.playerId)) {
          message.warning('玩家昵称 和 玩家ID 必须选填至少一项!')
          return
        }
        let value = {
          productId: fieldsValue.products[0],
          serverId: fieldsValue.products[1],
          list: {}
        }
        if (fieldsValue.nickname) {
          value.list.nickname = fieldsValue.nickname
        }
        if (fieldsValue.playerId) {
          value.list.playerId = fieldsValue.playerId
        }
        this.props.onSearch(value)
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, curd } = this.props

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
        <Form
          className='ant-advanced-search-form'
          onSubmit={this.handleSearch}
        >
          {
            _.has(curd, '71001')
            ?
              <div>
                <Row gutter={20}>
                  <Col {...ColProps} xl={{ span: 10 }} md={{ span: 24 }}>
                    {getFieldDecorator('products', {
                      rules: [{ required: true, message: '请选择产品/服务器' }]
                    })(
                      <Cascader
                        showSearch
                        options={this.props.options}
                        placeholder='请选择产品/服务器(必填)'
                        expandTrigger='hover'
                        popupClassName='cascaderMenu'
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
                    {getFieldDecorator('nickname', {
                      rules: [{ required: false, message: '请填写玩家昵称', whitespace: true }]
                    })(
                      <Input placeholder='请填写玩家昵称' />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
                    {getFieldDecorator('playerId', {
                      rules: [{ required: false, message: '请填写玩家ID', whitespace: true }]
                    })(
                      <Input placeholder='请填写玩家ID' />
                    )}
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <Tooltip title='玩家昵称和玩家ID至少填写一个才能查询，同时填写时以玩家ID查询' >
                          <Icon style={{marginRight: '5px'}} type='question-circle-o' />
                        </Tooltip>
                        <Button type='primary' className='margin-right' htmlType='submit'>查询</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            :
              ''
          }
        </Form>

      </div>
    )
  }
}

const Filter = Form.create()(NicknameFilter)

export default Filter
