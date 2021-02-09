import joi from 'joi'
import { User } from '../../db/models'
import { UserInputError } from 'apollo-server-express'
import mongoose from 'mongoose'
import { SignUp } from '../schemas'

const resolver = {
  Query: {
    getAllUsers: async (root, arg, context, info) => {
      return User.find()
    },
    // Get a user by id
    getUserById: async (root, { id }) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: projection
      await joi.validate(args, SignUp)

      const user = await User.create(args)

      return user
    }
  }
}
export default resolver
