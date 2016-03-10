
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Test from './containers/App/page1.jsx'
import configure from './store'

const store = configure()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
          <Route path="test1" component={Test} />
        <Route path="test2" component={Test} />
      </Route>
      <Route path="*" component={Test} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
