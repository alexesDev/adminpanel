import { RouteComponentProps } from '@reach/router';

export function NotFound({ path }: RouteComponentProps) {
  return <div>Not Found: {path}</div>
}
