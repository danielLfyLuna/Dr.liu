import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Button, Input, Modal, Cascader, Icon, DatePicker, TreeSelect } from 'antd'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import ExportContainer from '../containers/ExportContainer'

const RangePicker = DatePicker.RangePicker

export class LogConsumesFilter extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    onRender: PropTypes.func,
    onSubmit: PropTypes.func,
    consume: PropTypes.object,
    initial: PropTypes.object,
    options: PropTypes.array,
    form: PropTypes.object,
    onSearch: PropTypes.func,
    item: PropTypes.object,
    getItems: PropTypes.func,
    consumeSources: PropTypes.func
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      itemId0: {
        value: []
      },
      itemId4: {
        value: []
      },
      itemId5: {
        value: []
      },
      'range-time-picker': {},
      'products': {},
      'consumeSourcesList': {
        value: []
      }
    },
    visible: false
  }

  // 双向数据绑定
  onChange = (fieldsValue) => {
    this.setState({
      fields: { ...this.state.fields, ...fieldsValue }
    })
  }

  handleExportLogConsumes = () => {
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

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        let itemIds = []
        if (fieldsValue.itemId0.length > 0) {
          itemIds = itemIds.concat(fieldsValue.itemId0)
        }
        if (fieldsValue.itemId4.length > 0) {
          itemIds = itemIds.concat(fieldsValue.itemId4)
        }
        if (fieldsValue.itemId5.length > 0) {
          itemIds = itemIds.concat(fieldsValue.itemId5)
        }

        fieldsValue.itemIds = itemIds.join(',')
        this.props.onSearch(fieldsValue)
      }
    })
  }

  // 道具下拉接口
  fetchItems = (fieldsValue) => {
    this.props.getItems(fieldsValue)
  }

  componentWillMount() {
    this.props.consumeSources()
    // 消耗来源
  }

  render() {
    const {curd} = this.props
    const {getFieldDecorator} = this.props.form
    let consumeSourceLists = []
    _.map(this.props.consume.consumeSources, (key, i) => {
      consumeSourceLists.push({value: key, label: `${i}(${key})`})
    })

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

    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择起止时间时间' }],
      initialValue: [moment(new Date(), 'YYYY-MM-DD HH:mm:ss'), moment()]
    }

    // 道具ID
    let items0 = []
    let items4 = []
    let items5 = []
    if (this.props.item.options[0]) {
      _.map(this.props.item.options[0], (value, key) => {
          items0.push(
            {value: key, key: key, label: `${value}(${key})`}
          )
      })
    }
    if (this.props.item.options[4]) {
      _.map(this.props.item.options[4], (value, key) => {
          items4.push(
            {value: key, key: key, label: `${value}(${key})`}
          )
      })
    }
    if (this.props.item.options[5]) {
      _.map(this.props.item.options[5], (value, key) => {
          items5.push(
            {value: key, key: key, label: `${value}(${key})`}
          )
      })
    }


    return (
      <div>
        <Form onSubmit={this.handleSearch} >
          <Row gutter={10}>
            {
              _.has(curd, '150201')
              ?
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 4 }}>
                  {getFieldDecorator('products', {
                    rules: [{ required: true, message: '请选择产品与服务器(必选)' }],
                    initialValue: this.props.initial.products ? this.props.initial.products : []
                  })(
                    <Cascader
                      options={this.props.options}
                      placeholder='请选择产品与服务器(必选)'
                      onChange={this.fetchItems}
                      showSearch
                      expandTrigger='hover'
                    />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150201')
              ?
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                  {getFieldDecorator('nickname', {
                    rules: [{ required: false, message: '请输入玩家昵称' }],
                    initialValue: ''
                  })(
                    <Input placeholder='玩家昵称' />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150201')
              ?
                <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                  {getFieldDecorator('playerId', {
                    rules: [{ required: false, message: '请输入玩家ID' }],
                    initialValue: ''
                  })(
                    <Input placeholder='玩家ID' />
                  )}
                </Col>
              :
                ''
            }
            {
              _.has(curd, '150201')
              ?
                <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                  {getFieldDecorator('range-time-picker', rangeConfig)(
                    <RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                  )}
                </Col>
              :
                ''
            }
            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  _.has(curd, '150201')
                  ?
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit'><Icon type='search' />查询</Button>
                    </div>
                  :
                    ''
                }
                {
                  _.has(curd, '150202')
                  ?
                    <div>
                      <Button type='ghost' onClick={this.handleExportLogConsumes}><Icon type='edit' />导出</Button>
                    </div>
                  :
                    ''
                }
              </div>
            </Col>
          </Row>
          {
            _.has(curd, '150201')
            ?
              <div>
                <Row gutter={10}>
                  <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                    {getFieldDecorator('itemId0', {
                      rules: [{ required: false, message: '请选择道具(请先选择产品)' }]
                    })(
                      // <Cascader
                      //   style={{ width: '100%' }}
                      //   options={items}
                      //   notFoundContent='无道具,请选择产品'
                      //   placeholder='道具列表'
                      //   showSearch
                      // />
                      <TreeSelect
                        treeData={[{
                          label: '全选',
                          value: null,
                          key: '全选',
                          children: [...items0]
                        }]}
                        showSearch
                        allowClear
                        treeDefaultExpandAll
                        multiple
                        treeCheckable
                        treeNodeFilterProp='label'
                        showCheckedStrategy={TreeSelect.SHOW_CHILD}
                        searchPlaceholder='道具列表(请先选择产品)'
                        dropdownStyle={{height: 300}}
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                    {getFieldDecorator('itemId4', {
                      rules: [{ required: false, message: '请选择技能(请先选择产品)' }]
                    })(
                      <TreeSelect
                        treeData={[{
                          label: '全选',
                          value: null,
                          key: '全选',
                          children: [...items4]
                        }]}
                        showSearch
                        allowClear
                        treeDefaultExpandAll
                        multiple
                        treeCheckable
                        treeNodeFilterProp='label'
                        showCheckedStrategy={TreeSelect.SHOW_CHILD}
                        searchPlaceholder='技能列表(请先选择产品)'
                        dropdownStyle={{height: 300}}
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 6 }} md={{ span: 6 }}>
                    {getFieldDecorator('itemId5', {
                      rules: [{ required: false, message: '请选择武将(请先选择产品)' }]
                    })(
                      <TreeSelect
                        treeData={[{
                          label: '全选',
                          value: null,
                          key: '全选',
                          children: [...items5]
                        }]}
                        showSearch
                        allowClear
                        treeDefaultExpandAll
                        multiple
                        treeCheckable
                        treeNodeFilterProp='label'
                        showCheckedStrategy={TreeSelect.SHOW_CHILD}
                        searchPlaceholder='武将列表(请先选择产品)'
                        dropdownStyle={{height: 300}}
                      />
                    )}
                  </Col>
                  <Col {...ColProps} xl={{ span: 4 }} md={{ span: 4 }}>
                    {getFieldDecorator('consumeSourcesList', {
                      rules: [{ required: false, message: '请输入消耗来源' }]
                    })(
                      <Cascader
                        style={{ width: '100%' }}
                        options={consumeSourceLists}
                        placeholder='消耗来源'
                        showSearch
                      />
                    )}
                  </Col>
                </Row>
              </div>
            :
              ''
          }
        </Form>

        <Modal
          width={900}
          key={Math.random()}
          title='导出行为'
          {...this.state.fields}
          onChange={this.onChange}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <ExportContainer
            {...this.state.fields}
            options={this.props.options}
            consume={this.props.consume}
            onSubmit={this.props.onSubmit}
            onCreate={this.handleOk}
            onRender={this.props.onRender}
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
      'range-time-picker': {
        ...props['range-time-picker']
      },
      'products': {
        ...props.products
      },
      'itemId0': {
        ...props.itemId0
      },
      'itemId4': {
        ...props.itemId4
      },
      'itemId5': {
        ...props.itemId5
      },
      // 'items': {
      //   ...props.items
      // },
      'consumeSourcesList': {
        ...props.consumeSourcesList
      }
    }
  }
  // 任一表单域的值发生改变时的回调
  // onValuesChange(_, values) {
  //   console.log('Form.create.onValuesChange', values)
  // }
})(LogConsumesFilter)

export default Filter
