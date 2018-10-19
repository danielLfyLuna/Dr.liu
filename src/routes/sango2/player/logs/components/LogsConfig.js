import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Cascader, Button, Icon, Modal } from 'antd'

// const FormItem = Form.Item
import LogsConfigModule from './LogsConfigModule'

class PlayerLogsPage extends Component {

  static propTypes = {
    clearLogsConfig: PropTypes.func,
    options: PropTypes.array,
    onSearch: PropTypes.func,
    onUpdate: PropTypes.func,
    form: PropTypes.object,
    data: PropTypes.object,
    iniVisit: PropTypes.bool
  }

  state = {
    visible: false,
    products: []
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.onSearch(fieldsValue)
        this.setState({
          products: fieldsValue.products
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.iniVisit)
    this.setState({
      visible: nextProps.iniVisit
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
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
        <Form onSubmit={this.handleSearch}>
          {/* <Row gutter={10} style={{marginBottom: '5px'}}>
            <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
              <Tag>
                按模块设置log等级
              </Tag>
            </Col>
          </Row> */}
          <Row gutter={10}>
            <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
              {getFieldDecorator('products', {
                rules: [{
                  required: true, message: '必填!'
                }]
              })(
                <Cascader
                  placeholder='请选择产品与服务器(必选)'
                  options={this.props.options}
                  expandTrigger='hover'
                  showSearch
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
                <div>
                  <Button type='primary' className='margin-right' htmlType='submit'><Icon type='search' />查询</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title='按模块设置log等级'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <LogsConfigModule
            products={this.state.products}
            onUpdate={this.props.onUpdate}
            onCreate={this.handleOk}
            data={this.props.data}
            clearLogsConfig={this.props.clearLogsConfig}
          />
        </Modal>
      </div>
    )

  }
}

const logsConfig = Form.create()(PlayerLogsPage)

export default logsConfig
