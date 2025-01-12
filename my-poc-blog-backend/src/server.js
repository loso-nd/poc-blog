import express from "express";
import { MongoClient } from "mongodb";

// Temporary in memory database
// Define e an array of objects, each of which is going to represent a different article and keep
// track of how many upvotes that article has.
const articleInfo = [{
    name: 'learn-react',
        upvotes: 0,
            comments: [],
},
{
    name: 'learn-node',
        upvotes: 0,
            comments: [],
},
{
    name: 'mongodb',
        upvotes: 0,
            comments: [],
}];

const app = express();
app.use(express.json());

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
})

/**
 * Ex. endpoint calls
 * localhost:3000/articles/learn-node
 * 
 * GET Request
 * How to specify we want a url param request in the route
        app.get("/hello/:name", (req, res) => {
            console.log(req.params)
            const { name } = req.params;
            res.send(`Hello ${name}!!`);
        });
 * 
 * 
 * POST Request
        app.post("/hello", (req, res) => {
            res.send(`Hello ${req.body.name}!`);
        });
 *
 *  */ 