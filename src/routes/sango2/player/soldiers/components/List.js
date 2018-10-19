import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import _ from 'lodash'

import { qualityKeys, colorKeys, aptitudeKeys } from '../modules/Mapping'

export default class List extends Component {
  static propTypes = {
    data: PropTypes.array
  }

  constructor(props) {
    super(props)

    this.columns = [
      { title: '战斗力', dataIndex: 'fightCapacity', key: 'fightCapacity' },
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
          return <div style={qualityColor}>{qualityName}</div>
        }
      },
      {
        title: '武将名称',
        dataIndex: 'soldierTemplateName',
        key: 'soldierTemplateName'
      },
      { title: '是否上阵', dataIndex: 'onFormation', key: 'onFormation' },
      { title: '队伍', dataIndex: 'index', key: 'index' },
      { title: '资质', dataIndex: 'aptitude', key: 'aptitude' },
      {
        title: '武将ID',
        dataIndex: 'soldierTemplateId',
        key: 'soldierTemplateId'
      },
      { title: '武将模板ID', dataIndex: 'soldierId', key: 'soldierId' },
      { title: '等级', dataIndex: 'level', key: 'level' },
      { title: '星级', dataIndex: 'starLevel', key: 'starLevel' },
      { title: '经验', dataIndex: 'exp', key: 'exp' },
      { title: '段数', dataIndex: 'ballLevel', key: 'ballLevel' },
      { title: '段数经验', dataIndex: 'cultureExp', key: 'cultureExp' }
    ]

    this.state = {
      dataSource: []
    }

    // 保留stroe的原始信息
    this.list = []
  }

  getAsyncData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          code: 200,
          msg: 'success',
          data: 'hello!'
        })
      }, 2000)
    })
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
  async componentDidMount() {
    // console.log('componentDidMount--')
    let data = await this.getAsyncData()
    console.log(data)
  }

  // 进行中
  // previous
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps--', nextProps)
    const list = _.map(nextProps.data, function(value, index, collection) {
      return {
        key: index,
        soldierTemplateName: value.soldierTemplateName,
        soldierTemplateId: value.soldierTemplateId,
        soldierId: value.soldierId,
        level: value.level,
        starLevel: value.starLevel,
        aptitude: aptitudeKeys[value.aptitude],
        onFormation: value.onFormation ? '上阵' : '未上阵',
        index: value.index,
        exp: value.exp,
        fightCapacity: value.fightCapacity,
        quality: value.quality,
        ballLevel: value.ballLevel,
        cultureExp: value.cultureExp
      }
    })
    this.setState({
      dataSource: list
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate--', nextProps)
    this.list = nextProps.data // or this.props.data
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate--', nextProps)
    const { data } = this.props
    this.list = data
  }

  // 销毁
  componentWillUnmount() {
    // console.log('componentWillUnmount--')
  }
}
