import { gql } from '@urql/core'
import { Button, Table, PageHeader } from 'antd'
import { createPageMeta, nonNullable } from './utils'
import { useUsersPageQuery } from './Users.generated'

export const Content = () => {
  const [res] = useUsersPageQuery()

  if (res.fetching) {
    return <p>Loading...</p>
  }

  if (res.error) {
    return <p>Oh no... {res.error.message}</p>
  }

  // https://www.graphile.org/postgraphile/why-nullable/
  const rows = res.data?.users?.nodes
  if (!rows) {
    return <p>No Access</p>
  }

  return (
    <>
      <PageHeader title="Users" extra={<Button>Create</Button>} />
      <Table
        dataSource={rows.filter(nonNullable)}
        pagination={false}
        rowKey="id"
        columns={[
          {
            key: 'id',
            title: '#',
            dataIndex: 'id',
          },
          {
            key: 'email',
            title: 'Email',
            dataIndex: 'email',
          },
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
          },
          {
            key: 'phone',
            title: 'Phone',
            dataIndex: 'phone',
          },
        ]}
      />
    </>
  )
}

export const meta = createPageMeta({
  path: '/',
  menuLabel: 'Пользователи',
})

gql`
  query UsersPageQuery {
    users {
      nodes {
        id
        email
        name
        phone
      }
    }
  }
`
