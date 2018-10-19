import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { Button } from 'antd'

import _ from 'lodash'


export default class Modals extends Component {
  static propTypes = {
    data: PropTypes.object,
    goods: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.column = {
      templateId: '模版id',
      activityItemId: '活动itemID',
      clientValue: '武将等级',
      coin: '武将星级',
      description: '武将id',
      level: 'level'
    }
  }

  render() {
    const { data, goods } = this.props

    let rewardsItem = []
    if (data.items) {
      _.map(data.items, (val, idx) => {
        if (val.rewards) {
          let arr = val.rewards.split(';')
          _.map(arr, (v, i) => {
            let itemid = arr[i].split(',')
            let label = `未找到该道具(${itemid[0]})`
            _.map(goods[0], (v, i) => {
              if (v.value === itemid[0]) label = v.label
            })
            rewardsItem.push({
              value: itemid[0],
              count: itemid[1],
              label: label
            })
          })
        }
      })
    }

    const title = {
      display: 'inline-block',
      padding: '3px 16px',
      width: '30%',
      background: '#BBE4FF',
      fontSize: '16px',
      textAlign: 'left'
    }

    const content = {
      display: 'inline-block',
      padding: '3px 16px',
      width: '70%',
      fontSize: '16px',
      textAlign: 'left'
    }

    const body = {
      width: '100%',
      border: '1px solid #ddd'
    }

    const itemTitle = {
      display: 'inline-block',
      background: '#ADFF99',
      fontSize: '16px',
      padding: '3px 16px'
    }

    const itemBody = {
      display: 'inline-block',
      width: '60%',
      fontSize: '16px',
      textAlign: 'left'
    }

    const itemContent = {
      display: 'inline-block',
      width: '40%',
      fontSize: '16px',
      textAlign: 'left'
    }

    return (
      <div>
        <ul>
          {
            _.map(data.items, (vals, idx) => {
              return (
                _.map(vals, (v, i) => {
                  if (this.column[i]) {
                    if (i !== 'description') {
                      return (
                        <li key={i} style={{...body}}><span style={{...title}}>{ this.column[i]}</span><span style={{...content}}>{ v }</span></li>
                      )
                    } else {
                      let desc = `未找到该武将(${v})`
                      _.map(goods[5], (val, ix) => {
                        if (val.value === v) {
                          desc = val.label
                        }
                      })
                      return (
                        <li key={i} style={{...body}}><span style={{...title}}>{ this.column[i]}</span><span style={{...content}}>{ desc }</span></li>
                      )
                    }
                  }
                  if (i === 'rewards') {
                    return (
                      _.map(rewardsItem, (v, i) => {
                        return (
                          <li key={`item${i}`}><span style={{...itemBody}}><span style={{...itemTitle}}>道具名称:</span>{v.label}</span><span style={{...itemContent}}><span style={{...itemTitle}}>道具数量:</span>{v.count}</span></li>
                        )
                      })
                    )
                  }
                })
              )
            })
          }
        </ul>
      </div>
    )
  }
}
