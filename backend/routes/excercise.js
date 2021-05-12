const { Router } = require('express');
let Excercises = require('../models/excercise.models');

Router.route('/').get((req,res) =>{
    Excercises.find()
    .then(excercise => res.json(excercise))
    .catch(err => res.status(400).json('Error : '+ err));
})

Router.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.description);
    const date = Date.parse(req.body.date);

    const newExcercise = new Excercises({
        username,
        description,
        duration,
        date,
    });

    newExcercise.save()
    .then(() => res.json('Excercise Added'))
    .catch((err) => res.status(400).json('Error : '+ err));
});

module.exports = Router