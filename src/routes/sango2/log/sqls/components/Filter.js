import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Modal, Icon, Row, Col } from 'antd'
import _ from 'lodash'

import SqlsModal from './Modal'


export class SqlsFilter extends Component {

  static propTypes = {
    curd: PropTypes.object.isRequired,
    execSqls: PropTypes.object,
    onSubmit: PropTypes.func,
    options: PropTypes.array,
    form: PropTypes.object,
    onSearch: PropTypes.func
  }

  state = {
    currentItem: {},
    modalType: 'create',
    visible: false
  }

  onModalLoad = () => {
    return this.state
  }

  handleAddSqls = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.props.onSearch()
      }
    })
  }

  render() {
    const {curd} = this.props

    const ColProps = {
      xs: 24,
      sm: 12,
      style: {
        marginBottom: 6
      }
    }

    const TwoColProps = {
      ...ColProps,
      xl: 96
    }
    return (
      <div>
        <Form onSubmit={this.handleSearch} >
          <Row gutter={10}>
            <Col {...TwoColProps} xl={{ span: 3 }} md={{ span: 4 }} sm={{ span: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                  _.has(curd, '150502')
                  ?
                    <div>
                      <Button type='primary' className='margin-right' htmlType='submit' style={{marginRight: '16px'}}><Icon type='search' />查询</Button>
                    </div>
                  :
                    ''
                }
                {
                  _.has(curd, '150501')
                  ?
                    <div>
                      <Button type='danger' onClick={this.handleAddSqls}><Icon type='file-add' />添加SQL查询</Button>
                    </div>
                  :
                    ''
                }
              </div>
            </Col>
          </Row>
        </Form>

        <Modal
          width={900}
          key={Math.random()}
          title='添加 SQL 查询'
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <SqlsModal
            options={this.props.options}
            onModalLoad={this.onModalLoad}
            onSubmit={this.props.onSubmit}
            onCreate={this.handleCancel}
            execSqls={this.props.execSqls}
          />
        </Modal>
      </div>
    )
  }
}

const Filter = Form.create()(SqlsFilter)

export default Filter
