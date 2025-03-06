# NestJS GraphQL API Demo

This repository is a demo project for building a GraphQL API using NestJS.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Example Queries and Mutations](#example-queries-and-mutations)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project demonstrates how to set up a GraphQL API using the NestJS framework. It includes basic configurations and examples to get you started with building your GraphQL server.

## Features

- NestJS framework
- GraphQL setup with Apollo
- JWT authentication
- CRUD operations
- Example queries and mutations

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/toriqo/nestjs-gql-demo.git
   cd nestjs-gql-demo
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start:dev
   ```

## Usage

After starting the development server, you can access the GraphQL playground at `http://localhost:3000/graphql`.

## Example Queries and Mutations

### Auth

#### Login Mutation

```graphql
mutation {
  login(loginUserInput: { email: "user@example.com", password: "password" }) {
    authToken
  }
}
```

### Users

#### Create User Mutation

```graphql
mutation {
  createUser(createUserInput: { name: "John Doe", email: "john@example.com", password: "password" }) {
    id
    name
    email
  }
}
```

#### Get All Users Query

```graphql
query {
  users {
    id
    name
    email
  }
}
```

#### Get User by ID Query

```graphql
query {
  user(id: "user-id") {
    id
    name
    email
  }
}
```

#### Update User Mutation

```graphql
mutation {
  updateUser(id: "user-id", updateUserInput: { name: "John Updated", email: "john.updated@example.com" }) {
    id
    name
    email
  }
}
```

#### Delete User Mutation

```graphql
mutation {
  removeUser(id: "user-id") {
    id
    name
    email
  }
}
```

### Invoices

#### Create Invoice Mutation

```graphql
mutation {
  createInvoice(createInvoiceInput: { amount: 100.0, date: "2025-03-06" }) {
    id
    amount
    date
    user {
      id
      name
      email
    }
  }
}
```

#### Get All Invoices Query

```graphql
query {
  invoices {
    id
    amount
    date
    user {
      id
      name
      email
    }
  }
}
```

#### Get Invoice by ID Query

```graphql
query {
  invoice(id: "invoice-id") {
    id
    amount
    date
    user {
      id
      name
      email
    }
  }
}
```

#### Update Invoice Mutation

```graphql
mutation {
  updateInvoice(id: "invoice-id", updateInvoiceInput: { amount: 150.0, date: "2025-04-06" }) {
    id
    amount
    date
    user {
      id
      name
      email
    }
  }
}
```

#### Delete Invoice Mutation

```graphql
mutation {
  removeInvoice(id: "invoice-id") {
    id
    amount
    date
    user {
      id
      name
      email
    }
  }
}
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.