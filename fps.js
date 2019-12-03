
var buffer=document.getElementById("buffer").getContext('2d');
var canvas=document.getElementById("buffer");
var video=document.getElementById("video");
var img = document.getElementById('image');
let frame = 0;
var reader = new FileReader();
var flg=1;

var w;
var h;

document.getElementById("alive").style.display="none";


function draw()
{
    requestAnimationFrame(draw)
    frame++;
    if (frame % 60 !== 0)
    {
    return;
    }
    buffer.drawImage(video, 0,0,w,h);
    //img.src = document.getElementById("buffer").toDataURL('image/jpeg')



uploadCanvasData();


/*ローカルでファイル生成する場合は以下追加
      var a = document.createElement('a') //download属性を持ったaタグをクリックするとダウンロードができるので、それをシミュレートする
      document.body.appendChild(a)
      a.style = 'display:none'
      a.href = img.src ;
      var day = new Date();
      a.download = day + '.jpg'
      a.click()
      //createされた、objUrlを解放
      window.URL.revokeObjectURL(img.src)
*/
  }


  function stt()
{

    flg=0;
    document.getElementById("video").style.display="none";
    uploadCanvasData();
    document.getElementById("alive").style.display="";
}


function stp()
{
    flg=1;
    document.getElementById("video").style.display="";
    video.style.width=String(w)/3 + "px";
    video.style.height=String(h)/3 + "px";
    document.getElementById("alive").style.display="none";

}

//draw





const medias =
{
  audio: false,
  video: {
    facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 }
    //aspectRatio: {exact: 1.7777777778}
    //facingMode: "user" // フロントカメラにアクセス
  }
};


navigator.mediaDevices = navigator.mediaDevices ||
((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
   getUserMedia: function(c) {
     return new Promise(function(y, n) {
       (navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia).call(navigator, c, y, n);
     });
   }
} : null
);



if(navigator.mediaDevices)
{

const promise = navigator.mediaDevices.getUserMedia(medias);

promise.then(successCallback)
       .catch(errorCallback);


function successCallback(stream)
 {
  video.srcObject = stream;
   

  var settings = stream.getVideoTracks()[0].getSettings();
  w = settings.width;
  h = settings.height;  
   
   console.log(w);
   
  //w=1536;
  //h=2048;

document.getElementById("buffer").setAttribute("width", w);
document.getElementById("buffer").setAttribute("height", h);
document.getElementById("image").setAttribute("width", w);
document.getElementById("image").setAttribute("height", h);

document.getElementById("video").style.display="none";
document.getElementById("buffer").style.display="none";


/*
canvas.width *= devicePixelRatio;
canvas.height *= devicePixelRatio;

canvas.style.width = String(canvas.width / devicePixelRatio) + "px";
canvas.style.height = String(canvas.height / devicePixelRatio) + "px";
*/


 }

function errorCallback(err)
 {
  alert(err);
 };

}else
{

}

document.getElementById("video").play();

draw()


//blob size 0.95
function uploadCanvasData()
{
  if(flg == 1){stp()}else
  {
    var base64 = document.getElementById("buffer").toDataURL('image/jpeg',0.95);

    // Base64からバイナリへ変換
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++)
    {
      buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    var blob = new Blob([buffer.buffer],
    {
     type: "image/jpeg"
    });

    var formData = new FormData();
    var day = new Date();
    formData.append("image",blob, "txtime" + day + '.jpg');

    console.log(blob.size);

    var request = new XMLHttpRequest();

    request.open("POST", "./fpsnode.js");
    request.responseType = 'blob';
    request.send(formData);

   }

}



