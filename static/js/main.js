
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

                selection.geolocation = location;

                return location;
                //console logging to make sure code is running.. 
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
}