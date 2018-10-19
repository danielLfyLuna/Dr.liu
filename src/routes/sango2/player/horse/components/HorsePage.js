import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'

export default class HorsePage extends Component {

  static propTypes = {
    horse: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    fetchHorse: PropTypes.func.isRequired,
    keepHorse: PropTypes.func.isRequired
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      'products': this.props.horse.keeping
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
    this.props.fetchHorse(data)
  }

  render() {
    const {products: {options}, horse: {keeping, list}, login: {curd}} = this.props

    return (
      <div>
        <Card title='搜索玩家坐骑' style={{marginBottom: 6}}>
          <Filter
            curd={curd}
            initialFiler={keeping}
            options={options}
            {...this.state.fields}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
          />
        </Card>

        <Card title='玩家坐骑列表' style={{marginBottom: 6}}>
          <List
            data={list}
          />
        </Card>
      </div>
    )
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.props.keepHorse(this.state.fields.products)
  }
}
