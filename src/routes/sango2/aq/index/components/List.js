import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import _ from 'lodash'

import DropOption from './../../../../../components/DropOption/DropOption'
import Update from './Update'
// import _ from 'lodash'
import moment from 'moment'
// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


export default class aqList extends Component {

  static propTypes = {
    // login: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    curd: PropTypes.object,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  state = {
    visible: false,
    delv: false,
    obj: {}
  }

  constructor(props) {
    super(props)

    this.columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      }, {
        title: '问题',
        dataIndex: 'question',
        key: 'question'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => {
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text) => {
          if (!text) { return '' }
          return moment(text).format('YYYY-MM-DD HH:mm:ss')
        }
      }, {
        title: '访问数量',
        dataIndex: 'clickCount',
        key: 'clickCount'
      }, {
        title: '创建人',
        dataIndex: 'author',
        key: 'author'
      }, {
        title: '排序',
        dataIndex: 'order',
        key: 'order'
      }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => {
          let menuOptions = []
          if (_.has(this.props.curd, '180103')) {
            menuOptions.push({name: '删除', key: '1'})
          }
          if (_.has(this.props.curd, '180104')) {
            menuOptions.push({name: '修改', key: '2'})
          }
          return (
            <DropOption
              onMenuClick={e => this.handleClick(record, e)}
              menuOptions={menuOptions}
              dropdownProps={{
                trigger: ['hover']
              }}
            />
          )
        }
      }]
  }

  handleClick = (record, e) => {
    if (e.key === '1') {
      this.setState({
        delv: true,
        obj: record
      })
    }
    if (e.key === '2') {
      this.setState({
        visible: true,
        obj: record
      })
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  delCancel = (e) => {
    this.setState({
      delv: false
    })
  }

  delOk = (e) => {
    this.props.onDelete({id: this.state.obj.id})
    this.setState({
      delv: false
    })
  }

  render() {
    return (
      <div>
        <Table
          rowKey='id'
          bordered
          dataSource={this.props.data.list}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          width={1000}
          maskClosable={false}
          title='修改问答'
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <Update
            handleCancel={this.handleCancel}
            onUpdate={this.props.onUpdate}
            data={this.state.obj}
          />
        </Modal>
        <Modal
          title='确认删除?'
          maskClosable={false}
          visible={this.state.delv}
          onCancel={this.delCancel}
          onOk={this.delOk}
        >
          <p>您将要删除的问题是：</p>
          <p>{this.state.obj.question}</p>
        </Modal>
      </div>
    )
  }

}
