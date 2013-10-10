 process.env.NODE_ENV = 'test';

require('should');

var _Post = require("../model").Post;

describe('#findByName', function() {
    it('指定したnameのデータが取得できるべき', function(done) {
      removeAndSave(function(err) {
        if (err) {
          console.log(err);
        }

        _Post.findByName("Jack", function(err, docs) {
          if (err) {
            console.log(err);
          }

          docs[0].name.should.equal("Jack");
          done();
        });
      });
    });
});

function save(cb) {
  var post = new _Post();
  post.name     = "Jack";
  post.save(cb);
}

function removeAndSave(cb) {
  _Post.remove({}, function(err) {
    if (err) {
      console.log(err);
      process.exit();
    }
    save(cb);
  });
}