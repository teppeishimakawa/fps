

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs');
//var html = fs.readFileSync('./index.html');

http.createServer(function(req, res)
{

var url = req.url;
  console.log(url);
  if ("/" == url)
  {
    fs.readFile("./index.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      //res.end();
    });
  } else if ("/fps.js" == url)
  {
    fs.readFile("./fps.js", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data);
      //res.end();
    });
  }else if(req.method === 'POST')
   {


/*
    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files)
    {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
*/

      var day = new Date();
console.log(req.body);
      fs.writeFile("../asset/" + day + ".jpg", req.body, function (err) {
            if (err) {
                console.log('ERROR:: ' + err);
                throw err;
            }
        });

      res.send("OK")
    };

    return;
   }
).listen(8080);