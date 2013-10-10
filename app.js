 var _Post   = require('./model').Post;
var _cmd    = process.argv[2];
var _config = require("config");

console.log("db : " + _config.db);

switch (_cmd) {
  case "s" :
    save();
    break;
  case "f" :
    find();
    break;
  case "fn" :
    findByName(process.argv[3]);
    break;
  case "cuv" :
    var name   = process.argv[3];
    var title  = process.argv[4];
    countUpVotes(name, title);
    break;
  case "uc" :
    updateComments();
    break;
  case "ui" :
    updateIcons();
    break;
  case "r" :
    remove();
    break;
  case "at" :
    var name = process.argv[3];
    var tags = [];

    for (var i = 4; i < process.argv.length; i++) {
      tags.push(process.argv[i]);
    }

    addTags(name, tags);
    break;
  case "rs" :
    removeAndSave();
    break;
  default :
    console.log("not found command:" + _cmd);
    break;
}

function save() {
  var json = require('./input');

  var post = new _Post();
  post.name     = json.name;
  post.images   = json.images;
  post.comments = json.comments;
  post.tags      = json.tags;
  post.save(function(err) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log("completed save:");
    findByName(post.name);
  });
}

function updateIcons() {
  var json = require('./input');
  _Post.updateIcon(json.name, json.images.icons, function(err, numberAffected, raw) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was %d', raw);
    console.log("completed update icon:");
    findByName(json.name);
  });
}

function addTags(name, tags) {
  var json = require('./input');
  _Post.addTags(name, tags, function(err, numberAffected, raw) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was %d', raw);
    console.log("completed update tags:");
    findByName(name);
  });
}

function updateComments() {
  var json = require('./input');

  _Post.updateComments(json.name, json.comments, function(err, numberAffected, raw) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was %d', raw);
    console.log("completed update comments:");
    findByName(json.name);
  });
}

function countUpVotes(name, title) {
  _Post.countUpVotes(name, title, function(err, numberAffected, raw) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was %d', raw);
    console.log("completed update comments:");
    findByName(name);
  });
}

function find() {
  _Post.find({}, function(err, docs) {
    if(docs.length === 0) {
      console.log("empty");
      process.exit();
    }

    console.log(docs);
    process.exit();
  });
}


function findByName(name) {
  _Post.findByName(name, function(err, docs) {
    if(docs.length === 0) {
      console.log("empty");
      process.exit();
    }

    console.log(docs);
    process.exit();
  });
}

function remove() {
  _Post.remove({}, function(err) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log("completed remove");
    process.exit();
  });
}

function removeAndSave() {
  _Post.remove({}, function(err) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log("completed remove");
    save();
  });
}