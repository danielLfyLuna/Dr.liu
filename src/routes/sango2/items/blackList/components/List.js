import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Popconfirm } from 'antd'
// import { Radio } from 'antd'
import _ from 'lodash'

const ButtonGroup = Button.Group
// const RadioButton = Radio.Button
// const RadioGroup = Radio.Group

export default class List extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired,
    debounce: PropTypes.bool,
    onDelete: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.columns = [
      { title: 'ID', dataIndex: 'itemId', key: 'itemId' },
      { title: '等级', dataIndex: 'level', key: 'level' },
      { title: '名称', dataIndex: 'name', key: 'name' },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record, index) => {
          const {curd} = this.props
          if (_.has(curd, '120202')) {
            return (
              <Popconfirm title='您确定要删除此条吗?' onConfirm={() => this.onDelete(text, record, index)} okText='Yes' cancelText='No'>
                <Button size='small' type='danger'>删除</Button>
              </Popconfirm>
            )
          } else {
            return (
              <span>没有删除权限</span>
            )
          }
        }
      }
    ]

    this.state = {
      dataSource: []
    }

    // 记录查询类型 0道具 4技能 5武将
    this.requestType = 0

    // 保留stroe的原始信息
    this.list = []

    this.onDelete = this.onDelete.bind(this)
  }

  onDelete = (text, record, index) => {
    this.props.onDelete(record)
  }

  onRadioGroupChange = (e) => {
    this.props.onSearch(e.target.value)
    this.requestType = _.toNumber(e.target.value)
  }
  onButtonGroup = (e, value) => {
    this.props.onSearch(value)
    this.requestType = _.toNumber(value)
  }

  render() {
    const {debounce, curd} = this.props
    return (
      <div>
        {
          _.has(curd, '120203')
          ?
            <ButtonGroup style={{marginBottom: '16px'}}>
              <Button onClick={(e) => this.onButtonGroup(e, 0)}>道具</Button>
              <Button onClick={(e) => this.onButtonGroup(e, 4)}>技能</Button>
              <Button onClick={(e) => this.onButtonGroup(e, 5)}>武将</Button>
            </ButtonGroup>
          :
            ''
        }
        {/* <RadioGroup onChange={this.onRadioGroupChange} style={{marginBottom: '16px'}} defaultValue='0' size='large'>
          <RadioButton value='0'>道具</RadioButton>
          <RadioButton value='4'>技能</RadioButton>
          <RadioButton value='5'>武将</RadioButton>
        </RadioGroup> */}
        <Table
          bordered
          dataSource={this.state.dataSource}
          loading={debounce}
          columns={this.columns}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 50,
            pageSizeOptions: ['20', '50', '100', '200', '500']
          }}
        />
      </div>
    )
  }

  componentDidUpdate() {  // 可以修改DOM
    this.list = this.props.data
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(nextProps, nextState) {
    const requestType = this.requestType
    const data = _.map(nextProps.data, function(value, index, collection) {
      return {
        key: index,
        requestType,
        itemId: value.itemId,
        level: value.level,
        name: value.name
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
}
