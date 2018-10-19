import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table, Avatar, Modal, Icon, Button } from 'antd'
const confirm = Modal.confirm
import _ from 'lodash'
import moment from 'moment'
import { defineMessages } from 'react-intl'

import {info, lightBox} from './DialogAlert'
import DialogNickName from './DialogNickName'

import {genderMapKeys, jobMapKeys, onLineKeys} from '../modules/Mapping'
import DropOption from './../../../../../components/DropOption/DropOption'


const message = defineMessages({
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
  regionId: {
    id: 'TABLE.REGIONID',
    defaultMessage: '所在州'
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
  status: {
    id: 'TABLE.STATUS',
    defaultMessage: '状态'
  },
  online: {
    id: 'TABLE.ONLINE_TEXT',
    defaultMessage: '在线'
  },
  action: {
    id: 'TABLE.ACTION',
    defaultMessage: '操作'
  },
  detail: {
    id: 'BUTTON.DETAIL',
    defaultMessage: '详情'
  },
  ban: {
    id: 'BUTTON.BAN_PHOTO',
    defaultMessage: '禁用头像'
  },
  skip: {
    id: 'BUTTON.SKIP_SINGLE',
    defaultMessage: '跳过新手'
  },
  update_nickname: {
    id: 'BUTTON.UPDATE_NICKNAME',
    defaultMessage: '修改昵称'
  },
  kick: {
    id: 'BUTTON.KICK',
    defaultMessage: '踢人'
  },
  tip_photo_title: {
    id: 'TIP.PHOTO_TITLE',
    defaultMessage: '您确定要删除该玩家头像图片吗?'
  },
  tip_photo_context: {
    id: 'TIP.PHOTO_CONTEXT',
    defaultMessage: '删除后无法在恢复该头像，并且只能在游戏中添加头像！'
  },
  tip_skip_title: {
    id: 'TIP.SKIP_TITLE',
    defaultMessage: '您确定要设置跳过新手吗?'
  },
  tip_skip_context: {
    id: 'TIP.SKIP_CONTEXT',
    defaultMessage: '确认后将设置为跳过新手！'
  },
  tip_quit: {
    id: 'TIP.QUIT',
    defaultMessage: '您确定要强制该用户退出吗?'
  },
  jiangxia: {
    id: 'REGION.JIANGXIA',
    defaultMessage: '江夏'
  },
  wuling: {
    id: 'REGION.WULING',
    defaultMessage: '武陵'
  },
  nanyang: {
    id: 'REGION.NANYANG',
    defaultMessage: '南阳'
  },
  nanjun: {
    id: 'REGION.NANJUN',
    defaultMessage: '南郡'
  },
  qita: {
    id: 'REGION.OTHERS',
    defaultMessage: '其他'
  },
  men: {
    id: 'STATUS.GENDER.MEN',
    defaultMessage: '男'
  },
  women: {
    id: 'STATUS.GENDER.WOMEN',
    defaultMessage: '女'
  },
  zhanshi: {
    id: 'STATUS.JOB.1',
    defaultMessage: '战士'
  },
  sheshou: {
    id: 'STATUS.JOB.2',
    defaultMessage: '射手'
  },
  fashi: {
    id: 'STATUS.JOB.3',
    defaultMessage: '法师'
  },
  offline: {
    id: 'ONLINE.STATUS0',
    defaultMessage: '离线'
  }
})

export default class List extends Component {

  static propTypes = {
    intl: PropTypes.object,
    data: PropTypes.array.isRequired,
    curd: PropTypes.object.isRequired,
    products: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleKickoutHead: PropTypes.func.isRequired,
    handlerRename: PropTypes.func.isRequired,
    handleClearHead: PropTypes.func.isRequired,
    handleResetPassword: PropTypes.func.isRequired,
    updateSkipnovice: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    const intl = this.props.intl
    this.columns = [
      { title: intl.formatMessage(message.playerId), width: 100, dataIndex: 'playerId', key: 'playerId', fixed: 'left' },
      { title: intl.formatMessage(message.nickname), width: 100, dataIndex: 'nickname', key: 'nickname', fixed: 'left' },
      { title: intl.formatMessage(message.platformId), dataIndex: 'platformId', key: 'platformId' },
      { title: intl.formatMessage(message.channelId), dataIndex: 'channelUid', key: 'channelUid' },
      {
        title: intl.formatMessage(message.photo),
        dataIndex: 'headImageUrl',
        key: 'headImageUrl',
        render: (text, record, index) => {
          return (
            <Avatar onClick={() => this.onLightBox(text)} src={text} shape='square' size='large' icon='user' />
          )
        }
      },
      { title: intl.formatMessage(message.level), dataIndex: 'level', key: 'level' },
      { title: intl.formatMessage(message.gender), dataIndex: 'gender', key: 'gender' },
      { title: intl.formatMessage(message.job), dataIndex: 'job', key: 'job' },
      { title: intl.formatMessage(message.fight), dataIndex: 'fightCapacity', key: 'fightCapacity' },
      { title: intl.formatMessage(message.diamond), dataIndex: 'coin', key: 'coin' },
      { title: intl.formatMessage(message.diamond_binding), dataIndex: 'coinToken', key: 'coinToken' },
      { title: intl.formatMessage(message.coin), dataIndex: 'gold', key: 'gold' },
      { title: intl.formatMessage(message.huanggong), dataIndex: 'lotteryScore', key: 'lotteryScore' },
      { title: intl.formatMessage(message.stone), dataIndex: 'skillStone', key: 'skillStone' },
      { title: intl.formatMessage(message.exp), dataIndex: 'curExp', key: 'curExp' },
      { title: intl.formatMessage(message.vip), dataIndex: 'vipLevel', key: 'vipLevel' },
      { title: intl.formatMessage(message.alliance), dataIndex: 'alliance', key: 'alliance' },
      { title: intl.formatMessage(message.alliance_coord), dataIndex: 'alliancePos', key: 'alliancePos' },
      // { title: '占领城池', dataIndex: 'occupyCity', key: 'occupyCity' },
      { title: intl.formatMessage(message.city), dataIndex: 'personalPos', key: 'personalPos' },
      { title: intl.formatMessage(message.regionId),
        dataIndex: 'regionId',
        key: 'regionId',
        render: (text, record, index) => {
          let value = intl.formatMessage(message.qita)
          if (text === 1) { value = intl.formatMessage(message.jiangxia) }
          if (text === 2) { value = intl.formatMessage(message.wuling) }
          if (text === 3) { value = intl.formatMessage(message.nanyang) }
          if (text === 4) { value = intl.formatMessage(message.nanjun) }
          return value
        }
      },
      { title: intl.formatMessage(message.energy), dataIndex: 'energy', key: 'energy' },
      { title: intl.formatMessage(message.monthCard),
        dataIndex: 'monthCardEndTime',
        key: 'monthCardEndTime',
        render: (text, record, index) => {
          return (
            text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'
          )
        }
      },
      { title: intl.formatMessage(message.weekCard),
        dataIndex: 'weekCardEndTime',
        key: 'weekCardEndTime',
        render: (text, record, index) => {
          return (
            text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-'
          )
        }
      },
      { title: intl.formatMessage(message.createTime), dataIndex: 'createDate', key: 'createDate', width: 140 },
      { title: intl.formatMessage(message.last_login), dataIndex: 'lastLoginDate', key: 'lastLoginDate', width: 140 },
      {
        title: intl.formatMessage(message.status),
        dataIndex: 'online',
        fixed: 'right',
        key: 'online',
        width: 100,
        render: (text, record, index) => {
          return (
              text === intl.formatMessage(message.online)
              ?
                <span>{text}<Icon style={{color: 'green'}} type='check' /></span>
              :
                <span>{text}<Icon style={{color: 'red'}} type='close' /></span>
          )
        }
      },
      {
        title: intl.formatMessage(message.action),
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => {
          const {curd} = this.props
          let menuOptions = []
          _.forEach(curd, (value, key, collection) => {
            switch (key) {
              case '70103':
                menuOptions.push({key: '1', name: intl.formatMessage(message.detail)})
                break
              case '70104':
                menuOptions.push({key: '2', name: intl.formatMessage(message.ban)})
                break
              case '70105':
                menuOptions.push({key: '3', name: intl.formatMessage(message.skip)})
                break
              case '70106':
                menuOptions.push({key: '4', name: intl.formatMessage(message.update_nickname)})
                break
              case '70107':
                menuOptions.push({key: '5', name: intl.formatMessage(message.kick)})
                break
              case '70108':
                menuOptions.push({key: '6', name: '解锁二级密码'})
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

    this.state = {
      dataSource: [],
      visible: false,
      passVisible: false,
      passRecord: {}
    }

    // 保留stroe的原始信息
    this.list = []

    this.rename = []
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    const intl = this.props.intl
    const data = _.map(nextProps.data, function(value, index, collection) {
      return {
        key: index,
        playerId: value.playerId,
        nickname: value.nickname,
        platformId: value.platformId,
        channelUid: value.channelUid,
        headImageUrl: value.headImageUrl || '',
        level: value.level,
        gender: intl.formatMessage(message[genderMapKeys[value.gender]]),
        job: intl.formatMessage(message[jobMapKeys[value.job]]),
        fightCapacity: value.fightCapacity,
        coin: value.coin,
        coinToken: value.coinToken,
        gold: value.gold,
        lotteryScore: value.lotteryScore,
        skillStone: value.skillStone,
        curExp: value.curExp,
        vipLevel: value.vipLevel,
        alliance: value.alliance,
        alliancePos: value.alliancePos,
        personalPos: value.personalPos,
        energy: value.energy,
        monthCardEndTime: value.monthCardEndTime,
        weekCardEndTime: value.weekCardEndTime,
        createDate: moment(value.createDate).format('YYYY-MM-DD HH:mm:ss'),
        lastLoginDate: moment(value.lastLoginDate).format('YYYY-MM-DD HH:mm:ss'),

        occupyCity: value.occupyCity || '',
        forbieData: value.forbieData || '',
        soldiers: value.soldiers || '',
        payinfo: value.payinfo || '',
        online: intl.formatMessage(message[onLineKeys[value.online]])
      }
    })
    this.setState({
      dataSource: data
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.list = nextProps.data  // or this.props.data
    return true
  }

  onLightBox = (text) => {
    lightBox(text, this.props.intl)
  }

  handleMenuClick = (record, e) => {
    const list = this.list
    const {intl, handleClearHead, products, updateSkipnovice, handleKickoutHead} = this.props

    if (e.key === '1') {
      info(record, intl)
    }

    if (e.key === '2') {
      confirm({
        title: intl.formatMessage(message.tip_photo_title),
        content: intl.formatMessage(message.tip_photo_context),
        onOk() {
          // 假更新 视觉效果 因为dataSource里的key 是索引 确保本地唯一
          // let recordData = _.map(this.state.dataSource, (value, index, collection) => {
          //   if (value.key === record.key) {
          //     value.headImageUrl = ''
          //     return value
          //   } else {
          //     return value
          //   }
          // })
          // this.setState({
          //   dataSource: recordData
          // })

          // 真更新 因为list没有key 所以使用playerId 确保唯一
          let recordData = _.map(list, (value, index, collection) => {
            if (value.playerId === record.playerId) {
              value.headImageUrl = ''
              return value
            } else {
              return value
            }
          })
          handleClearHead(products.value, record.playerId, recordData)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }

    if (e.key === '3') {
      confirm({
        title: intl.formatMessage(message.tip_skip_title),
        content: intl.formatMessage(message.tip_skip_context),
        onOk() {
          // 真更新 因为list没有key 所以使用playerId 确保唯一
          updateSkipnovice(products.value, record.nickname)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }

    if (e.key === '4') {
      this.rename = record
      this.showModal()
    }

    if (e.key === '5') {
      confirm({
        title: intl.formatMessage(message.tip_quit),
        content: intl.formatMessage(message.tip_quit),
        onOk() {
          // 假更新 视觉效果 因为dataSource里的key 是索引 确保本地唯一
          // let recordData = _.map(this.state.dataSource, (value, index, collection) => {
          //   if (value.key === record.key) {
          //     value.headImageUrl = ''
          //     return value
          //   } else {
          //     return value
          //   }
          // })
          // this.setState({
          //   dataSource: recordData
          // })

          // 真更新 因为list没有key 所以使用playerId 确保唯一
          let recordData = _.map(list, (value, index, collection) => {
            if (value.playerId === record.playerId) {
              value.online = 0
              return value
            } else {
              return value
            }
          })
          handleKickoutHead(products.value, record.playerId, recordData)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }

    if (e.key === '6') {
      const value = {...record, products: products.value}
      this.setState({
        passRecord: value,
        passVisible: true
      })
    }
  }

  handlePassClick = (type) => {
    const value = {
      products: this.state.passRecord.products,
      playerId: this.state.passRecord.playerId,
      type: type
    }
    this.props.handleResetPassword(value)
    this.handlePassCancel()
  }

  handlePassCancel = () => {
    this.setState({
      passVisible: false
    })
  }

  // 叫合成处理 修改名称
  handlerRename = (values) => {
    const list = this.list
    const record = this.rename

    this.props.handlerRename(values, record, list)
  }


  render() {
    const {products, intl} = this.props
    return (
      <div>
        <Table
          bordered
          dataSource={this.state.dataSource}
          columns={this.columns}
          scroll={{ x: 3000 }}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
        <Modal
          width={700}
          maskClosable={false}
          key={Math.random()}
          title={intl.formatMessage(message.update_nickname)}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <DialogNickName
            intl={this.props.intl}
            record={this.rename}
            products={products}
            onCancel={this.handleCancel}
            onSubmit={this.handlerRename}
          />
        </Modal>
        <Modal
          maskClosable={false}
          key={Math.random()}
          title='重置/解锁二级密码'
          visible={this.state.passVisible}
          footer={null}
          onCancel={this.handlePassCancel}
        >
          <div>
            <p style={{ fontSize: '18px', marginBottom: '12px' }}>请选择您要对玩家: {this.state.passRecord.nickname}(id : {this.state.passRecord.playerId})进行的操作:</p>
            <Button style={{ marginRight: '16px' }} type='primary' onClick={() => this.handlePassClick(1)}>解锁</Button>
            <Button style={{ marginRight: '16px' }} type='primary' onClick={() => this.handlePassClick(2)}>重置</Button>
            <Button onClick={this.handlePassCancel}>取消</Button>
          </div>
        </Modal>
      </div>
    )
  }

  componentDidUpdate() {  // 可以修改DOM
    this.list = this.props.data
  }

  componentWillUnmount() {
    this.props.handleUpdate([])
  }
}
