const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname +"/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// ################################################################
mongoose.connect("mongoDb<serverpath>/todolistDB", {useNewUrlParser: true});


const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item0 = new Item({
  name: "Welcome to your todo list!!!"
});

const item1 = new Item({
  name: "Hit the + button to add a new list."
});

const item2 = new Item({
  name: "<-- Hot this to delete an item."
});

const defaultItems = [item0, item1, item2];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema) ;

app.get("/", function(req, res) {


  Item.find({}, function(err, foundItems){
    if(foundItems.length ===0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("successfully saved to default items to DB.");
        }
      });
      res.redirect("/");
    }else{
      res.render("List", {listTitle: day, newItems: foundItems });
    }
  });

  let day = date.getDate();

});



app.post("/",function(req, res){

  const itemName = req.body.new;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Sunday" || "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", function(req, res){
  const checkedItemid = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemid, function(err){
    if(!err){
      console.log("deleted");
      res.redirect("/");
    }
  });
});

app.get("/:customListName", function(req,res){
const customListName =  req.params.customListName;

List.findOne({name: customListName}, function(err, foundList){
  if(!foundList){

    const list = new List({
      name: customListName,
      items:defaultItems
    });
    list.save();
    res.redirect("/" + customListName);

  }else{
    res.render("List", {listTitle: foundList.name, newItems: foundList.items })
  }

});
});

app.get("/about", function(req, res){
  res.render("about");
})

app.post("/work",function(req,res){
  let items = req.body.newItems;
  workItems.push(items);
  res.redirect("/work");
})

app.listen(3000, function() {
  console.log("server startd on port 3000 successfully!");
});
