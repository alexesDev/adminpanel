import 'react-hot-loader'
import 'antd/dist/antd.css'
import './global.css'

import { hot } from 'react-hot-loader/root'
import { useState } from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import { Provider, createClient } from 'urql'
import { Layout, Button, Space, ConfigProvider, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import ruRU from 'antd/lib/locale/ru_RU'
import { Page } from './pages/utils'
import { NotFound } from './pages/NotFound'
import * as Users from './pages/Users'

const pages: Page[] = [Users]

const menuItems = pages.map((p) => ({
  key: p.meta.path,
  label: p.meta.menuLabel,
}))

const client = createClient({
  url: '/graphql',
})

export const App = () => (
  <Provider value={client}>
    <ConfigProvider locale={ruRU}>
      <Layout className="main-layout">
        <Layout.Sider breakpoint="lg" collapsedWidth={0}>
          <div className="logo">LOGO</div>
          <Menu theme="dark" mode="inline" items={menuItems} />
        </Layout.Sider>
        <Layout className="site-layout">
          <Layout.Header className="site-layout-sub-header-background">Header Content</Layout.Header>
          <Layout.Content className="main-content">
            <Router>
              {pages.map(({ Content: PageContent, meta }) => (
                <PageContent path={meta.path} key={meta.path} />
              ))}
              <NotFound default />
            </Router>
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  </Provider>
)

export default App
