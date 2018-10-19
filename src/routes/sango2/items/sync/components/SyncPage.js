import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Card, Button, Cascader } from 'antd'
const FormItem = Form.Item

export class SyncPage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    sync: PropTypes.object,
    fetchSync: PropTypes.func.isRequired,
    keepSync: PropTypes.func.isRequired
  }

  state = {
    fields: {
      'products': this.props.sync.keeping
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { form: {validateFields}, fetchSync } = this.props

    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    validateFields((err, fieldsValue) => {
      if (!err) {
        fetchSync(fieldsValue)
      }
    })
  }

  onChange = (value) => {
    this.setState({
      fields: {
        'products': value
      }
    })
  }

  render() {
    const { login: {curd}, form: {getFieldDecorator}, sync: {fetching, keeping}, products: {options} } = this.props
    console.log('render--', fetching, this.state.fields.products, keeping)

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }
    return (
      <div>
        <Card title='同步道具列表' style={{marginBottom: 6}}>
          {
            _.has(curd, '120101')
            ?
              <Form onSubmit={this.onSubmit}>
                <FormItem
                  {...formItemLayout}
                  label='产品/服务器'
                >
                  {getFieldDecorator('products', {
                    initialValue: keeping[0] ? [keeping[0], keeping[1]] : [],
                    rules: [{ required: true, message: '必填!' }]
                  })(
                    <Cascader
                      showSearch
                      placeholder='请选择产品与服务器(必选)'
                      options={options}
                      expandTrigger='hover'
                      onChange={this.onChange}
                    />
                  )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button
                    type='primary'
                    htmlType='submit'
                    icon='sync'
                    loading={fetching}
                    size='large'
                  >
                    获取最新道具列表
                  </Button>
                </FormItem>
              </Form>
            :
              '无权限'
          }
        </Card>
      </div>
    )
  }

  // 初始化
  componentWillMount() {
    // console.log('componentWillMount--')
    this.props.fetchProductsMap()
  }
  componentDidMount() {
    // console.log('componentDidMount--')
  }

  // 进行中
  // previous
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps--', nextProps.sync.fetching)
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate--', nextProps.sync.fetching)
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate--', nextProps.sync.fetching)
  }

  // 销毁
  componentWillUnmount() {
    // console.log('componentWillUnmount--')
    this.props.keepSync(this.state.fields.products)
  }
}

const Sync = Form.create()(SyncPage)

export default Sync
