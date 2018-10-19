import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Tabs, Tooltip, Steps, Icon } from 'antd'
import _ from 'lodash'

import Filter from './Filter'
import List from './List'
import Result from './Result'
import ListIndex from '../../templateDetails/containers/IndexContainer'
import './Style.scss'

const { TabPane } = Tabs
const { Step } = Steps

export default class Page extends Component {
  state = {}

  componentWillMount() {
    this.props.fetchProductsMap()
  }

  onSearch = (values) => {
    if (values.handle === 'SEARCH') {
      this.props.fetchTemplates(values)
    }
  }

  onSend = (values) => {
    this.props.sendBatch(values)
  }

  _productReduce = (options) => {
    return _.reduce(options, (result, option) => {
      result.push({ value: option.value, label: option.label })
      return result
    }, [])
  }

  // _serverReduce = (options, productId) => {
  //   return _.reduce(options, (result, option) => {
  //     if (option.value === productId) {
  //       result = _.reduce(option.children, (res, opt) => {
  //         res.push({ value: opt.value, label: opt.label })
  //         return res
  //       }, [])
  //     }
  //     return result
  //   }, [])
  // }

  renderStep = () => {
    return (
      <Steps size='small' direction='vertical'>
        <Step status='process' title='' description='查询活动模板列表(选择产品/服务器查询)' />
        <Step status='process' title='' description='将需要配置的活动拖至右侧选择栏内，选择/填写需要配置的产品、服务器、开始时间和结束时间。注：1.区间填写服务器方式， * 表示选择全部服务器。2.全选服务器方式选择为目标产品下全部服务器' />
        <Step status='process' title='' description='提交配置，将每个选择的活动配置到选择的每个服务器。在下方列表内可查看提交后的配置情况。' />
      </Steps>
    )
  }

  render() {
    const { allTemplates, products, login } = this.props
    const options = {
      allTemplates,
      login,
      products: {
        options: products.options,
        list: this._productReduce(products.options)
      },
      // servers: {
      //   list: this._serverReduce(products.options, initials.products.productId)
      // },
      authorize: login.authorize
    }

    return (
      <Card style={{marginBottom: 6}}>
        <Tabs defaultActiveKey='add'>
          <TabPane tab={
            <div>
              批量配置活动&nbsp;&nbsp;
              <Tooltip overlayClassName='activityTitleOutside' title={this.renderStep} placement='rightBottom' >
                <Icon type='question-circle-o' />
              </Tooltip>
            </div>
          }
            key='add'
          >
            {
              options.authorize.includes(90109) &&
                <Filter
                  options={options}
                  onSearch={this.onSearch}
                />
            }
            <div style={{
              background: '#e8e8e8',
              display: 'block',
              height: '1px',
              width: '100%',
              margin: '24px 0',
              clear: 'both',
              verticalAlign: 'middle'
            }} />

            {
              options.authorize.includes(90111) &&
              <List
                options={options}
                onSend={this.onSend}
              />
            }
            <div style={{
              background: '#e8e8e8',
              display: 'block',
              height: '1px',
              width: '100%',
              margin: '24px 0',
              clear: 'both',
              verticalAlign: 'middle'
            }} />
            <Result
              data={allTemplates}
            />
          </TabPane>
          <TabPane tab='查询活动' key='get'>
            <ListIndex />
          </TabPane>
        </Tabs>
      </Card>
    )
  }
}

Page.propTypes = {
  allTemplates: PropTypes.object,
  products: PropTypes.object,
  login: PropTypes.object,
  fetchTemplates: PropTypes.func,
  sendBatch: PropTypes.func,
  fetchProductsMap: PropTypes.func
}
