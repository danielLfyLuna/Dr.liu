import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { defineMessages } from 'react-intl'
import _ from 'lodash'

import ServerModal from '../containers/ModalContainer'
import DropOption from '../../../../../components/DropOption/DropOption'

const message = defineMessages({
  zhengchang: {
    id: 'STATUS.NORMAL',
    defaultMessage: '正常'
  },
  weihu: {
    id: 'STATUS.SERVER.MAINTENANCE',
    defaultMessage: '维护'
  },
  bukeyong: {
    id: 'STATUS.CELLSTATUS.2',
    defaultMessage: '不可用'
  },
  chuzhi: {
    id: 'STATUS.CELLSTATUS.3',
    defaultMessage: '初置阶段'
  },
  wancheng: {
    id: 'STATUS.CELLSTATUS.4',
    defaultMessage: '部署完成'
  },
  ceshi: {
    id: 'STATUS.CELLSTATUS.5',
    defaultMessage: '测试'
  },
  hot1: {
    id: 'STATUS.HOTTYPE.1',
    defaultMessage: '新服'
  },
  hot2: {
    id: 'STATUS.HOTTYPE.2',
    defaultMessage: '满'
  },
  hot3: {
    id: 'STATUS.HOTTYPE.3',
    defaultMessage: '爆满'
  },
  recommend1: {
    id: 'STATUS.RECOMMENDTYPE.1',
    defaultMessage: '不推荐'
  },
  recommend2: {
    id: 'STATUS.RECOMMENDTYPE.2',
    defaultMessage: '推荐'
  },

  serverId: {
    id: 'TABLE.SERVERID',
    defaultMessage: '服务器ID'
  },
  productId: {
    id: 'TABLE.PRODUCTID',
    defaultMessage: '产品ID'
  },
  name: {
    id: 'TABLE.NAME',
    defaultMessage: '名称'
  },
  group: {
    id: 'TABLE.GROUP',
    defaultMessage: '分组'
  },
  type: {
    id: 'TABLE.TYPE',
    defaultMessage: '类型'
  },
  ip: {
    id: 'FORM.IP',
    defaultMessage: 'IP 地址'
  },
  boom: {
    id: 'TABLE.BOOM',
    defaultMessage: '火爆程度'
  },
  open: {
    id: 'TABLE.STATUS_OPEN',
    defaultMessage: '开服状态'
  },
  charge: {
    id: 'TABLE.CHARGE_STATUS',
    defaultMessage: '充值开启'
  },
  rely_pro: {
    id: 'TABLE.PRODUCT_RELY',
    defaultMessage: '依赖产品'
  },
  rely_cell: {
    id: 'TABLE.CELL_RELY',
    defaultMessage: '依赖节点'
  },
  openTime: {
    id: 'TABLE.OPENTIME',
    defaultMessage: '开启时间'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  update: {
    id: 'BUTTON.UPDATE',
    defaultMessage: '修改'
  }
})


export default class List extends Component {
  state = {
    dataSource: [],
    count: 0,
    editing: {},
    currentItem: {},
    modalType: 'update',
    visible: false
  }

  initials = {
    map: {
      recommendTypes: { 1: this.props.intl.formatMessage(message.recommend1), 2: this.props.intl.formatMessage(message.recommend2) },
      hotTypes: { 1: this.props.intl.formatMessage(message.hot1), 2: this.props.intl.formatMessage(message.hot2), 3: this.props.intl.formatMessage(message.hot3) },
      serverStatus: { 1: this.props.intl.formatMessage(message.zhengchang), 2: this.props.intl.formatMessage(message.weihu), 3: this.props.intl.formatMessage(message.bukeyong), 4: this.props.intl.formatMessage(message.chuzhi), 5: this.props.intl.formatMessage(message.wancheng), 6: this.props.intl.formatMessage(message.ceshi) }
    },
    conf: {
      serverStatus: { 'open': 1, 'stop': 2 }
    }
  }

  constructor(props) {
    super(props)
    const { intl } = this.props
    this.columns = [
      {
        title: intl.formatMessage(message.serverId),
        dataIndex: 'serverId',
        key: 'serverId'
      }, {
        title: intl.formatMessage(message.productId),
        dataIndex: 'productId',
        key: 'productId'
      }, {
        title: intl.formatMessage(message.name),
        dataIndex: 'serverName',
        key: 'serverName'
      }, {
        title: intl.formatMessage(message.group),
        dataIndex: 'group',
        key: 'group'
      }, {
        title: intl.formatMessage(message.type),
        dataIndex: 'recommend',
        key: 'recommend',
        render: (text, record) => {
          return this.initials.map.recommendTypes[record.recommend]
        }
      }, {
        title: intl.formatMessage(message.ip),
        dataIndex: 'serverAddress',
        key: 'serverAddress'
      }, {
        title: intl.formatMessage(message.boom),
        dataIndex: 'hot',
        key: 'hot',
        render: (text, record) => {
          return this.initials.map.hotTypes[record.hot]
        }
      }, {
        title: intl.formatMessage(message.open),
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => {
          return this.initials.map.serverStatus[record.status]
        }
      }, {
        title: intl.formatMessage(message.charge),
        dataIndex: 'purchaseOpen',
        key: 'purchaseOpen',
        render: (text, record) => {
          return record.purchaseOpen ? 'YES' : <span style={{ color: '#FF3300' }}>NO</span>
        }
      }, {
        title: intl.formatMessage(message.rely_pro),
        dataIndex: 'declaredPro',
        key: 'declaredPro'
      }, {
        title: intl.formatMessage(message.rely_cell),
        dataIndex: 'declaredCell',
        key: 'declaredCell'
      }, {
        title: intl.formatMessage(message.openTime),
        dataIndex: 'openingTime',
        key: 'openingTime'
      }, {
        title: intl.formatMessage(message.action),
        dataIndex: 'action',
        render: (text, record) => {
          let menuOptions = []
          _.forEach(record.curd, (value, key, collection) => {
            switch (key) {
              case '20302':
                menuOptions.push({key: 'UPDATE', name: intl.formatMessage(message.update)})
                break
              default:

            }
          })
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={menuOptions}
              dropdownProps={{
                trigger: ['hover']
              }}
            />
          )
        }
      }
    ]
  }

  componentWillReceiveProps(nextProps) {
    const server = nextProps.data
    let dataSource = []
    server.list.map(function(elem, index) {
      dataSource.push({key: index, ...elem})
    })
    this.setState({
      dataSource: [...dataSource],
      count: dataSource.length
    })
  }

  onEditItem = (record) => {
    _.map(this.state.dataSource, (val, index) => {
      if (val.key === record.key) {
        this.setState({
          currentItem: record,
          visible: true,
          editing: val
        })
      }
    })
  }

  onUpdate = (fieldsValue) => {
    const dataSource = [...this.state.dataSource]
    _.map(dataSource, (val, index) => {
      if (val.key === this.state.editing.key) {
        val = Object.assign(val, fieldsValue)
      }
    })
    this.setState({
      visible: false,
      dataSource: [...dataSource]
    })
    this.props.onUpdate(fieldsValue)
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  onModalLoad = () => {
    return this.state
  }

  handleMenuClick = (record, e) => {
    if (e.key === 'UPDATE') {
      this.onEditItem(record)
    }
  }

  render() {
    const {curd, intl} = this.props
    let pagination = {
      showSizeChanger: true,
      defaultPageSize: 50,
      pageSizeOptions: ['20', '50', '100', '200', '500'],
      total: this.state.count
    }
    let list = _.forEach(this.state.dataSource, function(value, index, collection) {
      value.curd = curd
    })
    return (
      <div>
        <Table bordered dataSource={list} columns={this.columns} pagination={pagination} />
        <Modal
          width={1000}
          maskClosable={false}
          key={Math.random()}
          title={intl.formatMessage(message.update)}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <ServerModal
            intl={intl}
            data={this.props.data}
            options={this.props.options}
            onModalLoad={this.onModalLoad}
            onUpdate={this.onUpdate}
            onSubmitting={this.handleCancel}
            onRender={this.props.onRender}
          />
        </Modal>
      </div>
    )
  }

}

List.propTypes = {
  intl: PropTypes.object,
  curd: PropTypes.object,
  data: PropTypes.object,
  options: PropTypes.object,
  onUpdate: PropTypes.func,
  onRender: PropTypes.func
}
