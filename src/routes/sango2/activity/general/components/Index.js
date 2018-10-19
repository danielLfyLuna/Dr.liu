import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Card, Form, Button, Modal } from 'antd'
import _ from 'lodash'

import Lists from './List'
import Add from './Add'
import { fetchGoodsMap } from '../../../../../modules/goods'
import {
  fetchSoldiers,
  addSoldiers,
  getDetails,
  syncSoldiers
 } from '../modules/Module'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchSoldiers,
  addSoldiers,
  getDetails,
  syncSoldiers,
  fetchGoodsMap,
  fetchProductsMap
}
const mapStatetoProps = (state) => ({
  general: state.general,
  products: state.products,
  login: state.islogin,
  goods: state.goods
})

@connect(mapStatetoProps, mapDispatchtoProps)
export default class Index extends Component {
  static propTypes = {
    general: PropTypes.object,
    products: PropTypes.object,
    goods: PropTypes.object,
    login: PropTypes.object,
    fetchGoodsMap: PropTypes.func,
    fetchProductsMap: PropTypes.func,
    fetchSoldiers: PropTypes.func,
    syncSoldiers: PropTypes.func,
    addSoldiers: PropTypes.func,
    getDetails: PropTypes.func
  }

  state = {
    visible: false
  }

  onSearch = () => {
    this.props.fetchSoldiers()
  }

  onAdd = (value) => {
    this.props.addSoldiers(value)
  }

  onDetail = (value) => {
    this.props.getDetails(value)
  }

  onSync = (value) => {
    this.props.syncSoldiers(value)
  }

  componentWillMount() {
    this.props.fetchGoodsMap({productId: '_'})
    this.props.fetchSoldiers()
    this.props.fetchProductsMap()
  }

  handleVisible = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  _goodsMap = (goods) => {
    let items = { 0: [], 4: [], 5: [] }
    _.map(goods, (v, i) => {
      let val = []
      _.map(v, (vs, ix) => {
        val.push({ value: ix, label: `${vs}(${ix})` })
      })
      items[i] = val
    })
    return items
  }

  render() {
    const { general, goods, products, login: { authorize } } = this.props
    const item = this._goodsMap(goods.options)
    return (
      <Card style={{ marginBottom: 6 }}>
        <div style={{ marginBottom: 6 }}>
          <Form>
            <Button.Group>
              {
                authorize.includes(90301) && <Button type='primary' onClick={this.onSearch}>查询</Button>
              }
              {
                authorize.includes(90302) && <Button type='primary' onClick={this.handleVisible}>添加</Button>
              }
            </Button.Group>
          </Form>
        </div>
        <Lists
          general={general}
          onDetail={this.onDetail}
          onAdd={this.onAdd}
          onSync={this.onSync}
          goods={item}
          authorize={authorize}
          products={products}
         />
        <Modal
          key={Math.random()}
          width={800}
          title='添加'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          destroyOnClose
        >
          <Add
            handleCancel={this.handleCancel}
            onAdd={this.onAdd}
            goods={item}
          />
        </Modal>
      </Card>
    )
  }
}
