import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'

export default class HorsePage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    skill: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    fetchSkill: PropTypes.func.isRequired,
    keepSkill: PropTypes.func.isRequired
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      'products': this.props.skill.keeping
    }
  }

  products = {
    value: []
  }

  // 双向数据绑定
  handleChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  // 搜索提交
  handleSearch = (data) => {
    // console.log('Search values of form: ', data)
    this.products.value = [
      data.products[0],
      data.products[1]
    ]
    this.props.fetchSkill(data)
  }

  render() {
    const {login: {curd}, products: {options}, skill: {keeping, list: {backpack, equip}}} = this.props

    return (
      <div>
        <Card title='搜索玩家技能' style={{marginBottom: 6}}>
          <Filter
            curd={curd}
            initialFiler={keeping}
            options={options}
            {...this.state.fields}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          />
        </Card>

        <Card title='已装备技能' style={{marginBottom: 6}}>
          <List
            data={equip}
            type='equip'
          />
        </Card>
        <Card title='技能背包' style={{marginBottom: 6}}>
          <List
            data={backpack}
            type='backpack'
          />
        </Card>
      </div>
    )
  }

  // 初始化
  componentWillMount() {
    // console.log('componentWillMount--')
    const {fetchProductsMap} = this.props
    fetchProductsMap()
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
    const {keepSkill} = this.props
    keepSkill(this.state.fields.products)
  }
}
