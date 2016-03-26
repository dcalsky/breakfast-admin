import React from 'react'
import {Link, IndexLink} from 'react-router'
import AV from 'avoscloud-sdk'
import { Tabs, Tab } from 'react-bootstrap'

const ACTIVE = { color: 'red' }

export default React.createClass({
  getInitialState() {
    return {
      username: null,
      password: null,
      key: null,
      token: null,
    }
  },
  handleLogin() {
    let user = new AV.User()
    user.signUpOrlogInWithMobilePhone({
      mobilePhoneNumber: this.state.username,
      smsCode: this.state.key
    }).then(user => {
      this.setState({
        username: user.get('mobilePhoneNumber'),
      })
    })

  },
  handleGetKey() {
    AV.Cloud.requestSmsCode(this.state.username)
  },
  handleInputChange(type, e) {
    const value = e.target.value
    switch (type) {
      case 'username':
        this.setState({
          username: value,
          password: this.state.password
        })
        break
      case 'phone':
        this.setState({
          username: value,
        })
        break
      case 'password':
        this.setState({
          username: this.state.username,
          password: value
        })
        break
      case 'key':
        this.setState({
          key: value
        })
        break
    }
  },
  render() {
    return (
      <div>
        <div className="login">
          {
            AV.User.current() ?
              <p>欢迎回来, {AV.User.current().get('mobilePhoneNumber')}</p>
              :
              <div>
                <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'phone')} placeholder="手机号"/>
                <input type="text" value={this.state.key} onChange={this.handleInputChange.bind(this, 'key')} placeholder="收到的验证码"/>
                <br />
                <button className="get-key" onClick={this.handleGetKey}>获取验证码</button>
                <button className="login-phone-button" onClick={this.handleLogin}>验证并登陆</button>
              </div>
          }

        </div>
        <ul>
          <li><IndexLink to="/"           activeStyle={ACTIVE}>首页</IndexLink></li>
          <li><Link      to="/order"      activeStyle={ACTIVE}>订单</Link></li>
          <li><Link      to="/floor"      activeStyle={ACTIVE}>寝室楼</Link></li>
          <li><Link      to="/type"      activeStyle={ACTIVE}>种类</Link></li>
          <li><Link      to="/coupon"      activeStyle={ACTIVE}>优惠券</Link></li>
          <li><Link      to="/food"      activeStyle={ACTIVE}>食物</Link></li>
        </ul>

        {this.props.children}
      </div>
    )
  }
})
