const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        user: async(parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("savedBooks");
            }
            throw AuthenticationError;
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