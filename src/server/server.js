const express = require('express');
const path = require('path');
const cors = require('cors');

//const exphbs = require('express-handlebars');
//const logger = require('./middleware/logger');
//const heroes = require('./heroes');

const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
//app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options('*', cors(corsOptions));

// Homepage Route
/* app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    heroes
  })
); */

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
var whitelist = [
    'http://localhost:4200'
];


var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

// Members API Routes
app.use('/api/heroes', require('./routes/api/heroes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));