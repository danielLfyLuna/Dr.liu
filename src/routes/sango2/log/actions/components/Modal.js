import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, Row, Col, TreeSelect, Cascader, DatePicker } from 'antd'
import _ from 'lodash'

const FormItem = Form.Item


class LogActionsModal extends Component {

  static propTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
    onRender: PropTypes.func.isRequired,
    fetchOperationType: PropTypes.func.isRequired,
    fetchConsumeSources: PropTypes.func.isRequired,
    fetchProduceSources: PropTypes.func.isRequired,
    action: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired
  }

  state = {
    productNum: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
        this.props.onCreate()
      }
    })
  }

  handleProductSelect = (value) => {
    this.setState({
      productNum: value
    })
  }

  onChange = () => {
    this.props.fetchOperationType()
    this.props.fetchConsumeSources()
    this.props.fetchProduceSources()
  }

  componentWillMount() {
    this.props.onRender({ renderState: true })
  }

  componentWillUnmount() {
    this.props.onRender({ renderState: false })
  }

  render() {
    const {getFieldDecorator, getFieldError, isFieldTouched} = this.props.form
    const {operationType, consumeSources, produceSources} = this.props.action


    const nicknameError = isFieldTouched('nickname') && getFieldError('nickname')
    const playerIdError = isFieldTouched('playerId') && getFieldError('playerId')

    // 服务下拉
    const productId = []
    const serverId = []
    let productIndex = 0
    _.map(this.props.options, (value, index) => {
      if (value.value == this.state.productNum) {
        productIndex = index
      }
      productId.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })
    _.map(this.props.options[productIndex].children, (value, index) => {
      serverId.push(
        <Option key={value.value} value={value.value}>{value.label}</Option>
      )
    })

    // 菜单下拉
    let operationValue = []
    let consumeValue = []
    let produceValue = []
    for (let key in operationType) {
      operationValue.push({value: operationType[key], key: key, label: `${key}(${operationType[key]})`})
    }

    for (let key in consumeSources) {
      consumeValue.push({value: consumeSources[key], key: key, label: `${key}(${consumeSources[key]})`})
    }

    for (let key in produceSources) {
      produceValue.push({value: produceSources[key], key: key, label: `${key}(${produceSources[key]})`})
    }

    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label='产品名称'>
          { getFieldDecorator('products', {
            rules: [{ required: true, message: '请选择产品与服务器(必选)' }]
          })(
            <Cascader
              style={{ width: '100%' }}
              options={this.props.options}
              placeholder='请选择产品与服务器(必选)'
              onChange={this.onChange}
              showSearch
              expandTrigger='hover'
            />
          )}
        </FormItem>
        <Row gutter={40}>
          <Col {...ColProps} xl={{ span: 10 }} md={{ span: 8 }}>
            <FormItem label='开始时间'>
              {getFieldDecorator('startTime', {
                rules: [{ type: 'object', required: true, message: '请选择时间' }]
              })(
                <DatePicker format='YYYY-MM-DD' />
              )}
            </FormItem>
          </Col>
          <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
            <FormItem
              validateStatus={nicknameError ? 'error' : ''}
              help={nicknameError || ''}
              label='玩家昵称'
            >
              { getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入玩家昵称' }]
              })(
                <Input placeholder='玩家昵称' />
              )}
            </FormItem>
          </Col>
          <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }}>
            <FormItem
              validateStatus={playerIdError ? 'error' : ''}
              help={playerIdError || ''}
              label='玩家ID'
            >
              { getFieldDecorator('playerId', {
                rules: [{ required: false, message: '请输入玩家ID' }],
                initialValue: ''
              })(
                <Input placeholder='玩家ID' />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label='生产来源'
        >
          { getFieldDecorator('produceSources', {
            rules: [{ required: false, message: '请输入生产来源' }],
            initialValue: []
          })(
            <TreeSelect
              treeData={[{
                label: '全选',
                value: null,
                key: '全选',
                children: [...produceValue]
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              searchPlaceholder='请选择生产来源'
              dropdownStyle={{height: 300}}
            />
          )}
        </FormItem>
        <FormItem
          label='操作来源'
        >
          { getFieldDecorator('operationType', {
            rules: [{ required: false, message: '请输入操作来源' }],
            initialValue: []
          })(
            <TreeSelect
              treeData={[{
                label: '全选',
                value: null,
                key: '全选',
                children: [...operationValue]
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              searchPlaceholder='请选择操作来源'
            />
          )}
        </FormItem>
        <FormItem
          label='消耗来源'
        >
          { getFieldDecorator('consumeSources', {
            rules: [{ required: false, message: '请输入消耗来源' }],
            initialValue: []
          })(
            <TreeSelect
              treeData={[{
                label: '全选',
                value: null,
                key: '全选',
                children: [...consumeValue]
              }]}
              showSearch
              allowClear
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp='label'
              showCheckedStrategy={TreeSelect.SHOW_ALL}
              searchPlaceholder='请选择消耗来源'
            />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' >提交</Button>
        </FormItem>
      </Form>
    )
  }
}

const ExportModal = Form.create()(LogActionsModal)

export default ExportModal
