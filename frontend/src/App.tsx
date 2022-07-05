import 'react-hot-loader'
import 'antd/dist/antd.css'
import './global.css'

import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Link, Router } from '@reach/router'
import { Provider, createClient } from 'urql'
import { Page } from './pages/utils'
import { NotFound } from './pages/NotFound'
import * as Users from './pages/Users'

const pages: Page[] = [Users]

const client = createClient({
  url: '/graphql',
})

export const App = hot(() => (
  <Provider value={client}>
    <div>
      {pages.map(({ meta }) => (
        <Link key={meta.path} to={meta.path}>{meta.menuLabel}</Link>
      ))}
    </div>
    <Router>
      {pages.map(({ Content: PageContent, meta }) => (
        <PageContent path={meta.path} key={meta.path} />
      ))}
      <NotFound default />
    </Router>
  </Provider>
))
