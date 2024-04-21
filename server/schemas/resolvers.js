const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        user: async(parent, { username }) => {

        }
    },

    Mutation: {
        createUser: async(parent, { username, email, password }) => {

        },
        login: async(parent, { email, password }) => {

        },
        saveBook: async(parent, book, context) => {

        },
        deleteBook: async(parent, { bookId }, context) => {

        }
    }
}

module.exports = resolvers;
  