import React, {Component} from 'react'
// import sango2 from '../../../../../axios/sango2'
import Editor from '../../../../../components/react-lz-editor'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

import {Form, Button, Input, Card} from 'antd'

const FormItem = Form.Item

class EditorForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      editorHtml: ''
    }
  }
  static propTypes = {
    form: PropTypes.object,
    editor: PropTypes.object,
    fetchDefault: PropTypes.func,
    fetchEDITOR: PropTypes.func
  };

  handleSubmit = e => {
    e.preventDefault()
    const {validateFieldsAndScroll, resetFields} = this.props.form
    validateFieldsAndScroll((err, fieldValues) => {
      if (!err && this.state.editorHtml !== '') {
        fieldValues.content = this.state.editorHtml
        this.setState({
          title: '',
          editorHtml: ''
        })
        this.props.fetchEDITOR(fieldValues)
        resetFields()
      } else {
        console.log('内容不能为空')
      }
    })
  };

  getValue = value => {
    // console.log(value)
    this.setState({editorHtml: value})
  };

  render() {
    // console.log('render--', this.props.editor.default)

    const {
      form: {getFieldDecorator},
      editor: {default: {title}}
    } = this.props
    console.log(title)
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14}
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    }

    return (
      <Card>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label='标题'>
            {getFieldDecorator('title', {
              initialValue: this.state.title,
              rules: [{required: true, message: '请填写问题'}]
            })(<Input placeholder='问题' />)}
          </FormItem>

          <FormItem {...formItemLayout} label='内容'>
            <Editor value={this.state.editorHtml} getValue={this.getValue} />
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>

            <Link to={{pathname: '/sango2/answerQuestion/aqs'}}>
              <Button type='default' style={{marginLeft: '10px'}}>
                返回
              </Button>
            </Link>
          </FormItem>
        </Form>
      </Card>
    )
  }

  getAsyncData() {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve({
            code: 200,
            msg: 'success',
            data: 'hello!'
          })
        },
        1000
      )
    })
  }

  // 初始化
  async componentWillMount() {
    // console.log('componentWillMount--')
    await this.getAsyncData()
  }
  async componentDidMount() {
    // console.log('componentDidMount--', this.props.editor)
    this.props.fetchDefault()
  }

  // 进行中
  // previous
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps--', nextProps)
    if (nextProps.editor.default.content && this.state.editorHtml === '') {
      this.setState({
        title: nextProps.editor.default.title,
        editorHtml: nextProps.editor.default.content
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate--', nextProps)
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate--', nextProps)
  }

  // 销毁
  componentWillUnmount() {
    // console.log('componentWillUnmount')
  }
}

const EditorPage = Form.create()(EditorForm)

export default EditorPage
