import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Card } from 'antd'
import _ from 'lodash'
import moment from 'moment'

import { qualityKeys, colorKeys, typeKeys } from '../modules/Mapping'

export default class List extends Component {
  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.array
  }

  constructor(props) {
    super(props)

    this.columns = [
      // { title: '背包名称', dataIndex: 'bagName', key: 'bagName' },
      { title: '道具名称', dataIndex: 'itemTemplateName', key: 'itemTemplateName' },
      { title: '是否绑定', dataIndex: 'binding', key: 'binding' },
      { title: '评分', dataIndex: 'score', key: 'score' },
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
      { title: '数量', dataIndex: 'count', key: 'count' },
      { title: '位置', dataIndex: 'pos', key: 'pos' },
      { title: '强化等级', dataIndex: 'intensifyLevel', key: 'intensifyLevel' },
      { title: '道具ID', dataIndex: 'itemId', key: 'itemId' },
      { title: '道具模板ID', dataIndex: 'itemTemplateId', key: 'itemTemplateId' },
      { title: '宝石', dataIndex: 'inlayGemStr', key: 'inlayGemStr' },
      { title: '创建时间', dataIndex: 'createTime', key: 'createTime' }
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
      }, 1000)
    })
  }

  render() {
    const { name } = this.props
    return (
      <Card title={name} style={{ marginBottom: 6 }}>
        <Table
          bordered
          // title={() => name}
          dataSource={this.state.dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </Card>
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
    const list = _.map(this.props.data, function(value, index, collection) {
      return {
        key: index,
        bagName: value.bagName,
        binding: value.binding ? typeKeys[1] : typeKeys[0],
        count: value.count,
        score: value.score,
        quality: value.quality,
        pos: value.pos,
        intensifyLevel: value.intensifyLevel,
        itemId: value.itemId,
        itemTemplateId: value.itemTemplateId,
        itemTemplateName: value.itemTemplateName,
        inlayGemStr: value.inlayGemStr,
        createTime: moment(value.createTime).format('YYYY-MM-DD HH:mm:ss')
      }
    })
    this.setState({
      dataSource: list
    })
  }

  // 进行中
  // previous
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps--', nextProps)
    const list = _.map(nextProps.data, function(value, index, collection) {
      return {
        key: index,
        bagName: value.bagName,
        binding: value.binding ? typeKeys[1] : typeKeys[0],
        count: value.count,
        score: value.score,
        quality: value.quality,
        pos: value.pos,
        intensifyLevel: value.intensifyLevel,
        itemId: value.itemId,
        itemTemplateId: value.itemTemplateId,
        itemTemplateName: value.itemTemplateName,
        inlayGemStr: value.inlayGemStr,
        createTime: moment(value.createTime).format('YYYY-MM-DD HH:mm:ss')
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
