import joi from 'joi'
const now = Date.now()
const cuttofDate = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18)

export default joi.object().keys({
  email: joi
    .string()
    .email()
    .required()
    .label('Email'),
  userName: joi
    .string()
    .alphanum()
    .min(6)
    .max(15)
    .required()
    .label('Username'),
  firstName: joi
    .string()
    .max(20)
    .required()
    .label('Firstname'),
  lastName: joi
    .string()
    .max(20)
    .required()
    .label('Lastname'),
  password: joi
    .string()
    .regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    .required()
    .label('Password')
    .options({
      language: {
        string: {
          regex: {
            base:
              'must have at least one capital letter,one lowercase, one number and one special character'
          }
        }
      }
    }),
  phone: joi
    .string()
    .regex(
      /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/
    )
    .required()
    .label('Phone')
    .options({
      language: {
        string: {
          regex: {
            base:
              'phone is invalid, must have the next format +58-212-99999-5555'
          }
        }
      }
    }),
  gender: joi
    .string()
    .valid(['male', 'female'])
    .required()
    .label('Gender'),
  role: joi
    .string()
    .valid(['admin', 'user', 'guest', 'paid'])
    .required()
    .label('Role'),
  birthDate: joi
    .date()
    .max(cuttofDate)
    .required()
    .label('BirthDate')
})
