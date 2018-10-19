import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'

export default class SoldiersPage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    soldier: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepSoldiers: PropTypes.func.isRequired,
    fetchSoldiers: PropTypes.func.isRequired
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      'products': this.props.soldier.keeping
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
    this.props.fetchSoldiers(data)
  }

  render() {
    const {login: {curd}, products: {options}, soldier: {keeping, list: {infos}}} = this.props

    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            curd={curd}
            initialFiler={keeping}
            options={options}
            {...this.state.fields}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          />
          <List
            data={infos}
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
    const {keepSoldiers} = this.props
    keepSoldiers(this.state.fields.products)
  }
}
