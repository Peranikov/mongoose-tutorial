var _Post    = require('./model').Post;

console.log("intput [cmd],[name],[message]");
process.stdin.resume();
process.stdin.setEncoding('utf8');


process.stdin.on('data', function(chunk) {
  chunk = chunk.replace("\n", "");
  console.log("input:" + chunk);
  var cmd     = chunk.split(',')[0];
  var name    = chunk.split(',')[1];
  var message = chunk.split(',')[2];

  switch (cmd) {
    case "s" :
      save(name, message);
      break;

    case "f" :
      find();
      break;


    case "fn" :
      findByName(name);
      break;

    default :
      console.log("not found command:" + cmd);
      break;
  }
});

function save(name, message) {
  console.log("exec save");
  var post = new _Post();
  post.name    = name;
  post.message = message;
  post.save(function(err) {
    if (err) {
      console.log(err);
      return;
    }
  });
}

function find() {
  console.log("exec find");
  _Post.find({}, function(err, docs) {
    if(docs.length === 0) {
      console.log("count zero");
      return;
    }

    console.log(docs);
  });
}


function findByName(name) {
  console.log("exec find");
  _Post.findByName(name, function(err, docs) {
    if(docs.length === 0) {
      console.log("count zero");
      return;
    }

    console.log(docs);
  });
}