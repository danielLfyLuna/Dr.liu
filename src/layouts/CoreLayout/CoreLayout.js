import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, IndexLink, Link } from 'react-router'
import { intlShape, FormattedMessage, defineMessages } from 'react-intl'
import _ from 'lodash'

import menuJSON from '../../intl/menu.json'
import './CoreLayout.scss'
import '../../styles/core.scss'
import '../../static/iconfont.css'
import logoImage from '../../static/hoolai.png'
import myImage from '../../static/admin.png'

import { transtion } from '../../intl/locale'
import WrappedHorizontalLoginForm from '../../components/Login/Login'

import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Button,
  Modal,
  Row,
  Col,
  Breadcrumb,
  BackTop,
  message
} from 'antd'
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const messages = defineMessages({
  logout: {
    id: 'CoreLayout.header.logout',
    defaultMessage: '退出'
  },
  password: {
    id: 'CoreLayout.header.rePass',
    defaultMessage: '修改密码'
  },
  userkey: {
    id: 'CoreLayout.header.userkey',
    defaultMessage: '查看USERKEY'
  },
  home: {
    id: 'CoreLayout.home',
    defaultMessage: '主页'
  },
  loginOK: {
    id: 'CoreLayout.login.success',
    defaultMessage: '登录成功'
  },
  loginTitle: {
    id: 'CoreLayout.login.title',
    defaultMessage: '登录'
  },
  noLogin: {
    id: 'CoreLayout.login.noLogin',
    defaultMessage: '未登录'
  }
})

const intlSets = {
  'zh-CN': '中文',
  'en-US': 'English',
  'vi-VN': 'Tiếng Việt(越南文)'
}

// React.Component 另一种写法
export class CoreLayout extends Component {
  static propTypes = {
    login: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    isLoginActionCreator: PropTypes.func.isRequired,
    fetchPurview: PropTypes.func.isRequired,
    onceLogin: PropTypes.func.isRequired,
    receiveLogin: PropTypes.func.isRequired,
    singOut: PropTypes.func.isRequired,
    getLocal: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.intlSet = ''
    const locale = localStorage.getItem('locale')
    if (locale) {
      this.intlSet = locale
    } else {
      const language = navigator.language
      const message = transtion.transLocale(language)
      this.intlSet = transtion.languages[message]
    }
    this.state = {
      visible: false,
      render: false
      // intlSet: this.intlSet
    }
    // this.handleSingOut = this.handleSingOut.bind(this)
  }

  menu = (
    <Menu onClick={key => this.handleSingOut(key)}>
      <Menu.Item key='3'><FormattedMessage {...messages.logout} /></Menu.Item>
      <Menu.Item key='0'><FormattedMessage {...messages.password} /></Menu.Item>
      <Menu.Item key='1'><FormattedMessage {...messages.userkey} /></Menu.Item>
    </Menu>
  )

  intlMenu = (
    <Menu onClick={e => this.handleChangeLang(e)}>
      {
        Object.values(transtion.languages).map(lang => (
          <Menu.Item key={lang}>{intlSets[lang]}</Menu.Item>
        ))
      }
    </Menu>
  )

  static myData = {}

  handleSingOut = ({ key }) => {
    if (key === '3') {
      browserHistory.push('/')
      this.props.singOut()
      this.showModal()
    }
    if (key === '0') {
      browserHistory.push('/pwdChange')
    }
    if (key === '1') {
      browserHistory.push('/userkey')
    }
  }

  handleChangeLang = ({ item, key }) => {
    this.setState({
      // intlSet: item.props.children,
      render: true
    })
    this.intlSet = item.props.eventKey
    localStorage.setItem('locale', key)
    this.props.getLocal({
      language: key,
      userId: JSON.parse(sessionStorage.getItem('sango2')).userId,
      token: JSON.parse(sessionStorage.getItem('sango2')).token
    }).then(resp => {
      window.location.reload()
    })
  }

