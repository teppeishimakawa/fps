


var buffer=document.getElementById("buffer").getContext('2d');
var video=document.getElementById("video");
var img = document.getElementById('image');
let frame = 0;
var reader = new FileReader();

//videoの縦幅横幅を取得
var w = video.offsetWidth;
var h = video.offsetHeight;
document.getElementById("buffer").setAttribute("width", w);
document.getElementById("buffer").setAttribute("height", h);
document.getElementById("image").setAttribute("width", w);
document.getElementById("image").setAttribute("height", h);

document.getElementById("video").style.display="none";
document.getElementById("buffer").style.display="none";


function draw()
{
    requestAnimationFrame(draw)
    frame++;
    if (frame % 360 !== 0)
    {
    return;
    }
    buffer.drawImage(video, 0,0,1280,720);
    //img.src = document.getElementById("buffer").toDataURL('image/jpeg')


//blobをupload
uploadCanvasData();

function uploadCanvasData()
{
    var base64 = document.getElementById("buffer").toDataURL('image/jpeg');
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
    formData.append("image", blob,day + '.jpg');

    var request = new XMLHttpRequest();

    request.open("POST", "./fpsnode.js");
    request.responseType = 'blob';
    request.send(formData);

}



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




const medias =
{
  audio: false,
  video: {
    facingMode: "environment",
    aspectRatio: {exact: 1.7777777778}
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
 };

function errorCallback(err)
 {
  alert(err);
 };

}else
{

}

document.getElementById("video").play();

draw()





