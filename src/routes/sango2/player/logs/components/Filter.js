import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Icon, Row, Col, Cascader, Input } from 'antd'
import _ from 'lodash'

class PlayerLogsFilter extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    options: PropTypes.array,
    form: PropTypes.object,
    onDump: PropTypes.func,
    onPull: PropTypes.func,
    onGet: PropTypes.func
  }

  state={
    btn: null
  }

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      console.log(this.state.btn)
      if (!err) {
        if (this.state.btn === 'dump') {
          this.props.onDump(fieldsValue)
        }
        if (this.state.btn === 'pull') {
          this.props.onPull(fieldsValue)
        }
        if (this.state.btn === 'get') {
          this.props.onGet(fieldsValue)
        }
      }
    })
  }

  clickDump = () => {
    this.setState({
      btn: 'dump'
    })
  }

  clickPull = () => {
    this.setState({
      btn: 'pull'
    })
  }

  clickGet = () => {
    this.setState({
      btn: 'get'
    })
  }

  render() {
    const { form: {getFieldDecorator}, curd } = this.props

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
        <Form onSubmit={this.handleSearch} >
          {/* <Row gutter={10} style={{marginBottom: '5px'}}>
            <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
              <Tag>
                实时客户端日志拉取
              </Tag>
            </Col>
          </Row> */}
          <Row gutter={10}>
            <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
              {getFieldDecorator('products', {
                rules: [{ required: true, message: '请选择产品与服务器(必选)' }]
              })(
                <Cascader
                  style={{ width: '100%' }}
                  options={this.props.options}
                  placeholder='请选择产品与服务器(必选)'
                  showSearch
                  expandTrigger='hover'
                />
              )}
            </Col>
            <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
              {getFieldDecorator('nickname', {
                rules: [{
                  required: true, message: '必填!'
                }]
              })(
                <Input
                  placeholder='请输入玩家昵称(必填)'
                />
              )}
            </Col>
            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{marginRight: '24px'}}>
                  {
                    _.has(curd, '70402')
                    ?
                      <Button type='primary' className='margin-right' htmlType='submit' onClick={this.clickDump}><Icon type='search' />Dump View</Button>
                    :
                      ''
                  }
                </div>
                <div style={{marginRight: '24px'}}>
                  {
                    _.has(curd, '70403')
                    ?
                      <Button type='primary' className='margin-right' htmlType='submit' onClick={this.clickPull}><Icon type='search' />拉取</Button>
                    :
                      ''
                  }
                </div>
                <div style={{marginRight: '24px'}}>
                  {
                    _.has(curd, '70404')
                    ?
                      <Button type='danger' className='margin-right' htmlType='submit' onClick={this.clickGet}><Icon type='search' />查询</Button>
                    :
                      ''
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const Filter = Form.create()(PlayerLogsFilter)

export default Filter
