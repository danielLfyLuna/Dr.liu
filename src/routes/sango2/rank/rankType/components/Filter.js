import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Form, Row, Col, Button, Cascader } from 'antd'
import openNotificationWithIcon from '../../../../../components/notification'

export class RanksFilter extends Component {

  state = {
    rankType: [
      {value: 'alliance', label: '联盟势力榜'},
      {value: 'cross/alliance', label: '联盟势力榜(跨服)'},
      {value: 'fightCapacity', label: '个人战力榜'},
      {value: 'cross/fightCapacity', label: '个人战力榜(跨服)'},
      {value: 'level', label: '个人等级榜'},
      {value: 'cross/level', label: '个人等级榜(跨服)'},
      {value: 'cross/flower', label: '鲜花榜(跨服)'},
      {value: 'equip', label: '装备积分榜'},
      {value: 'cross/equip', label: '装备积分榜(跨服)'},
      {value: 'recharge/ranking', label: '充值榜'},
      {value: 'weapon', label: '神兵排行榜'},
      {value: 'cross/weapon', label: '神兵排行榜(跨服)'},
      {value: 'horse', label: '坐骑排行榜'},
      {value: 'cross/horse', label: '坐骑排行榜(跨服)'}
    ],
    isDisplay: false,
    rankName: ''
  }

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.onSearch({
          path: { ...fieldsValue },
          handle: 'SEARCH'
        })
        this.props._setRankName(this.state.rankName)
      }
    })
  }

  handleRankTypes = (e) => {
    if (
      e[0].indexOf('equip') >= 0 ||
      e[0].indexOf('weapon') >= 0
    ) {
      let rankType = e[0].split('/').pop()
      const products = this.props.form.getFieldValue('products')
      if (!products.length) {
        openNotificationWithIcon('error', '请先选择产品/服务器！')
        return
      }
      this.props.onSearch({
        path: {
          products,
          type: rankType
        },
        handle: 'GET_TYPES'
      })
      this.setState({
        isDisplay: true,
        rankName: e[0]
      })
    }
    else {
      this.setState({
        isDisplay: false,
        rankName: e[0]
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { curd, options } = this.props
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
            _.has(curd, '110101')
            ?
              <Row gutter={20}>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('products', {
                    rules: [{ required: true, message: '请选择产品与服务器(必选)' }],
                    initialValue: this.props.initial.products ? this.props.initial.products : []
                  })(
                    <Cascader
                      showSearch
                      options={this.props.options.products}
                      placeholder='请选择产品与服务器(必选)'
                      expandTrigger='hover'
                    />
                  )}
                </Col>
                <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                  {getFieldDecorator('rankType', {
                    rules: [{ required: true, message: '请选择排行榜类型' }]
                  })(
                    <Cascader
                      options={this.state.rankType}
                      placeholder='请选择排行榜类型'
                      showSearch
                      onChange={this.handleRankTypes}
                    />
                  )}
                </Col>
                {
                  this.state.isDisplay &&
                  <Col {...ColProps} xl={{ span: 5 }} md={{ span: 6 }}>
                    {getFieldDecorator('specialType', {
                      rules: [{ required: true, message: '请选择类型(必填)' }],
                      initialValue: options.types.length && [options.types[0]['value']]
                    })(
                      <Cascader
                        options={options.types}
                        placeholder='请选择类型(必填)'
                        showSearch
                      />
                    )}
                  </Col>
                }
                <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 24 }} sm={{ span: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit'>查询</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            :
              ''
          }
        </Form>

      </div>
    )
  }
}

RanksFilter.propTypes = {
  curd: PropTypes.object.isRequired,
  options: PropTypes.object,
  initial: PropTypes.object,
  form: PropTypes.object,
  _setRankName: PropTypes.func,
  onSearch: PropTypes.func
}

const Filter = Form.create()(RanksFilter)

export default Filter
