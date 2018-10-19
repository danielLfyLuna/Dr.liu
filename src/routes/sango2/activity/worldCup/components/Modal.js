import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, InputNumber, Switch } from 'antd'

const FormItem = Form.Item

class Modals extends Component {
  static propTypes = {
    data: PropTypes.object,
    form: PropTypes.object,
    icons: PropTypes.string,
    onSend: PropTypes.func,
    handleCancel: PropTypes.func
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let val = {}
        if (this.props.icons === 'country') {
          val = {
            countryId: this.props.data.countryId,
            index: values.index,
            eliminated: values.eliminated
          }
        } else if (this.props.icons === 'versus') {
          val = {
            versusId: this.props.data.versusId,
            hostCountryScore: values.hostCountryScore,
            guestCountryScore: values.guestCountryScore
          }
        } else { return }
        this.props.onSend(val)
        this.props.handleCancel()
      }
    })
  }

  render() {
    const { form: { getFieldDecorator }, data, icons } = this.props

    const liStyle = {
      marginBottom: '15px'
    }

    const styleTitle = {
      background: 'rgb(233, 233, 233)',
      padding: '5px 15px 5px 5px',
      fontSize: '12px',
      width: '80px'
    }

    const contentTitle = {
      background: '#FFF8DC',
      padding: '5px 15px 5px 15px',
      fontSize: '12px',
      minWidth: '120px'
    }

    return (
      <div>
        {
          icons === 'versus' &&
          <ul>
            <li style={{...liStyle}}>
              <span style={{...styleTitle}}>比赛ID:</span><span style={{...contentTitle}}>{data.versusId}</span>
              <span style={{...styleTitle}}>主队名字:</span><span style={{...contentTitle}}>{data.hostCountryName}</span>
              <span style={{...styleTitle}}>客队名字:</span><span style={{...contentTitle}}>{data.guestCountryName}</span>
            </li>
          </ul>
        }
        {
          icons === 'country' &&
          <ul>
            <li style={{...liStyle}}>
              <span style={{...styleTitle}}>国家ID:</span><span style={{...contentTitle}}>{data.countryId}</span>
              <span style={{...styleTitle}}>国家名称:</span><span style={{...contentTitle}}>{data.countryName}</span>
            </li>
          </ul>
        }
        <Form hideRequiredMark onSubmit={this.handleSearch} layout='inline'>
          {
            icons === 'versus' &&
            <FormItem
              label='主队得分'
            >
              {getFieldDecorator('hostCountryScore', {
                rules: [{ required: true, message: '请输入主队得分' }, { pattern: /^\d+$/, message: '非负整数' }],
                initialValue: data.hostCountryScore
              })(
                <InputNumber
                  min={0}
                />
              )}
            </FormItem>
          }
          {
            icons === 'versus' &&
            <FormItem
              label='客队得分'
            >
              {getFieldDecorator('guestCountryScore', {
                rules: [{ required: true, message: '请输入客队得分' }, { pattern: /^\d+$/, message: '非负整数' }],
                initialValue: data.guestCountryScore
              })(
                <InputNumber
                  min={0}
                />
              )}
            </FormItem>
          }
          {
            icons === 'country' &&
            <FormItem
              label='国家排名'
            >
              {getFieldDecorator('index', {
                rules: [{ required: true, message: '请输入排名' }, { pattern: /^\d+$/, message: '非负整数' }],
                initialValue: data.index
              })(
                <InputNumber
                  min={0}
                />
              )}
            </FormItem>
          }
          {
            icons === 'country' &&
            <FormItem
              label='是否淘汰'
            >
              {getFieldDecorator('eliminated', {
                rules: [{ required: true, message: '请选择是否淘汰' }],
                initialValue: data.eliminated
              })(
                <Switch checkedChildren='是(淘汰)' unCheckedChildren='否(未淘汰)' defaultChecked={data.eliminated} />
              )}
            </FormItem>
          }

          <Button style={{ marginLeft: '10px' }} type='primary' htmlType='submit'>提交</Button>
        </Form>
      </div>
    )
  }
}

const ModalsF = Form.create()(Modals)

export default ModalsF
