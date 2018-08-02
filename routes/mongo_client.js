var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';
// DB Name
const dbName = 'mongodebe';

// Globar bool flag for data insertion
var dataInserted = false;

router.get('/', (req, res, next) => {
    res.render('mongo', {
        // Place  fields here
        data: dataInserted
    });
});

router.get('/get-data', (req, res, next) => {
    // Get data from db and render results
    var resultArray = [];

    MongoClient.connect(url, {
            useNewUrlParser: true
        },
        (err, client) => {
            assert.strictEqual(null, err);
            console.log('Connected successfully to server');

            const db = client.db(dbName);

            var cursor = db.collection('user').find({
                // "name": "Farhaan"
            });

            cursor.forEach((doc, err) => {
                console.log(doc);
                console.log(err);
                assert.equal(null, err);
                resultArray.push(doc);
            }, () => {
                dataInserted = true;
                client.close();
                console.log('GET mongo success');

                res.render('mongo', {
                    items: resultArray,
                    data: dataInserted
                });
            });
        });
});

router.post('/insert', (req, res, next) => {
    // Form Fields
    var item = {
        name: req.body.name,
        age: req.body.age,
        image: '/images/12%20-%20VESKCfh.jpg'
    };

    MongoClient.connect(url, {
            useNewUrlParser: true
        },
        (err, client) => {
            assert.strictEqual(null, err);
            console.log('Connected successfully to server');

            const db = client.db(dbName);

            db.collection('user').insertOne(item, (err, result) => {
                assert.strictEqual(null, err);
                console.log('Name & age inserted');

                dataInserted = true;
                client.close();
            });

            res.redirect('/mongo');
        });
});

module.exports = router;