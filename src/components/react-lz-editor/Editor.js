import React, {Component} from 'react'
import ReactQuill from 'react-quill' // ES6
import 'react-quill/dist/quill.snow.css' // ES6

export class Editor extends Component {
  constructor(props) {
    super(props)
    this.quillRef = null
    this.reactQuillRef = null
    this.modules = {
      toolbar: [
        [{size: [false, 'small', 'large', 'huge']}], // custom dropdown
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{header: 1}, {header: 2}], // custom button values
        ['blockquote', 'code-block'], // blocks
        [{color: []}, {background: []}], // dropdown with defaults
        [{list: 'ordered'}, {list: 'bullet'}], // lists
        [{script: 'sub'}, {script: 'super'}], // superscript/subscript
        [{indent: '-1'}, {indent: '+1'}], // outdent/indent
        [{direction: 'rtl'}, {align: []}], // text direction
        // [{header: [1, 2, 3, 4, 5, 6, false]}], // header dropdown
        ['image', 'link', 'video'], // blocks
        ['clean'] // remove formatting
        // [{font: []}], // font family
      ]
    }
    this.formats = [
      'header',
      'link',
      'font',
      'background',
      'color',
      'code',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'script',
      'align',
      'direction',
      'link',
      'image',
      'code-block',
      'formula',
      'video'
    ]
    this.handleClick = this.handleClick.bind(this)
  }

  static propTypes = {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    getValue: React.PropTypes.func
  };

  attachQuillRefs = () => {
    // 确保 React-Quill 引用是可用的:
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    // 如果 Quill 引用已定义就跳过:
    if (this.quillRef != null) return

    const quillRef = this.reactQuillRef.getEditor()
    if (quillRef != null) this.quillRef = quillRef

    var toolbar = this.quillRef.getModule('toolbar')
    toolbar.addHandler('image', this.customImageHandler)

    // this.quillRef.on('text-change', (delta, oldDelta, source) => {
    //   let index = delta.ops.length - 1
    //   if (!delta.ops[index].insert) {
    //     return
    //   }
    //   console.log('text-change', delta.ops[index].insert.image)
    // })
  };

  customImageHandler = (image, callback) => {
    this.fileInput.click()
  };

  handleClick() {
    let range = this.quillRef.getSelection()
    let position = range ? range.index : 0
    this.quillRef.insertText(position, 'Hello, World! ')
    let text = this.quillRef.getText()
    let content = this.quillRef.getContents()
    console.log(text, content)
  }

  handleChange = value => {
    // console.log(value
    this.props.getValue(value)
  };

  handleFileChang = event => {
    // console.log(event.target.value, event.target.files[0])

    let file = event.target.files[0]
    console.log(file)
    let Editor = this.quillRef
    let InputEl = this.fileInput
    let range = Editor.getSelection()
    let cursorLocation = range.index

    var formData = new FormData()
    formData.append('image', file)
    let url = 'https://webcdnori.hulai.com/h/fileUpload/upload'
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.onreadystatechange = function() {
      // 通信成功时，状态值为4
      if (xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText)
        if (data.ret !== 1) {
          console.log(data.msg)
        }
        let urlPath = data.data.img
        Editor.insertEmbed(cursorLocation, 'image', urlPath)
        InputEl.value = ''
      }
    }
    xhr.send(formData)
  };

  render() {
    let style = {
      display: 'none'
    }
    return (
      <div>
        <ReactQuill
          ref={el => {
            this.reactQuillRef = el
          }}
          theme={'snow'}
          tabIndex={0}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
          value={this.props.value}
          placeholder={this.props.placeholder || '请编辑内容'}
        />
        <input
          style={style}
          ref={input => {
            this.fileInput = input
          }}
          type='file'
          onChange={this.handleFileChang}
        />
      </div>
    )
  }

  // 初始化
  async componentWillMount() {
    // console.log('componentWillMount--')
  }
  async componentDidMount() {
    // console.log('componentDidMount--')
    this.attachQuillRefs()
  }

  // 进行中
  // previous
  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps--', nextProps)
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate--', nextProps)
    return true
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate--', nextProps)
    // console.log(nextProps.defaultValue)
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate--')
    this.attachQuillRefs()
  }

  // 销毁
  componentWillUnmount() {
    // console.log('componentWillUnmount')
  }
}
