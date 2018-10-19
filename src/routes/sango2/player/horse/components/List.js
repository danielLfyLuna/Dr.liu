import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import _ from 'lodash'
import moment from 'moment'

import {qualityKeys, colorKeys, statusKeys, totalScoreFun} from '../modules/Mapping'

export default class List extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.columns = [
      { title: '坐骑名称', dataIndex: 'name', key: 'name' },
      { title: '坐骑ID', dataIndex: 'itemId', key: 'itemId' },
      { title: '坐骑模板ID', dataIndex: 'itemTemplateId', key: 'itemTemplateId' },
      { title: '等级', dataIndex: 'level', key: 'level' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '评分等级', dataIndex: 'totalScore', key: 'totalScore' },
      { title: '背包类型', dataIndex: 'bagName', key: 'bagName' },
      {
        title: '品质',
        dataIndex: 'quality',
        key: 'quality',
        render: (text, record, index) => {
          const qualityColor = {
            border: '1px solid #666',
            padding: '2px 10px',
            textAlign: 'center',
            borderRadius: '10px',
            background: colorKeys[text]
          }
          const qualityName = qualityKeys[text]
          return (
            <div style={qualityColor}>{qualityName}</div>
          )
        }
      },
      { title: '速度', dataIndex: 'speed', key: 'speed' },
      { title: '获得时间', dataIndex: 'createTime', key: 'createTime' }
    ]

    this.state = {
      dataSource: []
    }

    // 保留stroe的原始信息
    this.list = []
  }

  expandedRowRender = (rewards) => {
    console.log(rewards)
    const list = ['天生技能', '战斗技能', '行军技能']
    const columns = [
      {
        title: '坐骑技能ID',
        dataIndex: 'templateId',
        key: 'templateId'
      },
      {
        title: '技能类型',
        dataIndex: 'slotType',
        key: 'slotType',
        render: (text, record) => {
          return list[text]
        }
      },
      {
        title: '技能名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '技能等级',
        dataIndex: 'leve',
        key: 'leve'
      },
      {
        title: '技能评分',
        dataIndex: 'score',
        key: 'score'
      }
    ]

    return (
      <Table
        columns={columns}
        dataSource={rewards}
        rowKey='templateId'
        locale={{emptyText: '此坐骑无技能详情'}}
        pagination={false}
      />
    )
  }

  render() {
    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          expandedRowRender={record => this.expandedRowRender(record.skillList)}
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
    const data = _.map(nextProps.data.horseDetails, function(value, index, collection) {
      return {
        skillList: value.skillList,
        key: index,
        itemId: value.itemId,
        name: value.name,
        itemTemplateId: value.itemTemplateId,
        level: value.level,
        bagName: value.bagName,
        totalScore: totalScoreFun(value.totalScore),
        status: statusKeys[value.status],
        quality: value.quality,
        speed: value.speed,
        createTime: moment(value.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    this.setState({
      dataSource: data
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate--', nextProps)
    this.list = nextProps.data  // or this.props.data
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate--', nextProps)
    this.list = nextProps.data
  }

  // 销毁
  componentWillUnmount() {
    // console.log('componentWillUnmount--')
  }
}
