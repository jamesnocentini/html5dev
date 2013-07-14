

function displayImage(obj) {
    console.log(obj);

    if (obj.files && obj.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log(e.target.result)
            image.src = e.target.result
        }

        reader.readAsDataURL(obj.files[0]);
    }
}
var localMediaStream = null;
var image = document.getElementsByTagName('img')[0];
var video =  document.getElementsByTagName('video')[0];
var canvas = document.getElementById('screenshot_canvas');
var ctx = canvas.getContext('2d');

function startStream() {
    console.log('Hey')
    console.log(navigator)
    navigator.webkitGetUserMedia({video: true, audio: false}, function(stream) {
        video.src = window.webkitURL.createObjectURL(stream);
        localMediaStream = stream;
    }, onError);
}
function onError() {
    alert('getUserMedia API not supported, or another application is using the webcam !');
}

function snapshot() {
    ctx.drawImage(video, 0, 0);
    image.src = canvas.toDataURL('image/webp')
}

video.addEventListener('click', snapshot, false);

function locateMe() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geocodePosition);
    } else {
        document.alert('Geolocation API not supported by your browser')
    }


}

function geocodePosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
            console.log(results[3].formatted_address.split(','));
            var arr = results[3].formatted_address.split(',');
            document.getElementById('signup_county').value = arr[0];
            document.getElementById('signup_city').value = arr[1];
            document.getElementById('signup_country').value = arr[2];
        }
    })
}

function checkPasswords() {
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    console.log(pass1.value, pass2.value)
    if(pass1.value === pass2.value) {

        pass2.setCustomValidity(' ');
    } else {
        pass2.setCustomValidity('Passwords do not match');
    }
}



