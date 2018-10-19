import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon, Popconfirm } from 'antd'
import _ from 'lodash'

import {genderMapKeys, jobMapKeys, onLineKeys} from '../modules/Mapping'

export default class List extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    products: PropTypes.object.isRequired,
    handleKickoutHead: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.columns = [
      { title: '玩家昵称', dataIndex: 'nickname', key: 'nickname' },
      { title: '等级', dataIndex: 'level', key: 'level' },
      { title: '性别', dataIndex: 'gender', key: 'gender' },
      { title: '职业', dataIndex: 'job', key: 'job' },
      {
        title: '登录状态',
        dataIndex: 'online',
        key: 'online',
        render: (text, record, index) => {
          return (
              text === '在线'
              ?
                <span>{text}<Icon style={{color: 'green'}} type='check' /></span>
              :
                <span>{text}<Icon style={{color: 'red'}} type='close' /></span>
          )
        }
      },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record, index) => {
          const {curd} = this.props
          if (_.has(curd, '70902')) {
            return (
              record.online === '在线'
              ?
                <Popconfirm title='您确定要强制该用户退出吗?' onConfirm={() => this.onKickout(text, record, index)} okText='Yes' cancelText='No'>
                  <Button size='small' type='danger'>踢出</Button>
                </Popconfirm>
              :
                <Button disabled size='small' type='danger'>离线状态</Button>
            )
          } else {
            return (
              <span>无踢人权限</span>
            )
          }
        }
      }
    ]

    this.state = {
      dataSource: []
    }

    // 保留stroe的原始信息
    this.list = []

    this.onKickout = this.onKickout.bind(this)
  }

  componentWillReceiveProps(nextProps, nextState) {
    const data = _.map(nextProps.data, function(value, index, collection) {
      return {
        key: index,
        playerId: value.playerId,
        nickname: value.nickname,
        level: value.level,
        gender: genderMapKeys[value.gender],
        job: jobMapKeys[value.job],
        online: onLineKeys[value.online]
      }
    })
    this.setState({
      dataSource: data
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.list = nextProps.data  // or this.props.data
    return true
  }

  onKickout = (record, e) => {
    console.log(this.props.products.value, this.list)
    this.props.handleKickoutHead(this.props.products.value, record.playerId, this.list)
  }

  render() {
    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </div>
    )
  }

  componentDidUpdate() {  // 可以修改DOM
    this.list = this.props.data
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    this.props.handleUpdate([])
  }
}
