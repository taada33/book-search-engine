const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth')


// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    me: async(parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id});
      return user;
    },
  },

  Mutation: {
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);
      return { token, user}
    },

    loginUser: async(parent, {email, password}) => {
      const user = await User.findOne({ email })

      if(!user){
        throw new AuthenticationError('No user with this email found!');
      }

      if(!await user.isCorrectPassword(password)){
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return {token, user}
    },

    saveBook: async(parent, {authors, image, link, description, title, bookId}, context) => {
      const body = {authors, image, link, description, title, bookId};
      if(context.user){
        try {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id},
            { $addToSet: { savedBooks: body}},
            { new: true}
          )
          return updatedUser;
        } catch (err) {
          console.log(err);
        }
      }
    },
    
    deleteBook: async(parent, {bookId}, context) => {
      if(context.user){
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id},
          { $pull: { savedBooks: { bookId: bookId} } },
          { new: true }
        );
        if(!updatedUser){
          console.log("Couldn't find user with this id!")
        }
        return updatedUser;
      }
    },
  }
}

module.exports = resolvers;