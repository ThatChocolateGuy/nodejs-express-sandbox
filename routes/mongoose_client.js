var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// Connection
mongoose.connect('localhost:27017/mongodebe');
// Schema
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    image: Object
}, {collection: 'user'});

var userData = mongoose.model('UserData', userDataSchema);

router.get('/', (req, res, next) => {
    res.render('mongo');
});

router.post('/', (req, res, next) => {});

module.exports = router;