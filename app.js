//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Item = mongoose.model("Item", {
  name: { type: String }
});

const List = mongoose.model("List", {
  name: { type: String },
  items: { type: [{name: String}]}
});

const defaultItem = [
  { name: 'Welcome to your to do list!'},
  { name: 'Hit the + button to add a new item.'},
  { name: '<-- Hit this to delete an item.'}
];

app.get("/", function(req, res) {
  Item.find({})
    .then(function(foundItems){
      if (!foundItems || foundItems.length === 0) {
        Item.insertMany([
          { name: 'Welcome to your to do list!'},
          { name: 'Hit the + button to add a new item.'},
          { name: '<-- Hit this to delete an item.'}
        ]).then(function(){
          console.log("Data inserted")  // Success
          res.redirect("/");
        }).catch(function(error){
          console.log(error)      // Failure
        });
      } else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
      }
    });
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName})
  .then(function(foundList){
    if (!foundList){
      //Create a new list
      const list = new List({
        name: customListName,
        items: defaultItem
      });     
      return list.save();
    } else {
      //Show an existing list
      return foundList;
    }
  })
  .then(function(list){
    res.render("list", {listTitle: list.name, newListItems: list.items});
  })
  .catch(function(error){
    console.log(error);
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
  
  const item = new Item({
    name: itemName
  });

  if (listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName})
    .then(foundList => {
      foundList.items.push(item);
      return foundList.save();
  })
  .then(() => {
    res.redirect(`/${listName}`);
  })
  .catch(error => {
    console.log(error);
  });

  }
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId)
    .then(function(){
      console.log("Successfully deleted checked item.")
      res.redirect("/");
    })
    .catch(function(error){
      console.log(error);
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
      .then(() => res.redirect(`/${listName}`))
      .catch(error => console.log(error));
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
