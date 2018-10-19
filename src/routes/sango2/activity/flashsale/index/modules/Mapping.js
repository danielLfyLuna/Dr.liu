import _ from 'lodash'

export const statusMap = {
  1: '等待',
  2: '进行中',
  3: '结束',
  5: '下线'
}

export const updateTimeMap = {
  '-1': '不刷新'
}

export const handleStatusMap = (data) => {
  let newData = ''
  _.forEach(statusMap, function(value, key) {
    if (data == key) {
      newData = value
    }
  })
  return newData
}

export const handleUpdateTimeMap = (data) => {
  let newData = ''
  _.forEach(updateTimeMap, function(value, key) {
    if (data == key) {
      newData = value
    }
  })

  if (newData !== '') {
    return newData
  } else {
    return data
  }
}
