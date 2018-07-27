const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to server
MongoClient.connect(url, {
        useNewUrlParser: true
    },
    (err, client) => {
        assert.strictEqual(null, err);
        console.log('Connected successfully to server');

        const db = client.db(dbName);

        // Nested db operations run synchronously vs. asynchronously
        insertDocuments(db, () => {
            findDocuments(db, () => {
                updateDocument(db, () => {
                    findDocuments(db, () => {
                        removeDocument(db, () => {
                            findDocuments(db, () => {
                                indexCollection(db, () => {
                                    findDocuments(db, () => {
                                        client.close();
                                    });
                                });
                            });
                        });
                    });
                });
            })
        });
    });

// DOCUMENT INSERTION FUNCTION
const insertDocuments = (db, callback) => {
    // Define/Get 'documents' collection
    const collection = db.collection('documents');

    // Insert some docs
    collection.insertMany([{
        a: 1,
        b: 2
    }, {
        c: 3,
        d: 4
    }], (err, result) => {
        assert.strictEqual(err, null);
        assert.strictEqual(2, result.result.n);
        assert.strictEqual(2, result.ops.length);
        console.log('Inserted 2 docs into the collection');
        callback(result);
    });
}

// FIND DOCUMENTS FUNCTION
const findDocuments = (db, callback) => {
    // Define/Get 'documents' collection
    const collection = db.collection('documents');

    // Find some docs (search query goes in find() fn)
    collection.find({
        // a: 1,
        // b: 2
    }).toArray((err, docs) => {
        assert.strictEqual(err, null);
        console.log('Found the following records');
        console.log(docs);
        callback(docs);
    });
}

// UPDATING DOCUMENT FUNCTION
const updateDocument = (db, callback) => {
    // Define/Get 'documents' collection
    const collection = db.collection('documents');

    // Update document where a is 1 & b is 2, set b equal to 2, c to 4, & d to 8
    collection.updateOne({
        a: 1
    }, {
        $set: {
            c: 4,
            d: 8
        }
    }, (err, result) => {
        assert.strictEqual(err, null);
        assert.strictEqual(1, result.result.n);
        console.log('Updated first document with field \'a\' equal to 1 - added c: 4 & d: 8');
        callback(result);
    });
}

// REMOVING DOCUMENT FUNCTION
const removeDocument = (db, callback) => {
    // Define/Get 'documents' collection
    const collection = db.collection('documents');

    // Delete doc where field a is 3
    collection.deleteOne({
        a: 1
    }, (err, result) => {
        assert.strictEqual(err, null);
        assert.strictEqual(1, result.result.n);
        console.log('Removed the first doc with field \'a\' equal to 1');
        callback(result);
    });
}

// INDEXING FUNCTION
const indexCollection = (db, callback) => {
    // Define/Get 'documents' collection
    const collection = db.collection('documents');

    collection.createIndex({
            "c": 3
        },
        null,
        (err, results) => {
            console.log(results);
            callback();
        }
    );
}