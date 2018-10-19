import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
// import _ from 'lodash'

export default class Page extends Component {
  state = {
  }

  constructor(props) {
    super(props)
    this.types = {
      1: '配置完成',
      2: '正在同步到服务器',
      3: '将定时同步',
      4: '同步完成',
      5: '同步成功',
      6: '同步失败'
    }
    this.columns = [
      {
        title: '序列',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '模板ID',
        dataIndex: 'templateId',
        key: 'templateId'
      }, {
        title: '产品ID',
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: '服务器',
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return this.types[text] ? this.types[text] : <div style={{ color: 'red' }}>未知状态码</div>
        }
      }, {
        title: '失败原因',
        dataIndex: 'msg',
        key: 'msg',
        render: (text, record) => {
          if (record.status === 6) { return (<div style={{ color: '#ff3333' }}>{text}</div>) }
          else { return text }
        }
      }
    ]
  }


  render() {
    const { temDetail, onCancel } = this.props
    return (
      <div>
        <div style={{ maxHeight: '300px', overflow: 'scroll' }}>
          <Table
            bordered
            rowKey='id'
            dataSource={temDetail.templates}
            columns={this.columns}
            loading={temDetail.fetching}
            pagination={false}
            footer={null}
          />
        </div>
        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <Button type='primary' onClick={onCancel}>取消</Button>
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  temDetail: PropTypes.object,
  onCancel: PropTypes.func
}
