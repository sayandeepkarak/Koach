import { gql } from "apollo-server";

const typeDefs = gql`
  enum UserType {
    admin
    teacher
    student
  }
  type Email {
    emailValue: String!
    isVerified: Boolean!
  }
  type Address {
    street: String!
    city: String!
    state: String!
    country: String!
    zip: Int!
  }
  type User {
    _id: ID!
    fullName: String!
    email: Email!
    mobile: Int!
    userType: UserType!
    imageUrl: String!
    address: Address!
    isBlock: Boolean!
  }

  type Query {
    users: [User!]!
    user(userId: ID!): User!
  }
`;

export default typeDefs;
