var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const mongoose = require('mongoose');

// Remplacez 'your_db_name' par le nom de votre base de données
const mongoDB = 'mongodb://localhost:27017/projet_val';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.error('Erreur de connexion à MongoDB', err));

// ... Reste de votre code Express.js ...
// Dans app.js ou un autre fichier de route

const Personnage = require('./models/Personnage'); // Ajustez le chemin selon la structure de votre projet


app.get('/personnages/:prenom', async (req, res) => {
  try {
    const prenom = req.params.prenom;
    const personnage = await Personnage.findOne({ prenom: prenom });

    if (!personnage) {
      return res.status(404).send('Personnage non trouvé');
    }

    res.send(personnage);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = process.env.PORT || 3001; // Utilise le port défini dans les variables d'environnement ou 3000 par défaut

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
