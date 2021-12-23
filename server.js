// to run it use command npm run start than type local:5000 on browser

//using the FS module to read and write the file
const fs=require("fs");

//using the module expless, start to listen to request on PORT 5000
const express = require('express');
const app = express();
app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

//read as json
app.use(express.json());
//read text
app.use(express.urlencoded());
//serve the front resource
app.use(express.static('public'));

//read json file and trasform as javasrcipt object
let users = JSON.parse(fs.readFileSync("data.json"));

//get post
app.get('/post', (req , res) =>{
    res.send(users);
    
})

//create post
app.post('/post', (req , res) =>{ 
    let lastId = users[users.length - 1].id;
    let {username, content, time,like} = req.body;
    let user = {
        id: lastId+1,
        like: like,
        username: username,
        content: content,
        time: time,

    };
    users.push(user);
    fs.writeFileSync("data.json", JSON.stringify(users));
    
    res.send("Create Post");
})

//update post
app.put('/post/:id',(req,res) =>{
    let id = req.params.id;
    let {username, content, time,like} = req.body;
    let index = users.findIndex(user => user.id === parseInt(id));
    
    users[index].username = username;
    users[index].content = content;
    users[index].time = time;
    users[index].like = like;
    fs.writeFileSync("data.json" ,JSON.stringify(users));
    res.send("Update Post");
    
})
//delete post
app.delete('/post/:id',(req, res) =>{
    let id = req.params.id;
    let index = users.findIndex(user => user.id === parseInt(id));
    users.splice(index,1);
    fs.writeFileSync("data.json" ,JSON.stringify(users));
    res.send("Delete Post")   
});