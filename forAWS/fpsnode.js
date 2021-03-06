

var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
var fs = require('fs');

var flg= 0;
var recflg=null;

var server=http.createServer(function(req, res)
{
  //これがないとindex2.htmlをreloadした時にpostがoptionsで飛んじゃう
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  res.setHeader('Access-Control-Allow-Headers', '*')

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
  }
   else if ("/fps.js" == url)
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
      //console.log(files.image[0].originalFilename);
      //console.log(files.name);
      //  "tmp/" + day + ".jpg"
      fs.writeFile("tmp/" + files.image[0].originalFilename, fs.readFileSync(files.image[0].path), function (err)
        {        
        console.log("tmp/" + files.image[0].originalFilename);
        //console.log(files.image[0].path);
        
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

      
      if(recflg == 1)
      {
      res.write(data.replace("<p>rec status:</p>","<p>rec status:on ok!</p>"));
      }else if(recflg == 0)
      {
      res.write(data.replace("<p>rec status:</p>","<p>rec status:off</p>"));
      }else
      {
      res.write(data);
      } 
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
//html2より受けたデータをclientに向けてstart:flg 1,stop:flg 0送信
var socketio = require('socket.io');
var io = socketio.listen(server);
io.sockets.on('connection', function(socket) 
{
    socket.on('client_to_server', function(data) {
      //on:受信、emit:送信
      //サーバログに受信データ表示
        console.log("rxdata:" + data);
        io.sockets.emit('server_to_client',flg);
      //html２からの制御信号on,off判定
      //htmlでrec開始したらサーバに"rec_on"返す。その後recflgを変える
        if(data == "rec_on"){recflg = 1;}else if(data == "rec_off"){recflg = 0;}
    });
});










