import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser( email: $email, password: $password) {
      token
      user {
        username
        email
        bookCount
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
      }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser( email: $email, username: $username, password: $password) {
      token
      user {
        username
        email
        bookCount
        savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($authors: [String], $image: String, $link: String, $description: String!, $title: String!, $bookId: String!) {
    saveBook(authors: $authors, image: $image, link: $link, description: $description, title: $title, bookId: $bookId) {
      bookCount
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      bookCount
      email
      password
      username
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`;