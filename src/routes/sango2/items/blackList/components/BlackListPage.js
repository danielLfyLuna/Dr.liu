import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import _ from 'lodash'
import Filter from './Filter'
import List from './List'

export default class BlackListPage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    blacklist: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    itemsActionCreator: PropTypes.func.isRequired,
    fetchAdd: PropTypes.func.isRequired,
    fetchGet: PropTypes.func.isRequired,
    fetchDelete: PropTypes.func.isRequired
  }

  state = {
    fields: {
      'products': this.props.blacklist.keeping,
      'type': {},
      'itemList': {}
    }
  }

  // 双向数据绑定
  handlerChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  // 添加道具到黑名单
  handlerSubmit = (data) => {
    this.props.fetchAdd(data)
  }

  // 获取黑名单道具
  handlerSearch = (type) => {
    this.props.fetchGet(type)
  }

  // 获取黑名单道具
  handlerDelete = (record) => {
    const {fetchDelete, blacklist: {list}} = this.props
    fetchDelete(record, list)
  }

  render() {
    const {login: {curd}, products: {options}, blacklist: {fetching, getFetching, list}, item, itemsActionCreator} = this.props

    return (
      <div>
        {
          _.has(curd, '120201')
          ?
            <Card style={{marginBottom: 6}} title='添加到黑名单'>
              <Filter
                debounce={fetching}
                options={options}
                items={item}
                fetchItem={itemsActionCreator}
                {...this.state.fields}
                onChange={this.handlerChange}
                onSubmit={this.handlerSubmit}
              />
            </Card>
          :
            ''
        }

        <Card style={{marginBottom: 6}} title='黑名单道具列表'>
          <List
            curd={curd}
            data={list}
            debounce={getFetching}
            onSearch={this.handlerSearch}
            onDelete={this.handlerDelete}
          />
        </Card>
      </div>
    )
  }

  // 初始化
  componentWillMount() {
    const {fetchProductsMap, fetchGet} = this.props
    // console.log('componentWillMount--')
    fetchProductsMap()
    fetchGet(0)
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
