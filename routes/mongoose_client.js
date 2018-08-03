var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// Connection
mongoose.connect('mongodb://localhost:27017/mongodebe', {
    useNewUrlParser: true
}, (err) => {
    if(err) console.error(err);
    else console.log('Connected Successfully');
});
// Schema
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    image: Object
}, {collection: 'user'});

var UserData = mongoose.model('UserData', userDataSchema);

router.get('/', (req, res, next) => {
    res.render('mongo');
});

router.get('/get-data', (req, res, next) => {
    UserData.find()
        .then((doc) => {
            res.render('mongo', {
                items: doc,
                renderCrudButtons: true
            });
            console.log(doc);
        });
});

router.post('/insert-and-get-data', (req, res, next) => {
    var item = {
        name: req.body.name,
        age: req.body.age,
        image: '/images/12%20-%20VESKCfh.jpg'
    };

    var userData = new UserData(item);
    userData.save();

    if(!userData.name || !userData.age)
        console.log('No Data Saved');
    else
        console.log('Data Saved to DB ' + userData);

    res.redirect('/mongoose/get-data');
});

router.post('/update', (req, res, next) => {
    var id = req.body.id;

    UserData.findById(id, (err, doc) => {
        if(err)
            console.error('Error, no entry found');
        else {
            doc.name = req.body.updateName;
            doc.age = req.body.updateAge;
            doc.save();

            if( doc.name == req.body.updateName || 
                doc.age == req.body.updateAge
            ) console.log('Update Successful');
            else
                console.log('Nothing Updated');
        }        
        res.redirect('/mongoose/get-data');
    });
});

router.post('/delete', (req, res, next) => {
    var id = req.body.id;
    if(id) {
        UserData.findByIdAndRemove(id).exec();
        console.log('Data from ID: ' + id + ' Deleted');
    } else
        console.log('Nothing to Delete');

    res.redirect('/mongoose/get-data');
});

module.exports = router;