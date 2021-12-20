require('dotenv').config()
require('express-async-errors');

// Extra security
const helmet = require('helmet');
const cors = require('cors')
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express')
const app = express()

// Connect DB
const connectDB = require('./db/connectDB');

// Routers
const Router = require('./routes/routes');

// Errorhandler
const errorHandlerMiddleware = require('./middleware/error-handler');

//app.set('trust proxy', 1)
// Deploy security packages
//app.use(rateLimiter({
//  windowMs: 15 * 60 * 1000, // 15 minutes
//  max: 100, // Limit each IP to 100 requests per windowMs
//}));
//app.use(helmet());
app.use(cors())
//app.use(xss());

// Parse form data and json data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use('/api/users', Router);

// Deploy error handler
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log('Listening on port ' + port)
    })
  } catch(error){
    console.error(error);
  }
}

start();
