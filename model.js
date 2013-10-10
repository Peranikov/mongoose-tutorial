var _config   = require("config");
var _mongoose = require("mongoose");
var _db = _mongoose.connect('mongodb://localhost/' + _config.db);

var Post = new _mongoose.Schema({
    name    : String,
    comments : [{
      title : String,
      body  : String,
      votes : {type: Number, default: 0},
    }],
    images : {
      icons : [String],
      background : String
    },
    tags     : [String],
    created : {type: Date, default: Date.now},
});

Post.statics.findByName = function(name, cb) {
  this.find({"name" : name}, cb);
};

Post.statics.updateIcon = function(name, icons, cb) {
  var query  = {name:name};
  var update = {'images.icons':icons};
  this.update(query, update, cb);
};

Post.statics.addTags = function(name, tags, cb) {
  var query  = {name:name};
  var update = {$addToSet:{'tags': {$each: tags}}};
  this.update(query, update, cb);
};

Post.statics.countUpVotes = function(name, title, cb) {
  var query  = {name:name, 'comments.title':title};
  var update = {$inc:{'comments.$.votes':1}}; // 「$」は位置指定演算子
  this.update(query, update, cb);
};

Post.statics.updateComments = function(name, comments, cb) {
  this.update({name: name}, {comments:comments}, cb);
};

exports.Post = _db.model('Post', Post);