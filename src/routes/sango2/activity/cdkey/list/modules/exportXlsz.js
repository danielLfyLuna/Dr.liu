import _ from 'lodash'
import js2excel from 'js2excel'
import moment from 'moment'
function baseInfoXlsz (itemData) {
  const columns1 = [
    {
      name: 'cdkey',
      prop: 'cdkey'
    },
    {
      name: '产品ID',
      prop: 'productId'
    },
    {
      name: '服务器ID',
      prop: 'serverId'
    },
    {
      name: '用户ID',
      prop: 'userId'
    },
    {
      name: '最近使用',
      prop: 'currentDate'
    },
    {
      name: '状态',
      prop: 'state'
    }
  ]

  const columns2 = [
    {
      name: 'cdkey',
      prop: 'cdkey'
    },
    {
      name: '产品ID',
      prop: 'productId'
    },
    {
      name: '服务器ID',
      prop: 'serverId'
    },
    {
      name: '平台ID',
      prop: 'uid'
    },
    {
      name: '使用数量',
      prop: 'useCount'
    },
    {
      name: '使用日期',
      prop: 'usedDates'
    }
  ]

  let columns = []
  let rows = []

  if (itemData.cdkeyUsedLogList && itemData.cdkeyUsedLogList.length) {
    columns = columns1
    _.map(itemData.cdkeyUsedLogList, (value, index, collection) => {
      rows.push({
        cdkey: value.cdkey,
        productId: value.productId,
        serverId: value.serverId,
        userId: value.userId,
        currentDate: value.currentDate,
        state: value.state
      })
    })
  } else if (itemData.cdkeyUserUsedList && itemData.cdkeyUserUsedList.length) {
    columns = columns2
    _.map(itemData.cdkeyUserUsedList, (value, index, collection) => {
      rows.push({
        cdkey: value.cdkey,
        productId: value.productId,
        serverId: value.serverId,
        uid: value.uid,
        useCount: value.useCount,
        usedDates: value.usedDates
      })
    })
  }

  try {
    js2excel(columns, rows, `CDKEY_${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  } catch (e) {
    console.error('export error')
  }
}

export {
  baseInfoXlsz
}
