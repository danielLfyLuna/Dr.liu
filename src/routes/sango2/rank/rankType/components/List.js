import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'


export default class List extends Component {

  state = {
    dataSource: []
  }

  constructor(props) {
    super(props)
    this.equipColumns = [{
        title: '装备名称',
        dataIndex: 'elementName'
      }, {
        title: '装备id',
        dataIndex: 'elementId'
      }, {
        title: '装备积分',
        dataIndex: 'elementScore'
      }, {
        title: '排名',
        dataIndex: 'idx'
      }, {
        title: '玩家名字',
        dataIndex: 'name'
      }, {
        title: 'id',
        dataIndex: 'id'
      }, {
        title: '鲜花数',
        dataIndex: 'flowerNum'
      }, {
        title: '等级',
        dataIndex: 'level'
      }, {
        title: '联盟当前人数',
        dataIndex: 'curNumber'
      }, {
        title: '联盟id',
        dataIndex: 'allianceId'
      }, {
        title: '道具模板id',
        dataIndex: 'itemTemplateId'
      }, {
        title: '联盟最大人数',
        dataIndex: 'maxNumber'
      }, {
        title: '联盟所在州',
        dataIndex: 'regionId'
      }, {
        title: '战力',
        dataIndex: 'fightCapacity'
      }]

    this.rechargeColumns = [{
        title: '排名',
        dataIndex: 'indx'
      }, {
        title: '玩家id',
        dataIndex: 'playerId'
      }, {
        title: '昵称',
        dataIndex: 'nickname'
      }, {
        title: '累计充值RMB',
        dataIndex: 'accumulateRmb'
      }, {
        title: '平台id',
        dataIndex: 'platformId'
      }, {
        title: '性别',
        dataIndex: 'gender'
      }, {
        title: '等级',
        dataIndex: 'level'
      }, {
        title: '职业',
        dataIndex: 'job'
      }, {
        title: '使用rmb兑换的货币',
        dataIndex: 'coin'
      }, {
        title: 'coin的代币(系统产出),与coin等价/不可交易',
        dataIndex: 'coinToken'
      }, {
        title: '金币,系统产出的货币',
        dataIndex: 'gold'
      }, {
        title: '当前经验',
        dataIndex: 'curExp'
      }, {
        title: 'vip等级',
        dataIndex: 'vipLevel'
      }, {
        title: '战力',
        dataIndex: 'fightCapacity'
      }, {
        title: '联盟',
        dataIndex: 'alliance'
      }]

    this.columns = [{
        title: '名字',
        dataIndex: 'name'
      }, {
        title: 'id',
        dataIndex: 'id'
      }, {
        title: '排名',
        dataIndex: 'idx'
      }, {
        title: '鲜花数',
        dataIndex: 'flowerNum'
      }, {
        title: '装备id',
        dataIndex: 'elementId'
      }, {
        title: '装备名称',
        dataIndex: 'elementName'
      }, {
        title: '等级',
        dataIndex: 'level'
      }, {
        title: '装备积分',
        dataIndex: 'elementScore'
      }, {
        title: '联盟当前人数',
        dataIndex: 'curNumber'
      }, {
        title: '联盟id',
        dataIndex: 'allianceId'
      }, {
        title: '道具模板id',
        dataIndex: 'itemTemplateId'
      }, {
        title: '联盟最大人数',
        dataIndex: 'maxNumber'
      }, {
        title: '联盟所在州',
        dataIndex: 'regionId'
      }, {
        title: '战力',
        dataIndex: 'fightCapacity'
      }]

    this.weaponColumns = [{
        title: '名字',
        dataIndex: 'name'
      }, {
        title: 'id',
        dataIndex: 'id'
      }, {
        title: '排名',
        dataIndex: 'idx'
      }, {
        title: '鲜花数',
        dataIndex: 'flowerNum'
      }, {
        title: '神兵id',
        dataIndex: 'elementId'
      }, {
        title: '神兵名称',
        dataIndex: 'elementName'
      }, {
        title: '等级',
        dataIndex: 'level'
      }, {
        title: '神兵评分',
        dataIndex: 'elementScore'
      }, {
        title: '联盟当前人数',
        dataIndex: 'curNumber'
      }, {
        title: '联盟id',
        dataIndex: 'allianceId'
      }, {
        title: '道具模板id',
        dataIndex: 'godWeaponTempId'
      }, {
        title: '联盟最大人数',
        dataIndex: 'maxNumber'
      }, {
        title: '联盟所在州',
        dataIndex: 'regionId'
      }, {
        title: '战力',
        dataIndex: 'fightCapacity'
      }, {
        title: '星级',
        dataIndex: 'starUp'
      }]

    this.horseColumns = [{
        title: '名字',
        dataIndex: 'name'
      }, {
        title: 'id',
        dataIndex: 'id'
      }, {
        title: '排名',
        dataIndex: 'idx'
      }, {
        title: '鲜花数',
        dataIndex: 'flowerNum'
      }, {
        title: '坐骑id',
        dataIndex: 'elementId'
      }, {
        title: '坐骑名称',
        dataIndex: 'elementName'
      }, {
        title: '等级',
        dataIndex: 'level'
      }, {
        title: '坐骑评分',
        dataIndex: 'elementScore'
      }, {
        title: '联盟当前人数',
        dataIndex: 'curNumber'
      }, {
        title: '联盟id',
        dataIndex: 'allianceId'
      }, {
        title: '道具模板id',
        dataIndex: 'godWeaponTempId'
      }, {
        title: '联盟最大人数',
        dataIndex: 'maxNumber'
      }, {
        title: '联盟所在州',
        dataIndex: 'regionId'
      }, {
        title: '战力',
        dataIndex: 'fightCapacity'
      }]
  }

