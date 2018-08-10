exports.init = (() => {
  const mapMarker = [
    {
      lat: 0,
      lng: 0,
      label: {
        phone: 'Telefon',
        mail: 'E-Mail',
      },
      location: {
        company: 'Luzerner Rollenspieltage',
        address: 'Schädrütistrasse 26',
        zipCity: '6006 Luzern',
        country: 'Switzerland',
        email: 'mail@rollenspieltag.ch',
      },
      iso: 'CH',
      info: '',
    },
  ];

  /* eslint-disable */

  /**
   * Get the user IP throught the webkitRTCPeerConnection
   * @param onNewIP {Function} listener function to expose the IP locally
   * @return undefined
   */

  const self = document.querySelector('.map');
  const googleApiKey = 'XXX';
  const gooleMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];
  const initMap = function() {
    //var markerImage = '../assets/images/mapMarker.png';
    var markerImage = 'data:image/png;base64,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';
    var mapZoom = 16;
    var map, infoWindow;

    var setAddressBox = function( conf ) {
      //console.log(conf);
      var country = conf.location.country.length ? '<p>' + conf.location.country + '</p>' : '';
      var company = conf.location.company.length ? '<h2>' + conf.location.company + '</h2>' : '';
      var data = [];
      if ( conf.location.address.length ) {
        data[ data.length ] = conf.location.address;
      }
      if ( conf.location.zipCity.length ) {
        data[ data.length ] = conf.location.zipCity;
      }
      if ( conf.location.email.length ) {
        data[ data.length ] = '<a href="mailto:' + conf.location.email + '">' + conf.location.email + '</a>';
      }
      self.querySelector('.addressbox-wrap .addressbox').innerHTML = company + '<p>' + data.join('<br />') + '</p>';
    }

    if ( !mapMarker.length ) {
      console.warn('Warning: No valid map marker definition isset.');
      return;
    }

    // Init map after script is loaded
    map = new google.maps.Map(self.querySelector('.mapbox'), {
      center: { lat: mapMarker[0].lat, lng: mapMarker[0].lng },
      zoom: mapZoom,
      mapTypeId: 'roadmap',
      styles: gooleMapStyle,
      //disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    });
    setAddressBox(mapMarker[0]);
    infoWindow = new google.maps.InfoWindow();

    var i = 0;
    var ul = self.querySelectorAll('.marker-menu ul');
    mapMarker.forEach(function(el, index, arr) {
      ul[0].innerHTML += '<li><a href="#'+ el.location.country + '" data-id="'+ index +'" data-iso="' + el.iso + '">'+ el.location.country +'</a></li>';

      var contentString = '<div class="content" data-id="' + i + '">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<div id="bodyContent">'+
            el.info +
          '</div>'+
        '</div>';

      var marker = new google.maps.Marker({
        position: { lat: el.lat, lng: el.lng },
        title: el.location.country,
        icon: markerImage
      });
      marker.addListener('click', function(e) {
        infoWindow.close();
        infoWindow.setOptions({
          content: contentString
        });
        infoWindow.open(map, marker);
      });
      // To add the marker to the map, call setMap();
      marker.setMap(map);
      i++;
    });

    google.maps.event.addDomListener(window, 'resize', function() {
      var active = self.querySelector('.marker-menu ul li a.active');
      var dataId = parseInt(active.getAttribute('data-id'));
      var latFloat = mapMarker[ dataId ].lat;
      var lngFloat = mapMarker[ dataId ].lng;
      map.setCenter({ lat: latFloat, lng: lngFloat });
    });

    /*
    * Easing Functions - inspired from http://gizma.com/easing/
    * only considering the t value for the range [0, 1] => [0, 1]
    */
    var EasingFunctions = {
      // no easing, no acceleration
      linear: function (t) { return t },
      // accelerating from zero velocity
      easeInQuad: function (t) { return t*t },
      // decelerating to zero velocity
      easeOutQuad: function (t) { return t*(2-t) },
      // acceleration until halfway, then deceleration
      easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
      // accelerating from zero velocity
      easeInCubic: function (t) { return t*t*t },
      // decelerating to zero velocity
      easeOutCubic: function (t) { return (--t)*t*t+1 },
      // acceleration until halfway, then deceleration
      easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
      // accelerating from zero velocity
      easeInQuart: function (t) { return t*t*t*t },
      // decelerating to zero velocity
      easeOutQuart: function (t) { return 1-(--t)*t*t*t },
      // acceleration until halfway, then deceleration
      easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
      // accelerating from zero velocity
      easeInQuint: function (t) { return t*t*t*t*t },
      // decelerating to zero velocity
      easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
      // acceleration until halfway, then deceleration
      easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }

    var slowPanTo = function(map, endPosition, n_intervals, T_msec) {
      var f_timeout, getStep, i, j, lat_array, lat_delta, lat_step, lng_array, lng_delta, lng_step, pan, ref, startPosition;
      getStep = function(delta) {
        return parseFloat(delta) / n_intervals;
      };
      startPosition = map.getCenter();
      lat_delta = endPosition.lat() - startPosition.lat();
      lng_delta = endPosition.lng() - startPosition.lng();
      lat_step = getStep(lat_delta);
      lng_step = getStep(lng_delta);
      lat_array = [];
      lng_array = [];
      for (i = j = 1, ref = n_intervals; j <= ref; i = j += +1) {
        lat_array.push(map.getCenter().lat() + i * lat_step);
        lng_array.push(map.getCenter().lng() + i * lng_step);
      }
      f_timeout = function(i, i_min, i_max) {
        return EasingFunctions.easeOutCubic(n_intervals / parseFloat(T_msec));
      };
      pan = function(i) {
        if (i < lat_array.length) {
          return setTimeout(function() {
            map.panTo(new google.maps.LatLng({
              lat: lat_array[i],
              lng: lng_array[i]
            }));
            return pan(i + 1);
          }, f_timeout(i, 0, lat_array.length - 1));
        }
      };
      return pan(0);
    };

    var live = function(eventType, elementQuerySelector, cb) {
      document.addEventListener(eventType, function (event) {
        var qs = document.querySelectorAll(elementQuerySelector);
        if (qs) {
          var el = event.target, index = -1;
          while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) {
            el = el.parentElement;
          }
          if (index > -1) {
            cb.call(el, event);
          }
        }
      });
    }
    var hasClass = function(el, className) {
      if (el.classList) {
        return el.classList.contains(className);
      }
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }

    var addClass = function(el, className) {
      if (el.classList) {
        el.classList.add(className);
      } else if (!hasClass(el, className)) {
        el.className += " " + className;
      }
    }

    var removeClass = function(el, className) {
      if (el.classList) {
        el.classList.remove(className);
      } else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
      }
    }

    const selectFirstEelement = function(hash) {
      var links = self.querySelectorAll('.marker-menu ul li a');
      if ( '' != hash && self.querySelectorAll('.marker-menu ul li a[data-iso="' + hash + '"]').length) {
        links = self.querySelectorAll('.marker-menu ul li a[data-iso="' + hash + '"]');
      }
      console.info('select map by country:', hash);
      links[0].click();
    };

    const getIPDetails = function(ipAddress) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var resp = JSON.parse(xhttp.responseText);
          selectFirstEelement(resp.country_code);
        }
      };
      xhttp.open("GET", "https://ip-api.io/json/" + ipAddress, true);
      xhttp.send();
    };

    const getGeoCountryCode = function() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var resp = JSON.parse(xhttp.responseText);
          getIPDetails(resp.ip);
        }
      };
      xhttp.open("GET", "https://api.ipify.org/?format=json", true);
      xhttp.send();
    };

    getGeoCountryCode();

    live('click', '.marker-menu ul li a:not(.active)', function(e) {
      e.preventDefault();
      self.querySelectorAll('.marker-menu ul li a').forEach(function(el, index, arr) {
        removeClass(el, 'active');
      });

      addClass(this, 'active');

      var dataId = parseInt(this.getAttribute('data-id'));
      var latFloat = mapMarker[ dataId ].lat;
      var lngFloat = mapMarker[ dataId ].lng;
      setAddressBox(mapMarker[ dataId ]);

      slowPanTo(map, new google.maps.LatLng(latFloat, lngFloat), 10, 500);

    });

    var url = window.location.hash;
    var hash = url.substring(url.indexOf("#") + 1);
    selectFirstEelement(hash);

    // Handle click for footer language selection links (to select corresponding contact map tab)
    live('click', 'div.footer__linklist li a', function(event) {
      let selectedCountry = event.target.href.substring(event.target.href.indexOf("#") + 1);
      document.querySelector(`.marker-menu li a[data-iso="${selectedCountry}"]`).click()
    });

    live('click', 'a.show-extern', function(e) {
      e.preventDefault();
      var active = self.querySelector('.marker-menu ul li a.active');
      var dataId = parseInt(active.getAttribute('data-id'));
      var location = mapMarker[ dataId ].location;
      setAddressBox(mapMarker[ dataId ]);
      var destination = [];
      for (var key in location) {
        // Check for mandatory fields
        if ( 0 == location.address.length || 0 == location.address.country ) {
          break;
        }
        // Add all not empty fields
        if (location.hasOwnProperty(key)) {
          if ( 'phone' == key || 'email' == key || 'company' == key ) {
            continue;
          }
          if ( 0 < location[key].length ) {
            destination[ destination.length ] = location[key];
          }
        }
      }
      var params = '&destination=' + encodeURI( destination.join(', ') );
      window.open('https://www.google.com/maps/dir/?api=1' + params, '_blank');

    });
  };

  var loadJS = function(url, implementationCode, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;
    location.appendChild(scriptTag);
  };


  loadJS('https://maps.googleapis.com/maps/api/js?key=' + googleApiKey, function() {
    if ( mapMarker.length ) {
      var geocoder = new google.maps.Geocoder();
      var isInvalid = 0;
      var runInit = function() {
        if ( 0 == isInvalid ) {
          initMap();
        }
      };
      mapMarker.forEach(function(el, index, arr) {
        if ( false == 0 < el.lat || false == 0 < el.lng ) {
          var address = [];
          var locations = el.location;
          for (var key in locations) {
            // Check for mandatory fields
            if ( 0 == locations.address.length || 0 == locations.address.country ) {
              break;
            }
            // Add all not empty fields
            if (locations.hasOwnProperty(key)) {
              if ( 'phone' == key || 'email' == key || 'company' == key ) {
                continue;
              }
              if ( 0 < locations[key].length ) {
                address[ address.length ] = locations[key];
              }
            }
          }
          geocoder.geocode( { 'address': address.join(', ')}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              // do something with the geocoded result
              mapMarker[index].lat = results[0].geometry.location.lat();
              mapMarker[index].lng = results[0].geometry.location.lng();
            }
            isInvalid--;
            runInit();
          });
          isInvalid++;
        }
      });
      runInit();
    } else {
      console.warn('Warning: No vaild map coordinates applied.');
    }
  }, document.body);
  /* eslint-enable */
});
