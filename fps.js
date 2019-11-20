


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
    if (frame % 180 !== 0)
    {
    return;
    }
    buffer.drawImage(video, 0,0,1280,720);
    img.src = document.getElementById("buffer").toDataURL('image/jpeg')


//blobをupload
uploadCanvasData();

function uploadCanvasData()
{
    var dataUrl = document.getElementById("buffer").toDataURL('image/jpeg');

    var blob = dataURItoBlob(dataUrl);

    var formData = new FormData();
    var day = new Date();
    formData.append("file", blob,day + '.jpg');

    var request = new XMLHttpRequest();
    //request.onload = completeRequest;

    request.open("POST", "https://fpssima.netlify.com:8080/user");
    request.send(formData);
}

function dataURItoBlob(dataURI)
{
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }

    var bb = new Blob([ab], { "type": mimeString });
    return bb;
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


function successCallback(stream) {
  video.srcObject = stream;
 };

function errorCallback(err) {
  alert(err);
 };

}else
{

}

       document.getElementById("video").play();

draw()



