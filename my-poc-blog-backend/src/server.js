import express from "express";
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());

/**
 * In lieu of db in memory we are to ging to connect to db and make queries to the db we created ( react-poc-blog)
 * Create a new endpoint to allow our cient side to actually load the information for a give article
 * We need to know how my upvotes & comments an article has so we can display them
 */
app.get('/api/articles/:name', async (req, res) => {
    // get value of the url param
    const { name } = req.params;

    // connecting to the mongodb instance we have running
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();

    // Retrieve the specific db the we created and reference to it
    const db = client.db('react-poc-blog');

    // Passing a collection of articles and findOne({}) allows us to find a single document inside the mongoDb collection
    const article = await db.collection('articles').findOne({ name });

    // Check to see if the article exist and if it does we will retrieve the aricle else 404
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

//PUT
app.put('/api/articles/:name/upvote', (req, res) => {
// define a fake database to keep track of all the upvotes each article has to get the logic right
// in each of our handlers

    // What article do we want to upvote?
    // This gives us the current value at the name segment in the request we just received 
    const { name } = req.params
    
    // Find the cooresponding article w/ that name
    const article = articleInfo.find((a) => a.name === name);

    // check if article exist
    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes!! Read Now!`)
    } else {
        res.send(`That article doesn\'t exist`);
    }

})

app.post('/api/articles/:name/comments', (req, res) => {
    //1st we want to determine which format the comments are going to be specified when 
    //they are sent to the server request
    const { name } = req.params;
    const { postedBy, message } = req.body

    const article = articleInfo.find((a) => a.name === name);

        if (article) {
        article.comments.push({postedBy, message})
        // res.send(`The ${name} article now has a new entry written by ${postedBy} with the comment "${message}"`)
        res.send(article.comments)
    } else {
        res.send(`That article doesn\'t exist`);
    }

})


app.listen(8000, () => {
    console.log("Server is listening on port 8000")
});