const express = require('express');
const SessionController = require('./controllers/SessionController');
const HelperController = require('./controllers/HelperController');
const DogController = require('./controllers/DogsController');
const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.post('/helpers', HelperController.create);
routes.get('/helpers', HelperController.index);

routes.post('/dogs', DogController.create);
routes.get('/dogs', DogController.index);
routes.delete('/dogs/:id', DogController.delete);

routes.get('/profile', ProfileController.index);


module.exports = routes;