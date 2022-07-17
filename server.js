const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// const logger = require('./middleware/logger');

//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDb();

const PORT = process.env.PORT || 5000;
const app = express();

//Body parser
app.use(express.json());

// Route files
const bootcamps = require('./routes/bootcamps.routes');

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

// Error hanldler (should come after line 32 !!!)
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit procces
  server.close(() => {
    process.exit(1);
  });
});
