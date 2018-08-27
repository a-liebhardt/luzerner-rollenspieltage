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
  if (!self) return;

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
    // const markerImage = 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="40px" viewBox="0 0 30 40"><g><path fill="#099" class="st0" d="M29.1,12L17.9,1.1C17.2,0.4,16.2,0,15.2,0c-1,0-1.9,0.4-2.7,1.1L1.3,12c-1.1,1-1.4,2.6-0.8,4c0.4,1,1.2,1.7,2.2,2v6.8c0,2,1.7,3.6,3.7,3.6h2.6l2.2,6.8c-4.2,0.3-7.1,1.2-7.1,2.3c0,1.3,4.9,2.4,11,2.4c6.1,0,11-1.1,11-2.4c0-1-3-1.9-7.1-2.3l2.2-6.8H24c2.1,0,3.8-1.6,3.8-3.6V18c1-0.3,1.8-1.1,2.2-2C30.5,14.6,30.2,13,29.1,12z M24,14.6v10.2h-5.4l-3.4,10.3c0,0,0,0,0,0c0,0,0,0,0,0l-3.4-10.3H6.5V14.6H4L15.2,3.7l11.2,10.9L24,14.6L24,14.6z"/><path fill="#099" class="st0" d="M14.2,16c0-0.4-0.4-0.8-0.8-0.8h-3c-0.5,0-0.8,0.4-0.8,0.8v2.9c0,0.4,0.4,0.8,0.8,0.8h3c0.5,0,0.8-0.4,0.8-0.8L14.2,16L14.2,16z"/></g></svg>';
    const markerImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgMzAgNDAiPjxnPjxwYXRoIGZpbGw9IiMwOTkiIGNsYXNzPSJzdDAiIGQ9Ik0yOS4xLDEyTDE3LjksMS4xQzE3LjIsMC40LDE2LjIsMCwxNS4yLDBjLTEsMC0xLjksMC40LTIuNywxLjFMMS4zLDEyYy0xLjEsMS0xLjQsMi42LTAuOCw0YzAuNCwxLDEuMiwxLjcsMi4yLDJ2Ni44YzAsMiwxLjcsMy42LDMuNywzLjZoMi42bDIuMiw2LjhjLTQuMiwwLjMtNy4xLDEuMi03LjEsMi4zYzAsMS4zLDQuOSwyLjQsMTEsMi40YzYuMSwwLDExLTEuMSwxMS0yLjRjMC0xLTMtMS45LTcuMS0yLjNsMi4yLTYuOEgyNGMyLjEsMCwzLjgtMS42LDMuOC0zLjZWMThjMS0wLjMsMS44LTEuMSwyLjItMkMzMC41LDE0LjYsMzAuMiwxMywyOS4xLDEyeiBNMjQsMTQuNnYxMC4yaC01LjRsLTMuNCwxMC4zYzAsMCwwLDAsMCwwYzAsMCwwLDAsMCwwbC0zLjQtMTAuM0g2LjVWMTQuNkg0TDE1LjIsMy43bDExLjIsMTAuOUwyNCwxNC42TDI0LDE0LjZ6Ii8+PHBhdGggZmlsbD0iIzA5OSIgY2xhc3M9InN0MCIgZD0iTTE0LjIsMTZjMC0wLjQtMC40LTAuOC0wLjgtMC44aC0zYy0wLjUsMC0wLjgsMC40LTAuOCwwLjh2Mi45YzAsMC40LDAuNCwwLjgsMC44LDAuOGgzYzAuNSwwLDAuOC0wLjQsMC44LTAuOEwxNC4yLDE2TDE0LjIsMTZ6Ii8+PC9nPjwvc3ZnPg==';
    const mapZoom = 14;
    const mapbox = self.querySelector('.mapbox');
    let map;
    let infoWindow;
    let activeId = 0;

    if (!mapbox) return;

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
      zoomControl: true,
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
      if (!active) return;
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
      return false;
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
    // live('click', 'div.footer__linklist li a', (event) => {
    //   let selectedCountry = event.target.href.substring(event.target.href.indexOf("#") + 1);
    //   document.querySelector(`.marker-menu li a[data-iso="${selectedCountry}"]`).click()
    // });

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
