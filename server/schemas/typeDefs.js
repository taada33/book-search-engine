const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define which fields are accessible from the Class model

  type Book{
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type User{
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }


  type Auth{
    token: ID!
    user: User
  }

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    me: User
  }

  type Mutation {
    addUser(email: String!, username: String!, password: String!) : Auth
    loginUser(email: String!, password: String!): Auth 
    deleteBook(bookId: String!): User
    saveBook(
      authors: [String], 
      description: String!, 
      title: String!, 
      bookId: String!,
      image: String,
      link: String,
    ): User
    removeBook(bookId: String!): User    
  }
`;

module.exports = typeDefs;
