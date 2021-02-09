import mongoose from 'mongoose'
import { hash } from 'bcryptjs'
// DB schema
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 20,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String
    },
    lastName: {
      type: String,
      maxlength: 20,
      trim: true,
      lowercase: true,
      required: true
    },
    userName: {
      type: String,
      minlength: 6,
      maxlength: 20,
      trim: true,
      unique: true,
      validate: {
        validator: userName => User.doesntExists({ userName }),
        message: ({ value }) => `username ${value} has been already taken`
      }
    },
    email: {
      maxlength: 30,
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: {
        validator: email => User.doesntExists({ email }),
        message: ({ value }) => `${[value]} ${value} has been already taken`
      }
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: 'Phone is required',
      validate: {
        validator: phone => User.doesntExists({ phone }),
        message: ({ value }) => `phone ${value} has been already taken`
      }
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'guest', 'paid'],
      default: 'guest'
    },
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    birthDate: {
      type: Date,
      required: 'BirthDate is required'
    }
  },
  { timestamps: true }
)
UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10)
    } catch (e) {
      next(e)
    }
  }
  next()
})
UserSchema.statics.doesntExists = async function(options) {
  return (await this.where(options).countDocuments()) === 0
}
const User = mongoose.model('User', UserSchema)

export default User
