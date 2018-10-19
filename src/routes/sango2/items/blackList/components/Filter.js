import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Spin, Form, Button, Cascader, Radio } from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group

// import DialogContainer from '../containers/DialogContainer'

// import NoviceModal from './NoviceModal'


export class AdvancedSearchForm extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    // options: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fetchItem: PropTypes.func.isRequired,
    debounce: PropTypes.bool
  }

  plainOptions = [
    { label: '道具', value: 0 },
    { label: '技能', value: 4 },
    { label: '武将', value: 5 }
  ]

  onSubmit = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.onSubmit(fieldsValue)
      }
    })
  }

  onChange = (e) => {
    const {fetchItem} = this.props
    fetchItem({0: '_'}, e.target.value)
    this.setState({
      loading: true
    })
  }

  _itemReduce = (options) => {
    return _.reduce(options, (result, option, key) => {
      result.push({ value: _.toNumber(key), label: `${option}(${key})` })
      return result
    }, [])
  }

  render() {
    const { form: {getFieldDecorator}, debounce, items: {data, fetching} } = this.props

    // 道具下拉
    let itemOPt = this._itemReduce(data)

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
      <Spin
        tip='获取道具列表。。。'
        spinning={fetching}
      >
        <Form onSubmit={this.onSubmit}>
          {/* <FormItem
            {...formItemLayout}
            label='产品/服务器'
          >
            {getFieldDecorator('products', {
              initialValue: initialFiler[0] ? [initialFiler[0], initialFiler[1]] : []
            })(
              <Cascader
                showSearch
                placeholder='请选择产品与服务器(必选)'
                options={options}
                expandTrigger='hover'
              />
            )}
          </FormItem> */}

          <FormItem
            {...formItemLayout}
            label='道具类型'
          >
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '必填!' }]
            })(
              <RadioGroup
                onChange={this.onChange}
                options={this.plainOptions}
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='道具列表'
          >
            {getFieldDecorator('itemList', {
              rules: [{ required: true, message: '必填!' }]
            })(
              <Cascader
                showSearch
                placeholder='请选择道具(必选)'
                options={itemOPt}
                expandTrigger='hover'
              />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button
              type='primary'
              htmlType='submit'
              icon='sync'
              loading={debounce}
              size='large'
            >
              添加到黑名单
            </Button>
          </FormItem>
        </Form>
      </Spin>
    )
  }

  // 初始化
  componentWillMount() {
    // console.log('componentWillMount--')
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
      },
      type: {
        ...props.type
      },
      itemList: {
        ...props.itemList
      }
    }
  },
  // 任一表单域的值发生改变时的回调
  onValuesChange(_, values) {
    console.log('Form.create.onValuesChange', values)
  }
})(AdvancedSearchForm)

export default Filter
