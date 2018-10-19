import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'antd'
import { Link } from 'react-router'


class TempFilter extends Component {

  render() {

    return (
      <div>
        <Form>
          <Row gutter={20} style={{ marginBottom: 6 }}>
            <Col className='gutter-row' span={2}>
              <Link className='margin-right' to={{ pathname: '/sango2/message/msgIndex' }} >
                <Button type='primary'>返回短信列表</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const Filter = Form.create()(TempFilter)

export default Filter
