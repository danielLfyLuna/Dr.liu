import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'antd'

import { connect } from 'react-redux'
import {
  fetchVersusServers,
  fetchCountryServers,
  updateVersusServers,
  updateCountryServers
} from '../modules/AmendModule'

const mapDispatchtoProps = {
 fetchVersusServers,
 fetchCountryServers,
 updateVersusServers,
 updateCountryServers
}
const mapStatetoProps = (state) => ({
 worldCupServer: state.worldCupServer
 // login: state.islogin
})

@connect(mapStatetoProps, mapDispatchtoProps)
export default class Modals extends Component {
  static propTypes = {
    data: PropTypes.object,
    icons: PropTypes.string,
    worldCupServer: PropTypes.object,
    fetchVersusServers: PropTypes.func,
    fetchCountryServers: PropTypes.func,
    updateVersusServers: PropTypes.func,
    updateCountryServers: PropTypes.func,
    cancelServer: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '产品ID',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: '服务器ID',
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: '比赛ID',
        dataIndex: 'versusId',
        key: 'versusId'
      }, {
        title: '主队得分',
        dataIndex: 'hostScore',
        key: 'hostScore'
      }, {
        title: '客队得分',
        dataIndex: 'guestScore',
        key: 'guestScore'
      }
    ]
    this.columns2 = [
      {
        title: '产品ID',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: '服务器ID',
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: '比赛ID',
        dataIndex: 'versusId',
        key: 'versusId'
      }, {
        title: '主队得分',
        dataIndex: 'hostScore',
        key: 'hostScore'
      }, {
        title: '客队得分',
        dataIndex: 'guestScore',
        key: 'guestScore'
      }, {
        title: '国家ID',
        dataIndex: 'countryId',
        key: 'countryId'
      }, {
        title: '国家排名',
        dataIndex: 'index',
        key: 'index'
      }, {
        title: '是否淘汰',
        dataIndex: 'eliminated',
        key: 'eliminated',
        render: (text, record) => {
          return text ? <span style={{ color: '#E61A1A' }}>是</span> : '否'
        }
      }
    ]
  }

  onGetServer = (value) => {
    if (value.key === 'versus') this.props.fetchVersusServers(value.id)
    if (value.key === 'country') this.props.fetchCountryServers(value.id)
  }

  onUpdateServer = () => {
    if (this.props.icons === 'versus') {
      this.props.updateVersusServers(this.props.data.versusId)
      this.props.cancelServer()
    }
    if (this.props.icons === 'country') {
      this.props.updateCountryServers(this.props.data.countryId)
      this.props.cancelServer()
    }
  }

  componentWillMount() {
    const { icons, data } = this.props
    let id = ''
    if (icons === 'versus') {
      id = data.versusId
      this.onGetServer({id: id, key: icons})
    }
    if (icons === 'country') {
      id = data.countryId
      this.onGetServer({id: id, key: icons})
    }
  }

  render() {
    const { worldCupServer, icons } = this.props

    return (
      <div>
        <Table
          bordered
          dataSource={icons === 'versus' ? worldCupServer.verSer : icons === 'country' ? worldCupServer.countrySer : []}
          columns={icons === 'versus' ? this.columns : this.columns2}
          rowKey='id'
          pagination={false}
        />

        <Button style={{ marginTop: '8px' }} onClick={this.onUpdateServer}>重新发送</Button>
      </div>
    )
  }
}