  itemRender = (route, params, routes, paths) => {
    if (route.path.length) {
      const last = routes.indexOf(route) === routes.length - 1
      if (last) {
        return <span><FormattedMessage {...{id: route.intlId, defaultMessage: route.breadcrumbName}} /></span>
      } else {
        return paths.join('/') == ''
        ? (
          <IndexLink to='/'><FormattedMessage {...{id: route.intlId, defaultMessage: route.breadcrumbName}} /></IndexLink>
        )
        : (
          <Link to={paths.join('/')}><FormattedMessage {...{id: route.intlId, defaultMessage: route.breadcrumbName}} /></Link>
        )
      }
    }
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  handleSubmit = data => {
    this.props.isLoginActionCreator(data)
  }

  componentDidMount() {
    const { fetchPurview, receiveLogin } = this.props
    const sango2 = sessionStorage.getItem('sango2')
    // 如果sessionStorage有值，就直接登录
    if (sango2 !== null && sango2 !== '') {
      receiveLogin(JSON.parse(sango2))
      fetchPurview(JSON.parse(sango2))
    } else {
      this.showModal()
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { onceLogin, intl } = this.props
    if (nextProps.login.resolved && nextProps.login.once) {
      message.success(intl.formatMessage(messages.loginOK))
      onceLogin()
      this.handleCancel()
    } else if (nextProps.login.err) {
      message.error(nextProps.login.errMes)
    } else if (!nextProps.login.resolved) {
      this.showModal()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.login.once) {
      return true
    }

    if (nextProps.login.errMes.tips) {
      return false
    }

    if (nextProps.login.fetching) {
      // message.info('shouldComponentUpdate 不rander', 10)
      return false
    } else {
      // message.info('shouldComponentUpdate 就rander', 10)
      return true
    }
  }

  render() {
    // 此时的routes 不是传进来的了 注意是router index.js里分配来的
    const props = this.props
    const { intl } = this.props
    let myMenus = []
    const { admin, purview } = this.props.login
    if (_.size(admin) > 0) {
      _.forEach(purview, function(value, key) {
        let subMenus = []
        _.map(value.subMenu, function(v, i) {
          subMenus.push(
            <Menu.Item key={v.id}>
              {' '}
              <Link to={{ pathname: v.route, state: { authorize: v.id } }}>
                {/* {v.name} */}
                <FormattedMessage id={menuJSON[v.id] ? menuJSON[v.id] : 'defaultMenuName'} defaultMessage={v.name} />
              </Link>{' '}
            </Menu.Item>
          )
        })
        myMenus.push(
          <SubMenu title={<FormattedMessage id={menuJSON[value.id] ? menuJSON[value.id] : 'defaultMenuName'} defaultMessage={value.name} />} children={subMenus} key={value.id} />
        )
      })
    }

    return (
      <div className='components-layout-demo-top-side-2'>
        <Modal
          width={600}
          key={Math.random()}
          title={intl.formatMessage(messages.loginTitle)}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
          closable={false}
          maskClosable={false}
          style={{ top: 220 }}
          maskStyle={{ backgroundColor: 'gray' }}
        >
          <WrappedHorizontalLoginForm {...props} handleSubmit={this.handleSubmit} />
        </Modal>
        <Layout>
          <Row>
            <Header className='header'>
              <Col className='gutter-row' span={5}>
                <div className='logo'>
                  <IndexLink to='/' activeClassName='route--active'>
                    <img className='logo-img' src={logoImage} />
                  </IndexLink>
                </div>
              </Col>
              <Col className='gutter-row' span={13}>
                <Menu
                  theme='dark'
                  mode='horizontal'
                  defaultSelectedKeys={['2']}
                  style={{
                    lineHeight: '64px'
                  }}
                >
                  <Menu.Item key='home'>
                    <IndexLink to='/' activeClassName='route--active'>
                      <Icon type='home' />
                      <FormattedMessage {...messages.home} />
                    </IndexLink>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col className='gutter-row' span={4}>
                <Dropdown overlay={this.intlMenu} >
                  <Button size='large' icon='global'>{intlSets[this.intlSet]}</Button>
                </Dropdown>
              </Col>
              <Col className='gutter-row' span={1}>
                <Dropdown overlay={this.menu}>
                  <img alt='' className='my-image' src={myImage} />
                </Dropdown>
              </Col>
              <Col className='gutter-row' span={1}>
                <span style={{ color: 'white' }}>
                  {_.size(admin) === 0 ? intl.formatMessage(messages.noLogin) : admin.userName}
                </span>
              </Col>
            </Header>
          </Row>

          <Layout>
            <Sider
              width={200}
              style={{
                background: '#fff'
              }}
            >
              <Menu
                className='deepMenu'
                mode='inline'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{
                  height: '100%'
                }}
              >
                {myMenus}
              </Menu>
            </Sider>
            <Layout
              style={{
                padding: '64px 24px 24px',
                minHeight: '100vh',
                marginTop: '-64px'
              }}
            >
              <Breadcrumb
                itemRender={this.itemRender}
                style={{
                  margin: '12px 0'
                }}
                routes={props.routes}
                params={props.params}
                separator='/'
              />
              <Content
                style={{
                  // background: '#fff',
                  // padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                {props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>

        <BackTop />
      </div>
    )
  }
}
