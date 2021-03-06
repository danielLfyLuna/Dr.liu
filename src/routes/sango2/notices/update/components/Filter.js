import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Cascader, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'
import ModalContainer from './../containers/ModalContainer'

const message = defineMessages({
  product: {
    id: 'FORM.PRODUCTS/SERVERS_REQUIRED_INPUT',
    defaultMessage: '请选择产品与服务器(必选)'
  },
  get: {
    id: 'BUTTON.GET',
    defaultMessage: '查询'
  },
  add: {
    id: 'BUTTON.ADD',
    defaultMessage: '新建'
  }
})


export class NoticesUpdateFilter extends Component {

  static propTypes = {
    intl: PropTypes.object,
    curd: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    initialFiler: PropTypes.object
  }

  state = {
    currentItem: {},
    modalType: 'create',
    visible: false
  }

  handleAddNotice = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
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
      }
    })
  }

  onModalLoad = () => {
    return this.state
  }

  onUpdate = () => {}

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
          onSubmit={this.handleSearch}
        >
          <Row gutter={20}>
            {
              _.has(curd, '60303')
              ?
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('products', {
                    initialValue: initialFiler.value ? [this.props.initialFiler.value[0], this.props.initialFiler.value[1]] : [],
                    rules: [{ required: true, message: intl.formatMessage(message.product) }]
                  })(
                    <Cascader
                      showSearch
                      options={this.props.options}
                      placeholder={intl.formatMessage(message.product)}
                      expandTrigger='hover'
                    />
                  )}
                </Col>
              :
                ''
            }

            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  {
                    _.has(curd, '60303')
                    ?
                      <Button type='primary' className='margin-right' htmlType='submit'>{intl.formatMessage(message.get)}</Button>
                    :
                      ''
                  }
                </div>
                <div>
                  {
                    _.has(curd, '60301')
                    ?
                      <Button type='ghost' onClick={this.handleAddNotice}>{intl.formatMessage(message.add)}</Button>
                    :
                      ''
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={700}
          key={Math.random()}
          title='写公告'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <ModalContainer
            options={this.props.options}
            onUpdate={this.onUpdate}
            onModalLoad={this.onModalLoad}
            onSubmitting={this.handleCancel}
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
      'products': {
        ...props.products
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {
    console.log('Form.create.onValuesChange', values)
  }
})(NoticesUpdateFilter)

export default Filter
