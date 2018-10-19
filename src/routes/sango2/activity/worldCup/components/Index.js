import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Tabs, Icon } from 'antd'
import _ from 'lodash'

import Filter from './versus/Filter'
import List from './versus/List'
import Filters from './country/Filter'
import Lists from './country/List'

const TabPane = Tabs.TabPane

import { connect } from 'react-redux'
import {
  fetchVersus,
  fetchCountry,
  postVersus,
  postCountry
 } from '../modules/Module'
import { fetchProductsMap } from '../../../../../modules/products'

const mapDispatchtoProps = {
  fetchVersus,
  fetchCountry,
  postVersus,
  postCountry,
  fetchProductsMap
}
const mapStatetoProps = (state) => ({
  worldCup: state.worldCup,
  products: state.products,
  login: state.islogin
})

@connect(mapStatetoProps, mapDispatchtoProps)
export default class Index extends Component {
  static propTypes = {
    worldCup: PropTypes.object,
    products: PropTypes.object,
    login: PropTypes.object,
    fetchVersus: PropTypes.func,
    fetchCountry: PropTypes.func,
    postVersus: PropTypes.func,
    postCountry: PropTypes.func,
    fetchProductsMap: PropTypes.func
  }

  state = {}

  constructor(props) {
    super(props)
    this.isRender = true
  }

  handleRender = (v) => {
    this.isRender = v
  }

  onSearchVersus = (value) => {
    this.props.fetchVersus(value)
  }

  onSearchCountry = (value) => {
    this.props.fetchCountry(value)
  }

  onSendVersus = (value) => {
    this.props.postVersus(value)
  }

  onSendCountry = (value) => {
    this.props.postCountry(value)
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  shouldComponentUpdate() {
    return this.isRender
  }

  render() {
    const { worldCup, products, login } = this.props
    const data = {
      products: products.options
    }

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Tabs defaultActiveKey='versus'>
            {
              _.has(login.curd, '90201') &&
              <TabPane tab={<div><Icon type='pie-chart' />世界杯赛程详情</div>} key='versus'>
                <Filter
                  data={data}
                  onSearch={this.onSearchVersus}
                />
                <List
                  worldCup={worldCup}
                  onSend={this.onSendVersus}
                  handleRender={this.handleRender}
                 />
              </TabPane>
            }
            {
              _.has(login.curd, '90203') &&
              <TabPane tab={<div><Icon type='filter' />世界杯国家排名</div>} key='country'>
                <Filters
                  data={data}
                  onSearch={this.onSearchCountry}
                />
                <Lists
                  worldCup={worldCup}
                  onSend={this.onSendCountry}
                  handleRender={this.handleRender}
                 />
              </TabPane>
            }
          </Tabs>

        </Card>
      </div>
    )
  }
}
