import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'
// import _ from 'lodash'
import { intlShape } from 'react-intl'




export default class InfosPage extends Component {

  static propTypes = {
    login: PropTypes.object.isRequired,
    intl: intlShape,
    info: PropTypes.object.isRequired,
    infosSearchActionCreator: PropTypes.func.isRequired,
    receiveInfos: PropTypes.func.isRequired,
    clearHeadActionCreator: PropTypes.func.isRequired,
    kickoutActionCreator: PropTypes.func.isRequired,
    updateSkipnovice: PropTypes.func.isRequired,
    updateNickName: PropTypes.func.isRequired,
    updateNovices: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    products: PropTypes.object.isRequired,
    fetchProductsMap: PropTypes.func.isRequired,
    keepInfos: PropTypes.func.isRequired
  }

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      platformId: {
        value: ''
      },
      'products': this.props.info.keeping
    }
  }

  product = {
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
    this.product.value = [
      data.products[0],
      data.products[1]
    ]
    this.props.infosSearchActionCreator(data)
  }

  // 批量跳过新手
  handleNovice = (data) => {
    this.props.updateNovices(data)
  }

  // 重置密码
  handleResetPassword = (data) => {
    this.props.resetPassword(data)
  }

  render() {
    const { login: {curd}, products: {options}, info: {keeping, list}, updateNickName, kickoutActionCreator } = this.props
    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            intl={this.props.intl}
            curd={curd}
            initialFiler={keeping}
            options={options}
            {...this.state.fields}
            onChange={this.handleChange}
            onSearch={this.handleSearch}
            handleNovice={this.handleNovice}
          />
          <List
            intl={this.props.intl}
            data={list}
            curd={curd}
            products={this.product}
            handleUpdate={this.props.receiveInfos}
            handleClearHead={this.props.clearHeadActionCreator}
            updateSkipnovice={this.props.updateSkipnovice}
            handlerRename={updateNickName}
            handleResetPassword={this.handleResetPassword}
            handleKickoutHead={kickoutActionCreator}
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
    const {keepInfos} = this.props
    keepInfos(this.state.fields.products)
  }
}
