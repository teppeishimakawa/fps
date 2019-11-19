


var buffer=document.getElementById("buffer").getContext('2d');
var video=document.getElementById("video");

//videoの縦幅横幅を取得
var w = video.offsetWidth;
var h = video.offsetHeight;
document.getElementById("buffer").setAttribute("width", w);
document.getElementById("buffer").setAttribute("height", h);

document.getElementById("video").style.display="none";
document.getElementById("buffer").style.display="none";

function draw() {
    buffer.drawImage(video, 0, 0);

    document.getElementById("buffer").toBlob(function(blob)
    {
      var img = document.getElementById('image');
      img.src = document.getElementById("buffer").toDataURL('image/png');
    }, 'image/jpeg', 0.95);


    requestAnimationFrame(draw)
}




const medias =
{
  audio: false,
  video: {
    facingMode: "environment"
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


setInterval(draw(),3000);


