import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {Modal} from 'antd'
import { defineMessages } from 'react-intl'

import {mapKeys} from '../modules/Mapping'

const message = defineMessages({
  off: {
    id: 'BUTTON.OFF',
    defaultMessage: '关闭'
  },
  detail: {
    id: 'BUTTON.DETAIL',
    defaultMessage: '详情'
  },
  playerId: {
    id: 'TABLE.PLAYERID',
    defaultMessage: '玩家 ID'
  },
  nickname: {
    id: 'TABLE.NICKNAME',
    defaultMessage: '玩家昵称'
  },
  platformId: {
    id: 'TABLE.PLATFORMID',
    defaultMessage: '平台 ID'
  },
  channelId: {
    id: 'TABLE.CHANNELID',
    defaultMessage: '渠道 ID'
  },
  photo: {
    id: 'TABLE.PHOTO',
    defaultMessage: '头像'
  },
  level: {
    id: 'TABLE.LEVEL',
    defaultMessage: '等级'
  },
  gender: {
    id: 'TABLE.GENDER',
    defaultMessage: '性别'
  },
  job: {
    id: 'TABLE.JOB',
    defaultMessage: '职业'
  },
  fight: {
    id: 'TABLE.FIGHT',
    defaultMessage: '战力'
  },
  diamond: {
    id: 'TABLE.DIAMOND',
    defaultMessage: '钻石'
  },
  diamond_binding: {
    id: 'TABLE.DIAMOND_BINDING',
    defaultMessage: '绑定钻石'
  },
  coin: {
    id: 'TABLE.COIN',
    defaultMessage: '金币'
  },
  huanggong: {
    id: 'TABLE.HUANGGONG',
    defaultMessage: '皇宫宝藏积分'
  },
  stone: {
    id: 'TABLE.STONE',
    defaultMessage: '技能兑换石'
  },
  exp: {
    id: 'TABLE.EXP',
    defaultMessage: '经验'
  },
  vip: {
    id: 'TABLE.VIP',
    defaultMessage: 'VIP等级'
  },
  alliance: {
    id: 'TABLE.ALLIANCE',
    defaultMessage: '联盟'
  },
  alliance_coord: {
    id: 'TABLE.ALLIANCE_COORD',
    defaultMessage: '联盟坐标'
  },
  city: {
    id: 'TABLE.CITY',
    defaultMessage: '个人主城'
  },
  energy: {
    id: 'TABLE.ENERGY',
    defaultMessage: '体力'
  },
  monthCard: {
    id: 'TABLE.ENDTIME_MONTHCARD',
    defaultMessage: '月卡到期时间'
  },
  weekCard: {
    id: 'TABLE.ENDTIME_WEEKCARD',
    defaultMessage: '周卡到期时间'
  },
  createTime: {
    id: 'TABLE.CREATETIME',
    defaultMessage: '创建时间'
  },
  last_login: {
    id: 'TABLE.LAST_LOGIN',
    defaultMessage: '最近登录'
  },
  occupyCity: {
    id: 'TABLE.OCCUPYCITY',
    defaultMessage: '占领城池'
  },
  baninfo: {
    id: 'TABLE.BANINFO',
    defaultMessage: '禁言信息'
  },
  soldier: {
    id: 'TABLE.SOLDIER',
    defaultMessage: '将领信息'
  },
  payinfo: {
    id: 'TABLE.PAYINFO',
    defaultMessage: '充值记录'
  },
  online: {
    id: 'TABLE.ONLINE',
    defaultMessage: '在线状态'
  }
})


export function lightBox(imgUrl, intlShape) {
  Modal.info({
    title: intlShape.formatMessage(message.photo),
    okText: intlShape.formatMessage(message.off),
    width: 600,
    content: (
      <img src={imgUrl} />
    ),
    onOk() {}
  })
}

export function info(data, intlShape) {
  let arr = []
  _.forEach(data, function(value, key, collection) {
    // 没有值得不显示
    if (value === null) {
      return
    }

    // 不显示在详情列表的部分字段 比如 key: 1
    if (mapKeys[key] === false) {
      return
    }

    // 头像处理
    if (key === 'headImageUrl') {
      arr.push(
        <li key={key}>
          <span>{intlShape.formatMessage(message[mapKeys[key]])}</span>
          <span><img style={{maxWidth: '150px'}} src={value} /></span>
        </li>
      )
      return
    }

    // 时间处理
    if ((key === 'monthCardEndTime') || (key === 'weekCardEndTime')) {
      arr.push(
        <li key={key}>
          <span>{intlShape.formatMessage(message[mapKeys[key]])}</span>
          <span>{value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>
        </li>
      )
      return
    }

    if (mapKeys[key]) {
      arr.push(
        <li key={key}>
          <span>{intlShape.formatMessage(message[mapKeys[key]])}</span>
          <span>{value}</span>
        </li>
      )
    }
  })

  Modal.info({
    title: intlShape.formatMessage(message.detail),
    okText: intlShape.formatMessage(message.off),
    width: 600,
    content: (
      <div className='box-large'>
        <ul className='box-list'>
          {arr}
        </ul>
      </div>
    ),
    onOk() {}
  })
}
