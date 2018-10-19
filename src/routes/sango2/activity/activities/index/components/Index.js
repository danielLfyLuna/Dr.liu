import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { intlShape, defineMessages } from 'react-intl'

import Filter from './Filter'
import List from './List'

const message = defineMessages({
  activity_418: {
    id: 'ACTIVITY.418',
    defaultMessage: '将领礼包'
  },
  activity_422: {
    id: 'ACTIVITY.422',
    defaultMessage: '限时团购礼包'
  },
  activity_429: {
    id: 'ACTIVITY.429',
    defaultMessage: '战备礼包'
  },
  activity_430: {
    id: 'ACTIVITY.430',
    defaultMessage: '超值锦囊'
  },
  activity_433: {
    id: 'ACTIVITY.433',
    defaultMessage: 'RMB坐骑礼包'
  }
})


export default class Activities extends Component {
  state = {
    fields: {
      products: {}
    },
    initials: {
      products: {
        productId: '',
        serverId: ''
      },
      conf: {
        renderState: true
      },
      map: {
        cellStatus: { 1: '开启', 2: '维护', 3: '不可用', 4: '初置阶段', 5: '部署完成', 6: '测试' }
      },
      enum: {
        cellStatus: [
          { text: '开启', value: 3 },
          { text: '初置阶段', value: 4 },
          { text: '部署完成', value: 5 },
          { text: '测试', value: 6 }
        ],
        functionIds: [
          { label: `${this.props.intl.formatMessage(message.activity_418)}(418)`, value: 418 },
          { label: `${this.props.intl.formatMessage(message.activity_418)}(422)`, value: 422 },
          { label: `${this.props.intl.formatMessage(message.activity_418)}(429)`, value: 429 },
          { label: `${this.props.intl.formatMessage(message.activity_418)}(430)`, value: 430 },
          { label: `${this.props.intl.formatMessage(message.activity_418)}(433)`, value: 433 }
        ]
      }
    }
  }

  onChange = (changedFields) => {
    this.setState({
      fields: { ...this.state.fields, ...changedFields }
    })
  }

  onSearch = (fields) => {
    if (fields.handle === 'SEARCH') {
      this.setState({
        initials: {
          ...this.state.initials,
          products: {
            productId: fields.productId,
            serverId: fields.serverId
          }
        }
      })
      this.props.fetchActivities(fields)
    }
  }

  onUpdate = (fields) => {
    this.props.updateActivity(fields)
  }

  onSwitch = (fields) => {
    this.props.switchActivity(fields)
  }

  onRender = (nextInitials) => {
    this.state.initials.conf.renderState = nextInitials.renderState
  }

  componentWillMount() {
    this.props.fetchProductsMap()
    const { activities } = this.props
    this.setState({
      initials: {
        ...this.state.initials,
        ...activities.keeping.index
      }
    })
  }

  componentWillUnmount() {
    this.props.keepActivities({
      index: {
        products: {...this.state.initials.products}
      }
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.initials.conf.renderState
  }


  render() {
    const initials = this.state.initials
    const options = {
      authorize: this.props.login.authorize,
      products: {
        list: this.props.products.options
      }
    }

    return (
      <div>
        <Card style={{ marginBottom: 6 }}>
          <Filter
            intl={this.props.intl}
            options={options}
            initials={initials}
            {...this.state.fields}
            data={this.props.activities}
            onChange={this.onChange}
            onSearch={this.onSearch}
            onRender={this.onRender}
          />
          <List
            intl={this.props.intl}
            options={options}
            initials={initials}
            onSearch={this.onSearch}
            onUpdate={this.onUpdate}
            data={this.props.activities}
            map={this.state.map}
            enum={this.state.enum}
            onRender={this.onRender}
            onSwitch={this.onSwitch}
           />
        </Card>
      </div>
    )
  }
}

Activities.propTypes = {
  intl: intlShape,
  activities: PropTypes.object.isRequired,
  products: PropTypes.object,
  login: PropTypes.object,
  fetchActivities: PropTypes.func,
  fetchProductsMap: PropTypes.func,
  updateActivity: PropTypes.func,
  switchActivity: PropTypes.func,
  keepActivities: PropTypes.func
}
