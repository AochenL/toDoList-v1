const express = require("express");
const bodyParser = require("body-parser");

const https = require("https");
const app = express();
const date = require(__dirname+"/date.js")

app.use(express.static("public"));

let newItems = ["Prepare Food","Cook Food","Eat"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {

    let day = date.getDate();
    res.render("list", {
        listTitle: day,
        newListItems:newItems
    });
});

app.post("/",function(req,res){
    const newItem = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(newItem);
        res.redirect("/work");
    }else{
        newItems.push(newItem);
        res.redirect("/");
    }

});

app.get('/work', function(req, res) {
    res.render("list", {
        listTitle: "Work",
        newListItems:workItems
    });
});

app.get('/about', function(req, res) {
    res.render("about");
});

app.listen("3000", function() {
    console.log("Server is running on port 3000.");
});
