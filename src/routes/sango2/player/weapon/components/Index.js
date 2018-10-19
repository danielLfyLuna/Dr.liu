import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import Filter from './Filter'
import List from './List'

export default class Weapon extends Component {

  state = {
    fields: {
      nickname: {
        value: ''
      },
      playerId: {
        value: ''
      },
      products: {
        value: []
      }
    },
    initials: {
      map: {
        qualityKeys: { 0: '白', 1: '绿', 2: '蓝', 3: '紫', 4: '橙', 5: '红' },
        colorKeys: {
          0: 'white',
          1: 'green',
          2: 'DeepSkyBlue',
          3: 'Orchid',
          4: 'orange',
          5: 'red'
        }
      }
    }
  }

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  componentWillUnmount() {
    this.props.keepWeapon(this.state.fields.products)
  }

  // 双向数据绑定
  onChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  // 搜索提交
  onSearch = (data) => {
    this.props.fetchWeapons(data)
  }

  render() {
    const { products, weapon, login } = this.props
    let options = {
      products,
      login,
      weapon
    }
    let initials = this.state.initials

    return (
      <div>
        <Card style={{marginBottom: 6}}>
          <Filter
            options={options}
            {...this.state.fields}
            onChange={this.onChange}
            onSearch={this.onSearch}
          />
          <List
            options={options}
            initials={initials}
          />
        </Card>
      </div>
    )
  }
}

Weapon.propTypes = {
  weapon: PropTypes.object,
  login: PropTypes.object,
  products: PropTypes.object,
  fetchProductsMap: PropTypes.func,
  fetchWeapons: PropTypes.func,
  keepWeapon: PropTypes.func
}
