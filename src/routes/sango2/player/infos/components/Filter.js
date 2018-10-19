import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, InputNumber, Button, Cascader, Modal } from 'antd'
import _ from 'lodash'
import { defineMessages } from 'react-intl'

import NoviceModal from './NoviceModal'

const message = defineMessages({
  products: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品/服务器(必选)'
  },
  nickname: {
    id: 'FORM.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  playerId: {
    id: 'FORM.PLAYERID',
    defaultMessage: '玩家ID'
  },
  platformId: {
    id: 'FORM.PLATFORMID',
    defaultMessage: '平台ID'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  skip: {
    id: 'BUTTON.SKIP',
    defaultMessage: '批量跳过新手'
  }
})


export class AdvancedSearchForm extends Component {

  static propTypes = {
    intl: PropTypes.object,
    curd: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    handleNovice: PropTypes.func.isRequired,
    initialFiler: PropTypes.object
  }

  state = {
    visible: false
  }

  handleRevise = () => {
    this.setState({
      visible: true
    })
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

  onSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.onSearch(fieldsValue)
      }
    })
  }

  render() {
    const { form: {getFieldDecorator}, initialFiler, curd, intl } = this.props
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
          onSubmit={this.onSearch}
        >
          <Row gutter={20}>
            {
              _.has(curd, '70101')
              ?
                <div>
                  <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }}>
                    {getFieldDecorator('products', {
                      initialValue: initialFiler.value ? [this.props.initialFiler.value[0], this.props.initialFiler.value[1]] : [],
                      rules: [{ required: true, message: '必填!' }]
                    })(
                      <Cascader
                        popupClassName='cascaderMenu'
                        placeholder={intl.formatMessage(message.products)}
                        options={this.props.options}
                        expandTrigger='hover'
                        showSearch
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                    {getFieldDecorator('nickname')(
                      <Input placeholder={intl.formatMessage(message.nickname)} />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                    {getFieldDecorator('playerId')(
                      <InputNumber min={0} placeholder={intl.formatMessage(message.playerId)} style={{width: '100%'}} />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                    {getFieldDecorator('platformId')(
                      <Input placeholder={intl.formatMessage(message.platformId)} />
                    )}
                  </Col>
                </div>
              :
                ''
            }
            <Col {...TwoColProps} xl={{ span: 4 }} md={{ span: 4 }}>
              {
                _.has(curd, '70101')
                ?
                  <Button type='primary' className='margin-right' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                :
                  ''
              }

              {
                _.has(curd, '70102')
                ?
                  <Button type='danger' className='margin-right' style={{marginLeft: 20}} onClick={this.handleRevise}>{intl.formatMessage(message.skip)}</Button>
                :
                  ''
              }
            </Col>
          </Row>
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title={intl.formatMessage(message.skip)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <NoviceModal
            intl={this.props.intl}
            onCreate={this.handleOk}
            options={this.props.options}
            handleNovice={this.props.handleNovice}
          />
        </Modal>
      </div>
    )
  }
}

const Filter = Form.create({
  // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  // 把 props 转为对应的值，可用于把 Redux store 中的值读出 {...this.state.fields}
  mapPropsToFields(props) {
    return {
      nickname: {
        ...props.nickname
      },
      playerId: {
        ...props.playerId
      },
      platformId: {
        ...props.platformId
      },
      'products': {
        ...props.products
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {
    console.log('Form.create.onValuesChange', values)
  }
})(AdvancedSearchForm)

export default Filter
