var _Post  = require('./model').Post;
var _cmd = process.argv[2];

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
    countUpVotes();
    break;
  case "cdv" :
    countDownVotes();
    break;
  case "uc" :
    updateComments();
    break;
  case "r" :
    remove();
    break;
  default :
    console.log("not found command:" + _cmd);
    break;
}

function save() {
  var json = require('./input');

  var post = new _Post();
  post.name    = json.name;
  post.comments = json.comments;
  post.tag     = json.tag;
  post.save(function(err) {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log("completed save:");
    findByName(post.name);
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

function countUpVotes() {
  var json = require('./input');

  _Post.countUpVotes(json.name, function(err, numberAffected, raw) {
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

function countDownVotes() {
  var json = require('./input');

  _Post.countDownVotes(json.name, function(err, numberAffected, raw) {
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