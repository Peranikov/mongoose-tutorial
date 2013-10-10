var _mongoose = require("mongoose");
var _database = 'practice';
var _db = _mongoose.connect('mongodb://localhost/' + _database);

var Post = new _mongoose.Schema({
    name    : {type: String, required: true},
    message : {type: String, required: true}
});

Post.statics.findByName = function(name, cb) {
  this.find({"name" : name}, cb);
};

exports.Post = _db.model('Post', Post);