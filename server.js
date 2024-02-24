const express = require('express')
const app= express();
const makeid = require("./utils/uniqueIdGenerator")

// CRUD
// create -> longURL => shortURL;
// get -> shortURL => longURL;
// delete -> shortURL;

var database = {
    // <key>: <value>
};

app.use(express.json());

//create
app.post("/create-short-url", (req, res, next)=>{
    let longUrl= req.body.longUrl;
    let id= makeid(4);
    database[id]= longUrl;

    res.send({
        domain: "localhost",
        port: 9090,
        shortUrl: id
    });
    // console.log(database)
    //https://<domain>:<port>/shortUrl
})

//get 
app.get("/get-long-url", (req, res, next)=>{
    const shortUrl = req.query.shortUrl;

    if(shortUrl) {
        if(database[shortUrl]) {

           return res.redirect(database[shortUrl]);
        } else {
            res.send("Id not valid");
        }
    }
});

//delete;
app.delete("/delete-short-url", (req, res, next)=> {
    const shortUrl= req.body.shortUrl;
    delete database[shortUrl];
    res.send("succesfully deleted")
})


app.listen(9090, ()=>console.log("on port 9090"))