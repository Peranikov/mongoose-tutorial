var _mongoose = require("mongoose");
var _database = 'practice';
var _db = _mongoose.connect('mongodb://localhost/' + _database);

var Post = new _mongoose.Schema({
    name    : String,
    comments : [{
      title : String,
      body  : String
    }],
    votes   : {type: Number, default: 0},
    tag     : [String],
    created : {type: Date, default: Date.now},
});

Post.statics.findByName = function(name, cb) {
  this.findOne({"name" : name}, cb);
};

Post.statics.countUpVotes = function(name, cb) {
  this.update({name: name}, {$inc:{votes:1}}, cb);
};

Post.statics.countDownVotes = function(name, cb) {
  this.update({name: name}, {$inc:{votes:-1}}, cb);
};

Post.statics.updateComments = function(name, comments, cb) {
  this.update({name: name}, {comments:comments}, cb);
};

exports.Post = _db.model('Post', Post);