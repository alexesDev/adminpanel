## Commands

Start a dev server:
```
air
```

Run tests:
```
~/go/bin/reflex -sr '\.go$' -- go test ./usecases/...
```

## Query examples

```
query {
  users {
    id
    email
  }
}
```

```
mutation {
  updateUser(input:{ id: 11, patch: { email: "new@example.com" } }) {
    ... on ErrorPayload {
      message
    }
    ... on UpdateUserPayload {
      user {
        email
      }
    }
  }
}
```
