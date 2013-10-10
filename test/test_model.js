 process.env.NODE_ENV = 'test';

require('should');

var _Post = require("../model").Post;

describe('#findByName', function() {

  before(function(done) {
    removeAndSave(function(err) {
      if (err) {
        console.log(err);
      }
      done();
    });
  });

  it('指定したnameのデータが取得できるべき', function(done) {
    _Post.findByName("Jack", function(err, docs) {
      if (err) {
        console.log(err);
      }

      docs[0].name.should.equal("Jack");
      done();
    });
  });


  after(function(done) {
    _Post.remove({}, function(err) {
      if (err) {
        console.log(err);
      }
    });
    done();
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