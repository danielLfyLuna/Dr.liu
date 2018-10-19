import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Tooltip } from 'antd'
import _ from 'lodash'


export default class List extends Component {

  static propTypes = {
    banHeadImage: PropTypes.func,
    headImage: PropTypes.object,
    curd: PropTypes.object
  }

  state = {
    checkList: []
  }

  onBan = (e, t, c) => {
    this.props.banHeadImage({
      products: [t, c],
      playerId: e
    })
  }

  onCheck = (e) => {
    if (e.target.checked) {
      this.state.checkList.push(e.target.value)
    } else {
      _.map(this.state.checkList, (v, i) => {
        if (v == e.target.value) {
          this.state.checkList.splice(i, 1)
          return
        }
      })
    }
  }

  render() {
    const { curd } = this.props

    const items = _.map(this.props.headImage.list, (v, k) => {
      return (
        <li
          key={v.playerId}
          style={{float: 'left', textAlign: 'center', padding: '5px 15px 10px', margin: '10px 5px', border: '1px solid #AAA', borderRadius: '10px'}}
        >
          {/* <Checkbox onChange={this.onCheck} value={v.playerId} style={{marginBottom: '5px'}}>选中</Checkbox> */}
          <p>{v.playerId}</p>
          <Tooltip
            title={
              <img
                src={v.headImg}
                style={{
                  width: '200px',
                  height: '200px'
                }}
              />
            }
            trigger='click'
          >
            <img
              src={v.headImg}
              style={{
                width: '80px',
                height: '80px',
                display: 'block',
                marginBottom: '10px'
              }}
            />
          </Tooltip>
          {
            _.has(curd, 70902) &&
            <Button
              type='primary'
              key={v.playerId}
              onClick={() => this.onBan(v.playerId, v.productId, v.serverId)}
              disabled={!!(v.isBan)}
            >
              { v.isBan ? '已禁用' : '禁用头像' }
            </Button>
          }
        </li>
      )
    })

    return (
      <div>
        {
          this.props.headImage.list.length > 0 ?
            <ul>
              {items}
            </ul>
          :
            <div style={{margin: '0 auto'}}>暂无数据</div>
        }
      </div>
    )
  }

}
