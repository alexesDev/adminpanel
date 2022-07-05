/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import * as React from 'react';
import { gql } from '@urql/core';
import { UserRowData } from './UserRow.generated';
import s from './UserRow.module.css';

type Props = {
  readonly data: UserRowData;
  readonly selected?: boolean;
  readonly onClick?: () => void
}

const LONG_DASH = '—'

export function UserRow({ data, selected, onClick }: Props) {
  const rowClassName = selected ? s.activeRow : s.row

  return (
    <div className={rowClassName} onClick={onClick}>
      <div>Email: {data.email}</div>
      <div>Name: {data.name || LONG_DASH}</div>
      <div>Phone: {data.phone || LONG_DASH}</div>
      <div>Sex: {data.sex || LONG_DASH}</div>
    </div>
  )
}

gql`
  fragment UserRowData on User {
    email
    name
    phone
    sex
  }
`
