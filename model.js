var _mongoose = require("mongoose");
var _database = 'practice';
var _db = _mongoose.connect('mongodb://localhost/' + _database);

var Post = new _mongoose.Schema({
    name    : String,
    comments : [{body : String}],
    tag     : [String],
    created : {type: Date, default: Date.now},
});

Post.statics.findByName = function(name, cb) {
  this.find({"name" : name}, cb);
};

exports.Post = _db.model('Post', Post);