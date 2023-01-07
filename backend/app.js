var createError =   require('http-errors')
var express =       require('express')
var path =          require('path')
var logger =        require('morgan')
const session =     require('express-session')
const KnexStore =   require('connect-session-knex')(session);
const passport =    require('passport')
const knex =        require('./helpers/knex')
var indexRouter =   require('./routes/index')
var selfRouter =    require('./routes/self')
var usersRouter =   require('./routes/users')
var authRouter =    require('./routes/auth')

const environment = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
console.log('NODE_ENV', process.env.NODE_ENV)
const store = new KnexStore({knex}); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

if(environment != 'test') app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//app.use('/', indexRouter);

app.use(session({
  secret: process.env.SESSION_SECRET || 'Keyboard Cat',
  resave: false,
  saveUninitialized: true,
  store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRouter)
app.use('/api/self', selfRouter)
app.use('/api/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  console.error('error', err)
  const body = {
    error: err.message
  }
  if(environment == 'development') body.stack = err.stack.split('\n')
  res.status(err.status || 500).json(body)
})

module.exports = app
