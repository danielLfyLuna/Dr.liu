import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'
import _ from 'lodash'

export default class SoldiersPage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    equipment: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepEquipments: PropTypes.func.isRequired,
    fetchEquipments: PropTypes.func.isRequired
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      'products': this.props.equipment.keeping
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
    this.props.fetchEquipments(data)
  }

  render() {
    const {login: {curd}, products: {options}, equipment: {keeping, list: {equipMap}}} = this.props

    const lists = _.map(equipMap, (value, key) => {
      return <List
        key={key}
        data={value}
        name={key}
      />
    })

    return (
      <div>
        <Card style={{marginBottom: 6}}>
          {
            _.has(curd, '70801')
            ?
              <Filter
                initialFiler={keeping}
                options={options}
                {...this.state.fields}
                onChange={this.handleChange}
                onSearch={this.handleSearch}
              />
            :
              ''
          }
        </Card>
        {lists}
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
    const {keepEquipments} = this.props
    keepEquipments(this.state.fields.products)
  }
}
