import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import _ from 'lodash'

import {boolKeys, typeKeys} from '../modules/Mapping'

export default class List extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array
  }

  constructor(props) {
    super(props)
    const {type} = this.props
    if (type === 'equip') {
      this.columns = [
        { title: '技能名称', dataIndex: 'skillTemplateName', key: 'skillTemplateName' },
        { title: '技能ID', dataIndex: 'skillTemplateId', key: 'skillTemplateId' },
        { title: '等级', dataIndex: 'level', key: 'level' },
        { title: '技能槽', dataIndex: 'pos', key: 'pos' },
        { title: '角色名称', dataIndex: 'name', key: 'name' },
        { title: '角色ID', dataIndex: 'roleId', key: 'roleId' },
        { title: '穿戴对象', dataIndex: 'type', key: 'type' }
      ]
    }

    if (type === 'backpack') {
      this.columns = [
        { title: '技能名称', dataIndex: 'skillTemplateName', key: 'skillTemplateName' },
        { title: '技能ID', dataIndex: 'skillTemplateId', key: 'skillTemplateId' },
        { title: '等级', dataIndex: 'level', key: 'level' },
        { title: '数量', dataIndex: 'count', key: 'count' },
        { title: '是否锁定', dataIndex: 'lock', key: 'lock' },
        { title: '角色ID', dataIndex: 'roleId', key: 'roleId' },
        { title: '是否最新', dataIndex: 'new', key: 'new' }
      ]
    }

    this.state = {
      dataSource: []
    }

    // 保留stroe的原始信息
    this.list = []
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

  // 初始化
  componentWillMount() {
    console.log('componentWillMount--')
  }
  componentDidMount() {
    // console.log('componentDidMount--')
  }

  // 进行中
  // previous
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps--', nextProps)
    const list = _.map(nextProps.data, function(value, index, collection) {
      return {
        key: index,
        skillTemplateName: value.skillTemplateName,
        skillTemplateId: value.skillTemplateId,
        count: value.count,
        level: value.level,
        lock: value.lock === true ? boolKeys[1] : boolKeys[0],
        pos: value.pos,
        name: value.name,
        roleId: value.roleId,
        new: value.new === true ? boolKeys[1] : boolKeys[0],
        type: typeKeys[value.type]
      }
    })
    this.setState({
      dataSource: list
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate--', nextProps)
    this.list = nextProps.data  // or this.props.data
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate--', nextProps)
    const {data} = this.props
    this.list = data
  }

  // 销毁
  componentWillUnmount() {
    // console.log('componentWillUnmount--')
  }
}
