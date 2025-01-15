import { MongoClient } from 'mongodb';
let db;

async function connectToDb(params) {
    // connecting to mongodb instance
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    // make a reference to the specific database
    db = client.db('react-poc-blog');
    params();
}

export {
    db,
    connectToDb
}