import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());


app.get('/api/articles/:name', async (req, res) => {
  const { name } = req.params

    const article = await db.collection('articles').findOne({ name });

    // Check to see if the article exist and if it does we will retrieve the aricle else 404
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

//PUT
app.put('/api/articles/:name/upvote', async (req, res) => {

    const { name } = req.params
    
    /**
     * make a query to MongoDb to the collection of articles
     * First arg in the db.collection call is the type of query call, 
     * Second arg contain the changes that we specify MongoDB to make
     * 
     * Goal:We want to update an article whose name property is equal to the URL param,
     */
    // 
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 }
    });

    // Passing a collection of articles and findOne({}) allows us to find a single document inside the mongoDb collection
    const article = await db.collection('articles').findOne({ name });

    // check if article exist
    if (article) {
        res.json(article)
    } else {
        res.send(`That article doesn\'t exist`);
    }

})

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, message } = req.body

    //Make a query to mongoDb 
    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, message } },
    })
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.send(article.comments)
    }
     else {
        res.send(`That article doesn\'t exist`);
    }

})

connectToDb(() => {
    console.log("Successfully connected to the database")
    app.listen(8000, () => {
        console.log("Server is listening on port 8000")
    });
})
