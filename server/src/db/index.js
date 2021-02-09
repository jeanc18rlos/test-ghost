import mongoose from 'mongoose'

const db = () => {
  mongoose
    .connect('mongodb://challenge:Mv534r73@mongo:27017/admin', {
      useNewUrlParser: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))
}
export default db
