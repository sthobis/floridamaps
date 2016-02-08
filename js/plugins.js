// init Namespace
var FM = FM || {};

// module namespace
FM.GMaps = function( customSetting ) {

	// overwrite default settings
	var settings = $.extend( {
		beaches : [{ 'name': 'Miami Beach', 'lat':25.8139375, 'long':-80.2143469 },
					{ 'name': 'Fort Lauderdale', 'lat':26.1410956, 'long':-80.2200134 }]
	}, 
	customSetting || {});

	this.init = function() {

		// init Menu Dropdown component
		initGoogleMap();
	}

	// method to initialize Google Maps
	var initGoogleMap = function() {

		var map;

		google.load('maps', '3',{
			callback:function(){

				var map = initMapCanvas();

				initMarkers(map);
			}
		});
	}

	var initMapCanvas = function() {

		return new google.maps.Map(document.getElementById('google-map'), {
			center: {lat: 26.1410956, lng: -80.2200134},
			zoom: 7,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
	}

	var initMarkers = function(map) {

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

		for (i = 0; i < settings.beaches.length; i++) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(settings.beaches[i].lat, settings.beaches[i].long),
				map: map
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {
					infowindow.setContent(settings.beaches[i].name);
					infowindow.open(map, marker);
				}
			})(marker, i));
		}
	}

}
