const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("savedBooks");
            }
            throw AuthenticationError;
        }
    },

    Mutation: {
        addUser: async(parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { user, token };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { user, token };
        },
        saveBook: async(parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runvalidators: true }
                ); 
            }
            throw AuthenticationError;
        },
        deleteBook: async(parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { _id: bookId } } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        }
    }
}

module.exports = resolvers;
