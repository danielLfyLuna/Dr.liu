import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'

export default class KickoutPage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    kickout: PropTypes.object.isRequired,
    onLineSearchActionCreator: PropTypes.func.isRequired,
    receiveOnLine: PropTypes.func.isRequired,
    kickoutActionCreator: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepKickout: PropTypes.func.isRequired
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      'products': this.props.kickout.keeping
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
    this.props.onLineSearchActionCreator(data)
  }

  render() {
    const {
      login: {curd},
      products: {options},
      kickout: {keeping, list},
      receiveOnLine,
      kickoutActionCreator
    } = this.props



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
            curd={curd}
            data={list}
            products={this.products}
            handleUpdate={receiveOnLine}
            handleKickoutHead={kickoutActionCreator}
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
    this.props.keepKickout(this.state.fields.products)
  }
}
