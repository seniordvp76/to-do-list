const express = require('express');
const businessRoutes = express.Router();

let Business = require('./business.model');
businessRoutes.route('/').get(function (req, res) {
    Business.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
})
businessRoutes.route('/add').post(function (req, res) {
    let business = new Business(req.body);
    business.save()
        .then(business => {
            res.status(200).json({ 'business': 'business in added successfully' });
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        })
})

businessRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Business.findById(id, function (err, business) {
        res.json(business);
    });
})

businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findByIdAndUpdate(req.params.id, req.body, function (err, business) {
        if (!business)
            res.status(404).send("data is not found");
        else {
            res.json(business);
        };
    });
});
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({ _id: req.params.id }, function (err, business) {
        if (err) res.json(err);
        else res.json(business);
    });
});

module.exports = businessRoutes;