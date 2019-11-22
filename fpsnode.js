

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs');
//var html = fs.readFileSync('./index.html');

http.createServer(function(req, res)
{

var url = req.url;
  console.log(url);
  if (‘/’ == url) {
    fs.readFile(‘./js.html’, ‘UTF-8’, function (err, data) {
      res.writeHead(200, {‘Content-Type’: ‘text/html’});
      res.write(data);
      res.end();
    });
  } else if (‘/fps.js’ == url) {
    fs.readFile(‘./fps.js’, ‘UTF-8’, function (err, data) {
      res.writeHead(200, {‘Content-Type’: ‘text/javascript’});
      res.write(data);
      res.end();
    });
  }


    //res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //res.end(html);


  //req.url === 'http://127.0.0.1:8080/index.html' && req.method === 'POST'
  if (req.method === 'POST')
   {
    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files)
    {
      res.write('received upload:\n\n');

      var day = new Date();

      fs.writeFile("./" + day + ".jpg", req.body, function (err) {
            if (err) {
                console.log('ERROR:: ' + err);
                throw err;
            }
        });

      res.send("OK")
      res.end(util.inspect({fields: fields, files: files}));
    });

    return;
   }
}).listen(8080);