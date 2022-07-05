import * as React from 'react'
import { gql } from '@urql/core'
import { Radio, Form, Input, Button, Modal, PageHeader } from 'antd'
import { createPageMeta } from './utils'
import { UserRow } from '../components/UserRow'
import { useUsersPageQuery, useUpdateUserMutation, useDeleteUserMutation, UsersPageQuery } from './Users.generated'
import s from './Users.module.css'

type Row = NonNullable<NonNullable<NonNullable<UsersPageQuery['users']>['nodes']>[0]>

const showError = (e: Error) => alert(e.message)

export function Content() {
  const [editForm] = Form.useForm()
  const [selectedRow, setSelectedRow] = React.useState<Row | null>(null)
  const [editedRow, setEditedRow] = React.useState<Row | null>(null)
  const [res, reexecuteQuery] = useUsersPageQuery()
  const [, updateUser] = useUpdateUserMutation()
  const [, deleteUser] = useDeleteUserMutation()

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

  const resetSelect = () => setSelectedRow(null)
  const refresh = () => reexecuteQuery({ requestPolicy: 'network-only' })
  const closeModal = () => setEditedRow(null)

  const deleteSelectedRow = () => {
    if (selectedRow) {
      const variables = { input: { id: selectedRow.id } }
      deleteUser(variables).then(resetSelect).then(refresh).catch(showError)
    }
  }

  const editSelectedRow = () => {
    editForm.setFieldsValue(selectedRow)
    setEditedRow(selectedRow)
  }

  const saveEditedRow = (values: any) => {
    if (editedRow) {
      const variables = { input: { id: editedRow.id, patch: values } };
      updateUser(variables).then(closeModal).then(resetSelect).catch(showError)
    }
  }

  return (
    <>
      <PageHeader title="Users" />
      <div className={s.mainContent}>
        <div className={s.userList}>
          {rows.map((r) => {
            if (!r) {
              return null
            }

            const select = () => setSelectedRow(r)
            const selected = r.id === selectedRow?.id

            return <UserRow key={r.id} data={r} selected={selected} onClick={select} />
          })}
        </div>
        <div className={s.sidebar}>
          {selectedRow && (
            <>
              <Button onClick={editSelectedRow}>Edit</Button>
              <Button onClick={deleteSelectedRow}>Delete</Button>
            </>
          )}
        </div>
      </div>
      <Modal
        title="Edit User"
        visible={editedRow !== null}
        onCancel={closeModal}
        footer={[
          <Button form="editForm" key="submit" htmlType="submit">
            Submit
          </Button>,
        ]}
      >
        <Form initialValues={editedRow || undefined} form={editForm} id="editForm" onFinish={saveEditedRow}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Sex" name="sex">
            <Radio.Group>
              <Radio value="MALE">Male</Radio>
              <Radio value="FEMALE">Female</Radio>
              <Radio value="OTHER">Other</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
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
        ...UserRowData
      }
    }
  }

  mutation UpdateUserMutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        ...UserRowData
      }
    }
  }

  mutation DeleteUserMutation($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      clientMutationId
    }
  }
`
