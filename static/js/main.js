
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
    
    var input = document.getElementById("companyCity");
        var city = input.innerHTML;
        
        console.log(city);
        console.log("started map function");

        /*geocoding API from Google */

        geocoder.geocode({ 'address': city }, function(results, status) {

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
                var destination = {};
            
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                        console.log("Hi");
                        console.log(`your location is ${pos.lat} , ${pos.lng}`);
                        return getDistance (location, pos);
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