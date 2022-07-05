import * as React from 'react'
import { gql } from '@urql/core'
import { Modal, Button, Table, PageHeader } from 'antd'
import { createPageMeta, nonNullable } from './utils'
import { useUsersPageQuery, useUpdateUserMutation, UsersPageQuery } from './Users.generated'

type Row = NonNullable<NonNullable<NonNullable<UsersPageQuery['users']>['nodes']>[0]>

export function Content() {
  const [editedRow, setEditedRow] = React.useState<Row | null>(null)
  const [res] = useUsersPageQuery()
  const [, updateUser] = useUpdateUserMutation()

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

  const handleModalCancel = () => setEditedRow(null)
  const handleModalOk = () => {}

  return (
    <>
      <PageHeader title="Users" />
      <Table
        dataSource={rows.filter(nonNullable)}
        pagination={false}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => setEditedRow(record),
        })}
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
      <Modal title="Edit User" visible={editedRow !== null} onOk={handleModalOk} onCancel={handleModalCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export const meta = createPageMeta({
  path: '/',
  menuLabel: 'Users',
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

  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      clientMutationId
    }
  }
`
