import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { withRouter } from 'react-router'

import Create from '../containers/CreateContainer'

class Index extends Component {

  constructor(props) {
    super(props)
    this.redirect = this.redirect.bind(this)
  }

  redirect() {
    this.props.router.push('/form')
  }

  render() {
    const { location } = this.props

    return (
      <div>
        <Card style={{ marginBottom: 16 }}>
          <Create location={location} />
        </Card>
      </div>
    )
  }
}

Index.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
}

export default withRouter(Index)
