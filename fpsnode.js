

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs');

var flg= 0;

var server=http.createServer(function(req, res)
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
      console.log(flg);
      res.writeHead(200, {"Content-Type": "text/plain"});
      console.log("near:" + flg);
      res.write(data);
      //server間動作確認用
      //if(flg == 1){res.write(data.replace("//stt();","stt();"));}
      //else if(flg == 0){res.write(data.replace("//stp();","stp();"));};
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
    }else if ("/index2.html" == url)
  {
    fs.readFile("./index2.html", "UTF-8", function (err, data)
    {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      res.end();
    });
  }

  
  
    //制御pcからのstart信号,start:flg 1,stop:flg 0　
  　//server間のやりとり
      if (req.headers["content-type"] == "application/json") 
    {
          req.setEncoding("utf-8");
    req.on("data", function(chunk)
        {
        var data = JSON.parse(chunk);
        console.log(data.flg);
        flg = Object.assign(data.flg);
        console.log(flg)
        });     
    }  

  
   }).listen(8080);


//poling
//clientに向けてstart:flg 1,stop:flg 0送信
var socketio = require('socket.io');
var io = socketio.listen(server);
io.sockets.on('connection', function(socket) 
{
    socket.on('client_to_server', function(data) {
      //on:受信、emit:送信
      //サーバログに受信データ表示
        console.log("rxdata" + data);
        io.sockets.emit('server_to_client',flg);
    });
});




