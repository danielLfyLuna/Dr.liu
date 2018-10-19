import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
// import _ from 'lodash'
import moment from 'moment'

export default class WeaponList extends Component {

  constructor(props) {
    super(props)
    const { colorKeys, qualityKeys } = this.props.initials.map
    this.columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: '神兵 ID', dataIndex: 'templateKey' },
      { title: '神兵名称', dataIndex: 'templateName' },
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
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, record) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      { title: '玩家 ID', dataIndex: 'playerId' },
      { title: '玩家昵称', dataIndex: 'nickname' },
      {
        title: '是否已被装备',
        dataIndex: 'equip',
        render: (text, record) => record.equip ? '已装备' : '未装备'
      },
      {
        title: '是否已被分解',
        dataIndex: 'destroy',
        render: (text, record) => record.destroy ? '已分解' : '未分解'
      },
      { title: '进阶等级', dataIndex: 'progressLevel' },
      { title: '强化等级', dataIndex: 'strengthenLevel' },
      { title: '祝福值', dataIndex: 'luck' }
    ]
    this.dataSource = []

  }

  render() {
    const { options } = this.props
    this.dataSource = options.weapon.list

    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.dataSource.length
    }
    return (
      <div>
        <Table
          dataSource={this.dataSource}
          columns={this.columns}
          rowKey='id'
          pagination={pagination}
          bordered
        />
      </div>
    )
  }

}

WeaponList.propTypes = {
  options: PropTypes.object,
  initials: PropTypes.object
}
