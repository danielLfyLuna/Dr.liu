import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'
import { Card } from 'antd'
import List from './List'
import Filter from './Filter'

export default class MaintenanceTip extends Component {

  static propTypes = {
    intl: intlShape,
    login: PropTypes.object.isRequired,
    products: PropTypes.object,
    maintenanceTip: PropTypes.object.isRequired,
    fetchMaintenanceTip: PropTypes.func.isRequired,
    updateMaintenanceTip: PropTypes.func.isRequired,
    fetchProductsMap: PropTypes.func
  }

    onSearch = (value) => {
      this.props.fetchMaintenanceTip(value)
    }

    onUpdate = (fields) => {
      this.props.updateMaintenanceTip(fields)
    }

    componentWillMount() {
      this.props.fetchProductsMap()
    }

    render() {
      const {login: {curd}, intl} = this.props
      let options = []
      if (this.props.products.options) {
        options = this.props.products.options
      }

      return (
        <Card>
          <Filter
            intl={intl}
            onSearch={this.onSearch}
            onUpdate={this.onUpdate}
            curd={curd}
            options={options}
          />
          <List
            intl={intl}
            maintenanceTip={this.props.maintenanceTip}
            login={this.props.login}
          />
        </Card>
      )
    }
  }
