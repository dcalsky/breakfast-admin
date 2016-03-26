
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import AV from 'avoscloud-sdk'
import Coupon from './containers/Coupon'
import Floor from './containers/Floor'
import Food from './containers/Food'
import Order from './containers/Order'
import Type from './containers/Type'

import App from './containers/App'
import configure from './store'

AV.initialize('puVuQSL2x1iceX0V99MXST4p-gzGzoHsz', 'JezXUL3qvLQB04w5vlKbl6Q3')
const store = configure()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <Route path="/food" component={Food} />
        <Route path="/order" component={Order} />
        <Route path="/Type" component={Type} />
        <Route path="/Floor" component={Floor} />
        <Route path="/Coupon" component={Coupon} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
