// Generated by CoffeeScript 1.3.3
(function() {
  var authToken, authorizeApp, circle, getToken, mappingTasks, redirectUrl, request, token, tokenCheck;

  circle = '';

  token = '';

  authToken = 0;

  redirectUrl = 'http://localhost/development/happenings/index.html';

  authorizeApp = function(user) {
    var clientId;
    clientId = '5d1ba596dc034a7a8895e309f5f2452f';
    return window.location.href = 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + redirectUrl + '&response_type=token';
  };

  getToken = function() {
    return window.location.href.split('#access_token=')[1];
  };

  tokenCheck = function() {
    if (window.location.href.indexOf('access_token') > 0) {
      return token = getToken();
    } else {
      return authorizeApp();
    }
  };

/*var MyIconType = L.Icon.extend({options: {
    iconUrl: 'app/noun.png',
    shadowUrl: 'leaflet4/dist/images/marker-shadow.png',
    iconSize: new L.Point(40, 40),
    shadowSize: null,
    iconAnchor: new L.Point(20, 20),
    popupAnchor: new L.Point(24, -10)}});
*/


  request = function(long, lat, clientId, photoLayer) {
    var uri;
    if (token) {
      uri = 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + long + '&access_token=' + token;
    } else {
      uri = 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + long + '&client_id=' + clientId;
    }
    return $.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: true,
      url: uri,
      success: function(photos) {
        photoLayer.clearLayers();
        return _.each(photos.data, function(photo) {
          var object, photoTemplate;
          if (photo.location) {
           /* var myIcon = new MyIconType();
            object = new L.Marker(new L.LatLng(photo.location.latitude, photo.location.longitude), {
             icon: myIcon
            }); */
            object = new L.CircleMarker(new L.LatLng(photo.location.latitude, photo.location.longitude), {
              radius: 12,
              clickable: true,
              weight:1.25,
              fillOpacity: .5,
              fill: false,
              stroke: false,
            });

            photoTemplate = _.template($("#popupTemplate").html(), {
              photo: photo
            });

    var colors = ["#EA2E49","#D9CC3C","#A0E0A9","#00ADA7" ];                
    var rand = Math.floor(Math.random()*colors.length);           
    $('path.leaflet-clickable').css("fill", colors[rand]);

    var colors = ["#C0C0C0"];                
    var rand = Math.floor(Math.random()*colors.length);           
    $('path.leaflet-clickable').css("stroke", colors[rand]);


            object.bindPopup(photoTemplate);
            return photoLayer.addLayer(object);

          }
        });
      }
    });
  };

  mappingTasks = function() {
    var clientId, map, onLocationError, onLocationFound, onMapClick, photoLayer, tiles;
    onLocationFound = function(e) {
      map.setZoom(13)
    };
    onLocationError = function(e) {
      return map.setView(new L.LatLng(37.76745803822967, -122.45018005371094), 13).addLayer(tiles);
    };
    onMapClick = function(e) {
      if (!circle) {
        circle = new L.Circle(e.latlng, 1700, {
          color: '#919191',
      
          fill: true,
          fillOpacity: 0.1,
          weight: 1.5,
          clickable: false
        });
        map.addLayer(circle);
      } else {
        circle.setLatLng(e.latlng);
      }
      return request(+e.latlng.lng.toFixed(2), e.latlng.lat.toFixed(2), clientId, photoLayer);
    };
    map = new L.Map('map');
    tiles = new L.TileLayer('http://a.tiles.mapbox.com/v3/bobbysud.map-ez4mk2nl/{z}/{x}/{y}.png', {
      maxZoom: 17
    });
    photoLayer = new L.LayerGroup();
    clientId = 'f62cd3b9e9a54a8fb18f7e122abc52df';
    map.addLayer(tiles);
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.locate({setView:true}); 
    map.on('click', onMapClick);
    map.addLayer(photoLayer);
    map.on("popupopen", function (e) {

//Time since function

    date = new Date(parseInt($("#timeago").html()) * 1000);
    $('#timeago').text($.timeago(date));

//Random background generator

    var colors = ["#E8D5DB","#F0E8DD","#F0FFEB","#EBFDFF" ];                
    var rand = Math.floor(Math.random()*colors.length);           
    $('.leaflet-popup-content-wrapper, .leaflet-popup-tip, .leaflet-popup-close-button').css("background-color", colors[rand]);

//Slow animation function

    $('.leaflet-popup-pane').css('opacity', '0').css('margin-top', '0');
    return $('.leaflet-popup-pane').animate({
    opacity: 1,
    marginTop: '-5'
    }, 500, function() {});
    });

//Zoom somewhere else button
  $(document).ready(function(){
 
        $(".slidingDiv").show();
        $(".otherplace").hide();
 
    $('.show_hide').click(function(){
    $(".otherplace").slideToggle();
    });
 
});


     $('<div">Paris <br><br></div>').addClass('otherplace').attr('title', 'Paris').click(function() {
      return map.setView(new L.LatLng(48.84562669931916, 2.3697853088378906), 13);
    }).appendTo($('#map'));

     $('<div">Dubai <br><br></div>').addClass('otherplace').attr('title', 'Dubai').click(function() {
      return map.setView(new L.LatLng(25.271139, 55.307485), 13);
    }).appendTo($('#map'));

     $('<div">Tokyo <br><br></div>').addClass('otherplace').attr('title', 'Tokyo').click(function() {
      return map.setView(new L.LatLng(35.68853320738875, 139.74592208862305), 14);
    }).appendTo($('#map'));

     $('<div">New York City <br><br></div>').addClass('otherplace').attr('title', 'NYC').click(function() {
      return map.setView(new L.LatLng(40.72514478577348, -73.9980697631836), 13);
    }).appendTo($('#map'));

     $('<div">London <br><br></div>').addClass('otherplace').attr('title', 'London').click(function() {
      return map.setView(new L.LatLng(51.50820824957313, -0.127716064453125), 13);
    }).appendTo($('#map'));

     $('<div">Rio de Janerio</div>').addClass('otherplace').attr('title', 'Rio de Janerio').click(function() {
      return map.setView(new L.LatLng(-22.89278094774026, -43.22776794433594), 13);
    }).appendTo($('#map'));
    
};
  
  $(document).ready(function() {
    mappingTasks();
    if (authToken === 1) {
      return tokenCheck();
    }
  });

}).call(this);
