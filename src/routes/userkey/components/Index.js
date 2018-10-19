import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Tag, Button, Row } from 'antd'
import { Link } from 'react-router'


export default class Index extends Component {

  componentWillMount() {
    // console.log(this.props.login)
    this.props.fetchUSERKEY({ adminUserId: this.props.login.admin.userId })
  }

  render() {
    let data = this.props.userkey.list.userkey

    return (
      <Card style={{marginBottom: 6}}>
        <Row>
          userkey:&nbsp;&nbsp;
          <Tag>{data}</Tag>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <Link to='/'>
            <Button type='primary'>返回首页</Button>
          </Link>
        </Row>
      </Card>
    )
  }

}

Index.propTypes = {
  fetchUSERKEY: PropTypes.func,
  login: PropTypes.object,
  userkey: PropTypes.object
}
