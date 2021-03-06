const { underline } = require('colors');
const mongoose = require('mongoose');

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
};
module.exports = connectDb;
