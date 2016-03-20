
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'


class App extends Component {
  render() {
    const { todos, actions, children } = this.props
    return (
      <div>
        <Tabs defaultActiveKey={2} position="left" tabWidth={3}>
          <Tab eventKey={1} title="获取订单">Tab 1 content</Tab>
          <Tab eventKey={2} title="种类配置">Tab 3 content</Tab>
          <Tab eventKey={3} title="商品配置">Tab 2 content</Tab>
          <Tab eventKey={4} title="优惠券配置">Tab 3 content</Tab>
          <Tab eventKey={5} title="寝室楼配置">Tab 3 content</Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
