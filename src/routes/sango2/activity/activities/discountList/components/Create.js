import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Table, Row, Col, Button } from 'antd'
import { defineMessages, intlShape } from 'react-intl'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const message = defineMessages({
  itemId: {
    id: 'TABLE.ITEMID',
    defaultMessage: '道具ID'
  },
  itemName: {
    id: 'TABLE.ITEMNAME',
    defaultMessage: '道具名称'
  },
  count: {
    id: 'TABLE.COUNT(ALL)',
    defaultMessage: '数量(全服购买总次数)'
  },
  discount: {
    id: 'TABLE.DISCOUNT',
    defaultMessage: '折扣'
  },
  originPrice: {
    id: 'TABLE.PRICE_ORIGIN',
    defaultMessage: '原价'
  },
  currentPrice: {
    id: 'TABLE.PRICE_CURRENT',
    defaultMessage: '现价(原价*折扣)'
  },
  back: {
    id: 'BUTTON.BACK',
    defaultMessage: '返回'
  }
})


export default class CreateForm extends Component {
  state = {
  }

  constructor(props) {
    super(props)
    const intl = this.props.intl
    this.columns = [{
        title: intl.formatMessage(message.itemId),
        dataIndex: 'itemId',
        key: 'itemId'
      }, {
        title: intl.formatMessage(message.itemName),
        dataIndex: 'itemName',
        key: 'itemName'
      }, {
        title: intl.formatMessage(message.count),
        dataIndex: 'count',
        key: 'count'
      }, {
        title: intl.formatMessage(message.discount),
        dataIndex: 'discount',
        key: 'discount'
      }, {
        title: intl.formatMessage(message.originPrice),
        dataIndex: 'originPrice',
        key: 'originPrice'
      }, {
        title: intl.formatMessage(message.currentPrice),
        dataIndex: 'currentPrice',
        key: 'currentPrice'
      }
    ]
  }

  componentWillMount() {
    const values = {
      productId: this.props.location.query.productId,
      serverId: this.props.location.query.serverId,
      templateId: this.props.location.query.templateId
    }

    this.props.fetchDiscount(values)
  }

  render() {
    const { intl } = this.props
    let dataSource = []
    dataSource = this.props.discount.list

    const pathname = '/sango2/activity/activities/index'

    return (
      <div>
        <Table
          bordered
          rowKey='itemId'
          dataSource={dataSource}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Row gutter={10} style={{marginTop: '20px'}}>
          <Col className='gutter-row' span={4}>
            <Link to={{ pathname: pathname }}>
              <Button type='primary'>{intl.formatMessage(message.back)}</Button>
            </Link>
          </Col>
        </Row>
      </div>
    )
  }
}

CreateForm.propTypes = {
  intl: intlShape,
  fetchDiscount: PropTypes.func,
  discount: PropTypes.object,
  location: PropTypes.object
}

CreateForm.contextTypes = {
  router: PropTypes.object
}
