import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Input, Button, Cascader } from 'antd'
// import DialogContainer from '../containers/DialogContainer'

export class WeaponFilter extends Component {

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (!values.products.length) return
        this.props.onSearch({
          path: {
            products: values.products
          },
          params: {
            playerId: values.playerId || '',
            nickname: values.nickname || ''
          }
        })
      }
    })
  }

  render() {
    const { form: {getFieldDecorator}, options: { products, login } } = this.props

    return (
      <div>
        <Form layout='inline' onSubmit={this.handleSearch}>
          {
            _.has(login.curd, '71101') &&
            <Row gutter={20} style={{ marginBottom: 8 }}>
              <Col className='gutter-row' span={6}>
                {getFieldDecorator('products', {
                  rules: [{ required: true, message: '必填!' }]
                })(
                  <Cascader
                    placeholder='请选择产品与服务器(必选)'
                    options={products.options}
                    expandTrigger='hover'
                    showSearch
                  />
                )}
              </Col>
              <Col className='gutter-row' span={5}>
                {getFieldDecorator('nickname')(
                  <Input placeholder='玩家昵称' />
                )}
              </Col>
              <Col className='gutter-row' span={4}>
                {getFieldDecorator('playerId')(
                  <Input placeholder='玩家ID' />
                )}
              </Col>
              <Col className='gutter-row' span={4}>
                <Button type='primary' htmlType='submit'>查询</Button>
              </Col>
            </Row>
          }
        </Form>
      </div>
    )
  }
}

WeaponFilter.propTypes = {
  options: PropTypes.object,
  form: PropTypes.object,
  onSearch: PropTypes.func
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
        ...props.nickname,
        value: props.nickname.value
      },
      playerId: {
        ...props.playerId,
        value: props.playerId.value
      },
      products: {
        ...props.products,
        value: props.products.value
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {}
})(WeaponFilter)

export default Filter