  _setTable = (e) => {
    if (e === 'equip' || e === 'cross/equip') {
      return this.equipColumns
    } else if (e === 'weapon' || e === 'cross/weapon') {
      return this.weaponColumns
    } else if (e === 'horse' || e === 'cross/horse') {
      return this.horseColumns
    } else if (e === 'recharge/ranking') {
      return this.rechargeColumns
    } else {
      return this.columns
    }
  }

  // _setTitle = (e) => {
  //   if (e === 'fight') { return '个人战力榜' }
  //   if (e === 'cross/fight') { return '个人战力榜(跨服)' }
  //   if (e === 'alliance') { return '联盟势力榜' }
  //   if (e === 'cross/alliance') { return '联盟势力榜(跨服)' }
  //   if (e === 'level') { return '个人等级榜' }
  //   if (e === 'cross/level') { return '个人等级榜(跨服)' }
  //   if (e === 'equip') { return '装备积分榜' }
  //   if (e === 'cross/equip') { return '装备积分榜(跨服)' }
  //   if (e === 'flower') { return '鲜花榜(跨服)' }
  //   return ''
  // }
  componentWillReceiveProps() {

  }

  render() {
    const dataSource = this.props.data

    return (
      <Table
        title={() => {
          if (this.props.rankName === 'fightCapacity') { return '个人战力榜' }
          if (this.props.rankName === 'cross/fightCapacity') { return '个人战力榜(跨服)' }
          if (this.props.rankName === 'alliance') { return '联盟势力榜' }
          if (this.props.rankName === 'cross/alliance') { return '联盟势力榜(跨服)' }
          if (this.props.rankName === 'level') { return '个人等级榜' }
          if (this.props.rankName === 'cross/level') { return '个人等级榜(跨服)' }
          if (this.props.rankName === 'equip') { return '装备积分榜' }
          if (this.props.rankName === 'cross/equip') { return '装备积分榜(跨服)' }
          if (this.props.rankName === 'cross/flower') { return '鲜花榜(跨服)' }
          if (this.props.rankName === 'recharge/ranking') { return '充值榜' }
          return ''
        }}
        bordered
        dataSource={dataSource}
        columns={this._setTable(this.props.rankName)}
        // rowKey='elementId'
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 50,
          pageSizeOptions: ['20', '50', '100', '200', '500']
        }}
        loading={this.props.fetching}
      />
    )
  }

}

List.propTypes = {
  data: PropTypes.array,
  rankName: PropTypes.string,
  fetching: PropTypes.bool
}
