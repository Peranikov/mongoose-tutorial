var _Post  = require('./model').Post;
var _cmd = process.argv[2];

switch (_cmd) {
  case "s" :
    try {
      var json = require('./input');
        save(json);
    } catch (e) {
      console.log(e);
    }
    break;

  case "f" :
    find();
    break;


  case "fn" :
    findByName(process.argv[3]);
    break;


  case "r" :
    remove();
    break;

  default :
    console.log("not found command:" + _cmd);
    break;
}

function save(json) {
  var post = new _Post();
  post.name    = json.name;
  post.message = json.message;
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

function find() {
  _Post.find({}, function(err, docs) {
    if(docs.length === 0) {
      console.log("count zero");
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