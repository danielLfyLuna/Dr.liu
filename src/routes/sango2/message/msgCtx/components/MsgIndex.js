import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Table, Button } from 'antd'
import { Link } from 'react-router'


export default class Index extends Component {

  componentWillMount() {
    this.props.singleMsg({groupId: this.props.location.query.group})
  }

  componentWillUnMount() {
    this.props.clearSingle()
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '序列',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '模板ID',
        dataIndex: 'templateId',
        key: 'templateId'
      },
      {
        title: '参数',
        dataIndex: 'param',
        key: 'param'
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: '返回值',
        dataIndex: 'platformResponse',
        key: 'platformResponse',
        width: 200
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      }
    ]
  }

  render() {
    return (
      <Card>
        <Link className='margin-right' to={{ pathname: '/sango2/message/msgIndex' }} >
          <Button type='primary' style={{marginBottom: 20}}>返回</Button>
        </Link>
        <Table
          bordered
          rowKey='id'
          dataSource={this.props.message.single}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Link className='margin-right' to={{ pathname: '/sango2/message/msgIndex' }} >
          <Button type='primary' style={{marginTop: 20}}>返回</Button>
        </Link>
      </Card>
    )
  }
}

Index.propTypes = {
  message: PropTypes.object,
  location: PropTypes.object,
  singleMsg: PropTypes.func,
  clearSingle: PropTypes.func
}
