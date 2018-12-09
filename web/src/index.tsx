import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import IndexComponent from './components/index.component'
import 'antd/dist/antd.css'
import './assets/less/index.less'

class App extends React.Component<any> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" exact to="/index" />
          <Route path="/index" component={IndexComponent} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))