import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    phone: String!
    role: String!
    gender: String!
    birthDate: String!
  }
  extend type Query {
    getUserById(id: ID!): User
    getAllUsers: [User!]!
  }
  extend type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      userName: String!
      password: String!
      email: String!
      phone: String!
      role: String!
      birthDate: String!
      gender: String!
    ): User
  }
`
