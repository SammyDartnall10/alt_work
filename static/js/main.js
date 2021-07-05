<<<<<<< HEAD

/* found example of star rating here: https://codepen.io/alisuarez/pen/RWGNLm */

/*var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
  return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});*/

/*      
$(".dropdown-search").on("click", function() {
    var type = document.getElementById('type-select').value;
    console.log("hello");
    console.log(type);
});

*/


    
/*
<h1>jQuery Example</h1>
<p><input type=text size=5 name=a> +
   <input type=text size=5 name=b> =
   <span id=result>?</span>
<p><a href=# id=calculate>calculate server side</a>

from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/_add_numbers')
def add_numbers():
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=a + b)

@app.route('/')
def index():
    return render_template('index.html')
    
--------------------------------------------------------------------------------


$(function(){
    var data;
    $.ajax({
        type: "GET",
        url: $SCRIPT_ROOT + "/get_data",
        dataType: "json",
        timeout: 120000,
        error: errorHandlier,
        success: function(r){
            data = r.data;
        }
    });
    setTimeout(function(){
        if(data != null){
            /* whatever you want to do using the results */
            /* For example using above API, */ 
            /*
            alert("Hello "+data[0].firstname+" "+data[0].lastname);
        }
        else{
            setTimeout(arguments.callee, 100);
        }
    }
});
*/

$('.dropdown-search').bind('click', function() {
      $.getJSON($SCRIPT_ROOT + '/filteredresults',
    );
});
=======
const apiKey = 'AIzaSyBY0nEpb-qc6dxAR0UfKi1LnB0NU42uA70';


$(".dropdown-search").on("click", function() {
    var location = document.getElementById('type-select').value;
    window.location = "https://alt-work-sammydartnall.c9users.io/view_all/"+location;
    
});

/*---------Places API - Google------------------------------------------------*/

var map;
var service;
var infowindow;
var geocoder;
var markers;
var endLocation;


function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-41.28664, 174.77557);
    var mapOptions = {
        zoom: 13,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    
    var input = document.getElementById("companyAddress");
        var streetAddress = input.innerHTML;
    var input = document.getElementById("companyCity");
        var city = input.innerHTML;
    var fullAddress = streetAddress + city;   

        console.log(streetAddress);
        console.log(city);
        console.log("started map function");

        /*geocoding API from Google */

        geocoder.geocode({ 'address': fullAddress }, function(results, status) {

            if (status == 'OK') {
                var location = {};

                location['lat'] = results[0].geometry.location.lat();
                location['lng'] = results[0].geometry.location.lng();

                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                console.log(`Checking lat lng works ${location.lat} ${location.lng}`)
                
                // Try HTML5 geolocation.
            
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                        console.log("Hi");
                        console.log(`your location is ${pos.lat} , ${pos.lng}`);
                        //Call the getDistance function- pass location and pos 
                        getDistance (location, pos);
                        return; 
                    }, 
                    
                    function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                    });

                    
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
                
                return location;
                    //console logging to make sure code is running.. 
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
}
//Get distance from current location. Returns an object, can then use drivig directions, etc. 
function getDistance (location, pos) {
    /*---------Places API - Distances Matrix ------------------------------------------------*/
    console.log(`This is pos in the getDistance funct ${pos.lat} , ${pos.lng}`);

    var origin1 = new google.maps.LatLng(location.lat, location.lng);
                
    var destinationA = new google.maps.LatLng(pos.lat, pos.lng);
   

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, callback);


    function callback(response, status) {
    // See Parsing the Results for
    // the basics of a callback function.

        if (status == 'OK') {
        var origins = response.originAddresses;
        console.log(origins)
        var destinations = response.destinationAddresses;
        console.log(destinations)
        
        //Can just take distance from the object, so its a little bit quicker
        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.text;
            console.log(distance)
            var duration = element.duration.text;
            console.log(duration)
            var from = origins[i];
            var to = destinations[j];
            }
        }
        //Display the returned distance in the HTML element on the location page. 
        var setContent = document.getElementById('distance')
        setContent.innerHTML = distance;
    }
}
}



/*---------Places API - Distances Matrix ------------------------------------------------*/

var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = 'Greenwich, England';
var destinationA = 'Stockholm, Sweden';
var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: 'DRIVING',
    transitOptions: TransitOptions,
    drivingOptions: DrivingOptions,
    unitSystem: UnitSystem,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  // See Parsing the Results for
  // the basics of a callback function.

    if (status == 'OK') {
      var origins = response.originAddresses;
      console.log(origins)
      var destinations = response.destinationAddresses;
      console.log(desinations)
  
      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          console.log(distance)
          var duration = element.duration.text;
          console.log(duration)
          var from = origins[i];
          var to = destinations[j];
        }
      }
    }
  }

/*
                markers.push(marker);

                marker.addListener('click', function() {
                    map.setZoom(16);
                    map.setCenter(marker.getPosition());
                    endLocation = marker.getPosition();
                    var infowindow = new google.maps.InfoWindow({
                        content: '<p>Marker Location:' + marker.getPosition() + '</p>'
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });
                });

                location['marker'] = marker;

                /*selection.geolocation global variable - pass the lat and lng to the object declared at beginning of code*/

                /*selection.geolocation = location;*/


                    /*infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    infoWindow.open(map);
                    map.setCenter(pos);*/
>>>>>>> cdf6b1602baf92bd45385cb320ea216d023932cc
