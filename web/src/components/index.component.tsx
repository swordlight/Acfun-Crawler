import * as React from 'react'
import {RouteComponentProps, Route, Switch, Redirect} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import UserComponent from './user.component';
import ArticleComponent from './article.component';
import CommentComponent from './comment.component';

const { Header, Sider, Content } = Layout

export default class IndexComponent extends React.Component<RouteComponentProps<any>> {
  render() {
    return (
      <Layout className="index-layout">
        <Sider
          trigger={null}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['user']} onSelect={(item) => {
            this.props.history.push(`/index/${item.key}`)
          }}>
            <Menu.Item key="user">
              <Icon type="user" />
              <span>用户概况</span>
            </Menu.Item>
            <Menu.Item key="article">
              <Icon type="file-text" />
              <span>文章汇总</span>
            </Menu.Item>
            <Menu.Item key="comment">
              <Icon type="message" />
              <span>评论统计</span>
            </Menu.Item>
            <Menu.Item key="flow">
              <Icon type="bar-chart" />
              <span>流量分析</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header"></Header>
          <Content className="content">
            <Switch>
              <Redirect exact from="/index" to="/index/user" />
              <Route path="/index/user" component={UserComponent} />
              <Route path="/index/article" component={ArticleComponent} />
              <Route path="/index/comment" component={CommentComponent} />
              <Route path="/index/flow" render={(match) => {
                return <span>flow</span>
              }} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }

}