

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs');

http.createServer(function(req, res)
{

var url = req.url;
  console.log(url);
  console.log(req.method)

  if ("/" == url)
  {
    fs.readFile("./index.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  } else if ("/fps.js" == url)
  {
    fs.readFile("./fps.js", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write(data);
      res.end();
    });
  }else if(req.method === 'POST')
   {

      var form = new multiparty.Form();

      form.parse(req, function(err, fields, files)
      {
      res.writeHead(200, {'content-type': 'image/jpeg'});
      res.write('received upload:\n\n');

      var day = new Date();
      console.log(files.image[0].originalFilename);
      //console.log(files.name);
      //  "tmp/" + day + ".jpg"
      fs.writeFile("tmp/" + files.image[0].originalFilename, fs.readFileSync(files.image[0].path), function (err)
        {
            if (err)
            {
                console.log('ERROR:: ' + err);
                throw err;
            }
        });
      res.end(util.inspect({fields: fields, files: files}));
      })
    };

   }).listen(8080);