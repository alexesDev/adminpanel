import { RouteComponentProps } from '@reach/router'

export type PageMeta = {
  path: string
  menuLabel?: string
  icon?: React.ReactNode
}

export type Page = {
  Content: (props: RouteComponentProps) => JSX.Element
  meta: PageMeta
}

export function createPageMeta(config: PageMeta): PageMeta {
  return config
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null
}
