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
        // company: 'Luzerner Rollenspieltage',
        address: 'Schädrütistrasse 26',
        zipCity: '6006 Luzern',
        country: 'Switzerland',
        // email: 'mail@rollenspieltag.ch',
      },
      iso: 'CH',
      info: 'Luzerner Rollenspieltage',
    },
  ];

  /* eslint-disable */

  /**
   * Get the user IP throught the webkitRTCPeerConnection
   * @param onNewIP {Function} listener function to expose the IP locally
   * @return undefined
   */

  const self = document.querySelector('.map');
  const googleApiKey = '{GOOGLE_MAP_APIKEY}';
  const gooleMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
      ],
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        },
      ],
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        },
      ],
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
      ],
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        },
      ],
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        },
      ],
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        },
      ],
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        },
      ],
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        },
      ],
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
      ],
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        },
      ],
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        },
      ],
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        },
      ],
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        },
      ],
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        },
      ],
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        },
      ],
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        },
      ],
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        },
      ],
    }
  ];

  const initMap = () => {
    //const markerImage = '../images/mapMarker.png';
    const markerImage = 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 26 18 24"><g><path fill="blue" d="M17.336,33.188l-6.746-6.547C10.149,26.215,9.571,26,8.996,26c-0.576,0-1.153,0.213-1.592,0.641l-6.749,6.547c-0.644,0.625-0.832,1.566-0.483,2.383c0.25,0.582,0.745,1.02,1.333,1.223v4.109c0,1.207,0.998,2.176,2.242,2.176h1.567l1.345,4.104c-2.492,0.209-4.263,0.74-4.263,1.363c0,0.803,2.955,1.455,6.6,1.455c3.646,0,6.6-0.65,6.6-1.453c0-0.623-1.771-1.156-4.261-1.365l1.344-4.104h1.566c1.243,0,2.262-0.969,2.262-2.176v-4.109c0.588-0.203,1.075-0.641,1.324-1.223C18.178,34.754,17.98,33.813,17.336,33.188z M14.257,34.746v6.148h-3.229L9,47.094c-0.002,0-0.004,0-0.004,0c-0.002,0-0.004,0-0.006,0l-2.029-6.199H3.753v-6.148H2.248l6.749-6.549l6.746,6.549H14.257z"/><path fill="blue" d="M8.354,35.6c0-0.268-0.221-0.482-0.497-0.482H6.041c-0.275,0-0.497,0.215-0.497,0.482v1.764c0,0.266,0.222,0.48,0.497,0.48h1.815c0.276,0,0.497-0.215,0.497-0.48V35.6z"/></g></svg>';
    const mapZoom = 16;
    let map;
    let infoWindow;
    let activeId = 0;

    const setAddressBox = (conf) => {
      // const country = conf.location.country ? `<p>${conf.location.country}</p>` : '';
      const company = conf.location.company ? `<h2>${conf.location.company}</h2>` : '';
      let data = [];

      if (conf.location.address) {
        data[ data.length ] = conf.location.address;
      }

      if (conf.location.zipCity) {
        data[data.length] = conf.location.zipCity;
      }

      if (conf.location.email) {
        data[data.length] = `<a href="mailto:${conf.location.email}">${conf.location.email}</a>`;
      }

      self.querySelector('.addressbox-wrap .addressbox').innerHTML = `${company}<p>${data.join('<br />')}</p>`;
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

    let i = 0;
    const ul = self.querySelectorAll('.marker-menu ul');
    mapMarker.forEach((el, index) => {
      ul[0].innerHTML += `<li><a href="#${el.location.country}" data-id="${index}" data-iso="${el.iso}">${el.location.country}</a></li>`;

      const contentString = `<div class="content" data-id="${i}">
    <div id="siteNotice">
  </div>
  <div id="bodyContent">
    ${el.info}
  </div>
</div>`;

      const marker = new google.maps.Marker({
        position: { lat: el.lat, lng: el.lng },
        title: el.location.country,
        icon: markerImage
      });

      marker.addListener('click', () => {
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

    google.maps.event.addDomListener(window, 'resize', () => {
      const active = self.querySelector('.marker-menu ul li a.active');
      const dataId = parseInt(active.getAttribute('data-id'));
      const latFloat = mapMarker[ dataId ].lat;
      const lngFloat = mapMarker[ dataId ].lng;
      map.setCenter({ lat: latFloat, lng: lngFloat });
    });

    /*
    * Easing Functions - inspired from http://gizma.com/easing/
    * only considering the t value for the range [0, 1] => [0, 1]
    */
    const EasingFunctions = {
      // no easing, no acceleration
      linear: (t) => { return t },
      // accelerating from zero velocity
      easeInQuad: (t) => { return t*t },
      // decelerating to zero velocity
      easeOutQuad: (t) => { return t*(2-t) },
      // acceleration until halfway, then deceleration
      easeInOutQuad: (t) => { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
      // accelerating from zero velocity
      easeInCubic: (t) => { return t*t*t },
      // decelerating to zero velocity
      easeOutCubic: (t) => { return (--t)*t*t+1 },
      // acceleration until halfway, then deceleration
      easeInOutCubic: (t) => { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
      // accelerating from zero velocity
      easeInQuart: (t) => { return t*t*t*t },
      // decelerating to zero velocity
      easeOutQuart: (t) => { return 1-(--t)*t*t*t },
      // acceleration until halfway, then deceleration
      easeInOutQuart: (t) => { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
      // accelerating from zero velocity
      easeInQuint: (t) => { return t*t*t*t*t },
      // decelerating to zero velocity
      easeOutQuint: (t) => { return 1+(--t)*t*t*t*t },
      // acceleration until halfway, then deceleration
      easeInOutQuint: (t) => { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }

    const slowPanTo = (map, endPosition, n_intervals, T_msec) => {
      let f_timeout;
      let getStep;
      let i;
      let j;
      let lat_array;
      let lat_delta;
      let lat_step;
      let lng_array;
      let lng_delta;
      let lng_step;
      let pan;
      let ref;
      let startPosition;

      getStep = (delta) => {
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
      f_timeout = (i, i_min, i_max) => {
        return EasingFunctions.easeOutCubic(n_intervals / parseFloat(T_msec));
      };
      pan = (i) => {
        if (i < lat_array.length) {
          return setTimeout(() => {
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

    const live = (eventType, elementQuerySelector, cb) => {
      document.addEventListener(eventType, (event) => {
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
    };

    const hasClass = (el, className) => {
      if (typeof el !== 'undefined') {
        if (el.classList) {
          return el.classList.contains(className);
        }
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
      }
    };

    const addClass = (el, className) => {
      if (typeof el !== 'undefined') {
        if (el.classList) {
          el.classList.add(className);
        } else if (!hasClass(el, className)) {
          el.className += " " + className;
        }
      }
    };

    const removeClass = (el, className) => {
      if (typeof el !== 'undefined') {
        if (el.classList) {
          el.classList.remove(className);
        } else if (hasClass(el, className)) {
          const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
          el.className = el.className.replace(reg, ' ');
        }
      }
    };

    const selectFirstEelement = (hash) => {
      let links = self.querySelectorAll('.marker-menu ul li a');
      if ( '' != hash && self.querySelectorAll(`.marker-menu ul li a[data-iso="${hash}"]`).length) {
        links = self.querySelectorAll(`.marker-menu ul li a[data-iso="${hash}"]`);
      }
      if (links.length === 0) {
        links = self.querySelectorAll(`.marker-menu ul li a`);
      }
      activeId = links[0].getAttribute('data-id');
      console.info('select map by country:', links[0].getAttribute('data-iso'));
      links[0].click();
    };

    const getIPDetails = (ipAddress) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          const resp = JSON.parse(xhttp.responseText);
          selectFirstEelement(resp.country_code);
        }
      };
      xhttp.open('GET', `https://ip-api.io/json/${ipAddress}`, true);
      xhttp.send();
    };

    const getGeoCountryCode = () => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          const resp = JSON.parse(xhttp.responseText);
          getIPDetails(resp.ip);
        }
      };
      xhttp.open('GET', 'https://api.ipify.org/?format=json', true);
      xhttp.send();
    };

    getGeoCountryCode();

    // live('click', '.marker-menu ul li a:not(.active)', (e) => {
    //   e.preventDefault();
    //   self.querySelectorAll('.marker-menu ul li a').forEach((el) => {
    //     removeClass(el, 'active');
    //   });

    //   addClass(this, 'active');

    //   const dataId = parseInt(this.getAttribute('data-id'));
    //   activeId = dataId;
    //   const latFloat = mapMarker[ dataId ].lat;
    //   const lngFloat = mapMarker[ dataId ].lng;
    //   setAddressBox(mapMarker[ dataId ]);

    //   slowPanTo(map, new google.maps.LatLng(latFloat, lngFloat), 10, 500);
    // });

    const url = window.location.hash;
    const hash = url.substring(url.indexOf("#") + 1);
    selectFirstEelement(hash);

    // Handle click for footer language selection links (to select corresponding contact map tab)
    live('click', 'div.footer__linklist li a', (event) => {
      let selectedCountry = event.target.href.substring(event.target.href.indexOf("#") + 1);
      document.querySelector(`.marker-menu li a[data-iso="${selectedCountry}"]`).click()
    });

    live('click', 'a.show-extern', (e) => {
      e.preventDefault();
      const dataId = parseInt(activeId);
      const location = mapMarker[dataId].location;
      setAddressBox(mapMarker[dataId]);
      let destination = [];
      for (let key in location) {
        // Check for mandatory fields
        if ( 0 == location.address.length || 0 == location.address.country ) {
          break;
        }
        // Add all not empty fields
        if (location.hasOwnProperty(key)) {
          if ('phone' === key || 'email' === key || 'company' === key) {
            continue;
          }
          if (0 < location[key].length) {
            destination[ destination.length ] = location[key];
          }
        }
      }
      const params = '&destination=' + encodeURI( destination.join(', ') );
      window.open(`https://www.google.com/maps/dir/?api=1${params}`, '_blank');
    });
  };

  const loadJS = (url, implementationCode, location) => {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element
    const scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;
    location.appendChild(scriptTag);
  };


  loadJS(`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`, () => {
    if (mapMarker.length) {
      const geocoder = new google.maps.Geocoder();
      let isInvalid = 0;

      const runInit = () => {
        if (0 == isInvalid) {
          initMap();
        }
      };

      mapMarker.forEach((el, index) => {
        if (false == 0 < el.lat || false == 0 < el.lng) {
          var address = [];
          var locations = el.location;
          for (var key in locations) {
            // Check for mandatory fields
            if (0 == locations.address.length || 0 == locations.address.country) {
              break;
            }

            // Add all not empty fields
            if (locations.hasOwnProperty(key)) {
              if ('phone' === key || 'email' === key || 'company' === key) {
                continue;
              }

              if (0 < locations[key].length) {
                address[ address.length ] = locations[key];
              }
            }
          }

          geocoder.geocode({'address': address.join(', ')}, (results, status) => {
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
