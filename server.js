const express = require('express')
const exphbs = require("express-handlebars");
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const app = express()

//Conexão
const conn = require('./connection/conn')

//Models
const User = require('./models/User')

//UserController
const UserController = require('./controllers/UserController')

//Rotas
const userRoutes = require('./routes/userRoutes')


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)
// flash messages
app.use(flash());

app.use(express.static("public"));

// set session to res
app.use((req, res, next) => {
  // console.log(req.session)
  console.log(req.session.id);

  if (req.session.id) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/", userRoutes)



conn
    .sync({})
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => { console.log(err) });