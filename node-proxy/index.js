var express = require('express');
var request = require('superagent')

var app = express();
var HOST = 'http://news-at.zhihu.com/api/4';
app.set('port', (process.env.PORT || 5000));
/**
 * CORS support.
 */

app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});


app.get('/movie/:type', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
//首页
app.get('/news/before/:date', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})

app.get('/news/latest', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
// 详情
app.get('/news/:id', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})

app.get('/story-extra/:id', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
//主题列表
app.get('/theme/:id', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
app.get('/theme/:id/before/:lastId', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
//评论
app.get('/story-extra/:id', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
app.get('/story/:id/long-comments', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
app.get('/story/:id/short-comments/before/:lastId', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
app.get('/story/:id/short-comments', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
//侧栏主题列表
app.get('/themes', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});